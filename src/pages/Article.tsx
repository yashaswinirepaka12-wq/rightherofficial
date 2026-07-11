import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { articles } from "@/data/articles";
import { SEO } from "@/components/SEO";
import { Newsletter } from "@/components/Newsletter";
import { ArticleCard } from "@/components/ArticleCard";
import NotFound from "./NotFound";

export default function Article() {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);

  if (!article) return <NotFound />;

  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <SEO
        title={article.title}
        description={article.excerpt}
        path={`/blog/${article.slug}`}
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
            <span className="px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground font-medium">
              {article.category}
            </span>
            <span>{article.date}</span>
            <span>·</span>
            <span>{article.readTime}</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-semibold leading-tight mb-4">
            {article.title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            {article.excerpt}
          </p>
          {article.author && (
            <p className="text-sm text-muted-foreground mb-8">
              By <span className="text-foreground font-medium">{article.author}</span>
            </p>
          )}
        </div>

        <div className="container max-w-4xl mb-12">
          <div className="aspect-[16/9] overflow-hidden rounded-2xl bg-secondary">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="container max-w-3xl">
          <div className="space-y-6 text-lg leading-relaxed text-foreground/90">
            {article.content.map((block, i) => {
              if (block.type === "h2") {
                return (
                  <h2
                    key={i}
                    className="font-display text-2xl md:text-3xl font-semibold text-foreground pt-4"
                  >
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "ul") {
                return (
                  <ul key={i} className="list-disc pl-6 space-y-3 marker:text-primary">
                    {block.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                );
              }
              if (block.type === "sources") {
                return (
                  <div key={i} className="pt-6 mt-4 border-t border-border">
                    <h3 className="font-display text-xl font-semibold mb-4">Sources</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {block.items.map((item, j) => {
                        const [label, urlPart] = item.split(" — ");
                        const url = urlPart?.trim();
                        const href = url && !/^https?:\/\//i.test(url) ? `https://${url}` : url;
                        return (
                          <li key={j}>
                            {href ? (
                              <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-primary underline underline-offset-2"
                              >
                                {label?.trim() || item}
                              </a>
                            ) : (
                              item
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              }
              return <p key={i}>{block.text}</p>;
            })}
          </div>


          <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-border">
            {article.tags.map((t) => (
              <span
                key={t}
                className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground"
              >
                #{t.replace(/\s/g, "")}
              </span>
            ))}
          </div>
        </div>
      </article>

      <section className="py-16 bg-secondary/30 border-t border-border">
        <div className="container">
          <h2 className="font-display text-3xl font-semibold mb-8">Keep reading</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
