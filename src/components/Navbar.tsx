import { memo, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Coffee, Moon, Sun, ArrowUpRight, Globe } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useSiteContent } from "@/data/siteContent";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/use-theme";
import { useLocale } from "@/hooks/use-locale";
import { trackEvent } from "@/utils/analytics";

function CoffeeIconAnimated({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  return (
    <span className="relative inline-flex items-center justify-center">
      {!reduced && (
        <>
          <motion.span
            className="pointer-events-none absolute -top-3 left-[18%] w-[2px] rounded-full bg-current"
            style={{ height: 5 }}
            animate={{ y: [0, -8], opacity: [0, 0.6, 0] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeOut",
              delay: 0.1,
            }}
          />
          <motion.span
            className="pointer-events-none absolute -top-3 left-[52%] w-[2px] rounded-full bg-current"
            style={{ height: 5 }}
            animate={{ y: [0, -8], opacity: [0, 0.45, 0] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeOut",
              delay: 0.7,
            }}
          />
        </>
      )}
      <motion.span
        className="inline-flex"
        whileHover={
          reduced
            ? {}
            : {
                scale: 1.22,
                rotate: [-6, 6, -6, 6, 0],
                transition: { duration: 0.38, ease: "easeInOut" },
              }
        }
      >
        <Coffee className={className} />
      </motion.span>
    </span>
  );
}

function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState("#works");
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale } = useLocale();
  const { nav, ui } = useSiteContent();
  const isLight = theme === "light";
  const isArabic = locale === "ar";
  const isHomePage = location.pathname === "/";
  const isBlogPage = location.pathname.startsWith("/blog");
  const ctaHref =
    !isHomePage && nav.cta.href.startsWith("#")
      ? `/${nav.cta.href}`
      : nav.cta.href;

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

    if (!sections.length || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveHref(`#${entry.target.id}`);
          }
        }
      },
      {
        rootMargin: "-120px 0px -55% 0px",
        threshold: [0, 0.2, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? isLight
            ? "border-[#d4dde1] bg-primary-glass backdrop-blur-xl"
            : "border-default bg-primary-glass backdrop-blur-xl"
          : isLight
            ? "border-transparent bg-primary-glass"
            : "border-transparent bg-primary-glass",
      )}
    >
      <div className="container-narrow flex h-16 items-center justify-between">
        <a
          href={isHomePage ? "#home" : "/#home"}
          className="group shrink-0"
          aria-label={isArabic ? "الصفحة الرئيسية" : "SanuKhan.dev home"}
        >
          <svg
            viewBox={isArabic ? "0 0 300 36" : "0 0 180 32"}
            height="32"
            className={cn(
              "h-8",
              isArabic ? "w-[198px] sm:w-[250px]" : "w-[150px] sm:w-[180px]",
            )}
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <defs>
              <linearGradient
                id="logo-grad-move"
                x1="-100%"
                y1="0%"
                x2="200%"
                y2="0%"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor={isLight ? "#1f9f45" : "#38c755"} />
                <stop
                  offset="35%"
                  stopColor={isLight ? "#1f9f45" : "#38c755"}
                />
                <stop
                  offset="50%"
                  stopColor={isLight ? "#6ed18a" : "#b4ffca"}
                />
                <stop
                  offset="65%"
                  stopColor={isLight ? "#153625" : "#ffffff"}
                />
                <stop
                  offset="80%"
                  stopColor={isLight ? "#1f9f45" : "#38c755"}
                />
                <stop
                  offset="100%"
                  stopColor={isLight ? "#1f9f45" : "#38c755"}
                />
                <animateTransform
                  attributeName="gradientTransform"
                  type="translate"
                  values={
                    isArabic ? "-240 0; 240 0; -240 0" : "-180 0; 180 0; -180 0"
                  }
                  keyTimes="0; 0.5; 1"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </linearGradient>
            </defs>
            {isArabic ? (
              <>
                <text
                  x="210"
                  y="25"
                  fontFamily="Mirza, serif"
                  fontSize="26"
                  fontWeight="700"
                  textAnchor="end"
                  fill={isLight ? "#145a34" : "#bfffd3"}
                  stroke={isLight ? "#f4f8f5" : "#0b0c10"}
                  strokeWidth="0.85"
                  paintOrder="stroke"
                >
                  سانو خان
                  <animate
                    attributeName="fill"
                    values={
                      isLight
                        ? "#145a34;#239f4a;#145a34"
                        : "#bfffd3;#ffffff;#bfffd3"
                    }
                    dur="3.8s"
                    repeatCount="indefinite"
                  />
                </text>
                <text
                  x="292"
                  y="25"
                  fontFamily="Mirza, serif"
                  fontSize="20"
                  fontWeight="500"
                  textAnchor="end"
                  fill={isLight ? "#1f9f45" : "#38c755"}
                  opacity={isLight ? 0.95 : 0.9}
                  stroke={isLight ? "#f4f8f5" : "#0b0c10"}
                  strokeWidth="0.7"
                  paintOrder="stroke"
                >
                  .ديف
                  <animate
                    attributeName="opacity"
                    values="0.85;1;0.85"
                    dur="2.8s"
                    repeatCount="indefinite"
                  />
                </text>
              </>
            ) : (
              <>
                <text
                  x="0"
                  y="24"
                  fontFamily="Montserrat, ui-sans-serif, sans-serif"
                  fontSize="22"
                  fontWeight="800"
                  letterSpacing="-0.5"
                  fill="url(#logo-grad-move)"
                >
                  Sanu
                </text>
                <text
                  x="57"
                  y="24"
                  fontFamily="Montserrat, ui-sans-serif, sans-serif"
                  fontSize="22"
                  fontWeight="600"
                  letterSpacing="-0.5"
                  fill="url(#logo-grad-move)"
                >
                  Khan
                </text>
                <text
                  x="116"
                  y="24"
                  fontFamily="Montserrat, ui-sans-serif, sans-serif"
                  fontSize="18"
                  fontWeight="500"
                  fill={isLight ? "#1f9f45" : "#38c755"}
                  opacity={isLight ? 0.85 : 0.75}
                >
                  .dev
                </text>
              </>
            )}
          </svg>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.links.map((l) => (
            <a
              key={l.href}
              href={isHomePage ? l.href : `/${l.href}`}
              className={cn(
                "relative text-[15px] transition-all duration-300 hover:scale-[1.02]",
                isHomePage && activeHref === l.href
                  ? isLight
                    ? "text-[#0f1015] font-semibold"
                    : "text-[#f5f7fa] font-semibold"
                  : isLight
                    ? "text-[#4d5a66] hover:text-[#0f1015]"
                    : "text-[#c9ced6] hover:text-[#38c755]",
              )}
            >
              {l.label}
              <span
                className={cn(
                  "absolute -bottom-1.5 left-0 h-[2px] bg-accent transition-all duration-300",
                  isHomePage && activeHref === l.href
                    ? "w-full opacity-100"
                    : "w-0 opacity-0",
                )}
              />
            </a>
          ))}
          <Link
            to="/blog"
            className={cn(
              "relative text-[15px] transition-all duration-300 hover:scale-[1.02]",
              isBlogPage
                ? isLight
                  ? "text-[#0f1015] font-semibold"
                  : "text-[#f5f7fa] font-semibold"
                : isLight
                  ? "text-[#4d5a66] hover:text-[#0f1015]"
                  : "text-[#c9ced6] hover:text-[#38c755]",
            )}
          >
            Blog
            <span
              className={cn(
                "absolute -bottom-1.5 left-0 h-[2px] bg-accent transition-all duration-300",
                isBlogPage ? "w-full opacity-100" : "w-0 opacity-0",
              )}
            />
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-1.5">
          {/* Theme */}
          <button
            type="button"
            aria-label={
              isLight ? "Switch to dark theme" : "Switch to light theme"
            }
            onClick={toggleTheme}
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-200 hover:scale-[1.06]",
              isLight
                ? "border-[#cfd8dd] bg-white text-[#1a232e] hover:bg-[#eef4f0]"
                : "border-[#2b2f3b] bg-[#16171d] text-[#f5f7fa] hover:bg-[#20222b]",
            )}
          >
            {isLight ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </button>

          {/* Locale — single toggle */}
          <button
            type="button"
            aria-label={
              locale === "en" ? "Switch to Arabic" : "Switch to English"
            }
            title={locale === "en" ? "Switch to Arabic" : "Switch to English"}
            onClick={() => setLocale(locale === "en" ? "ar" : "en")}
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-lg border text-[11px] font-bold transition-all duration-200 hover:scale-[1.06]",
              isLight
                ? "border-[#cfd8dd] bg-white text-[#1a232e] hover:bg-[#eef4f0]"
                : "border-[#2b2f3b] bg-[#16171d] text-[#f5f7fa] hover:bg-[#20222b]",
            )}
          >
            {locale === "en" ? (
              <span className="text-[12px]">ع</span>
            ) : (
              <span>EN</span>
            )}
          </button>

          <div className="mx-0.5 h-5 w-px shrink-0 rounded-full opacity-30 bg-current" />

          {/* Coffee — icon only */}
          <a
            href="https://ko-fi.com/sanukhan"
            target="_blank"
            rel="noopener noreferrer"
            title={isArabic ? "ادعمني بقهوة" : "Buy me a coffee"}
            aria-label={isArabic ? "ادعمني بقهوة" : "Buy me a coffee"}
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-200 hover:scale-[1.06]",
              isLight
                ? "border-[#1f9f45]/45 bg-[#1f9f45]/8 text-[#1f9f45] hover:border-[#1f9f45] hover:bg-[#1f9f45]/16"
                : "border-[#38c755]/40 bg-[#38c755]/10 text-[#38c755] hover:border-[#38c755]/70 hover:bg-[#38c755]/18",
            )}
          >
            <CoffeeIconAnimated className="h-4 w-4" />
          </a>

          {/* CTA */}
          <Button
            asChild
            className={cn(
              "h-9 rounded-lg px-4 hover:scale-[1.02] gap-1",
              isLight
                ? "bg-[#1f9f45] text-white hover:bg-[#2caf54]"
                : "bg-accent text-on-accent hover:bg-[#4ade80]",
            )}
          >
            <a
              href={ctaHref}
              onClick={() => {
                trackEvent("contact_click", { cta_type: "contact" });
                trackEvent("cta_click", {
                  cta_type: "contact",
                  cta_label: nav.cta.label,
                });
              }}
            >
              {nav.cta.label}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </Button>
        </div>

        <button
          className={cn(
            "grid h-9 w-9 place-items-center rounded-md border md:hidden",
            isLight
              ? "border-[#cfd8dd] bg-white text-[#1a232e]"
              : "border-[#2b2f3b] bg-[#16171d] text-[#f5f7fa]",
          )}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {open && (
        <div
          className={cn(
            "border-t md:hidden",
            isLight
              ? "border-[#d4dde1] bg-[#f6faf7]"
              : "border-default bg-secondary",
          )}
        >
          <div className="container-narrow flex flex-col gap-1 py-3">
            {/* Mobile toolbar: locale + theme + coffee */}
            <div className="mb-2 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setLocale(locale === "en" ? "ar" : "en")}
                className={cn(
                  "inline-flex h-8 items-center gap-1.5 rounded-md border px-2.5 text-[11px] font-bold transition-colors",
                  isLight
                    ? "border-[#cfd8dd] bg-white text-[#1a232e]"
                    : "border-[#2b2f3b] bg-[#16171d] text-[#f5f7fa]",
                )}
              >
                <Globe className="h-3 w-3 opacity-60" />
                {locale === "en" ? "ع" : "EN"}
              </button>
              <button
                type="button"
                onClick={toggleTheme}
                className={cn(
                  "inline-flex h-8 items-center gap-1.5 rounded-md border px-2.5 text-[11px] font-semibold transition-colors",
                  isLight
                    ? "border-[#cfd8dd] bg-white text-[#1a232e]"
                    : "border-[#2b2f3b] bg-[#16171d] text-[#f5f7fa]",
                )}
              >
                {isLight ? (
                  <Moon className="h-3.5 w-3.5" />
                ) : (
                  <Sun className="h-3.5 w-3.5" />
                )}
                {isArabic
                  ? isLight
                    ? "داكن"
                    : "فاتح"
                  : isLight
                    ? "Dark"
                    : "Light"}
              </button>
              <a
                href="https://ko-fi.com/sanukhan"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                title={isArabic ? "ادعمني بقهوة" : "Buy me a coffee"}
                className={cn(
                  "inline-flex h-8 w-8 items-center justify-center rounded-md border transition-colors",
                  isLight
                    ? "border-[#1f9f45]/45 bg-[#1f9f45]/8 text-[#1f9f45]"
                    : "border-[#38c755]/40 bg-[#38c755]/10 text-[#38c755]",
                )}
              >
                <CoffeeIconAnimated className="h-4 w-4" />
              </a>
            </div>

            {nav.links.map((l) => (
              <a
                key={l.href}
                href={isHomePage ? l.href : `/${l.href}`}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-3 py-2 text-sm transition-all duration-300",
                  isLight
                    ? "text-[#4d5a66] hover:bg-[#e8f0ec] hover:text-[#0f1015]"
                    : "text-[#c9ced6] hover:bg-[#1e2028] hover:text-[#38c755]",
                )}
              >
                {l.label}
              </a>
            ))}
            <Link
              to="/blog"
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-md px-3 py-2 text-sm transition-all duration-300",
                isLight
                  ? "text-[#4d5a66] hover:bg-[#e8f0ec] hover:text-[#0f1015]"
                  : "text-[#c9ced6] hover:bg-[#1e2028] hover:text-[#38c755]",
              )}
            >
              Blog
            </Link>
            <Button
              asChild
              className={cn(
                "mt-2 rounded-lg gap-1",
                isLight
                  ? "bg-[#1f9f45] text-white hover:bg-[#2caf54]"
                  : "bg-accent text-on-accent hover:bg-[#4ade80]",
              )}
            >
              <a
                href={ctaHref}
                onClick={() => {
                  setOpen(false);
                  trackEvent("contact_click", { cta_type: "contact" });
                  trackEvent("cta_click", {
                    cta_type: "contact",
                    cta_label: nav.cta.label,
                  });
                }}
              >
                {nav.cta.label}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

export default memo(Navbar);
