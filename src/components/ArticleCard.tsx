import { Article } from "@/data/articles";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      to={`/blog/${article.slug}`}
      className="block group rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/30 hover:shadow-elegant transition-smooth"
    >
      <article>
        <div className="aspect-[16/10] overflow-hidden bg-secondary">
          <img
            src={article.image}
            alt={article.title}
            loading="lazy"
            width={1200}
            height={800}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
            <span className="px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground font-medium">
              {article.category}
            </span>
            <span>{article.readTime}</span>
          </div>
          <h3 className="font-display text-2xl font-semibold leading-snug mb-2 group-hover:text-primary transition-smooth">
            {article.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">{article.excerpt}</p>
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              {article.tags.slice(0, 2).map((t) => (
                <span key={t} className="text-[11px] text-muted-foreground">#{t.replace(/\s/g, "")}</span>
              ))}
            </div>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
              Read <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

