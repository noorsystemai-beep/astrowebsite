import { Link } from "@tanstack/react-router";
import { Sparkles, Minus, Plus, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";

export function CartDrawer() {
  const { items, open, setOpen, remove, setQty, total } = useCart();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center text-muted-foreground">
            <Sparkles className="h-10 w-10 text-gold/60" />
            <p>Your cart is empty.</p>
            <Button variant="outlineGold" asChild onClick={() => setOpen(false)}>
              <Link to="/shop">Explore the Shop</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto px-1 py-2">
              {items.map((item) => (
                <div key={item.slug} className="flex gap-3 rounded-lg border border-border p-2">
                  <img src={item.image} alt={item.name} className="h-16 w-16 rounded-md object-cover" />
                  <div className="flex flex-1 flex-col">
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="text-sm text-gold">₹{item.price}</span>
                    <div className="mt-auto flex items-center gap-2">
                      <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => setQty(item.slug, item.qty - 1)}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-6 text-center text-sm">{item.qty}</span>
                      <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => setQty(item.slug, item.qty + 1)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="ml-auto h-7 w-7 text-destructive" onClick={() => remove(item.slug)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <SheetFooter className="border-t border-border pt-4">
              <div className="mb-3 flex items-center justify-between text-lg font-semibold">
                <span>Total</span>
                <span className="text-gradient-gold">₹{total}</span>
              </div>
              <Button variant="gold" size="lg" className="w-full">
                Checkout
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
