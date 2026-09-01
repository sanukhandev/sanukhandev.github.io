import type { ComponentType } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  FaDev,
  FaGithub,
  FaLinkedin,
  FaMedium,
  FaStackOverflow,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { useSiteContent } from "@/data/siteContent";
import { useTheme } from "@/hooks/use-theme";
import { useLocale } from "@/hooks/use-locale";
import { trackEvent } from "@/utils/analytics";

const socialIcons: Record<string, ComponentType<{ className?: string }>> = {
  GitHub: FaGithub,
  LinkedIn: FaLinkedin,
  DevTo: FaDev,
  StackOverflow: FaStackOverflow,
  Medium: FaMedium,
  X: FaXTwitter,
  YouTube: FaYoutube,
};

export default function Footer() {
  const { theme } = useTheme();
  const { locale } = useLocale();
  const { footer, ui } = useSiteContent();
  const isLight = theme === "light";
  const isArabic = locale === "ar";

  return (
    <footer id="contact" className="border-t border-default bg-primary scroll-mt-20">
      <div className="container-narrow py-16">
        {/* FINAL CTA SECTION */}
        <div className="mb-14 rounded-2xl border border-accent/40 bg-secondary/30 p-8 sm:p-10 shadow-lg">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-primary leading-tight">
              {ui.footer.ctaHeading}
            </h2>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-secondary font-normal">
              {ui.footer.ctaSubtitle}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="mailto:hello@sanukhan.dev?subject=Architecture%20Inquiry%20%E2%80%93%20SanuKhan.dev"
                onClick={() => trackEvent("contact_click", { cta_type: "final_cta_lets_talk" })}
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-accent/90"
              >
                <span>{ui.footer.ctaButton}</span>
              </a>

              <a
                href="https://linkedin.com/in/sanukhan"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("linkedin_click")}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-background/80 px-6 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:border-accent/40 hover:bg-secondary"
              >
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <a
              href="#home"
              aria-label={isArabic ? "الصفحة الرئيسية" : "SanuKhan.dev home"}
            >
              <svg
                viewBox={isArabic ? "0 0 300 36" : "0 0 180 32"}
                height="32"
                className={cn(
                  "h-8",
                  isArabic
                    ? "w-[198px] sm:w-[250px]"
                    : "w-[150px] sm:w-[180px]",
                )}
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <defs>
                  <linearGradient
                    id="footer-logo-grad"
                    x1="-100%"
                    y1="0%"
                    x2="200%"
                    y2="0%"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop
                      offset="0%"
                      stopColor={isLight ? "#1f9f45" : "#38c755"}
                    />
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
                        isArabic
                          ? "-240 0; 240 0; -240 0"
                          : "-180 0; 180 0; -180 0"
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
                      fontSize="26"
                      fontWeight="700"
                      textAnchor="end"
                      fill={isLight ? "#145a34" : "#bfffd3"}
                      stroke={isLight ? "#edf4ef" : "#0b0c10"}
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
                      fontSize="20"
                      fontWeight="500"
                      textAnchor="end"
                      fill={isLight ? "#1f9f45" : "#38c755"}
                      opacity={isLight ? 0.95 : 0.9}
                      stroke={isLight ? "#edf4ef" : "#0b0c10"}
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
                      x="57"
                      y="24"
                      fontSize="20"
                      fontFamily="'Poppins', sans-serif"
                      letterSpacing="-0.5"
                      fill="url(#footer-logo-grad)"
                    >
                      sanukhan.dev
                    </text>
                   
                  </>
                )}
              </svg>
            </a>
            <p
              className={cn(
                "mt-1 text-[15px]",
                isLight ? "text-[#4d5a66]" : "text-secondary",
              )}
            >
              {footer.blurb}
            </p>
          </div>

          <div className="flex w-full flex-wrap gap-2 sm:w-auto sm:gap-4">
            {footer.socials.map((s) => {
              const Icon = socialIcons[s.icon];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    s.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  onClick={() => {
                    const normalizedLabel = s.label.toLowerCase();
                    trackEvent("social_click", { platform: normalizedLabel });
                    if (normalizedLabel.includes("github")) {
                      trackEvent("github_click");
                    }
                    if (normalizedLabel.includes("linkedin")) {
                      trackEvent("linkedin_click");
                    }
                  }}
                  aria-label={s.label}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-all duration-300 hover:scale-[1.02]",
                    isLight
                      ? "border-[#d4dde1] bg-white text-[#4d5a66] hover:border-[#1f9f45]/35 hover:text-[#121722]"
                      : "border-default bg-primary text-secondary hover:border-accent-soft hover:text-primary",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {s.label}
                </a>
              );
            })}
          </div>
        </div>

        <div
          className={cn(
            "mt-8 border-t pt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs",
            isLight
              ? "border-[#d4dde1] text-[#4d5a66]"
              : "border-default text-secondary",
          )}
        >
          <div className="flex flex-wrap gap-4">
            <a
              href={`mailto:${footer.contact.email}`}
              onClick={() =>
                trackEvent("contact_click", { cta_type: "contact" })
              }
              className={cn(
                "inline-flex items-center gap-1 transition-colors",
                isLight ? "hover:text-[#121722]" : "hover:text-primary",
              )}
            >
              <Mail className="h-3 w-3" />
              {footer.contact.email}
            </a>
            {footer.contact.phone && (
              <a
                href={`tel:${footer.contact.phone}`}
                onClick={() =>
                  trackEvent("contact_click", { cta_type: "contact" })
                }
                className={cn(
                  "inline-flex items-center gap-1 transition-colors",
                  isLight ? "hover:text-[#121722]" : "hover:text-primary",
                )}
              >
                <Phone className="h-3 w-3" />
                {footer.contact.phone}
              </a>
            )}
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {footer.contact.location}
            </span>
          </div>
          <span>{footer.copyright}</span>
        </div>
      </div>
    </footer>
  );
}
