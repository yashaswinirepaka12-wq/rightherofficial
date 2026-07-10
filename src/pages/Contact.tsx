import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail, Instagram, MessageCircle, Send } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent — thank you!", {
      description: "We'll get back to you within a few days.",
    });
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      <SEO
        title="Contact"
        description="Get in touch with RightHer — for collaborations, pitches, speaking requests, or just to say hi."
        path="/contact"
      />

      <section className="bg-hero-gradient border-b border-border/60">
        <div className="container py-20 md:py-24 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Contact</p>
          <h1 className="font-display text-5xl md:text-6xl font-semibold mb-4">Let's talk.</h1>
          <p className="text-lg text-muted-foreground">
            Got a story idea, a collaboration, a speaking request, or just want to say hi?
            The inbox is open.
          </p>
        </div>
      </section>

      <section className="container py-16 md:py-20 grid lg:grid-cols-5 gap-12 lg:gap-16">
        <form onSubmit={submit} className="lg:col-span-3 space-y-5 rounded-3xl bg-card border border-border p-8 md:p-10 shadow-soft">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-2" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-2" />
            </div>
          </div>
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="mt-2" />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" required rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="mt-2 resize-none" />
          </div>
          <Button type="submit" size="lg" className="bg-primary-gradient text-primary-foreground hover:opacity-95 shadow-soft hover:shadow-elegant transition-smooth">
            Send message <Send className="ml-1 w-4 h-4" />
          </Button>
        </form>

        <aside className="lg:col-span-2 space-y-4">
          <a href="mailto:rightherofficial@gmail.com" className="flex items-start gap-4 p-6 rounded-2xl bg-soft-gradient border border-border hover:shadow-soft transition-smooth">
            <div className="w-10 h-10 rounded-full bg-card grid place-items-center text-primary shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <p className="font-display text-lg font-semibold">Email</p>
              <p className="text-sm text-muted-foreground">rightherofficial@gmail.com</p>
            </div>
          </a>
          <a href="#" className="flex items-start gap-4 p-6 rounded-2xl bg-soft-gradient border border-border hover:shadow-soft transition-smooth">
            <div className="w-10 h-10 rounded-full bg-card grid place-items-center text-primary shrink-0">
              <Instagram className="w-4 h-4" />
            </div>
            <div>
              <p className="font-display text-lg font-semibold">Instagram</p>
              <p className="text-sm text-muted-foreground">@rightherofficial</p>
            </div>
          </a>
          <a href="#" className="flex items-start gap-4 p-6 rounded-2xl bg-soft-gradient border border-border hover:shadow-soft transition-smooth">
            <div className="w-10 h-10 rounded-full bg-card grid place-items-center text-primary shrink-0">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <p className="font-display text-lg font-semibold">Speaking & Press</p>
              <p className="text-sm text-muted-foreground">Use the form — note "press" in the subject.</p>
            </div>
          </a>
        </aside>
      </section>
    </>
  );
}
