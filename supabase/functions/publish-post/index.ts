import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface RequestBody {
  adminPassword: string;
  title: string;
  summary?: string;
  content: string;
  featuredImage?: string;
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80) || "post";
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = (await req.json()) as RequestBody;
    const { adminPassword, title, summary, content, featuredImage } = body;

    if (!adminPassword || adminPassword !== Deno.env.get("NEWSLETTER_ADMIN_PASSWORD")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!title?.trim() || !content?.trim()) {
      return new Response(
        JSON.stringify({ error: "Title and content are required." }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { autoRefreshToken: false, persistSession: false } },
    );

    // Ensure unique slug
    const baseSlug = slugify(title);
    let slug = baseSlug;
    let n = 1;
    while (true) {
      const { data: existing } = await supabase
        .from("posts")
        .select("id")
        .eq("slug", slug)
        .maybeSingle();
      if (!existing) break;
      n += 1;
      slug = `${baseSlug}-${n}`;
      if (n > 50) break;
    }

    const { data, error } = await supabase
      .from("posts")
      .insert({
        title: title.trim(),
        summary: summary?.trim() || null,
        content: content.trim(),
        featured_image: featuredImage?.trim() || null,
        slug,
      })
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify({ post: data }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("publish-post error:", err);
    return new Response(
      JSON.stringify({ error: (err as Error).message || "Internal error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
