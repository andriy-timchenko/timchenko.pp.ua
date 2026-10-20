import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "#territory", label: "Територія" },
  { href: "#timeline", label: "Хронологія" },
  { href: "#comparison", label: "Київ і Москва" },
  { href: "#video", label: "Відео" },
  { href: "#finale", label: "Слава Україні" },
];

function Trident({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 32" className={className} aria-hidden="true" fill="currentColor">
      <path d="M12 0l2 4v14h3V6l4-3v17a4 4 0 01-4 4h-3l-2 4-2-4H7a4 4 0 01-4-4V3l4 3v12h3V4l2-4zm0 20.5L10.5 23h3L12 20.5z" />
    </svg>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-header"
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300",
        scrolled ? "border-amber-900/30 bg-museum/85 backdrop-blur-xl" : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" data-testid="brand-link" className="flex items-center gap-2.5 text-gold">
          <Trident className="h-6 w-5" />
          <span className="font-heading text-sm font-semibold tracking-[0.2em] text-foreground">
            ІСТОРІЯ УКРАЇНИ
          </span>
        </a>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Розділи">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              data-testid={`nav-${n.href.slice(1)}`}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-gold-soft focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="#support"
            data-testid="cta-support-btn"
            className="hidden rounded-md bg-[#FFD500] px-4 py-2 text-sm font-semibold text-black transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-yellow-300 sm:inline-flex"
          >
            Підтримати Україну
          </a>
          <button
            type="button"
            data-testid="mobile-menu-toggle"
            aria-label={open ? "Закрити меню" : "Відкрити меню"}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-foreground lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          data-testid="mobile-menu"
          className="border-t border-line bg-museum/95 px-5 py-3 backdrop-blur-xl lg:hidden"
          aria-label="Розділи"
        >
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              data-testid={`mobile-nav-${n.href.slice(1)}`}
              className="block rounded-md px-2 py-3 text-base text-muted-foreground hover:text-gold-soft"
            >
              {n.label}
            </a>
          ))}
          <a
            href="#support"
            onClick={() => setOpen(false)}
            data-testid="mobile-cta-support-btn"
            className="mt-2 block rounded-md bg-[#FFD500] px-4 py-3 text-center font-semibold text-black"
          >
            Підтримати Україну
          </a>
        </nav>
      )}
    </header>
  );
}

export { Trident };
