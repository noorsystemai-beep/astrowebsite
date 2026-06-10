import { Link } from "@tanstack/react-router";
import * as Icons from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Service } from "@/lib/data";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = (Icons[service.icon as keyof typeof Icons] ?? Icons.Sparkles) as Icons.LucideIcon;
  return (
    <div className="group glass relative flex flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:glow">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[image:var(--gradient-aura)] text-gold ring-1 ring-gold/30 transition-transform group-hover:scale-110">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="text-xl font-semibold">{service.title}</h3>
      <p className="mt-2 flex-1 text-sm text-muted-foreground">{service.description}</p>
      <div className="mt-5 flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          from <span className="text-gradient-gold text-lg font-bold">₹{service.price}</span>
        </span>
        <Button variant="outlineGold" size="sm" asChild>
          <Link to="/booking">Book Now</Link>
        </Button>
      </div>
    </div>
  );
}
