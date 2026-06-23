import { SEO } from "@/components/SEO";
import { Newsletter } from "@/components/Newsletter";
import { Mic, Heart, Users, Vote } from "lucide-react";

const values = [
  { icon: Vote, title: "Civic Engagement", text: "Believing that showing up — locally, loudly, often — is how change actually happens." },
  { icon: Mic, title: "Public Speaking", text: "Helping girls own the mic, whether it's a classroom, a podium, or a courtroom." },
  { icon: Users, title: "Community Service", text: "Service grounded in listening first, leading second, and giving credit always." },
  { icon: Heart, title: "Feeling Heard", text: "Creating space for girls whose voices haven't always been at the center." },
];

export default function About() {
  return (
    <>
      <SEO
        title="About"
        description="The story behind RightHer — a student leader's mission to help young women find their voice through writing, advocacy, and service."
        path="/about"
      />

      <section className="bg-hero-gradient border-b border-border/60">
        <div className="container py-20 md:py-28 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">About</p>
          <h1 className="font-display text-5xl md:text-6xl font-semibold leading-[1.05] mb-6">
            Started by a girl who refused to be talked over.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            RightHer began as a notebook full of questions: Why don't we learn about menstrual
            equity in health class? Why are girls expected to lead quietly? Why does civic
            education stop at the textbook? It grew into a blog because those questions deserved
            an answer — and an audience.
          </p>
        </div>
      </section>

      <section className="container py-20 md:py-24">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          <div className="lg:col-span-3">
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6">The founder's story.</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-5">
              <p>
                I'm a high school student, a debater, a volunteer, and someone who has spent a
                lot of time in rooms where girls my age weren't being asked what they thought.
                So I started asking — first my friends, then my classmates, then anyone who
                would listen.
              </p>
              <p>{"\n"}</p>
              <p>
                I founded RightHer to educate young women on their rights so they can thrive in
                any atmosphere. This initiative helps build confidence because every girl
                deserves to be seen and heard. This blog combines my love of writing and
                ambition to advocate for a voice for young women!
              </p>
            </div>
          </div>

          <aside className="lg:col-span-2">
            <div className="rounded-3xl bg-soft-gradient border border-border p-8 shadow-soft sticky top-28">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">In numbers</p>
              <ul className="space-y-5">
                {[
                  ["4+", "years of advocacy work"],
                  ["100+", "girls mentored"],
                  ["12", "community partnerships"],
                  ["1", "very loud notebook"],
                ].map(([n, l]) => (
                  <li key={l} className="flex items-baseline gap-4">
                    <span className="font-display text-4xl font-semibold text-gradient">{n}</span>
                    <span className="text-sm text-muted-foreground">{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="container pb-20">
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-10 text-center">What I care about.</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl bg-card border border-border p-6 hover:shadow-soft transition-smooth">
              <div className="w-10 h-10 rounded-full bg-secondary grid place-items-center text-primary mb-4">
                <v.icon className="w-5 h-5" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container pb-24">
        <Newsletter />
      </section>
    </>
  );
}
