import { memo, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu, X, Moon, Sun, ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { useSiteContent } from "@/data/siteContent";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/use-theme";
import { useLocale } from "@/hooks/use-locale";

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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const navItems = [
    { label: isArabic ? "الأعمال" : "Work", href: "#work", num: "01" },
    { label: isArabic ? "المعمارية" : "Architecture", href: "#architecture", num: "02" },
    { label: isArabic ? "الملاحظات" : "Notes", href: "#writing", num: "03" },
    { label: isArabic ? "نبذة عني" : "About", href: "#about", num: "04" },
  ];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-200",
        scrolled
          ? "border-b border-border/80 bg-background/95 backdrop-blur-md shadow-xs"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="container-narrow">
        <div className="flex h-[72px] sm:h-20 items-center justify-between">
          {/* LEFT: SanuKhan.dev Brand Wordmark */}
          <a
            href={isHomePage ? "#home" : "/#home"}
            className="group inline-flex items-baseline text-[19px] sm:text-[21px] font-semibold tracking-tight text-primary transition-opacity hover:opacity-90 select-none"
            aria-label="SanuKhan.dev home"
          >
            <span>SanuKhan</span>
            <span className="text-accent font-semibold">.dev</span>
          </a>

          {/* CENTER / RIGHT: Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-7 lg:gap-8">
            <nav className="flex items-center gap-6 lg:gap-8" aria-label="Main Navigation">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={isHomePage ? item.href : `/${item.href}`}
                  className={cn(
                    "text-[14.5px] font-medium transition-colors hover:text-accent focus-visible:text-accent",
                    isHomePage && activeHref === item.href
                      ? "text-primary font-semibold"
                      : "text-secondary"
                  )}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="h-4 w-px bg-border/80" aria-hidden="true" />

            {/* Theme & Locale Toggles */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
                onClick={toggleTheme}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-secondary hover:text-primary hover:border-accent/40 transition-colors"
              >
                {isLight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </button>

              <button
                type="button"
                aria-label={locale === "en" ? "التبديل إلى العربية" : "Switch to English"}
                onClick={() => setLocale(locale === "en" ? "ar" : "en")}
                className="inline-flex h-9 px-2.5 items-center justify-center rounded-lg border border-border text-xs font-semibold text-secondary hover:text-primary hover:border-accent/40 transition-colors"
              >
                {locale === "en" ? "ع" : "EN"}
              </button>
            </div>

            {/* Primary CTA: Let's talk → */}
            <Button
              asChild
              className="h-11 rounded-lg bg-accent px-5 text-[14px] font-semibold text-white transition-colors hover:bg-accent/90 shadow-xs gap-1.5"
            >
              <a
                href={ctaHref}
                aria-label={isArabic ? "الانتقال إلى قسم التواصل" : "Go to contact section"}
              >
                <span>{isArabic ? "لنتحدث" : "Let's talk"}</span>
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </a>
            </Button>
          </div>

          {/* MOBILE: Menu Trigger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              aria-label={locale === "en" ? "العربية" : "EN"}
              onClick={() => setLocale(locale === "en" ? "ar" : "en")}
              className="inline-flex h-10 px-2.5 items-center justify-center rounded-lg border border-border text-xs font-semibold text-secondary"
            >
              {locale === "en" ? "ع" : "EN"}
            </button>

            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-lg border border-border text-primary hover:border-accent/40 transition-colors"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE FULLSCREEN MENU OVERLAY */}
      {open && (
        <div
          id="mobile-navigation"
          className="fixed inset-0 top-[72px] sm:top-20 z-40 bg-background/98 backdrop-blur-xl border-t border-border flex flex-col justify-between p-6 sm:p-8 md:hidden overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200"
        >
            <div className="flex flex-col gap-6 pt-4">
              {/* Big Nav items */}
              <nav className="flex flex-col gap-4" aria-label="Mobile Navigation">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={isHomePage ? item.href : `/${item.href}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between border-b border-border/60 pb-3 text-2xl font-semibold tracking-tight text-primary transition-colors hover:text-accent"
                  >
                    <span>{item.label}</span>
                    <span className="font-mono text-xs font-semibold text-accent/80 tracking-widest">
                      {item.num}
                    </span>
                  </a>
                ))}
              </nav>

              {/* Mobile CTA */}
              <div className="pt-2">
                <Button
                  asChild
                  className="w-full h-12 rounded-lg bg-accent text-[15px] font-semibold text-white hover:bg-accent/90 justify-center gap-2"
                >
                  <a
                    href={ctaHref}
                    aria-label={isArabic ? "الانتقال إلى قسم التواصل" : "Go to contact section"}
                    onClick={() => setOpen(false)}
                  >
                    <span>{isArabic ? "لنتحدث" : "Let's talk"}</span>
                    <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Bottom Controls & Social Links */}
            <div className="pt-8 border-t border-border/80 flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={toggleTheme}
                    className="inline-flex h-10 items-center gap-2 rounded-lg border border-border px-3.5 text-xs font-semibold text-secondary hover:text-primary"
                  >
                    {isLight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                    <span>{isLight ? "Dark mode" : "Light mode"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setLocale(locale === "en" ? "ar" : "en")}
                    className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-border px-3.5 text-xs font-semibold text-secondary hover:text-primary"
                  >
                    <span>{locale === "en" ? "العربية" : "English"}</span>
                  </button>
                </div>
              </div>

              {/* Social Channels */}
              <div className="flex items-center gap-5 text-sm font-medium text-secondary">
                <a
                  href="https://www.linkedin.com/in/sanukhandev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
                >
                  <Linkedin className="h-4 w-4 text-accent" />
                  LinkedIn
                </a>
                <a
                  href="https://github.com/sanukhandev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
                >
                  <Github className="h-4 w-4 text-accent" />
                  GitHub
                </a>
                <a
                  href="mailto:hello@sanukhan.dev"
                  className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
                >
                  <Mail className="h-4 w-4 text-accent" />
                  Email
                </a>
              </div>
            </div>
          </div>
        )}
    </header>
  );
}

export default memo(Navbar);
