import { memo, useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Briefcase, CircleDot, MapPin } from "lucide-react";
import CoffeeIconAnimated from "@/components/CoffeeIconAnimated";
import { useSiteContent } from "@/data/siteContent";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/utils/analytics";

const metaIcons = [Briefcase, MapPin, CircleDot];

function Hero() {
  const { profile, ui } = useSiteContent();
  const reducedMotion = useReducedMotion();

  const webpAvatarUrl = profile.avatarUrl.endsWith(".avif")
    ? profile.avatarUrl.replace(/\.avif$/i, ".webp")
    : profile.avatarUrl;

  const typeLines = useMemo(() => {
    const lines = ui.hero.innovationLines?.filter(Boolean) ?? [];
    if (lines.length > 0) return lines;
    return [profile.subRole, profile.role].filter(Boolean);
  }, [ui.hero.innovationLines, profile.subRole, profile.role]);

  const [lineIndex, setLineIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (typeLines.length === 0) return;

    if (reducedMotion) {
      setText(typeLines[0]);
      return;
    }

    const current = typeLines[lineIndex % typeLines.length];

    if (!isDeleting && text === current) {
      const hold = window.setTimeout(() => setIsDeleting(true), 1200);
      return () => window.clearTimeout(hold);
    }

    if (isDeleting && text.length === 0) {
      setIsDeleting(false);
      setLineIndex((prev) => (prev + 1) % typeLines.length);
      return;
    }

    const speed = isDeleting ? 42 : 78;
    const timer = window.setTimeout(() => {
      setText((prev) =>
        isDeleting
          ? current.slice(0, Math.max(0, prev.length - 1))
          : current.slice(0, prev.length + 1),
      );
    }, speed);

    return () => window.clearTimeout(timer);
  }, [text, isDeleting, lineIndex, typeLines, reducedMotion]);

  return (
    <header id="home" className="relative overflow-hidden pt-20 sm:pt-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(52% 42% at 50% 0%, hsl(var(--primary) / 0.12), transparent 70%)",
        }}
      />

      <div className="container-narrow grid items-center gap-8 pb-12 sm:pb-16 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 14 }}
          animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <h1 className="mt-1 leading-[1.02]">
            <svg
              viewBox="0 0 220 48"
              height={48}
              className="w-[180px] sm:w-[220px]"
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
                  <stop offset="0%" stopColor="#38c755" />
                  <stop offset="35%" stopColor="#38c755" />
                  <stop offset="50%" stopColor="#b4ffca" />
                  <stop offset="65%" stopColor="#ffffff" />
                  <stop offset="80%" stopColor="#38c755" />
                  <stop offset="100%" stopColor="#38c755" />
                  <animateTransform
                    attributeName="gradientTransform"
                    type="translate"
                    values="-220 0; 220 0; -220 0"
                    keyTimes="0; 0.5; 1"
                    dur="4.5s"
                    repeatCount="indefinite"
                  />
                </linearGradient>
              </defs>
              <text
                x="0"
                y="36"
                fontFamily="Raleway, ui-sans-serif, sans-serif"
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
                fontFamily="Raleway, ui-sans-serif, sans-serif"
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
                fontFamily="Raleway, ui-sans-serif, sans-serif"
                fontSize="26"
                fontWeight="500"
                fill="#38c755"
                opacity="0.8"
              >
                .dev
              </text>
            </svg>
          </h1>

          <p className="mt-2 min-h-[24px] font-body text-[14px] tracking-[0.08em] text-accent">
            {text}
            {!reducedMotion ? <span className="typewriter-caret" aria-hidden>|</span> : null}
          </p>

          <p className="mt-5 max-w-xl font-body text-[16px] leading-relaxed text-primary">
            {profile.subtitle}
          </p>
          <p className="mt-2 max-w-xl font-body text-[15px] leading-relaxed text-secondary">
            {profile.statement}
          </p>

          <ul className="mt-6 space-y-2 font-body text-sm text-secondary">
            {profile.meta.map((m, i) => {
              const Icon = metaIcons[i % metaIcons.length];
              return (
                <li key={m} className="flex items-center gap-2.5">
                  <Icon className="h-3.5 w-3.5 shrink-0 text-accent/70" />
                  {m}
                </li>
              );
            })}
          </ul>

          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
            {profile.impactMetrics.map((metric) => (
              <div key={metric.label} className="flex items-baseline gap-2">
                <span className="font-display text-xl font-bold text-accent">
                  {metric.value}
                </span>
                <span className="micro-label text-secondary opacity-75">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {profile.ctas
              .filter((cta) => cta.variant === "hire")
              .map((c) => (
                <Button
                  key={c.label}
                  asChild
                  className="h-10 rounded-lg border border-accent/50 bg-transparent px-5 text-accent transition-all duration-300 hover:-translate-y-0.5 hover:text-white"
                >
                  <a
                    href={c.href}
                    className="inline-flex items-center gap-2 font-body"
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

            <Button
              asChild
              className="h-10 rounded-lg border border-accent/50 bg-transparent px-5 text-accent transition-all duration-300 hover:-translate-y-0.5 hover:text-white"
            >
              <a
                href="https://ko-fi.com/sanukhan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-body"
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
          </div>
        </motion.div>

        <motion.div
          className="mx-auto w-full max-w-sm"
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
        >
          <div className="relative rounded-[28px] border border-default/70 bg-secondary/25 p-4">
            <div className="avatar-halo" />
            <picture>
              <source type="image/avif" srcSet={profile.avatarUrl} />
              <source type="image/webp" srcSet={webpAvatarUrl} />
              <img
                src={profile.avatarUrl}
                alt={`${profile.name} portrait`}
                className="relative z-10 w-full object-contain"
                {...({ fetchpriority: "high" } as any)}
                decoding="async"
                width={640}
                height={640}
              />
            </picture>
          </div>
        </motion.div>
      </div>
    </header>
  );
}

export default memo(Hero);
