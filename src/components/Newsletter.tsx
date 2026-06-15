import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Mail } from "lucide-react";

export function Newsletter({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
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
            onChange={(e) => setEmail(e.target.value)}
            className={compact ? "bg-background" : "bg-background text-foreground border-0 h-12"}
          />
          <Button
            type="submit"
            className={compact ? "" : "bg-accent text-accent-foreground hover:bg-accent/90 h-12 px-6 font-medium"}
          >
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}
