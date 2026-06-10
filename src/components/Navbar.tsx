import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Moon, Sun, ShoppingBag, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme";
import { useCart } from "@/lib/cart";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/astrologers", label: "Astrologers" },
  { to: "/shop", label: "Shop" },
  { to: "/booking", label: "Booking" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const { theme, toggle } = useTheme();
  const { count, setOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full glass">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-gold" />
          <span className="text-2xl font-bold tracking-wide">
            Astro<span className="text-gradient-gold">Aura</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                activeProps={{ className: "text-gold" }}
                activeOptions={{ exact: l.to === "/" }}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-gold"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" aria-label="Search" onClick={() => setSearchOpen((v) => !v)}>
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={toggle}>
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon" aria-label="Open cart" className="relative" onClick={() => setOpen(true)}>
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-gold-foreground">
                {count}
              </span>
            )}
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="text-left text-xl">
                  Astro<span className="text-gradient-gold">Aura</span>
                </SheetTitle>
              </SheetHeader>
              <ul className="mt-6 flex flex-col gap-1 px-2">
                {LINKS.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      onClick={() => setMobileOpen(false)}
                      activeProps={{ className: "text-gold bg-secondary" }}
                      activeOptions={{ exact: l.to === "/" }}
                      className="block rounded-md px-3 py-3 text-base font-medium transition-colors hover:bg-secondary"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {searchOpen && (
        <div className="border-t border-border bg-background/80 px-4 py-3 backdrop-blur md:px-8">
          <div className="mx-auto flex max-w-3xl items-center gap-2">
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input
              autoFocus
              placeholder="Search services, products, astrologers…"
              className="border-0 bg-transparent focus-visible:ring-0"
              onKeyDown={(e) => e.key === "Escape" && setSearchOpen(false)}
            />
            <Button variant="ghost" size="icon" aria-label="Close search" onClick={() => setSearchOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
