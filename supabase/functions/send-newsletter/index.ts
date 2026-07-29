import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
}

interface RequestBody {
  adminPassword: string;
  intro: string;
  articles: Article[];
  testEmail?: string;
}

interface InlineImage {
  cid: string;
  contentType: string;
  base64: string; // standard base64 (with padding), no line wrapping yet
}

const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_mail";

function base64urlEncode(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

function wrap76(str: string): string {
  return str.replace(/(.{76})/g, "$1\r\n");
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function guessContentType(url: string, fallback = "image/jpeg"): string {
  const u = url.toLowerCase().split("?")[0];
  if (u.endsWith(".png")) return "image/png";
  if (u.endsWith(".gif")) return "image/gif";
  if (u.endsWith(".webp")) return "image/webp";
  if (u.endsWith(".svg")) return "image/svg+xml";
  if (u.endsWith(".jpg") || u.endsWith(".jpeg")) return "image/jpeg";
  return fallback;
}

async function fetchInlineImage(url: string, cid: string): Promise<InlineImage | null> {
  try {
    const res = await fetch(url, { redirect: "follow" });
    if (!res.ok) {
      console.warn(`Image fetch failed ${res.status} for ${url}`);
      return null;
    }
    const ct = res.headers.get("content-type")?.split(";")[0].trim() || guessContentType(url);
    if (!ct.startsWith("image/")) {
      console.warn(`Non-image content-type ${ct} for ${url}`);
      return null;
    }
    const buf = new Uint8Array(await res.arrayBuffer());
    // Cap at ~5MB per image to keep emails deliverable
    if (buf.byteLength > 5 * 1024 * 1024) {
      console.warn(`Image too large (${buf.byteLength}) for ${url}`);
      return null;
    }
    return { cid, contentType: ct, base64: bytesToBase64(buf) };
  } catch (err) {
    console.warn(`Image fetch error for ${url}:`, err);
    return null;
  }
}

function buildEmailHtml(
  intro: string,
  articles: Article[],
  siteUrl: string,
  unsubscribeUrl: string,
  imageSrcs: string[],
): string {
  const articleCards = articles
    .map((article, i) => {
      const src = imageSrcs[i];
      const imgTag = src
        ? `<img src="${src}" alt="${escapeHtml(article.title)}" style="width:100%;height:auto;display:block;" />`
        : "";
      return `
        <div style="margin-bottom:32px;border-radius:12px;overflow:hidden;background:#f8fafc;border:1px solid #e2e8f0;">
          ${imgTag}
          <div style="padding:20px;">
            <p style="margin:0 0 8px;font-size:12px;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;color:#64748b;">${escapeHtml(article.category)}</p>
            <h2 style="margin:0 0 12px;font-size:20px;font-weight:600;color:#0f172a;">${escapeHtml(article.title)}</h2>
            <p style="margin:0 0 16px;font-size:15px;line-height:1.5;color:#334155;">${escapeHtml(article.excerpt)}</p>
            <a href="${siteUrl}/blog/${article.slug}" style="display:inline-block;padding:10px 18px;background:#0f172a;color:#ffffff;text-decoration:none;border-radius:8px;font-size:14px;font-weight:500;">Read on the blog</a>
          </div>
        </div>
      `;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="100%" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
          <tr>
            <td style="padding:32px 32px 24px;">
              <h1 style="margin:0 0 16px;font-size:28px;font-weight:600;color:#0f172a;">The RightHer Letter</h1>
              <p style="margin:0 0 24px;font-size:16px;line-height:1.6;color:#334155;">${escapeHtml(intro)}</p>
              <hr style="border:0;border-top:1px solid #e2e8f0;margin:0 0 24px;" />
              ${articleCards}
            </td>
          </tr>
          <tr>
            <td style="padding:24px 32px;background:#f8fafc;border-top:1px solid #e2e8f0;">
              <p style="margin:0 0 8px;font-size:13px;color:#64748b;">RightHer — a student-led legal rights blog empowering young women to find their voice.</p>
              <p style="margin:0;font-size:12px;color:#94a3b8;"><a href="${unsubscribeUrl}" style="color:#64748b;text-decoration:underline;">Unsubscribe</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

function isSafeEmail(v: string): boolean {
  return typeof v === "string" && v.length <= 254 && !/[\r\n]/.test(v) && EMAIL_RE.test(v);
}

function encodeSubject(subject: string): string {
  const safe = subject.replace(/[\r\n]+/g, " ");
  if (!/[^\x20-\x7E]/.test(safe)) return safe;
  const b64 = btoa(String.fromCharCode(...new TextEncoder().encode(safe)));
  return `=?UTF-8?B?${b64}?=`;
}

function createRawEmail(
  to: string,
  from: string,
  subject: string,
  html: string,
  inlineImages: InlineImage[],
): string {
  if (!isSafeEmail(to)) throw new Error("Invalid recipient email");

  const boundary = `bnd_${crypto.randomUUID().replace(/-/g, "")}`;
  const headers = [
    `To: ${to}`,
    `From: ${from}`,
    `Subject: ${encodeSubject(subject)}`,
    "MIME-Version: 1.0",
  ];

  let body: string;
  if (inlineImages.length === 0) {
    headers.push(`Content-Type: text/html; charset="UTF-8"`);
    body = html;
  } else {
    headers.push(`Content-Type: multipart/related; boundary="${boundary}"; type="text/html"`);
    const parts: string[] = [];
    parts.push(
      [
        `--${boundary}`,
        `Content-Type: text/html; charset="UTF-8"`,
        `Content-Transfer-Encoding: 7bit`,
        ``,
        html,
      ].join("\r\n"),
    );
    for (const img of inlineImages) {
      parts.push(
        [
          `--${boundary}`,
          `Content-Type: ${img.contentType}`,
          `Content-Transfer-Encoding: base64`,
          `Content-ID: <${img.cid}>`,
          `Content-Disposition: inline; filename="${img.cid}"`,
          ``,
          wrap76(img.base64),
        ].join("\r\n"),
      );
    }
    parts.push(`--${boundary}--`);
    body = parts.join("\r\n");
  }

  const raw = headers.join("\r\n") + "\r\n\r\n" + body;
  return base64urlEncode(new TextEncoder().encode(raw));
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = (await req.json()) as RequestBody;
    const { adminPassword, intro, articles, testEmail } = body;

    if (!adminPassword || adminPassword !== Deno.env.get("NEWSLETTER_ADMIN_PASSWORD")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!intro || !articles || articles.length === 0) {
      return new Response(
        JSON.stringify({ error: "Intro and at least one article are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");
    const googleMailApiKey = Deno.env.get("GOOGLE_MAIL_API_KEY");
    if (!lovableApiKey || !googleMailApiKey) {
      return new Response(JSON.stringify({ error: "Email service is not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const siteUrl = Deno.env.get("SITE_URL") || "https://rightherofficial.lovable.app";
    const sender = Deno.env.get("NEWSLETTER_SENDER") || "RightHer <rightherofficial@gmail.com>";
    const subject = "The RightHer Letter — this month's digest";

    // Fetch and inline images once per send (same for all recipients)
    const inlineImages: InlineImage[] = [];
    const imageSrcs: string[] = [];
    for (let i = 0; i < articles.length; i++) {
      const a = articles[i];
      let url = a.image;
      if (url && !/^https?:\/\//i.test(url)) {
        url = `${siteUrl}${url.startsWith("/") ? url : `/${url}`}`;
      }
      const cid = `article-${i}-${crypto.randomUUID().slice(0, 8)}@righther`;
      const img = url ? await fetchInlineImage(url, cid) : null;
      if (img) {
        inlineImages.push(img);
        imageSrcs.push(`cid:${cid}`);
      } else {
        // Fall back to the remote URL so at least Gmail can proxy it
        imageSrcs.push(url || "");
      }
    }

    let recipients: { email: string; unsubscribe_token: string }[] = [];

    if (testEmail) {
      recipients = [{ email: testEmail, unsubscribe_token: "test-token" }];
    } else {
      const { data, error } = await supabase
        .from("subscribers")
        .select("email, unsubscribe_token")
        .eq("active", true);
      if (error) throw error;
      recipients = data || [];
    }

    if (recipients.length === 0) {
      return new Response(
        JSON.stringify({ sent: 0, failed: 0, message: "No active subscribers to send to." }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    let sent = 0;
    let failed = 0;
    const errors: string[] = [];

    for (const recipient of recipients) {
      const unsubscribeUrl = `${siteUrl}/unsubscribe?token=${recipient.unsubscribe_token}`;
      const html = buildEmailHtml(intro, articles, siteUrl, unsubscribeUrl, imageSrcs);
      const raw = createRawEmail(recipient.email, sender, subject, html, inlineImages);

      try {
        const response = await fetch(`${GATEWAY_URL}/gmail/v1/users/me/messages/send`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${lovableApiKey}`,
            "X-Connection-Api-Key": googleMailApiKey,
          },
          body: JSON.stringify({ raw }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          failed++;
          errors.push(`Failed to send to ${recipient.email}: ${errorText}`);
          console.error(`Failed to send to ${recipient.email}: ${response.status} ${errorText}`);
        } else {
          sent++;
        }
      } catch (err) {
        failed++;
        errors.push(`Exception sending to ${recipient.email}: ${(err as Error).message}`);
        console.error(`Exception sending to ${recipient.email}:`, err);
      }
    }

    return new Response(
      JSON.stringify({ sent, failed, total: recipients.length, errors: errors.slice(0, 10) }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("send-newsletter error:", err);
    return new Response(JSON.stringify({ error: (err as Error).message || "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
