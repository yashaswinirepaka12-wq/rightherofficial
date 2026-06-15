import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { SEO } from "@/components/SEO";
import { ArticleCard } from "@/components/ArticleCard";
import { Input } from "@/components/ui/input";
import { articles, categories } from "@/data/articles";
import { cn } from "@/lib/utils";

export default function Blog() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string>("All");

  const featured = articles.find((a) => a.featured) ?? articles[0];

  const filtered = useMemo(() => {
    return articles
      .filter((a) => a.slug !== featured.slug)
      .filter((a) => cat === "All" || a.category === cat)
      .filter((a) =>
        query.trim() === ""
          ? true
          : (a.title + a.excerpt + a.tags.join(" ")).toLowerCase().includes(query.toLowerCase())
      );
  }, [query, cat, featured.slug]);

  return (
    <>
      <SEO
        title="Blog"
        description="Essays from RightHer on educational equity, mental health, civic engagement, women's rights, and leadership."
        path="/blog"
      />

      <section className="bg-soft-gradient border-b border-border/60">
        <div className="container py-16 md:py-20 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">The Blog</p>
          <h1 className="font-display text-5xl md:text-6xl font-semibold mb-4">Words worth reading.</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Essays on the things shaping young women's lives — written for the girls who are ready to think out loud.
          </p>
        </div>
      </section>

      {/* Featured */}
      <section className="container py-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">Featured</p>
        <article className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center rounded-3xl overflow-hidden bg-card border border-border shadow-soft">
          <div className="aspect-[4/3] md:aspect-auto md:h-full overflow-hidden">
            <img
              src={featured.image}
              alt={featured.title}
              width={1200}
              height={800}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8 md:p-12">
            <span className="inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium mb-4">
              {featured.category}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold leading-tight mb-4">
              {featured.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">{featured.excerpt}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{featured.date}</span>
              <span>·</span>
              <span>{featured.readTime}</span>
            </div>
          </div>
        </article>
      </section>

      {/* Filters */}
      <section className="container pb-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
          <div className="relative md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search articles…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 h-11 rounded-full bg-card"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {["All", ...categories].map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-smooth border",
                  cat === c
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-foreground/70 border-border hover:border-primary/40 hover:text-primary"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles grid */}
      <section className="container pb-24">
        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">No articles found. Try a different search.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((a) => <ArticleCard key={a.slug} article={a} />)}
          </div>
        )}
      </section>
    </>
  );
}
