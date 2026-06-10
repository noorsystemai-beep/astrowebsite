import { Link } from "@tanstack/react-router";
import { Sparkles, Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const COLS = [
  {
    title: "Explore",
    links: [
      { to: "/services", label: "Services" },
      { to: "/astrologers", label: "Astrologers" },
      { to: "/shop", label: "Shop" },
      { to: "/blog", label: "Blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/booking", label: "Book a Session" },
      { to: "/contact", label: "Contact Us" },
      { to: "/blog", label: "Horoscopes" },
      { to: "/services", label: "Pricing" },
    ],
  },
] as const;

const SOCIALS = [
  { icon: Facebook, label: "Facebook" },
  { icon: Instagram, label: "Instagram" },
  { icon: Twitter, label: "Twitter" },
  { icon: Youtube, label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border bg-cosmic">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-2 md:px-8 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-gold" />
            <span className="text-2xl font-bold">
              Astro<span className="text-gradient-gold">Aura</span>
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Illuminating life paths through ancient astrology, spiritual healing and trusted cosmic
            guidance for the modern seeker.
          </p>
          <div className="mt-6 flex gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground/80 transition-all hover:border-gold hover:text-gold"
              >
                <s.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        {COLS.map((col) => (
          <div key={col.title}>
            <h4 className="mb-4 text-lg font-semibold">{col.title}</h4>
            <ul className="space-y-2 text-sm">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-muted-foreground transition-colors hover:text-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="mb-4 text-lg font-semibold">Stay Aligned</h4>
          <p className="mb-3 text-sm text-muted-foreground">Get weekly horoscopes in your inbox.</p>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <Input type="email" placeholder="Email" required aria-label="Email" />
            <Button type="submit" variant="gold">Join</Button>
          </form>
          <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-gold" /> hello@astroaura.com</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-gold" /> +1 555 123 4567</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gold" /> Cosmic Lane, Earth</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} AstroAura. Crafted under the stars. All rights reserved.
      </div>
    </footer>
  );
}
