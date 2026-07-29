import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { token } = await req.json();
    if (typeof token !== "string" || token.length < 8 || token.length > 128 || !/^[A-Za-z0-9-]+$/.test(token)) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid token" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { autoRefreshToken: false, persistSession: false } },
    );

    const { data, error } = await supabase
      .from("subscribers")
      .update({ active: false })
      .eq("unsubscribe_token", token)
      .select("id");

    if (error) {
      console.error("unsubscribe error:", error);
      return new Response(
        JSON.stringify({ success: false, error: "Internal error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const success = Array.isArray(data) && data.length > 0;
    return new Response(
      JSON.stringify({ success }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("unsubscribe exception:", err);
    return new Response(
      JSON.stringify({ success: false, error: "Bad request" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
