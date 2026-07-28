import { useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, Send, Lock, ArrowUpRight, Save } from "lucide-react";
import { toast } from "sonner";
import MDEditor from "@uiw/react-md-editor";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";

export default function AdminPanel() {
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [content, setContent] = useState<string>("");
  const [published, setPublished] = useState(false);
  const [status, setStatus] = useState<"idle" | "saving">("idle");
  const [lastSlug, setLastSlug] = useState<string | null>(null);
  const [lastStatus, setLastStatus] = useState<"draft" | "published" | null>(null);

  const save = async () => {
    if (!password) return toast.error("Please enter the admin password.");
    if (!title.trim()) return toast.error("Please enter a title.");
    if (!content.trim()) return toast.error("Please write some content.");

    setStatus("saving");
    try {
      const { data, error } = await supabase.functions.invoke("publish-post", {
        body: {
          adminPassword: password,
          title: title.trim(),
          summary: summary.trim(),
          content: content.trim(),
          featuredImage: featuredImage.trim(),
          status: published ? "published" : "draft",
        },
      });
      if (error) throw new Error(error.message || "Failed to save");
      if (data?.error) throw new Error(data.error);

      toast.success(published ? "Post published!" : "Draft saved!");
      setLastSlug(data.post.slug);
      setLastStatus(published ? "published" : "draft");
      setTitle("");
      setSummary("");
      setFeaturedImage("");
      setContent("");
      setStatus("idle");
    } catch (err) {
      setStatus("idle");
      toast.error("Failed to save", {
        description: err instanceof Error ? err.message : String(err),
      });
    }
  };

  return (
    <>
      <SEO
        title="Admin Panel"
        description="RightHer admin — publish new blog posts."
        path="/admin-panel"
        noIndex
      />

      <section className="bg-hero-gradient border-b border-border/60">
        <div className="container py-16 md:py-20 max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
            Admin
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">
            Compose a post
          </h1>
          <p className="text-muted-foreground">
            Write in Markdown, save as a draft, or publish it live.
          </p>
        </div>
      </section>

      <section className="container py-12 md:py-16 max-w-4xl space-y-8">
        <div className="rounded-3xl bg-card border border-border p-8 shadow-soft space-y-4">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-primary" />
            <h2 className="font-display text-xl font-semibold">Admin password</h2>
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter the admin password"
              className="mt-2"
            />
          </div>
        </div>

        <div className="rounded-3xl bg-card border border-border p-8 shadow-soft space-y-6">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Your headline here"
              className="mt-2"
              maxLength={200}
            />
          </div>

          <div>
            <Label htmlFor="summary">Summary</Label>
            <Textarea
              id="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="A short preview that appears on cards and previews."
              className="mt-2 resize-none"
              rows={3}
              maxLength={400}
            />
          </div>

          <div>
            <Label htmlFor="image">Featured image URL</Label>
            <Input
              id="image"
              value={featuredImage}
              onChange={(e) => setFeaturedImage(e.target.value)}
              placeholder="https://…"
              className="mt-2"
            />
            {featuredImage && (
              <div className="mt-3 aspect-[16/9] overflow-hidden rounded-xl border border-border bg-secondary">
                <img
                  src={featuredImage}
                  alt="Featured preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            )}
          </div>

          <div>
            <Label>Content (Markdown)</Label>
            <div className="mt-2" data-color-mode="light">
              <MDEditor
                value={content}
                onChange={(v) => setContent(v ?? "")}
                height={480}
                preview="live"
                textareaProps={{
                  placeholder:
                    "Write your post here.\n\n## Use headings\n\n**Bold**, *italics*, - bullet lists, and [links](https://example.com).",
                }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Tip: use the toolbar or type Markdown directly. Live preview on the right.
            </p>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-border bg-secondary/40 p-4">
            <div>
              <p className="font-medium">
                {published ? "Publish immediately" : "Save as draft"}
              </p>
              <p className="text-sm text-muted-foreground">
                {published
                  ? "This post will be visible to all visitors."
                  : "Drafts are private — only saved to your database, not shown on the site."}
              </p>
            </div>
            <Switch checked={published} onCheckedChange={setPublished} />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Button
            size="lg"
            onClick={save}
            disabled={status === "saving"}
            className="bg-primary-gradient text-primary-foreground hover:opacity-95 shadow-soft hover:shadow-elegant transition-smooth"
          >
            {status === "saving" ? (
              <>
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                {published ? "Publishing" : "Saving draft"}
              </>
            ) : published ? (
              <>
                <Send className="mr-2 w-4 h-4" /> Publish
              </>
            ) : (
              <>
                <Save className="mr-2 w-4 h-4" /> Save draft
              </>
            )}
          </Button>

          {lastSlug && lastStatus === "published" && (
            <Link
              to={`/posts/${lastSlug}`}
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              View published post <ArrowUpRight className="w-4 h-4" />
            </Link>
          )}
          {lastSlug && lastStatus === "draft" && (
            <span className="text-sm text-muted-foreground">
              Draft saved (slug: <code className="font-mono">{lastSlug}</code>)
            </span>
          )}
        </div>
      </section>
    </>
  );
}
