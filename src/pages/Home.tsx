import { Link } from "react-router-dom";
import { ArrowRight, Quote, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { Newsletter } from "@/components/Newsletter";
import { ArticleCard } from "@/components/ArticleCard";
import { articles } from "@/data/articles";
import heroImg from "@/assets/hero.jpg";

export default function Home() {
  const featured = articles.slice(0, 3);

  return (
    <>
      <SEO
        title="RightHer — Empowering Young Women to Find Their Voice"
        description="A student-led blog on educational equity, civic engagement, mental health awareness, and rights education for young women."
        path="/"
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-gradient">
        <div className="container py-16 md:py-28 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border text-xs font-medium text-primary shadow-soft">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              A student-led blog
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] mt-6 mb-6">
              Empowering young women to <span className="text-gradient italic">find their voice</span>.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mb-8">
              Essays, resources, and real conversations on educational equity, civic engagement,
              mental health, and the rights every young woman deserves to know.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="bg-primary-gradient text-primary-foreground hover:opacity-95 shadow-soft hover:shadow-elegant transition-smooth">
                <Link to="/blog">Read the blog <ArrowRight className="ml-1 w-4 h-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary/20 hover:bg-secondary">
                <Link to="/about">Meet the founder</Link>
              </Button>
            </div>
          </div>

          <div className="relative animate-fade-in">
            <div className="absolute -inset-6 bg-gold-gradient rounded-[2.5rem] blur-2xl opacity-30" aria-hidden />
            <img
              src={heroImg}
              alt="Young woman looking upward, surrounded by florals and golden light"
              width={1600}
              height={1200}
              className="relative rounded-[2rem] shadow-elegant w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="container py-20 md:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">Our Mission</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight mb-6">
            We believe every girl deserves to be informed, heard, and unafraid to lead.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            RightHer is a space for honest writing on the things that shape young women's lives —
            from the classroom to the ballot box to the bathroom. We pair lived experience with
            real research, so you can show up to your life with confidence.
          </p>
        </div>
      </section>

      {/* Featured Articles */}
      {featured.length > 0 && (
        <section className="container pb-20 md:pb-28">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Featured</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold">Latest essays</h2>
            </div>
            <Link to="/blog" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((a) => <ArticleCard key={a.slug} article={a} />)}
          </div>
        </section>
      )}


      {/* Quote */}
      <section className="container pb-20 md:pb-28">
        <figure className="relative max-w-4xl mx-auto rounded-3xl bg-soft-gradient border border-border p-10 md:p-16 text-center overflow-hidden">
          <Quote className="w-10 h-10 text-accent mx-auto mb-6" />
          <blockquote className="font-display text-3xl md:text-4xl leading-[1.25] font-medium italic text-foreground">
            "There is no force more powerful than a woman determined to rise."
          </blockquote>
          <figcaption className="mt-6 text-sm font-medium text-muted-foreground tracking-wide">
            — W.E.B. Du Bois
          </figcaption>
        </figure>
      </section>

      {/* Newsletter */}
      <section className="container pb-24">
        <Newsletter />
      </section>
    </>
  );
}
