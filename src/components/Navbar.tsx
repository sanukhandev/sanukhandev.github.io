import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav } from "@/data/siteData";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent",
      )}
    >
      <div className="container-narrow flex h-16 items-center justify-between">
        <a
          href="#home"
          className="flex items-center gap-2 font-bold text-foreground"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 520 90"
            role="img"
            aria-label="SANUKHAN.DEV"
            className="h-8 w-[190px] sm:w-[220px]"
          >
            <title>SANUKHAN.DEV</title>
            <style>{`.text { font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 600; letter-spacing: 1px; }`}</style>
            <text x="0" y="60" className="text" fontSize="48" fill="#ffffff">
              SANUKHAN<tspan fill="#14b8a6">.</tspan>DEV
            </text>
          </svg>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button
            asChild
            className="bg-tea-green-500 text-jet-black-950 hover:bg-tea-green-400"
          >
            <a href={nav.cta.href}>{nav.cta.label}</a>
          </Button>
        </div>

        <button
          className="grid h-9 w-9 place-items-center rounded-md border border-border md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-card md:hidden">
          <div className="container-narrow flex flex-col gap-1 py-3">
            {nav.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <Button
              asChild
              className="mt-2 bg-tea-green-500 text-jet-black-950 hover:bg-tea-green-400"
              onClick={() => setOpen(false)}
            >
              <a href={nav.cta.href}>{nav.cta.label}</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
