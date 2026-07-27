import { useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, Send, Lock, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

export default function AdminPanel() {
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"idle" | "publishing" | "done">("idle");
  const [lastSlug, setLastSlug] = useState<string | null>(null);

  const publish = async () => {
    if (!password) return toast.error("Please enter the admin password.");
    if (!title.trim()) return toast.error("Please enter a title.");
    if (!content.trim()) return toast.error("Please write some content.");

    setStatus("publishing");
    try {
      const { data, error } = await supabase.functions.invoke("publish-post", {
        body: {
          adminPassword: password,
          title: title.trim(),
          summary: summary.trim(),
          content: content.trim(),
          featuredImage: featuredImage.trim(),
        },
      });
      if (error) throw new Error(error.message || "Failed to publish");
      if (data?.error) throw new Error(data.error);

      toast.success("Post published!");
      setLastSlug(data.post.slug);
      setTitle("");
      setSummary("");
      setFeaturedImage("");
      setContent("");
      setStatus("done");
    } catch (err) {
      setStatus("idle");
      toast.error("Failed to publish", {
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
        <div className="container py-16 md:py-20 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
            Admin
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">
            Publish a new post
          </h1>
          <p className="text-muted-foreground">
            Compose a blog post and save it directly to the site.
          </p>
        </div>
      </section>

      <section className="container py-12 md:py-16 max-w-3xl space-y-8">
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
            <Label htmlFor="content">Content (Markdown supported)</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={"Write your post here.\n\nUse ## for headings, **bold**, *italics*, and blank lines for paragraphs."}
              className="mt-2 font-mono text-sm leading-relaxed"
              rows={18}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Button
            size="lg"
            onClick={publish}
            disabled={status === "publishing"}
            className="bg-primary-gradient text-primary-foreground hover:opacity-95 shadow-soft hover:shadow-elegant transition-smooth"
          >
            {status === "publishing" ? (
              <>
                <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Publishing
              </>
            ) : (
              <>
                <Send className="mr-2 w-4 h-4" /> Publish
              </>
            )}
          </Button>

          {lastSlug && (
            <Link
              to={`/posts/${lastSlug}`}
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              View published post <ArrowUpRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </section>
    </>
  );
}
