import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { AstrologerCard } from "@/components/AstrologerCard";
import { ASTROLOGERS } from "@/lib/data";

export const Route = createFileRoute("/astrologers")({
  head: () => ({
    meta: [
      { title: "Expert Astrologers — Book a Reading | AstroAura" },
      {
        name: "description",
        content:
          "Meet AstroAura's verified astrologers specialising in Vedic astrology, tarot, numerology and relationship guidance. Chat now or book a session.",
      },
      { property: "og:title", content: "Expert Astrologers | AstroAura" },
      { property: "og:description", content: "Verified masters of astrology, tarot and numerology." },
    ],
    links: [{ rel: "canonical", href: "/astrologers" }],
  }),
  component: AstrologersPage,
});

function AstrologersPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Guides"
        title="Our Astrologers"
        subtitle="Connect with trusted, experienced practitioners ready to decode the stars for you."
      />
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {ASTROLOGERS.map((a) => (
            <AstrologerCard key={a.name} astrologer={a} />
          ))}
        </div>
      </section>
    </>
  );
}
