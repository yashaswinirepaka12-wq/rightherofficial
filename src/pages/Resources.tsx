import { SEO } from "@/components/SEO";
import { Heart, Vote, BookOpen, GraduationCap, Lightbulb, ExternalLink } from "lucide-react";

const sections = [
  {
    icon: Heart,
    title: "Mental Health Support",
    blurb: "If you're struggling, you're not alone, and help is closer than you think.",
    items: [
      { name: "988 Suicide & Crisis Lifeline", desc: "Free, confidential support, 24/7. Call or text 988.", url: "https://988lifeline.org" },
      { name: "Crisis Text Line", desc: "Text HOME to 741741 for free crisis support.", url: "https://www.crisistextline.org" },
      { name: "The Jed Foundation", desc: "Mental-health resources designed for teens and young adults.", url: "https://jedfoundation.org" },
    ],
  },
  {
    icon: Vote,
    title: "Civic Education & Voting",
    blurb: "Know your rights, register early, and bring a friend!",
    items: [
      { name: "Vote.org", desc: "Register to vote, check your status, and find your polling place.", url: "https://vote.org" },
      { name: "iCivics", desc: "Interactive civic education built by Justice Sandra Day O'Connor.", url: "https://www.icivics.org" },
      { name: "When We All Vote", desc: "Nonpartisan org closing the race and age voting gap.", url: "https://whenweallvote.org" },
    ],
  },
  {
    icon: GraduationCap,
    title: "Scholarships",
    blurb: "Money for school exists. These databases help you find it.",
    items: [
      { name: "Fastweb", desc: "Personalized scholarship matching for students of all ages.", url: "https://www.fastweb.com" },
      { name: "Scholarships.com", desc: "Free scholarship search engine with 3.7M+ awards.", url: "https://www.scholarships.com" },
      { name: "Bold.org", desc: "Vetted scholarships, including many for young women and first-gen students.", url: "https://bold.org" },
    ],
  },
  {
    icon: BookOpen,
    title: "Educational Opportunities",
    blurb: "Summer programs, fellowships, and free learning for the curious.",
    items: [
      { name: "Khan Academy", desc: "Free world-class courses, SAT prep, and AP review.", url: "https://www.khanacademy.org" },
      { name: "Girls Who Code", desc: "Programs that close the gender gap in computer science.", url: "https://girlswhocode.com" },
      { name: "Coursera for Campus", desc: "University-level courses, many free to audit.", url: "https://www.coursera.org" },
    ],
  },
  {
    icon: Lightbulb,
    title: "Know Your Rights",
    blurb: "Rights you have at school, at work, and at the doctor's office.",
    items: [
      { name: "ACLU Know Your Rights", desc: "Plain-language guides for students, protestors, and more.", url: "https://www.aclu.org/know-your-rights" },
      { name: "Title IX Info", desc: "Your protections from sex discrimination in education.", url: "https://www.ed.gov/laws-and-policy/civil-rights-laws/title-ix" },
      { name: "Period Equity", desc: "Advocacy and information on menstrual equity laws.", url: "https://www.periodequity.org" },
    ],
  },
];

export default function Resources() {
  return (
    <>
      <SEO
        title="Resources"
        description="Curated resources on mental health, civic education, voting, scholarships, and educational opportunities for young women."
        path="/resources"
      />

      <section className="bg-soft-gradient border-b border-border/60">
        <div className="container py-20 md:py-24 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Resources</p>
          <h1 className="font-display text-5xl md:text-6xl font-semibold mb-4">Help, hand-picked.</h1>
          <p className="text-lg text-muted-foreground">
            A working list of the organizations, hotlines, and tools we trust, for the moments
            you need information fast or support that actually shows up.
          </p>
        </div>
      </section>

      <section className="container py-16 md:py-20 space-y-16">
        {sections.map((s) => (
          <div key={s.title}>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary-gradient text-primary-foreground grid place-items-center shadow-soft shrink-0">
                <s.icon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display text-3xl font-semibold">{s.title}</h2>
                <p className="text-muted-foreground mt-1">{s.blurb}</p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {s.items.map((it) => (
                <a
                  key={it.name}
                  href={it.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl bg-card border border-border p-6 hover:border-primary/40 hover:shadow-soft transition-smooth"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-display text-xl font-semibold group-hover:text-primary transition-smooth">
                      {it.name}
                    </h3>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-smooth shrink-0 mt-1" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
                </a>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="container pb-24">
        <div className="rounded-3xl bg-secondary/60 border border-border p-8 md:p-10 text-center">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">In a crisis right now?</strong> Call or text 988 (US) for free, confidential support, 24/7.
            If you or someone you know is in immediate danger, call 911.
          </p>
        </div>
      </section>
    </>
  );
}
