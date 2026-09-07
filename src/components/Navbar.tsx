import { memo, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Moon, Sun, Globe, ArrowRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useSiteContent } from "@/data/siteContent";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/use-theme";
import { useLocale } from "@/hooks/use-locale";
import { trackEvent } from "@/utils/analytics";

function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState("#home");
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale } = useLocale();
  const { nav } = useSiteContent();
  const isLight = theme === "light";
  const isArabic = locale === "ar";
  const reducedMotion = useReducedMotion();
  const isHomePage = location.pathname === "/";
  const ctaHref = !isHomePage && nav.cta.href.startsWith("#") ? `/${nav.cta.href}` : nav.cta.href;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHomePage) {
      if (location.pathname.startsWith("/blog")) {
        setActiveHref("#writing");
      } else if (location.pathname === "/about") {
        setActiveHref("#about");
      } else if (location.pathname === "/projects") {
        setActiveHref("#work");
      } else {
        setActiveHref("");
      }
      return;
    }

    const sectionToNavMap: Record<string, string> = {
      home: "#home",
      work: "#work",
      architecture: "#architecture",
      writing: "#writing",
      about: "#about",
      contact: "#contact",
    };

    const updateActiveSection = () => {
      const scrollY = window.scrollY;
      if (scrollY < 80) {
        setActiveHref("#home");
        return;
      }

      const targetOffset = 140;
      for (const [id, href] of Object.entries(sectionToNavMap)) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= targetOffset && rect.bottom > targetOffset) {
          setActiveHref(href);
          break;
        }
      }
    };

    window.addEventListener("scroll", updateActiveSection, { passive: true });
    return () => window.removeEventListener("scroll", updateActiveSection);
  }, [isHomePage, location.pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-2 sm:pt-3">
      <div
        className={cn(
          "mx-auto w-[min(1200px,calc(100%-1.5rem))]",
          "transition-all duration-200",
          scrolled
            ? isLight
              ? "rounded-full border border-border bg-white/90 backdrop-blur-md shadow-sm"
              : "rounded-full border border-border bg-[#101828]/90 backdrop-blur-md shadow-sm"
            : "rounded-2xl bg-transparent",
        )}
      >
        <div className="flex h-14 items-center justify-between px-4 sm:px-6">
          {/* Brand Wordmark */}
          <a
            href={isHomePage ? "#home" : "/#home"}
            className="wordmark inline-flex items-baseline text-primary hover:opacity-95 transition-opacity select-none"
            aria-label="SanuKhan.dev home"
          >
            {isArabic ? (
              <span>سانو خان</span>
            ) : (
              <>
                <span>SanuKhan</span>
                <span className="wordmark-domain">.dev</span>
              </>
            )}
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden items-center gap-8 md:flex">
            {nav.links.map((l) => (
              <a
                key={l.href}
                href={isHomePage ? l.href : `/${l.href}`}
                className={cn(
                  "text-[14.5px] font-medium transition-colors hover:text-accent",
                  isHomePage && activeHref === l.href
                    ? "text-primary font-semibold"
                    : "text-secondary",
                )}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              type="button"
              aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
              onClick={toggleTheme}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-secondary hover:text-primary transition-colors"
            >
              {isLight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>

            {/* Locale Toggle */}
            <button
              type="button"
              onClick={() => setLocale(locale === "en" ? "ar" : "en")}
              className="inline-flex h-8 px-2.5 items-center justify-center rounded-lg border border-border text-xs font-bold text-secondary hover:text-primary transition-colors"
            >
              {locale === "en" ? "ع" : "EN"}
            </button>

            {/* Primary CTA: Let's talk */}
            <Button
              asChild
              className="h-9 rounded-lg bg-accent px-4 text-xs font-semibold text-white transition-colors hover:bg-accent/90 gap-1.5 shadow-sm"
            >
              <a href={ctaHref}>
                {isArabic ? "لنتحدث" : "Let's talk"}
                <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="grid h-9 w-9 place-items-center rounded-md border border-border text-primary md:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="mx-auto mt-2 w-[min(1200px,calc(100%-1.5rem))] overflow-hidden rounded-2xl border border-border bg-background p-4 md:hidden shadow-lg"
            initial={reducedMotion ? false : { opacity: 0, height: 0 }}
            animate={reducedMotion ? undefined : { opacity: 1, height: "auto" }}
            exit={reducedMotion ? undefined : { opacity: 0, height: 0 }}
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-2 pb-2 border-b border-border">
                <button
                  type="button"
                  onClick={() => setLocale(locale === "en" ? "ar" : "en")}
                  className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border px-3 text-xs font-bold text-primary"
                >
                  <Globe className="h-3.5 w-3.5" />
                  {locale === "en" ? "العربية" : "English"}
                </button>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border px-3 text-xs font-semibold text-primary"
                >
                  {isLight ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
                  {isLight ? "Dark" : "Light"}
                </button>
              </div>

              {nav.links.map((l) => (
                <a
                  key={l.href}
                  href={isHomePage ? l.href : `/${l.href}`}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium text-secondary hover:text-accent hover:bg-secondary/20"
                >
                  {l.label}
                </a>
              ))}

              <Button
                asChild
                className="mt-2 rounded-lg bg-accent text-white hover:bg-accent/90"
              >
                <a href={ctaHref} onClick={() => setOpen(false)}>
                  {isArabic ? "لنتحدث" : "Let's talk"} →
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default memo(Navbar);
