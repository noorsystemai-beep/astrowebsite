import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { BLOG_POSTS } from "@/lib/data";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Astrology Blog — Horoscopes & Spiritual Guides | AstroAura" },
      {
        name: "description",
        content:
          "Read AstroAura's blog: weekly horoscopes, zodiac compatibility guides, spiritual healing tips and powerful astrology remedies.",
      },
      { property: "og:title", content: "Astrology Blog | AstroAura" },
      { property: "og:description", content: "Horoscopes, compatibility, healing and remedies." },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

const CATEGORIES = ["All", "Horoscope", "Compatibility", "Healing", "Remedies"];

function BlogPage() {
  const [cat, setCat] = useState("All");
  const posts = cat === "All" ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.category === cat);

  return (
    <>
      <PageHeader
        eyebrow="Cosmic Journal"
        title="Astrology Blog"
        subtitle="Insights, guides and rituals to deepen your spiritual journey through the stars."
      />
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${
                cat === c
                  ? "bg-[image:var(--gradient-gold)] font-semibold text-gold-foreground"
                  : "bg-secondary text-foreground/80 hover:text-gold"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group glass flex flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:glow"
            >
              <span className="self-start rounded-full bg-secondary px-3 py-1 text-xs font-medium text-gold">
                {post.category}
              </span>
              <h2 className="mt-4 text-xl font-semibold transition-colors group-hover:text-gold">
                {post.title}
              </h2>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
              <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {post.date}</span>
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {post.readTime}</span>
              </div>
              <Link to="/blog" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-gold">
                Read more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
