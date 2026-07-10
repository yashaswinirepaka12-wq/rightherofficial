import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Mail, Loader2, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Newsletter({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      setStatus("error");
      setErrorMsg("Please enter your email.");
      return;
    }
    if (!emailRegex.test(trimmed)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    const { error } = await supabase.from("subscribers").insert({ email: trimmed });

    if (error) {
      if (error.code === "23505") {
        setStatus("success");
        toast.success("You're already on the list.", {
          description: "We'll send the next RightHer Letter to your inbox.",
        });
      } else {
        setStatus("error");
        setErrorMsg("Something went wrong. Please try again.");
      }
      return;
    }

    setStatus("success");
    toast.success("You're in — welcome to RightHer.", {
      description: "Look out for our next letter in your inbox.",
    });
    setEmail("");
  };

  return (
    <section
      className={
        compact
          ? "rounded-2xl bg-secondary/60 border border-border p-6"
          : "relative overflow-hidden rounded-3xl bg-primary-gradient text-primary-foreground p-10 md:p-16 shadow-elegant"
      }
    >
      {!compact && (
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-accent/30 blur-3xl" aria-hidden />
      )}
      <div className="relative max-w-xl">
        <div className={compact ? "flex items-center gap-2 mb-2 text-primary" : "flex items-center gap-2 mb-3 text-accent"}>
          <Mail className="w-4 h-4" />
          <span className="text-xs font-semibold uppercase tracking-widest">The RightHer Letter</span>
        </div>
        <h3 className={compact ? "font-display text-2xl font-semibold mb-2" : "font-display text-3xl md:text-4xl font-semibold mb-3"}>
          Big ideas, sent softly.
        </h3>
        <p className={compact ? "text-sm text-muted-foreground mb-4" : "text-primary-foreground/80 mb-6"}>
          A monthly note with new essays, resources, and a little encouragement for the week ahead.
        </p>
        <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2">
          <Input
            type="email"
            required
            placeholder="your@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            disabled={status === "loading" || status === "success"}
            className={compact ? "bg-background" : "bg-background text-foreground border-0 h-12"}
            aria-invalid={status === "error"}
          />
          <Button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className={compact ? "" : "bg-accent text-accent-foreground hover:bg-accent/90 h-12 px-6 font-medium"}
          >
            {status === "loading" ? (
              <>
                <Loader2 className="mr-1 w-4 h-4 animate-spin" /> Joining
              </>
            ) : status === "success" ? (
              <>
                <CheckCircle className="mr-1 w-4 h-4" /> Subscribed
              </>
            ) : (
              "Subscribe"
            )}
          </Button>
        </form>
        {status === "error" && (
          <p className="mt-2 text-sm text-red-500">{errorMsg}</p>
        )}
        {status === "success" && (
          <p className="mt-2 text-sm text-green-600">Thanks for subscribing!</p>
        )}
      </div>
    </section>
  );
}
