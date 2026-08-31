import { memo, useMemo } from "react";
import type { ComponentType } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  MapPin,
  Briefcase,
  CircleDot,
  Clock,
  Award,
  Globe2,
  Layers,
  CalendarCheck,
  Rocket,
  TrendingUp,
  Users,
  ArrowUpRight,
} from "lucide-react";
import CoffeeIconAnimated from "@/components/CoffeeIconAnimated";
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
  {
    icon: Layers,
    label: "Microservices Architecture",
    top: "8%",
    left: "-14%",
  },
  {
    icon: Globe2,
    label: "Regional & Global Delivery",
    top: "30%",
    right: "-14%",
  },
  { icon: Award, label: "13+ Years Experience", bottom: "30%", left: "-14%" },
  {
    icon: CalendarCheck,
    label: "Engineering Since 2011",
    bottom: "10%",
    right: "-10%",
  },
  { icon: Users, label: "100+ Solutions Delivered", top: "58%", left: "-12%" },
];

function Hero() {
  const { profile, ui } = useSiteContent();
  const { locale } = useLocale();
  const isArabic = locale === "ar";
  const { theme } = useTheme();
  const reducedMotion = useReducedMotion();
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

  const roleBrand = useMemo(() => {
    const profileWithRoleBrand = profile as typeof profile & {
      roleBrand?: string;
    };
    if (profileWithRoleBrand.roleBrand) {
      return profileWithRoleBrand.roleBrand;
    }

    return profile.role
      .replace(/^creator of\s*/i, "")
      .replace(/^مؤسس\s*/i, "")
      .trim();
  }, [profile]);

  return (
    <header id="home" className="relative overflow-hidden pt-20 sm:pt-24">
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
          <span className="glass-pill mb-5 inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-tea-green-400" />
            {ui.hero.leadershipBadge}
          </span>

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
                    fontSize="32"
                    fontWeight="800"
                    fontFamily="'Laren Modern', sans-serif"
                    letterSpacing="-0.5"
                    fill="url(#hero-logo-grad)"
                  >
                    Sanu
                  </text>
                  <text
                    x="82"
                    y="36"
                    fontSize="32"
                    fontWeight="600"
                    fontFamily="'Laren Modern', sans-serif"
                    letterSpacing="-0.5"
                    fill="url(#hero-logo-grad)"
                  >
                    Khan
                  </text>
                  <text
                    x="166"
                    y="36"
                    fontSize="26"
                    fontWeight="500"
                    fontFamily="'Laren Modern', sans-serif"
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

          <motion.div
            className="mt-4 opacity-95"
            initial={reducedMotion ? false : { opacity: 0, y: 14 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            {/zaakiy/i.test(profile.role) ? (
              <div className="flex flex-col items-start gap-1.5">
                <motion.span
                  className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${isLight ? "text-black" : "text-white/90"}`}
                  initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                  animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  {ui.hero.creatorLabel}
                </motion.span>

                <motion.div
                  className="relative overflow-hidden"
                  initial={
                    reducedMotion
                      ? false
                      : { opacity: 0, y: 18, clipPath: "inset(0 100% 0 0)" }
                  }
                  animate={
                    reducedMotion
                      ? undefined
                      : { opacity: 1, y: 0, clipPath: "inset(0 0% 0 0)" }
                  }
                  transition={{
                    duration: 0.9,
                    delay: 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <motion.span
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 left-0 w-24"
                    initial={reducedMotion ? false : { x: "-130%", opacity: 0 }}
                    animate={
                      reducedMotion
                        ? undefined
                        : { x: ["-130%", "280%"], opacity: [0, 0.5, 0] }
                    }
                    transition={{
                      duration: 1.1,
                      delay: 0.25,
                      ease: "easeInOut",
                    }}
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 0%, color-mix(in srgb, #ffffff 78%, transparent) 50%, transparent 100%)",
                    }}
                  />
                  <motion.span
                    className="brand-zaakiy relative inline-block text-[clamp(1.2rem,3vw,1.8rem)] font-normal uppercase leading-none text-accent"
                    style={{
                      textShadow:
                        "0 0 18px color-mix(in srgb, var(--accent) 28%, transparent)",
                    }}
                    initial={
                      reducedMotion
                        ? false
                        : { letterSpacing: "0.32em", filter: "blur(8px)" }
                    }
                    animate={
                      reducedMotion
                        ? undefined
                        : { letterSpacing: "0.08em", filter: "blur(0px)" }
                    }
                    transition={{ duration: 0.7, delay: 0.18, ease: "easeOut" }}
                  >
                    {roleBrand}
                  </motion.span>
                </motion.div>
              </div>
            ) : (
              <span className="text-primary/90">{profile.role}</span>
            )}
          </motion.div>

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
            {/* Let's Chat Button with animation */}
            <motion.div
              initial={reducedMotion ? undefined : { opacity: 0, y: 10 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {profile.ctas
                .filter((cta) => cta.variant === "hire")
                .map((c) => (
                  <Button
                    key={c.label}
                    asChild
                    className={`h-10 rounded-lg border border-accent/50 bg-transparent px-5 text-accent hover:text-white transition-all duration-300 ease-out ${
                      reducedMotion ? "" : "hover:scale-110 hover:-translate-y-1"
                    }`}
                  >
                    <a
                      href={c.href}
                      className="inline-flex items-center gap-2"
                      onClick={() => {
                        trackEvent("lets_chat_click", { cta_type: "contact" });
                        trackEvent("cta_click", {
                          cta_type: "contact",
                          cta_label: c.label,
                        });
                      }}
                    >
                      <Briefcase className="h-4 w-4" /> {c.label}
                    </a>
                  </Button>
                ))}
            </motion.div>

            {/* Buy me a coffee Button with animation */}
            <motion.div
              initial={reducedMotion ? undefined : { opacity: 0, y: 10 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <Button
                asChild
                className={`h-10 rounded-lg border border-accent/50 bg-transparent px-5 text-accent hover:text-white transition-all duration-300 ease-out ${
                  reducedMotion ? "" : "hover:scale-110 hover:-translate-y-1"
                }`}
              >
                <a
                  href="https://ko-fi.com/sanukhan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                  onClick={() => {
                    trackEvent("coffee_click", { cta_type: "hero_coffee" });
                    trackEvent("cta_click", {
                      cta_type: "hero_coffee",
                      cta_label: ui.hero.coffeeCta,
                    });
                  }}
                >
                  <CoffeeIconAnimated className="h-4 w-4" />
                  <span>{ui.hero.coffeeCta}</span>
                </a>
              </Button>
            </motion.div>
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
                  className="glass-pill glass-pill--float absolute z-20 hidden lg:flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold text-secondary"
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
                fetchpriority="high"
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
