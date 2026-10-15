import { memo, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Moon, Sun, ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { useSiteContent } from "@/data/siteContent";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/use-theme";
import { useLocale } from "@/hooks/use-locale";
import { BrandIdentity } from "@/components/BrandIdentity";

interface NavItem {
  label: string;
  href: string;
  pageHref: string;
  num: string;
}

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState("#home");
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale } = useLocale();
  const { nav } = useSiteContent();
  const isLight = theme === "light";
  const isArabic = locale === "ar";
  const isHomePage = location.pathname === "/";
  const ctaHref = isHomePage ? "#contact" : "/contact";

  const scrollToHash = (hash: string) => {
    const id = hash.replace(/^#/, "");
    const el = document.getElementById(id);
    if (!el) return false;
    const headerOffset = 84;
    const elementPosition = el.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior: "smooth",
    });
    return true;
  };

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    item: NavItem,
  ) => {
    setOpen(false);

    if (isHomePage) {
      if (item.href.startsWith("#")) {
        event.preventDefault();
        const success = scrollToHash(item.href);
        if (success) {
          window.history.pushState(null, "", item.href);
          setActiveHref(item.href);
        }
      }
      return;
    }

    // On a subpage:
    const isCurrentPage =
      location.pathname === item.pageHref ||
      (item.pageHref !== "/" &&
        !item.pageHref.startsWith("/#") &&
        location.pathname.startsWith(item.pageHref));

    if (isCurrentPage) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (item.pageHref.startsWith("/#")) {
      event.preventDefault();
      navigate(item.pageHref);
      return;
    }

    event.preventDefault();
    navigate(item.pageHref);
  };

  const handleBrandClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setOpen(false);
    if (isHomePage) {
      event.preventDefault();
      const success = scrollToHash("#home");
      if (success) {
        window.history.pushState(null, "", "#home");
        setActiveHref("#home");
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      event.preventDefault();
      navigate("/");
    }
  };

  const handleCtaClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setOpen(false);
    if (isHomePage) {
      event.preventDefault();
      const success = scrollToHash("#contact");
      if (success) {
        window.history.pushState(null, "", "#contact");
        setActiveHref("#contact");
      }
      return;
    }

    if (location.pathname === "/contact") {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    event.preventDefault();
    navigate("/contact");
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Handle cross-route or initial load hash scroll
  useEffect(() => {
    if (!isHomePage || !location.hash) return;
    const targetHash = location.hash;
    const timer = setTimeout(() => {
      scrollToHash(targetHash);
    }, 120);
    return () => clearTimeout(timer);
  }, [isHomePage, location.hash]);

  useEffect(() => {
    if (!isHomePage) {
      if (location.pathname.startsWith("/blog")) {
        setActiveHref("#writing");
      } else if (location.pathname === "/about") {
        setActiveHref("#about");
      } else if (location.pathname.startsWith("/projects")) {
        setActiveHref("#work");
      } else if (location.pathname === "/contact") {
        setActiveHref("#contact");
      } else {
        setActiveHref("");
      }
      return;
    }

    const sectionThresholds = [
      { id: "contact", href: "#contact" },
      { id: "faq", href: "#about" },
      { id: "about", href: "#about" },
      { id: "process", href: "#about" },
      { id: "zaakiy", href: "#writing" },
      { id: "writing", href: "#writing" },
      { id: "work", href: "#work" },
      { id: "services", href: "#services" },
      { id: "architecture", href: "#services" },
      { id: "home", href: "#home" },
    ];

    const updateActiveSection = () => {
      const scrollY = window.scrollY;
      if (scrollY < 80) {
        setActiveHref("#home");
        return;
      }

      if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 80) {
        setActiveHref("#contact");
        return;
      }

      const targetOffset = 180;
      for (const section of sectionThresholds) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= targetOffset) {
          setActiveHref(section.href);
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

  // Focus the drawer on open; trap Tab and restore focus when Escape closes it.
  useEffect(() => {
    if (!open) return;

    const menu = mobileMenuRef.current;
    const focusable = () =>
      Array.from(
        menu?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );

    focusable()[0]?.focus();
    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        mobileToggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyboard);
    return () => document.removeEventListener("keydown", handleKeyboard);
  }, [open]);

  const navItems: NavItem[] = [
    { label: isArabic ? "الخدمات" : "Services", href: "#services", pageHref: "/#services", num: "01" },
    { label: isArabic ? "الأعمال" : "Work", href: "#work", pageHref: "/projects", num: "02" },
    { label: isArabic ? "الملاحظات" : "Notes", href: "#writing", pageHref: "/blog", num: "03" },
    { label: isArabic ? "نبذة عني" : "About", href: "#about", pageHref: "/about", num: "04" },
  ];

  return (
    <header
      className={cn(
        "sk-navbar fixed inset-x-0 top-0 z-50 transition-all duration-200",
        scrolled
          ? "border-b border-border/80 bg-background/95 backdrop-blur-md shadow-xs"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="sk-shell">
        <div className="flex h-[72px] sm:h-20 items-center justify-between">
          {/* LEFT: SanuKhan.dev Brand Wordmark */}
          <a
            href={isHomePage ? "#home" : "/"}
            onClick={handleBrandClick}
            className="sk-navbar__brand group select-none"
            aria-label={isArabic ? "العودة إلى الصفحة الرئيسية لسنو خان" : "Sanu Khan home"}
          >
            <BrandIdentity compact />
          </a>

          {/* CENTER / RIGHT: Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-7 lg:gap-8">
            <nav className="flex items-center gap-6 lg:gap-8" aria-label="Main Navigation">
              {navItems.map((item) => {
                const isItemActive = isHomePage
                  ? activeHref === item.href
                  : activeHref === item.href ||
                    location.pathname === item.pageHref ||
                    (item.pageHref !== "/" &&
                      !item.pageHref.startsWith("/#") &&
                      location.pathname.startsWith(item.pageHref));

                return (
                  <a
                    key={item.href}
                    href={isHomePage ? item.href : item.pageHref}
                    onClick={(e) => handleNavClick(e, item)}
                    aria-current={isItemActive ? "page" : undefined}
                    className={cn(
                      "text-[14.5px] font-medium transition-colors hover:text-accent focus-visible:text-accent",
                      isItemActive
                        ? "text-primary font-semibold"
                        : "text-secondary"
                    )}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            <div className="h-4 w-px bg-border/80" aria-hidden="true" />

            {/* Theme & Locale Toggles */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label={isLight ? (isArabic ? "التبديل إلى الوضع الداكن" : "Switch to dark theme") : (isArabic ? "التبديل إلى الوضع الفاتح" : "Switch to light theme")}
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
            <a
              href={ctaHref}
              onClick={handleCtaClick}
              aria-label={isArabic ? "لنتحدث — الانتقال إلى قسم التواصل" : "Let's talk — Go to contact section"}
              className="sk-navbar__cta inline-flex items-center justify-center h-11 rounded-lg bg-accent px-5 text-[14px] font-semibold text-white transition-colors hover:bg-accent/90 shadow-xs gap-1.5"
            >
              <span>{isArabic ? "لنتحدث" : "Let's talk"}</span>
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </a>
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
              aria-label={open ? (isArabic ? "إغلاق القائمة" : "Close menu") : (isArabic ? "فتح القائمة" : "Open menu")}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              ref={mobileToggleRef}
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
          ref={mobileMenuRef}
          role="dialog"
          aria-modal="true"
          aria-label={isArabic ? "القائمة الرئيسية" : "Mobile navigation"}
          className="sk-mobile-nav fixed inset-0 top-[72px] sm:top-20 z-40 bg-background/98 backdrop-blur-xl border-t border-border flex flex-col justify-between p-6 sm:p-8 md:hidden overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="flex flex-col gap-6 pt-4">
            {/* Big Nav items */}
            <nav className="flex flex-col gap-4" aria-label="Mobile Navigation">
              {navItems.map((item) => {
                const isItemActive = isHomePage
                  ? activeHref === item.href
                  : activeHref === item.href ||
                    location.pathname === item.pageHref ||
                    (item.pageHref !== "/" &&
                      !item.pageHref.startsWith("/#") &&
                      location.pathname.startsWith(item.pageHref));

                return (
                  <a
                    key={item.href}
                    href={isHomePage ? item.href : item.pageHref}
                    onClick={(e) => handleNavClick(e, item)}
                    aria-current={isItemActive ? "page" : undefined}
                    className={cn(
                      "flex items-baseline justify-between border-b border-border/60 pb-3 text-2xl font-semibold tracking-tight transition-colors hover:text-accent",
                      isItemActive ? "text-accent" : "text-primary"
                    )}
                  >
                    <span>{item.label}</span>
                    <span className="font-mono text-xs font-semibold text-accent/80 tracking-widest">
                      {item.num}
                    </span>
                  </a>
                );
              })}
            </nav>

            {/* Mobile CTA */}
            <div className="pt-2">
              <a
                href={ctaHref}
                aria-label={isArabic ? "لنتحدث — الانتقال إلى قسم التواصل" : "Let's talk — Go to contact section"}
                onClick={handleCtaClick}
                className="sk-navbar__cta inline-flex items-center justify-center w-full h-12 rounded-lg bg-accent text-[15px] font-semibold text-white hover:bg-accent/90 justify-center gap-2"
              >
                <span>{isArabic ? "لنتحدث" : "Let's talk"}</span>
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </a>
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
                    <span>{isLight ? (isArabic ? "الوضع الداكن" : "Dark mode") : (isArabic ? "الوضع الفاتح" : "Light mode")}</span>
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
