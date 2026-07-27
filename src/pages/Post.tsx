import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Loader2 } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Newsletter } from "@/components/Newsletter";
import { fetchPostBySlug, formatPostDate, estimateReadTime, type Post } from "@/lib/posts";
import NotFound from "./NotFound";

export default function PostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    setLoading(true);
    fetchPostBySlug(slug)
      .then((p) => {
        if (cancelled) return;
        if (!p) setNotFound(true);
        else setPost(p);
      })
      .catch(() => {
        if (!cancelled) setNotFound(true);
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="container py-32 flex justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (notFound || !post) return <NotFound />;

  return (
    <>
      <SEO
        title={post.title}
        description={post.summary || post.title}
        path={`/posts/${post.slug}`}
      />
      <article className="pt-12 pb-20">
        <div className="container max-w-3xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-smooth mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to blog
          </Link>

          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
            <span>{formatPostDate(post.publication_date)}</span>
            <span>·</span>
            <span>{estimateReadTime(post.content)}</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-semibold leading-tight mb-4">
            {post.title}
          </h1>
          {post.summary && (
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {post.summary}
            </p>
          )}
        </div>

        {post.featured_image && (
          <div className="container max-w-4xl mb-12">
            <div className="aspect-[16/9] overflow-hidden rounded-2xl bg-secondary">
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        <div className="container max-w-3xl">
          <div className="prose prose-lg max-w-none text-foreground/90
            prose-headings:font-display prose-headings:text-foreground
            prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:leading-relaxed prose-p:text-lg
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-foreground
            prose-ul:my-6 prose-li:my-2 prose-li:marker:text-primary
            prose-blockquote:border-l-primary prose-blockquote:italic
            prose-img:rounded-xl">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>
      </article>

      <Newsletter />
    </>
  );
}
