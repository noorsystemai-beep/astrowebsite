import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { ServiceCard } from "@/components/ServiceCard";
import { SERVICES } from "@/lib/data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Astrology Services — Kundli, Tarot, Numerology | AstroAura" },
      {
        name: "description",
        content:
          "Explore AstroAura's astrology services: Kundli reading, tarot, career guidance, love astrology, marriage compatibility, numerology, palm reading and Vastu.",
      },
      { property: "og:title", content: "Astrology Services | AstroAura" },
      { property: "og:description", content: "Personalised astrology services for every facet of life." },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Offerings"
        title="Astrology Services"
        subtitle="Time-honoured practices and intuitive guidance, tailored to illuminate your unique path."
      />
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {SERVICES.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </section>
    </>
  );
}
