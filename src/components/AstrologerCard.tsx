import { Link } from "@tanstack/react-router";
import { MessageCircle, Globe, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RatingStars } from "@/components/RatingStars";
import type { Astrologer } from "@/lib/data";

export function AstrologerCard({ astrologer }: { astrologer: Astrologer }) {
  return (
    <div className="group glass overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1.5 hover:glow">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={astrologer.image}
          alt={astrologer.name}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-card to-transparent" />
        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-background/70 px-2.5 py-1 text-xs font-semibold backdrop-blur">
          ⭐ {astrologer.rating}
        </span>
      </div>
      <div className="space-y-3 p-5">
        <div>
          <h3 className="text-lg font-semibold">{astrologer.name}</h3>
          <p className="text-sm text-gold">{astrologer.specialization}</p>
        </div>
        <ul className="space-y-1.5 text-sm text-muted-foreground">
          <li className="flex items-center gap-2"><Award className="h-4 w-4 text-gold" /> {astrologer.experience}+ years experience</li>
          <li className="flex items-center gap-2"><Globe className="h-4 w-4 text-gold" /> {astrologer.languages.join(", ")}</li>
        </ul>
        <RatingStars rating={astrologer.rating} />
        <div className="flex items-center justify-between pt-1">
          <span className="text-sm text-muted-foreground">
            <span className="text-gradient-gold text-lg font-bold">₹{astrologer.price}</span>/session
          </span>
        </div>
        <div className="flex gap-2 pt-1">
          <Button variant="outline" size="sm" className="flex-1">
            <MessageCircle className="h-4 w-4" /> Chat Now
          </Button>
          <Button variant="gold" size="sm" className="flex-1" asChild>
            <Link to="/booking">Book Session</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
