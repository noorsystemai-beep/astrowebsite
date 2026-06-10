export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""} mb-12`}>
      {eyebrow && (
        <span className="text-gradient-gold text-sm font-semibold uppercase tracking-[0.25em]">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-3 text-4xl font-bold md:text-5xl">{title}</h2>
      {subtitle && <p className="mt-4 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
