import { createContext, useContext, useState, type ReactNode } from "react";
import type { Product } from "./data";

export interface CartItem extends Product {
  qty: number;
}

interface CartCtx {
  items: CartItem[];
  wishlist: string[];
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (p: Product) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  toggleWishlist: (slug: string) => void;
  count: number;
  total: number;
}

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const add = (p: Product) => {
    setItems((prev) => {
      const found = prev.find((i) => i.slug === p.slug);
      if (found) return prev.map((i) => (i.slug === p.slug ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { ...p, qty: 1 }];
    });
    setOpen(true);
  };
  const remove = (slug: string) => setItems((prev) => prev.filter((i) => i.slug !== slug));
  const setQty = (slug: string, qty: number) =>
    setItems((prev) => prev.map((i) => (i.slug === slug ? { ...i, qty: Math.max(1, qty) } : i)));
  const toggleWishlist = (slug: string) =>
    setWishlist((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));

  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.qty * i.price, 0);

  return (
    <Ctx.Provider value={{ items, wishlist, open, setOpen, add, remove, setQty, toggleWishlist, count, total }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
