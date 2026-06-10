import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RatingStars } from "@/components/RatingStars";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/data";

export function ProductCard({ product }: { product: Product }) {
  const { add, toggleWishlist, wishlist } = useCart();
  const wished = wishlist.includes(product.slug);

  return (
    <div className="group glass overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1.5 hover:glow">
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.tag && (
          <span className="absolute left-3 top-3 rounded-full bg-[image:var(--gradient-gold)] px-3 py-1 text-xs font-bold text-gold-foreground">
            {product.tag}
          </span>
        )}
        <button
          aria-label="Add to wishlist"
          onClick={() => toggleWishlist(product.slug)}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/70 backdrop-blur transition-colors hover:text-gold"
        >
          <Heart className={`h-5 w-5 ${wished ? "fill-destructive text-destructive" : ""}`} />
        </button>
      </div>
      <div className="space-y-2 p-5">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <div className="flex items-center gap-2">
          <RatingStars rating={product.rating} />
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gradient-gold text-xl font-bold">${product.price}</span>
          {product.oldPrice && (
            <span className="text-sm text-muted-foreground line-through">${product.oldPrice}</span>
          )}
        </div>
        <Button variant="gold" className="mt-2 w-full" onClick={() => add(product)}>
          <ShoppingCart className="h-4 w-4" /> Add to Cart
        </Button>
      </div>
    </div>
  );
}
