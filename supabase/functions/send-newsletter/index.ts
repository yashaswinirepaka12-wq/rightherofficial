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

const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_mail";

function base64urlEncode(str: string): string {
  return btoa(str)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildEmailHtml(
  intro: string,
  articles: Article[],
  siteUrl: string,
  unsubscribeUrl: string,
): string {
  const articleCards = articles
    .map(
      (article) => `
        <div style="margin-bottom:32px;border-radius:12px;overflow:hidden;background:#f8fafc;border:1px solid #e2e8f0;">
          <img src="${article.image}" alt="${escapeHtml(article.title)}" style="width:100%;height:auto;display:block;" />
          <div style="padding:20px;">
            <p style="margin:0 0 8px;font-size:12px;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;color:#64748b;">${escapeHtml(article.category)}</p>
            <h2 style="margin:0 0 12px;font-size:20px;font-weight:600;color:#0f172a;">${escapeHtml(article.title)}</h2>
            <p style="margin:0 0 16px;font-size:15px;line-height:1.5;color:#334155;">${escapeHtml(article.excerpt)}</p>
            <a href="${siteUrl}/blog/${article.slug}" style="display:inline-block;padding:10px 18px;background:#0f172a;color:#ffffff;text-decoration:none;border-radius:8px;font-size:14px;font-weight:500;">Read on the blog</a>
          </div>
        </div>
      `,
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body style="margin:0;padding:0;background:#f1f5f9;font-family:Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td align="center" style="padding:40px 16px;">
            <table role="presentation" width="100%" max-width="600" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
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
                  <p style="margin:0 0 8px;font-size:13px;color:#64748b;">
                    RightHer — a student-led legal rights blog empowering young women to find their voice.
                  </p>
                  <p style="margin:0;font-size:12px;color:#94a3b8;">
                    <a href="${unsubscribeUrl}" style="color:#64748b;text-decoration:underline;">Unsubscribe</a>
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

function createRawEmail(
  to: string,
  from: string,
  subject: string,
  html: string,
): string {
  const email = [
    `To: ${to}`,
    `From: ${from}`,
    `Subject: ${subject}`,
    "Content-Type: text/html; charset=\"UTF-8\"",
    "MIME-Version: 1.0",
    "",
    html,
  ].join("\r\n");
  return base64urlEncode(email);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = (await req.json()) as RequestBody;
    const { adminPassword, intro, articles, testEmail } = body;

    if (!adminPassword || adminPassword !== Deno.env.get("NEWSLETTER_ADMIN_PASSWORD")) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
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
      return new Response(
        JSON.stringify({ error: "Email service is not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const siteUrl = Deno.env.get("SITE_URL") || "https://rightherofficial.lovable.app";
    const sender = Deno.env.get("NEWSLETTER_SENDER") || "RightHer <rightherofficial@gmail.com>";
    const subject = "The RightHer Letter — this month's digest";

    let recipients: { email: string; unsubscribe_token: string }[] = [];

    if (testEmail) {
      recipients = [{ email: testEmail, unsubscribe_token: "test-token" }];
    } else {
      const { data, error } = await supabase
        .from("subscribers")
        .select("email, unsubscribe_token")
        .eq("active", true);

      if (error) {
        throw error;
      }
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
      const html = buildEmailHtml(intro, articles, siteUrl, unsubscribeUrl);
      const raw = createRawEmail(recipient.email, sender, subject, html);

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
        errors.push(`Exception sending to ${recipient.email}: ${err.message}`);
        console.error(`Exception sending to ${recipient.email}:`, err);
      }
    }

    return new Response(
      JSON.stringify({ sent, failed, total: recipients.length, errors: errors.slice(0, 10) }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("send-newsletter error:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Internal error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
