import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Mail, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function Unsubscribe() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error" | "missing">("loading");

  useEffect(() => {
    if (!token) {
      setStatus("missing");
      return;
    }

    const run = async () => {
      try {
        const { data, error } = await supabase.rpc("unsubscribe_by_token", {
          p_token: token,
        });
        if (error || !data) {
          setStatus("error");
        } else {
          setStatus("success");
        }
      } catch {
        setStatus("error");
      }
    };

    run();
  }, [token]);

  return (
    <>
      <SEO
        title="Unsubscribe"
        description="Unsubscribe from The RightHer Letter."
        path="/unsubscribe"
        noIndex
      />
      <section className="container py-24 md:py-32 max-w-xl text-center">
        <div className="w-16 h-16 rounded-full bg-secondary grid place-items-center mx-auto mb-6">
          <Mail className="w-7 h-7 text-primary" />
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-semibold mb-4">
          The RightHer Letter
        </h1>

        {status === "loading" && (
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            <p>Processing your request...</p>
          </div>
        )}

        {status === "success" && (
          <div className="rounded-2xl bg-green-50 border border-green-100 p-8">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <p className="text-lg font-medium text-green-800">You've been unsubscribed.</p>
            <p className="text-sm text-green-700 mt-1">
              We're sorry to see you go. You can always resubscribe from the blog.
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="rounded-2xl bg-red-50 border border-red-100 p-8">
            <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-3" />
            <p className="text-lg font-medium text-red-800">We couldn't process that link.</p>
            <p className="text-sm text-red-700 mt-1">
              The unsubscribe link may be expired or invalid. Please contact us directly.
            </p>
          </div>
        )}

        {status === "missing" && (
          <div className="rounded-2xl bg-secondary border border-border p-8">
            <AlertCircle className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-lg font-medium">Missing unsubscribe link</p>
            <p className="text-sm text-muted-foreground mt-1">
              Please use the link from your email.
            </p>
          </div>
        )}

        <Button variant="outline" className="mt-8" asChild>
          <a href="/">Back to RightHer</a>
        </Button>
      </section>
    </>
  );
}
