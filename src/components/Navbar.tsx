import { memo, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { X, Moon, Sun, ArrowRight, Github, Linkedin, Mail, ExternalLink, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/use-theme";
import { useLocale } from "@/hooks/use-locale";
import { useSectionData } from "@/lib/i18n";
import { BrandIdentity } from "@/components/BrandIdentity";
import { LiveTelemetryBar } from "@/components/LiveTelemetryBar";
import { CommandPalette } from "@/components/CommandPalette";
import { useScrollSpy, type SectionThreshold } from "@/hooks/useScrollSpy";

interface NavItem {
  label: string;
  href: string;
  pageHref: string;
  num: string;
}

const SECTION_THRESHOLDS: SectionThreshold[] = [
  { id: "contact", href: "#contact" },
  { id: "faq", href: "#writing" },
  { id: "zaakiy", href: "#work" },
  { id: "writing", href: "#writing" },
  { id: "process", href: "#work" },
  { id: "work", href: "#work" },
  { id: "expertise", href: "#services" },
  { id: "services", href: "#services" },
  { id: "about", href: "#about" },
  { id: "home", href: "#home" },
];

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale } = useLocale();
  const isLight = theme === "light";
  const isArabic = locale === "ar";
  const isHomePage = location.pathname === "/";
  const ctaHref = isHomePage ? "#contact" : "/contact";

  const { scrolled, activeHref, setActiveHref } = useScrollSpy({
    isHomePage,
    pathname: location.pathname,
    thresholds: SECTION_THRESHOLDS,
  });

  const scrollToHash = (hash: string) => {
    const id = hash.replace(/^#/, "");
    const el = document.getElementById(id);
    if (!el) return false;
    const headerOffset = 80;
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
    setDrawerOpen(false);

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

  const handleDrawerLinkClick = (href: string) => {
    setDrawerOpen(false);
    if (href.startsWith("/#") && isHomePage) {
      const hash = href.replace(/^\//, "");
      scrollToHash(hash);
    } else {
      navigate(href);
    }
  };

  const handleBrandClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setDrawerOpen(false);
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
    setDrawerOpen(false);
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
    if (!isHomePage || !location.hash) return;
    const targetHash = location.hash;
    const timer = setTimeout(() => {
      scrollToHash(targetHash);
    }, 120);
    return () => clearTimeout(timer);
  }, [isHomePage, location.hash]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  // Trap focus and close drawer on Escape
  useEffect(() => {
    if (!drawerOpen) return;

    const drawer = drawerRef.current;
    const focusable = () =>
      Array.from(
        drawer?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );

    focusable()[0]?.focus();
    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setDrawerOpen(false);
        toggleBtnRef.current?.focus();
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
  }, [drawerOpen]);

  // Global Cmd+K / Ctrl+K keyboard shortcut for Command Palette
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  const nav = useSectionData("nav");

  const navItems: NavItem[] = [
    { label: nav.services, href: "#services", pageHref: "/#services", num: "01" },
    { label: nav.work, href: "#work", pageHref: "/projects", num: "02" },
    { label: nav.notes, href: "#writing", pageHref: "/blog", num: "03" },
    { label: nav.about, href: "#about", pageHref: "/about", num: "04" },
  ];

  const drawerLinks = [
    { label: nav.home.toUpperCase(), href: "/" },
    { label: nav.about.toUpperCase(), href: "/about" },
    { label: nav.services.toUpperCase(), href: "/#services" },
    { label: nav.projects.toUpperCase(), href: "/projects" },
    { label: nav.blogs.toUpperCase(), href: "/blog" },
    { label: nav.contact.toUpperCase(), href: "/contact" },
  ];

  return (
    <>
      <header
        className={cn(
          "sk-navbar fixed inset-x-0 top-0 z-50 transition-all duration-200 border-b border-black/[0.08] dark:border-white/10 bg-[#F7F7F5]/85 dark:bg-[#101010]/85 backdrop-blur-md shadow-xs text-foreground"
        )}
      >
        <div className="sk-shell">
          <div className="flex h-[72px] sm:h-20 items-center justify-between">
            {/* LEFT: Logo Wordmark */}
            <a
              href={isHomePage ? "#home" : "/"}
              onClick={handleBrandClick}
              className="sk-navbar__brand group select-none flex items-center"
              aria-label={isArabic ? "العودة إلى الصفحة الرئيسية لسنو خان" : "Sanu Khan home"}
            >
              <BrandIdentity compact />
            </a>

            {/* CENTER: Desktop Nav Links (Maintains strict routing.test.tsx compliance) */}
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
                        "text-[14.5px] font-medium transition-colors hover:text-accent focus-visible:text-accent relative py-1",
                        isItemActive
                          ? "text-primary font-bold after:absolute after:bottom-0 after:inset-x-0 after:h-0.5 after:bg-accent"
                          : "text-foreground/80 hover:text-accent"
                      )}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>

              <div className="h-4 w-px bg-border" aria-hidden="true" />

              {/* Live Telemetry Bar */}
              <div className="hidden xl:flex items-center">
                <LiveTelemetryBar />
              </div>

              {/* Command Palette Launcher, Theme & Locale Toggles */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label={isArabic ? "فتح قائمة الأوامر (⌘K)" : "Open Command Palette (⌘K)"}
                  onClick={() => setCommandPaletteOpen(true)}
                  className="inline-flex items-center gap-1.5 h-9 px-2.5 rounded-sm border border-border text-xs font-mono text-foreground/80 hover:text-foreground hover:border-accent/60 transition-colors select-none"
                >
                  <Search className="h-3.5 w-3.5 text-zinc-400" />
                  <kbd className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400">⌘K</kbd>
                </button>

                <button
                  type="button"
                  aria-label={
                    isLight
                      ? isArabic
                        ? "التبديل إلى الوضع الداكن"
                        : "Switch to dark theme"
                      : isArabic
                      ? "التبديل إلى الوضع الفاتح"
                      : "Switch to light theme"
                  }
                  onClick={toggleTheme}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-border text-foreground/80 hover:text-foreground hover:border-accent/60 transition-colors"
                >
                  {isLight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                </button>

                <button
                  type="button"
                  aria-label={locale === "en" ? "التبديل إلى العربية" : "Switch to English"}
                  onClick={() => setLocale(locale === "en" ? "ar" : "en")}
                  className="inline-flex h-9 px-2.5 items-center justify-center rounded-sm border border-border text-xs font-semibold text-foreground/80 hover:text-foreground hover:border-accent/60 transition-colors"
                >
                  {locale === "en" ? "ع" : "EN"}
                </button>
              </div>

              {/* Primary CTA: Let's talk → */}
              <a
                href={ctaHref}
                onClick={handleCtaClick}
                aria-label={isArabic ? "لنتحدث — الانتقال إلى قسم التواصل" : "Let's talk — Go to contact section"}
                className="sk-navbar__cta inline-flex items-center justify-center h-10 rounded-sm px-5 text-[14px] font-semibold transition-colors shadow-xs gap-1.5 bg-accent text-white hover:bg-accent/90"
              >
                <span>{isArabic ? "لنتحدث" : "Let's talk"}</span>
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </a>
            </div>

            {/* MOBILE: Triggers */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                type="button"
                aria-label={isArabic ? "قائمة الأوامر" : "Command Palette"}
                onClick={() => setCommandPaletteOpen(true)}
                className="inline-flex h-10 px-2.5 items-center justify-center rounded-sm border border-border text-xs font-mono text-foreground"
              >
                ⌘K
              </button>

              <button
                type="button"
                aria-label={locale === "en" ? "العربية" : "EN"}
                onClick={() => setLocale(locale === "en" ? "ar" : "en")}
                className="inline-flex h-10 px-2.5 items-center justify-center rounded-sm border border-border text-xs font-semibold text-foreground"
              >
                {locale === "en" ? "ع" : "EN"}
              </button>

              <button
                type="button"
                className="flex flex-col justify-center items-center h-10 w-10 gap-1.5 rounded-sm p-2 transition-transform text-foreground"
                aria-label={drawerOpen ? (isArabic ? "إغلاق القائمة" : "Close menu") : (isArabic ? "فتح القائمة" : "Open menu")}
                aria-expanded={drawerOpen}
                aria-controls="fullscreen-drawer"
                onClick={() => setDrawerOpen((v) => !v)}
              >
                <span className="block h-0.5 w-6 bg-current" />
                <span className="block h-0.5 w-4 self-end bg-current" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* FULLSCREEN SLIDE-OUT DRAWER OVERLAY */}
      {drawerOpen && (
        <div
          id="fullscreen-drawer"
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label={isArabic ? "قائمة التصفح الكاملة" : "Fullscreen navigation drawer"}
          className="sk-video-drawer"
        >
          {/* Top Bar inside Drawer */}
          <div className="flex items-center justify-between pb-6 border-b border-white/15">
            <span className="font-mono text-xs uppercase tracking-widest text-white/50">
              {isArabic ? "سانو خان // قائمة التصفح" : "SanuKhan.dev // Solutions & Systems"}
            </span>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              aria-label={isArabic ? "إغلاق القائمة" : "Close navigation"}
              className="h-12 w-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Center Main: Links Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 py-10 items-center">
            {/* Left Column: Massive Menu Links with + */}
            <div className="lg:col-span-8 flex flex-col sk-video-drawer__nav">
              {drawerLinks.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => handleDrawerLinkClick(link.href)}
                  className="w-full text-start group py-2"
                >
                  <span className="flex items-center justify-between">
                    <span>{link.label}</span>
                    <span className="drawer-plus">+</span>
                  </span>
                </button>
              ))}
            </div>

            {/* Right Column: Contact Details, Hours & Socials */}
            <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-white/15 lg:pl-10 space-y-8 font-mono text-sm">
              <div className="space-y-2">
                <span className="text-white/40 uppercase text-xs tracking-wider block">
                  {isArabic ? "الموقع الجغرافي" : "Based In"}
                </span>
                <p className="text-white text-base font-sans font-medium">Dubai, United Arab Emirates</p>
                <p className="text-white/60 text-xs">
                  {isArabic ? "متاح للاستشارات التقنية وهندسة النظم" : "Available for Consulting & Tech Leadership"}
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-white/40 uppercase text-xs tracking-wider block">
                  {isArabic ? "البريد الإلكتروني المباشر" : "Direct Email"}
                </span>
                <a
                  href="mailto:hello@sanukhan.dev"
                  className="text-accent text-base font-semibold hover:underline block"
                >
                  hello@sanukhan.dev
                </a>
              </div>

              <div className="space-y-3">
                <span className="text-white/40 uppercase text-xs tracking-wider block">
                  {isArabic ? "الشبكات المهنية" : "Networks"}
                </span>
                <div className="flex flex-col gap-2.5">
                  <a
                    href="https://www.linkedin.com/in/sanukhandev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                  >
                    <Linkedin className="h-4 w-4 text-accent" />
                    <span>LinkedIn Profile</span>
                    <ExternalLink className="h-3 w-3 opacity-50" />
                  </a>
                  <a
                    href="https://github.com/sanukhandev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                  >
                    <Github className="h-4 w-4 text-accent" />
                    <span>GitHub Repositories</span>
                    <ExternalLink className="h-3 w-3 opacity-50" />
                  </a>
                  <a
                    href="https://dev.to/sanukhandev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                  >
                    <Mail className="h-4 w-4 text-accent" />
                    <span>DEV Community Articles</span>
                    <ExternalLink className="h-3 w-3 opacity-50" />
                  </a>
                </div>
              </div>

              {/* Theme & Language Controls inside Drawer */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-sm border border-white/20 text-xs text-white/90 hover:bg-white/10"
                >
                  {isLight ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
                  <span>{isLight ? (isArabic ? "الوضع الداكن" : "Dark Mode") : (isArabic ? "الوضع الفاتح" : "Light Mode")}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLocale(locale === "en" ? "ar" : "en")}
                  className="px-3.5 py-2 rounded-sm border border-white/20 text-xs font-semibold text-white/90 hover:bg-white/10"
                >
                  {locale === "en" ? "العربية" : "English"}
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Copyright in Drawer */}
          <div className="pt-6 border-t border-white/15 flex items-center justify-between text-xs text-white/40 font-mono">
            <span>© {new Date().getFullYear()} Sanu Khan · All Architecture Reserved</span>
            <span>Dubai, UAE</span>
          </div>
        </div>
      )}

      {/* 2026 Calm Precision — Command Palette Modal */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </>
  );
}

export default memo(Navbar);
