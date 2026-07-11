import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Loader2, Send, Eye, MailCheck, AlertCircle } from "lucide-react";
import { articles } from "@/data/articles";
import { supabase } from "@/integrations/supabase/client";

export default function AdminNewsletter() {
  const [password, setPassword] = useState("");
  const [intro, setIntro] = useState(
    "A monthly note with new essays, resources, and a little encouragement for the week ahead."
  );
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>(
    articles.slice(0, 3).map((a) => a.slug)
  );
  const [testMode, setTestMode] = useState(false);
  const [testEmail, setTestEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [result, setResult] = useState<{
    sent?: number;
    failed?: number;
    total?: number;
    error?: string;
  } | null>(null);

  const selectedArticles = articles.filter((a) => selectedSlugs.includes(a.slug));

  const toggleArticle = (slug: string) => {
    setSelectedSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const send = async () => {
    if (!password) {
      toast.error("Please enter the admin password.");
      return;
    }
    if (!intro.trim()) {
      toast.error("Please write an intro for the newsletter.");
      return;
    }
    if (selectedArticles.length === 0) {
      toast.error("Select at least one article to include.");
      return;
    }
    if (testMode && !testEmail) {
      toast.error("Please enter a test email address.");
      return;
    }

    setStatus("sending");
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke("send-newsletter", {
        body: {
          adminPassword: password,
          intro: intro.trim(),
          articles: selectedArticles.map((a) => ({
            slug: a.slug,
            title: a.title,
            excerpt: a.excerpt,
            image: a.image,
            category: a.category,
            date: a.date,
            readTime: a.readTime,
          })),
          testEmail: testMode ? testEmail : undefined,
        },
      });

      if (error) {
        const details = error instanceof Error ? error.message : JSON.stringify(error);
        throw new Error(details);
      }

      setResult(data);
      setStatus("done");
      toast.success(data.sent ? "Newsletter sent!" : "No emails sent.", {
        description: data.sent
          ? `${data.sent} sent, ${data.failed || 0} failed out of ${data.total}.`
          : data.message,
      });
    } catch (err: any) {
      setStatus("done");
      setResult({ error: err.message || "Failed to send newsletter" });
      toast.error("Failed to send newsletter", { description: err.message });
    }
  };

  return (
    <>
      <SEO
        title="Newsletter Admin"
        description="Compose and send the monthly RightHer newsletter."
        path="/admin/newsletter"
        noIndex
      />

      <section className="bg-hero-gradient border-b border-border/60">
        <div className="container py-16 md:py-20 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
            Admin
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">
            Send the RightHer Letter
          </h1>
          <p className="text-muted-foreground">
            Compose your monthly digest, choose which articles to include, and send it to active subscribers.
          </p>
        </div>
      </section>

      <section className="container py-12 md:py-16 max-w-3xl space-y-10">
        <div className="space-y-4 rounded-3xl bg-card border border-border p-8 shadow-soft">
          <div className="flex items-center gap-3">
            <MailCheck className="w-5 h-5 text-primary" />
            <h2 className="font-display text-xl font-semibold">1. Admin password</h2>
          </div>
          <div>
            <Label htmlFor="admin-password">Password</Label>
            <Input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter the newsletter admin password"
              className="mt-2"
            />
            <p className="mt-2 text-sm text-muted-foreground">
              This is set in your project's secrets as <code>NEWSLETTER_ADMIN_PASSWORD</code>.
            </p>
          </div>
        </div>

        <div className="space-y-4 rounded-3xl bg-card border border-border p-8 shadow-soft">
          <div className="flex items-center gap-3">
            <Eye className="w-5 h-5 text-primary" />
            <h2 className="font-display text-xl font-semibold">2. Intro message</h2>
          </div>
          <Textarea
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
            rows={4}
            className="resize-none"
          />
        </div>

        <div className="space-y-4 rounded-3xl bg-card border border-border p-8 shadow-soft">
          <div className="flex items-center gap-3">
            <MailCheck className="w-5 h-5 text-primary" />
            <h2 className="font-display text-xl font-semibold">3. Choose articles</h2>
          </div>
          <div className="grid gap-3">
            {articles.map((article) => (
              <label
                key={article.slug}
                className="flex items-start gap-3 p-4 rounded-xl border border-border hover:bg-secondary/40 transition-smooth cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedSlugs.includes(article.slug)}
                  onChange={() => toggleArticle(article.slug)}
                  className="mt-1 w-4 h-4 accent-primary"
                />
                <div className="flex-1">
                  <p className="font-medium text-foreground">{article.title}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-4 rounded-3xl bg-card border border-border p-8 shadow-soft">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-primary" />
            <h2 className="font-display text-xl font-semibold">4. Send options</h2>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="test-mode">Send a test email first</Label>
              <p className="text-sm text-muted-foreground">
                Send to one address before sending to all subscribers.
              </p>
            </div>
            <Switch id="test-mode" checked={testMode} onCheckedChange={setTestMode} />
          </div>
          {testMode && (
            <div>
              <Label htmlFor="test-email">Test email address</Label>
              <Input
                id="test-email"
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-2"
              />
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <Button
            size="lg"
            onClick={send}
            disabled={status === "sending"}
            className="bg-primary-gradient text-primary-foreground hover:opacity-95 shadow-soft hover:shadow-elegant transition-smooth"
          >
            {status === "sending" ? (
              <>
                <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Sending
              </>
            ) : (
              <>
                <Send className="mr-2 w-4 h-4" />
                {testMode ? "Send test email" : "Send to all subscribers"}
              </>
            )}
          </Button>
          {status === "done" && result && !result.error && (
            <p className="text-sm text-muted-foreground">
              {result.sent} sent, {result.failed} failed ({result.total} total)
            </p>
          )}
        </div>

        {status === "done" && result?.error && (
          <div className="rounded-2xl bg-red-50 border border-red-100 p-6 text-red-700">
            <p className="font-medium">Error</p>
            <p className="text-sm">{result.error}</p>
          </div>
        )}
      </section>
    </>
  );
}
