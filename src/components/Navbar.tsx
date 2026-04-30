import { useEffect, useState } from "react";
import { Menu, X, Coffee, Moon, Sun } from "lucide-react";
import { nav } from "@/data/siteData";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/use-theme";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState("#works");
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

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
          ? isLight
            ? "border-[#d4dde1] bg-[#f4f8f5]/90 backdrop-blur-xl"
            : "border-[#2b2f3b] bg-[#0f1015]/90 backdrop-blur-xl"
          : isLight
            ? "border-transparent bg-[#f4f8f5]/75"
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
                <stop offset="0%"   stopColor={isLight ? "#1f9f45" : "#38c755"} />
                <stop offset="40%"  stopColor={isLight ? "#5cc97a" : "#a8ffbc"} />
                <stop offset="60%"  stopColor={isLight ? "#153625" : "#ffffff"} />
                <stop offset="100%" stopColor={isLight ? "#1f9f45" : "#38c755"} />
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
                <stop offset="0%"   stopColor={isLight ? "#1f9f45" : "#38c755"} />
                <stop offset="35%"  stopColor={isLight ? "#1f9f45" : "#38c755"} />
                <stop offset="50%"  stopColor={isLight ? "#6ed18a" : "#b4ffca"} />
                <stop offset="65%"  stopColor={isLight ? "#153625" : "#ffffff"} />
                <stop offset="80%"  stopColor={isLight ? "#1f9f45" : "#38c755"} />
                <stop offset="100%" stopColor={isLight ? "#1f9f45" : "#38c755"} />
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
              fill={isLight ? "#1f9f45" : "#38c755"}
              opacity={isLight ? 0.85 : 0.75}
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
                  ? isLight
                    ? "text-[#0f1015]"
                    : "text-[#f0f1f4]"
                  : isLight
                    ? "text-[#4d5a66] hover:text-[#0f1015]"
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
          <button
            type="button"
            aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
            onClick={toggleTheme}
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-300 hover:scale-[1.03]",
              isLight
                ? "border-[#cfd8dd] bg-white text-[#1a232e] hover:bg-[#eef4f0]"
                : "border-[#2b2f3b] bg-[#16171d] text-[#f0f1f4] hover:bg-[#20222b]",
            )}
          >
            {isLight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>

          <a
            href="https://ko-fi.com/sanukhan"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex h-9 items-center gap-1.5 rounded-lg border px-3 text-[13px] font-semibold transition-all duration-300 hover:scale-[1.02]",
              isLight
                ? "border-[#1f9f45]/45 bg-[#1f9f45]/10 text-[#1f9f45] hover:border-[#1f9f45] hover:bg-[#1f9f45]/18"
                : "border-[#38c755]/50 bg-[#38c755]/10 text-[#38c755] hover:border-[#38c755] hover:bg-[#38c755]/20",
            )}
          >
            <Coffee className="h-3.5 w-3.5" />
            Buy me a coffee
          </a>
          <Button
            asChild
            className={cn(
              "h-9 rounded-lg px-4 hover:scale-[1.02]",
              isLight
                ? "bg-[#1f9f45] text-white hover:bg-[#2caf54]"
                : "bg-[#38c755] text-[#0f1015] hover:bg-[#4fd16a]",
            )}
          >
            <a href={nav.cta.href}>{nav.cta.label}</a>
          </Button>
        </div>

        <button
          className={cn(
            "grid h-9 w-9 place-items-center rounded-md border md:hidden",
            isLight ? "border-[#cfd8dd] bg-white text-[#1a232e]" : "border-border",
          )}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {open && (
        <div className={cn("border-t md:hidden", isLight ? "border-[#d4dde1] bg-[#f6faf7]" : "border-[#2b2f3b] bg-[#16171d]")}>
          <div className="container-narrow flex flex-col gap-1 py-3">
            <button
              type="button"
              onClick={toggleTheme}
              className={cn(
                "mb-1 inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition-all",
                isLight
                  ? "border border-[#cfd8dd] bg-white text-[#1a232e]"
                  : "border border-[#2b2f3b] bg-[#20222b] text-[#f0f1f4]",
              )}
            >
              {isLight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              {isLight ? "Switch to dark" : "Switch to light"}
            </button>

            {nav.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-3 py-2 text-sm transition-all duration-300",
                  isLight
                    ? "text-[#4d5a66] hover:bg-[#e8f0ec] hover:text-[#0f1015]"
                    : "text-[#8a90a8] hover:bg-[#20222b] hover:text-[#f0f1f4]",
                )}
              >
                {l.label}
              </a>
            ))}
            <a
                href="https://ko-fi.com/sanukhan"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className={cn(
                  "mt-1 inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-semibold transition-all",
                  isLight
                    ? "border-[#1f9f45]/45 bg-[#1f9f45]/10 text-[#1f9f45] hover:bg-[#1f9f45]/18"
                    : "border-[#38c755]/50 bg-[#38c755]/10 text-[#38c755] hover:bg-[#38c755]/20",
                )}
              >
                <Coffee className="h-4 w-4" />
                Buy me a coffee
              </a>
            <Button
              asChild
              className={cn(
                "mt-2 rounded-lg",
                isLight
                  ? "bg-[#1f9f45] text-white hover:bg-[#2caf54]"
                  : "bg-[#38c755] text-[#0f1015] hover:bg-[#4fd16a]",
              )}
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
