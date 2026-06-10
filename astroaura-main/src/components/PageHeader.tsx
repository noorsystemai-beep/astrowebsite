import { StarField } from "@/components/StarField";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-cosmic">
      <StarField count={30} />
      <div className="relative mx-auto max-w-4xl px-4 py-20 text-center md:py-28">
        {eyebrow && (
          <span className="text-gradient-gold text-sm font-semibold uppercase tracking-[0.25em]">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-3 text-4xl font-bold md:text-6xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-5 max-w-2xl text-lg text-foreground/80">{subtitle}</p>}
      </div>
    </section>
  );
}
