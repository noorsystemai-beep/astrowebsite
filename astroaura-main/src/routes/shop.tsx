import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/data";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Spiritual Shop — Gemstones, Malas & Yantras | AstroAura" },
      {
        name: "description",
        content:
          "Shop energised spiritual products at AstroAura: Rudraksha mala, blue sapphire, evil eye bracelet, wealth yantra, healing crystals and zodiac pendants.",
      },
      { property: "og:title", content: "Spiritual Shop | AstroAura" },
      { property: "og:description", content: "Authentic, energised gemstones and spiritual products." },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
  component: ShopPage,
});

function ShopPage() {
  return (
    <>
      <PageHeader
        eyebrow="Sacred Store"
        title="Spiritual Shop"
        subtitle="Lab-certified gemstones and hand-energised products to elevate your spiritual practice."
      />
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
