import { useEffect, useState } from "react";
import { Menu, X, Coffee } from "lucide-react";
import { nav } from "@/data/siteData";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState("#works");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ["home", "works", "experience", "stack", "contact"];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const onScroll = () => {
      const checkpoint = window.scrollY + 140;
      let current = "#works";
      for (const section of sections) {
        if (checkpoint >= section.offsetTop) {
          current = `#${section.id}`;
        }
      }
      setActiveHref(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-[#2b2f3b] bg-[#0f1015]/90 backdrop-blur-xl"
          : "border-transparent bg-[#0f1015]/75",
      )}
    >
      <div className="container-narrow flex h-16 items-center justify-between">
        <a href="#home" className="group shrink-0" aria-label="SanuKhan.dev home">
          <svg
            viewBox="0 0 180 32"
            height="32"
            width="180"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <defs>
              <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#38c755" />
                <stop offset="40%"  stopColor="#a8ffbc" />
                <stop offset="60%"  stopColor="#ffffff" />
                <stop offset="100%" stopColor="#38c755" />
                <animateTransform
                  attributeName="gradientTransform"
                  type="translate"
                  from="-1 0"
                  to="1 0"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </linearGradient>
              <linearGradient id="logo-grad-move" x1="-100%" y1="0%" x2="200%" y2="0%" gradientUnits="userSpaceOnUse">
                <stop offset="0%"   stopColor="#38c755" />
                <stop offset="35%"  stopColor="#38c755" />
                <stop offset="50%"  stopColor="#b4ffca" />
                <stop offset="65%"  stopColor="#ffffff" />
                <stop offset="80%"  stopColor="#38c755" />
                <stop offset="100%" stopColor="#38c755" />
                <animateTransform
                  attributeName="gradientTransform"
                  type="translate"
                  values="-180 0; 180 0; -180 0"
                  keyTimes="0; 0.5; 1"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </linearGradient>
            </defs>
            {/* "Sanu" — bold weight */}
            <text
              x="0" y="24"
              fontFamily="Montserrat, ui-sans-serif, sans-serif"
              fontSize="22"
              fontWeight="800"
              letterSpacing="-0.5"
              fill="url(#logo-grad-move)"
            >
              Sanu
            </text>
            {/* "Khan" — slightly lighter */}
            <text
              x="57" y="24"
              fontFamily="Montserrat, ui-sans-serif, sans-serif"
              fontSize="22"
              fontWeight="600"
              letterSpacing="-0.5"
              fill="url(#logo-grad-move)"
            >
              Khan
            </text>
            {/* ".dev" — muted accent */}
            <text
              x="116" y="24"
              fontFamily="Montserrat, ui-sans-serif, sans-serif"
              fontSize="18"
              fontWeight="500"
              fill="#38c755"
              opacity="0.75"
            >
              .dev
            </text>
          </svg>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={cn(
                "relative text-[15px] transition-all duration-300 hover:scale-[1.02]",
                activeHref === l.href
                  ? "text-[#f0f1f4]"
                  : "text-[#8a90a8] hover:text-[#f0f1f4]",
              )}
            >
              {l.label}
              <span
                className={cn(
                  "absolute -bottom-1.5 left-0 h-[2px] bg-[#38c755] transition-all duration-300",
                  activeHref === l.href
                    ? "w-full opacity-100"
                    : "w-0 opacity-0",
                )}
              />
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <a
            href="https://ko-fi.com/sanukhan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#38c755]/50 bg-[#38c755]/10 px-3 text-[13px] font-semibold text-[#38c755] transition-all duration-300 hover:scale-[1.02] hover:bg-[#38c755]/20 hover:border-[#38c755]"
          >
            <Coffee className="h-3.5 w-3.5" />
            Buy me a coffee
          </a>
          <Button
            asChild
            className="h-9 rounded-lg bg-[#38c755] px-4 text-[#0f1015] hover:scale-[1.02] hover:bg-[#4fd16a]"
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
        <div className="border-t border-[#2b2f3b] bg-[#16171d] md:hidden">
          <div className="container-narrow flex flex-col gap-1 py-3">
            {nav.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-[#8a90a8] transition-all duration-300 hover:bg-[#20222b] hover:text-[#f0f1f4]"
              >
                {l.label}
              </a>
            ))}
            <a
                href="https://ko-fi.com/sanukhan"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-1 inline-flex items-center gap-2 rounded-md border border-[#38c755]/50 bg-[#38c755]/10 px-3 py-2 text-sm font-semibold text-[#38c755] transition-all hover:bg-[#38c755]/20"
              >
                <Coffee className="h-4 w-4" />
                Buy me a coffee
              </a>
            <Button
              asChild
              className="mt-2 rounded-lg bg-[#38c755] text-[#0f1015] hover:bg-[#4fd16a]"
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
