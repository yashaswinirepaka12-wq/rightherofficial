import { Outlet, Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X, Instagram, Mail, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
  { to: "/resources", label: "Resources" },
  { to: "/contact", label: "Contact" },
];

export function Layout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    setOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/60">
        <div className="container flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="grid place-items-center w-9 h-9 rounded-full bg-primary-gradient text-primary-foreground shadow-soft">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="font-display text-2xl font-semibold tracking-tight">
              Right<span className="text-gradient">Her</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "px-4 py-2 text-sm font-medium rounded-full transition-smooth",
                    isActive
                      ? "text-primary bg-secondary"
                      : "text-foreground/70 hover:text-primary hover:bg-secondary/60"
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <Link
            to="/blog"
            className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full bg-primary-gradient text-primary-foreground text-sm font-medium shadow-soft hover:shadow-elegant transition-smooth"
          >
            Read the Blog
          </Link>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-full hover:bg-secondary"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-border/60 bg-background animate-fade-in">
            <nav className="container py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    cn(
                      "px-4 py-3 rounded-lg text-sm font-medium",
                      isActive ? "bg-secondary text-primary" : "text-foreground/80"
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="mt-24 border-t border-border/60 bg-soft-gradient">
        <div className="container py-14 grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="grid place-items-center w-8 h-8 rounded-full bg-primary-gradient text-primary-foreground">
                <Sparkles className="w-3.5 h-3.5" />
              </span>
              <span className="font-display text-xl font-semibold">RightHer</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              A student-led blog empowering young women to find their voice — and use it.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase text-primary mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              {navItems.map((i) => (
                <li key={i.to}>
                  <Link to={i.to} className="text-foreground/70 hover:text-primary transition-smooth">
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase text-primary mb-4">Connect</h4>
            <div className="flex gap-3">
              <a href="#" aria-label="Instagram" className="w-10 h-10 grid place-items-center rounded-full border border-border hover:bg-secondary transition-smooth">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="mailto:hello@righther.org" aria-label="Email" className="w-10 h-10 grid place-items-center rounded-full border border-border hover:bg-secondary transition-smooth">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-border/60">
          <div className="container py-6 text-xs text-muted-foreground flex flex-col sm:flex-row justify-between gap-2">
            <p>© {new Date().getFullYear()} RightHer. Written with conviction.</p>
            <p className="italic">Empowering young women to find their voice.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
