import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Sparkles, Star, Quote, Moon } from "lucide-react";
import heroImg from "@/assets/hero-cosmos.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { StarField } from "@/components/StarField";
import { SectionHeading } from "@/components/SectionHeading";
import { Counter } from "@/components/Counter";
import { ServiceCard } from "@/components/ServiceCard";
import { AstrologerCard } from "@/components/AstrologerCard";
import { ProductCard } from "@/components/ProductCard";
import { RatingStars } from "@/components/RatingStars";
import {
  SERVICES,
  ASTROLOGERS,
  PRODUCTS,
  TESTIMONIALS,
  ZODIAC_SIGNS,
  HOROSCOPES,
  FAQS,
} from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AstroAura — Discover Your Destiny Through Ancient Astrology" },
      {
        name: "description",
        content:
          "Premium astrology, tarot, kundli readings and spiritual healing. Book trusted astrologers and shop energised spiritual products at AstroAura.",
      },
    ],
  }),
  component: Home,
});

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-gradient-gold text-4xl font-bold md:text-5xl">
        <Counter to={value} suffix={suffix} />
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

function Home() {
  const [sign, setSign] = useState("Aries");

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImg}
          alt="Cosmic night sky with crescent moon and golden constellations"
          width={1920}
          height={1080}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/70 via-background/60 to-background" />
        <StarField count={40} />
        <div className="mx-auto flex max-w-4xl flex-col items-center px-4 py-28 text-center md:py-40">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-background/40 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-gold backdrop-blur">
            <Sparkles className="h-4 w-4" /> Trusted by 50,000+ seekers
          </span>
          <h1 className="text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
            Discover Your Destiny Through{" "}
            <span className="text-gradient-gold">Ancient Astrology</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-foreground/80">
            Unlock the wisdom of the stars with personalised astrology guidance, intuitive readings
            and spiritual healing — illuminating your path to clarity, love and abundance.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button variant="gold" size="xl" asChild>
              <Link to="/booking">
                Book Consultation <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outlineGold" size="xl" asChild>
              <Link to="/services">Explore Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="glass -mt-16 grid grid-cols-2 gap-8 rounded-2xl p-8 md:grid-cols-4">
          <Stat value={50} suffix="K+" label="Happy Clients" />
          <Stat value={120} suffix="+" label="Expert Astrologers" />
          <Stat value={25} suffix="+" label="Years of Wisdom" />
          <Stat value={98} suffix="%" label="Satisfaction Rate" />
        </div>
      </section>

      {/* ZODIAC GRID */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:px-8">
        <SectionHeading
          eyebrow="The Twelve Signs"
          title="Find Your Zodiac"
          subtitle="Every star sign carries a unique cosmic blueprint. Explore the energy that shapes your journey."
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {ZODIAC_SIGNS.map((z) => (
            <div
              key={z.name}
              className="group glass flex flex-col items-center rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:glow"
            >
              <span className="text-5xl text-gold transition-transform duration-300 group-hover:scale-110">
                {z.symbol}
              </span>
              <h3 className="mt-3 text-lg font-semibold">{z.name}</h3>
              <p className="text-xs text-muted-foreground">{z.dates}</p>
              <span className="mt-2 rounded-full bg-secondary px-2.5 py-0.5 text-[11px] text-gold">
                {z.element}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-cosmic py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading
            eyebrow="What We Offer"
            title="Astrology Services"
            subtitle="From birth-chart analysis to spiritual remedies, our services guide every facet of your life."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.slice(0, 4).map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button variant="outlineGold" size="lg" asChild>
              <Link to="/services">View All Services <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* DAILY HOROSCOPE */}
      <section className="mx-auto max-w-5xl px-4 py-24 md:px-8">
        <SectionHeading
          eyebrow="Today's Cosmic Forecast"
          title="Daily Horoscope"
          subtitle="Select your sign for a glimpse of the energies guiding you today."
        />
        <div className="glass rounded-3xl p-8">
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            {ZODIAC_SIGNS.map((z) => (
              <button
                key={z.name}
                onClick={() => setSign(z.name)}
                className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                  sign === z.name
                    ? "bg-[image:var(--gradient-gold)] font-semibold text-gold-foreground"
                    : "bg-secondary text-foreground/80 hover:text-gold"
                }`}
              >
                {z.symbol} {z.name}
              </button>
            ))}
          </div>
          <div className="flex flex-col items-center gap-4 text-center">
            <Moon className="h-10 w-10 text-gold animate-float-slow" />
            <h3 className="text-2xl font-semibold">{sign}</h3>
            <p className="max-w-2xl text-lg text-foreground/85">{HOROSCOPES[sign]}</p>
            <Button variant="outlineGold" asChild>
              <Link to="/booking">Get Your Full Reading</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ASTROLOGERS */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <SectionHeading
          eyebrow="Meet The Experts"
          title="Featured Astrologers"
          subtitle="Hand-picked masters of Vedic, tarot and numerology traditions, ready to guide you."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ASTROLOGERS.map((a) => (
            <AstrologerCard key={a.name} astrologer={a} />
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="bg-cosmic py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading
            eyebrow="Sacred Store"
            title="Spiritual Products"
            subtitle="Energised gemstones, malas and yantras to amplify your intentions and protect your aura."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.slice(0, 3).map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button variant="outlineGold" size="lg" asChild>
              <Link to="/shop">Visit The Shop <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:px-8">
        <SectionHeading
          eyebrow="Voices Of Trust"
          title="What Seekers Say"
          subtitle="Real stories from souls who found clarity and direction with AstroAura."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="glass rounded-2xl p-6">
              <Quote className="h-8 w-8 text-gold/50" />
              <p className="mt-3 text-sm text-foreground/85">"{t.text}"</p>
              <RatingStars rating={t.rating} className="mt-4" />
              <div className="mt-3">
                <p className="font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-12 md:px-8">
        <SectionHeading eyebrow="Questions" title="Frequently Asked" />
        <Accordion type="single" collapsible className="space-y-3">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="glass rounded-xl border-0 px-5">
              <AccordionTrigger className="text-left text-base hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* NEWSLETTER */}
      <section className="mx-auto max-w-5xl px-4 py-24 md:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-cosmic p-10 text-center md:p-16">
          <StarField count={30} />
          <div className="relative">
            <Star className="mx-auto h-10 w-10 text-gold" />
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">Begin Your Cosmic Journey</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Subscribe for weekly horoscopes, exclusive remedies and spiritual insights delivered
              straight to your inbox.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <Input type="email" required placeholder="Your email address" aria-label="Email" className="h-12" />
              <Button type="submit" variant="gold" size="lg">Subscribe</Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
