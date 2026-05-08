import { memo, useMemo } from "react";
import type { ComponentType } from "react";
import {
  MapPin,
  Briefcase,
  CircleDot,
  Download,
  Clock,
  Award,
  Globe2,
  Layers,
  CalendarCheck,
  Rocket,
  TrendingUp,
  Users,
} from "lucide-react";
import { useSiteContent } from "@/data/siteContent";
import { useLocale } from "@/hooks/use-locale";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/utils/analytics";

const metaIcons = [Briefcase, MapPin, CircleDot];

const metricIcons: Record<string, ComponentType<{ className?: string }>> = {
  "Years Experience": Clock,
  "Systems Delivered": Rocket,
  "Markets Served": Globe2,
  "Product Scale Systems": TrendingUp,
};

const floatingBadges = [
  { icon: Layers, label: "Microservices", top: "8%", left: "-14%" },
  { icon: Globe2, label: "MENA & Global", top: "30%", right: "-14%" },
  { icon: Award, label: "13+ Yrs", bottom: "30%", left: "-14%" },
  { icon: CalendarCheck, label: "Since 2011", bottom: "10%", right: "-10%" },
  { icon: Users, label: "100+ Clients", top: "58%", left: "-12%" },
];

function Hero() {
  const { profile, ui } = useSiteContent();
  const { locale } = useLocale();
  const isArabic = locale === "ar";
  const { theme } = useTheme();
  const isLight = theme === "light";
  const webpAvatarUrl = profile.avatarUrl.endsWith(".avif")
    ? profile.avatarUrl.replace(/\.avif$/i, ".webp")
    : profile.avatarUrl;

  const floatingBadgesLocalized = useMemo(
    () =>
      floatingBadges.map((badge, index) => ({
        ...badge,
        label: ui.hero.floatingBadges[index] ?? badge.label,
      })),
    [ui.hero.floatingBadges],
  );

  return (
    <header id="home" className="relative overflow-hidden pt-12 sm:pt-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, hsl(var(--primary) / 0.12), transparent 70%)",
        }}
      />

      <div className="container-narrow grid items-center gap-5 pb-8 sm:pb-10 lg:grid-cols-[1.2fr_1fr]">
        <div className="animate-fade-up-stagger">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-default bg-secondary px-3 py-1 text-xs font-semibold text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-tea-green-400" />
            {ui.hero.leadershipBadge}
          </span>

          <p className="text-[14px] font-semibold uppercase tracking-[0.08em] opacity-80">
            {profile.role.includes("Zaakiy V3RSE") ? (
              <span className="inline-flex items-center gap-2">
                <span className="text-primary/90">
                  {profile.role.replace("Zaakiy V3RSE", "")}
                </span>
                <span className="inline-flex items-center gap-1.5 text-accent">
                  <svg
                    width="34"
                    height="24"
                    viewBox="0 0 34 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <rect
                      x="0.5"
                      y="0.5"
                      width="33"
                      height="23"
                      rx="5"
                      fill="currentColor"
                      fillOpacity="0.12"
                      stroke="currentColor"
                      strokeOpacity="0.4"
                      strokeWidth="1"
                    />
                    <text
                      x="17"
                      y="17"
                      textAnchor="middle"
                      fontFamily="'Anta', sans-serif"
                      fontWeight="700"
                      fontSize="11"
                      fill="currentColor"
                    >
                      Zv3
                    </text>
                  </svg>
                  <span style={{ fontFamily: "'Anta', sans-serif" }}>
                    Zaakiy V3RSE
                  </span>
                </span>
              </span>
            ) : (
              <span className="text-primary/90">{profile.role}</span>
            )}
          </p>

          <h1 className="mt-3 leading-[1.06]">
            <svg
              viewBox={isArabic ? "0 0 300 42" : "0 0 220 48"}
              height={isArabic ? 42 : 48}
              className={
                isArabic ? "w-[260px] sm:w-[300px]" : "w-[180px] sm:w-[220px]"
              }
              xmlns="http://www.w3.org/2000/svg"
              aria-label={profile.name}
              role="img"
            >
              <defs>
                <linearGradient
                  id="hero-logo-grad"
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
                        : "-220 0; 220 0; -220 0"
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
                    y="30"
                    fontFamily="Mirza, serif"
                    fontSize="30"
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
                    y="30"
                    fontFamily="Mirza, serif"
                    fontSize="22"
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
                    y="36"
                    fontFamily="Montserrat, ui-sans-serif, sans-serif"
                    fontSize="32"
                    fontWeight="800"
                    letterSpacing="-0.5"
                    fill="url(#hero-logo-grad)"
                  >
                    Sanu
                  </text>
                  <text
                    x="82"
                    y="36"
                    fontFamily="Montserrat, ui-sans-serif, sans-serif"
                    fontSize="32"
                    fontWeight="600"
                    letterSpacing="-0.5"
                    fill="url(#hero-logo-grad)"
                  >
                    Khan
                  </text>
                  <text
                    x="166"
                    y="36"
                    fontFamily="Montserrat, ui-sans-serif, sans-serif"
                    fontSize="26"
                    fontWeight="500"
                    fill={isLight ? "#1f9f45" : "#38c755"}
                    opacity={isLight ? 0.85 : 0.75}
                  >
                    .dev
                  </text>
                </>
              )}
            </svg>
          </h1>

          <p className="mt-1 text-[14px] font-medium tracking-wide text-secondary opacity-80">
            {profile.subRole}
          </p>
          <p className="mt-4 max-w-2xl text-[16px] text-primary">
            {profile.subtitle}
          </p>
          <p className="mt-2 max-w-2xl text-[15px] text-secondary">
            {profile.statement}
          </p>

          <ul className="mt-6 space-y-2 text-sm text-secondary">
            {profile.meta.map((m, i) => {
              const Icon = metaIcons[i % metaIcons.length];
              return (
                <li key={m} className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-tea-green-400" />
                  {m}
                </li>
              );
            })}
          </ul>

          <div className="mt-8 grid max-w-2xl grid-cols-2 gap-3 lg:grid-cols-4">
            {profile.impactMetrics.map((s, index) => {
              const iconKey = [
                "Years Experience",
                "Systems Delivered",
                "Markets Served",
                "Product Scale Systems",
              ][index];
              const Icon = metricIcons[iconKey] ?? TrendingUp;
              return (
                <div
                  key={s.label}
                  className="premium-card flex flex-col items-center px-3 py-4 text-center"
                >
                  <Icon className="mb-1.5 h-4 w-4 text-accent/70" />
                  <div className="text-[28px] font-extrabold text-accent">
                    {s.value}
                  </div>
                  <div className="mt-1 text-[11px] uppercase tracking-wide text-secondary">
                    {s.label}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {profile.ctas.map((c) =>
              c.variant === "primary" ? (
                <Button
                  key={c.label}
                  asChild
                  className="h-10 rounded-lg bg-accent px-5 text-on-accent hover:scale-[1.02] hover:bg-[#4ade80]"
                >
                  <a
                    href={c.href}
                    onClick={() =>
                      trackEvent("cta_click", {
                        cta_type: "primary",
                        cta_label: c.label,
                      })
                    }
                  >
                    {c.label}
                  </a>
                </Button>
              ) : c.variant === "hire" ? (
                <Button
                  key={c.label}
                  asChild
                  className="h-10 rounded-lg border border-accent-soft bg-accent-soft px-5 text-accent hover:scale-[1.02] hover:bg-accent-soft"
                >
                  <a
                    href={c.href}
                    className="inline-flex items-center gap-2"
                    onClick={() => {
                      trackEvent("hire_me_click", { cta_type: "hire" });
                      trackEvent("cta_click", {
                        cta_type: "hire",
                        cta_label: c.label,
                      });
                    }}
                  >
                    <Briefcase className="h-4 w-4" /> {c.label}
                  </a>
                </Button>
              ) : (
                <Button
                  key={c.label}
                  asChild
                  variant="outline"
                  className="h-10 rounded-lg border-default bg-secondary text-primary hover:scale-[1.02] hover:bg-secondary"
                >
                  <a
                    href={c.href}
                    className="inline-flex items-center gap-2"
                    onClick={() => {
                      trackEvent("resume_view", { cta_type: "resume" });
                      trackEvent("cta_click", {
                        cta_type: "resume",
                        cta_label: c.label,
                      });
                    }}
                  >
                    <Download className="h-4 w-4" /> {c.label}
                  </a>
                </Button>
              ),
            )}
          </div>
        </div>

        <div className="mx-auto w-full max-w-sm">
          <div className="relative">
            <div className="avatar-halo" />

            {floatingBadgesLocalized.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.label}
                  aria-hidden
                  className="absolute z-20 hidden lg:flex items-center gap-1.5 rounded-full border border-default bg-secondary/90 px-2.5 py-1 text-[11px] font-semibold text-secondary shadow-lg backdrop-blur-sm"
                  style={{
                    top: b.top,
                    bottom: b.bottom,
                    left: b.left,
                    right: b.right,
                  }}
                >
                  <Icon className="h-3 w-3 text-accent" />
                  {b.label}
                </div>
              );
            })}

            <picture>
              <source type="image/avif" srcSet={profile.avatarUrl} />
              <source type="image/webp" srcSet={webpAvatarUrl} />
              <img
                src={profile.avatarUrl}
                alt={`${profile.name} portrait`}
                className="relative z-10 w-full object-contain"
                fetchPriority="high"
                decoding="async"
                width={640}
                height={640}
              />
            </picture>
          </div>

          <div aria-hidden className="innovation-label">
            <span>{ui.hero.innovationLines[0]}</span>
            <span>{ui.hero.innovationLines[1]}</span>
            <span>{ui.hero.innovationLines[2]}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default memo(Hero);
