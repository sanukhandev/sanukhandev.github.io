import { memo, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Coffee, Moon, Sun } from "lucide-react";
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

        <div className="hidden md:flex items-center gap-2">
          <button
            type="button"
            aria-label={
              isLight ? "Switch to dark theme" : "Switch to light theme"
            }
            onClick={toggleTheme}
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-300 hover:scale-[1.03]",
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

          <a
            href="https://ko-fi.com/sanukhan"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex h-9 items-center gap-1.5 rounded-lg border px-3 text-[13px] font-semibold transition-all duration-300 hover:scale-[1.02]",
              isLight
                ? "border-[#1f9f45]/45 bg-[#1f9f45]/10 text-[#1f9f45] hover:border-[#1f9f45] hover:bg-[#1f9f45]/18"
                : "border-[#38c755]/40 bg-[#38c755]/15 text-[#38c755] hover:border-[#38c755]/70 hover:bg-[#38c755]/20",
            )}
          >
            <Coffee className="h-3.5 w-3.5" />
            {isArabic ? "ادعمني بقهوة" : "Buy me a coffee"}
          </a>
          <Button
            asChild
            className={cn(
              "h-9 rounded-lg px-4 hover:scale-[1.02]",
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
            </a>
          </Button>

          <div className="ml-1 inline-flex items-center rounded-lg border border-[#2b2f3b] bg-secondary-glass p-0.5">
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={cn(
                "rounded-md px-2 py-1 text-[11px] font-semibold transition-colors",
                locale === "en"
                  ? "bg-[#38c755] text-[#0f1015]"
                  : isLight
                    ? "text-[#4d5a66] hover:text-[#121722]"
                    : "text-[#c9ced6] hover:text-[#38c755]",
              )}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLocale("ar")}
              className={cn(
                "rounded-md px-2 py-1 text-[11px] font-semibold transition-colors",
                locale === "ar"
                  ? "bg-[#38c755] text-[#0f1015]"
                  : isLight
                    ? "text-[#4d5a66] hover:text-[#121722]"
                    : "text-[#c9ced6] hover:text-[#38c755]",
              )}
            >
              {ui.localeSwitch.ar}
            </button>
          </div>
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
            <div className="mb-1 inline-flex w-fit items-center rounded-md border border-[#2b2f3b] bg-[#16171d] p-0.5">
              <button
                type="button"
                onClick={() => setLocale("en")}
                className={cn(
                  "rounded-md px-2 py-1 text-[11px] font-semibold transition-colors",
                  locale === "en"
                    ? "bg-[#38c755] text-[#0f1015]"
                    : isLight
                      ? "text-[#4d5a66] hover:text-[#121722]"
                      : "text-[#c9ced6] hover:text-[#38c755]",
                )}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLocale("ar")}
                className={cn(
                  "rounded-md px-2 py-1 text-[11px] font-semibold transition-colors",
                  locale === "ar"
                    ? "bg-[#38c755] text-[#0f1015]"
                    : isLight
                      ? "text-[#4d5a66] hover:text-[#121722]"
                      : "text-[#c9ced6] hover:text-[#38c755]",
                )}
              >
                {ui.localeSwitch.ar}
              </button>
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              className={cn(
                "mb-1 inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition-all",
                isLight
                  ? "border border-[#cfd8dd] bg-white text-[#1a232e]"
                  : "border border-[#2b2f3b] bg-[#16171d] text-[#f5f7fa]",
              )}
            >
              {isLight ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
              {isArabic
                ? isLight
                  ? "تبديل إلى الداكن"
                  : "تبديل إلى الفاتح"
                : isLight
                  ? "Switch to dark"
                  : "Switch to light"}
            </button>

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
            <a
              href="https://ko-fi.com/sanukhan"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className={cn(
                "mt-1 inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-semibold transition-all",
                isLight
                  ? "border-[#1f9f45]/45 bg-[#1f9f45]/10 text-[#1f9f45] hover:bg-[#1f9f45]/18"
                  : "border-[#38c755]/40 bg-[#38c755]/15 text-[#38c755] hover:bg-[#38c755]/22",
              )}
            >
              <Coffee className="h-4 w-4" />
              {isArabic ? "ادعمني بقهوة" : "Buy me a coffee"}
            </a>
            <Button
              asChild
              className={cn(
                "mt-2 rounded-lg",
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
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

export default memo(Navbar);
