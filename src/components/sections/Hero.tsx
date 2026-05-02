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
import { Button } from "@/components/ui/button";
import TechParticles from "@/components/TechParticles";
import { trackEvent } from "@/utils/analytics";

const metaIcons = [Briefcase, MapPin, CircleDot];

const metricIcons: Record<string, ComponentType<{ className?: string }>> = {
  "Years Experience": Clock,
  "Systems Delivered": Rocket,
  "Markets Served": Globe2,
  "Product Scale Systems": TrendingUp,
};

const floatingBadges = [
  { icon: Layers,       label: "Microservices",  top: "8%",  left: "-14%" },
  { icon: Globe2,       label: "MENA & Global",  top: "30%", right: "-14%" },
  { icon: Award,        label: "13+ Yrs",         bottom: "30%", left: "-14%" },
  { icon: CalendarCheck,label: "Since 2011",      bottom: "10%", right: "-10%" },
  { icon: Users,        label: "100+ Clients",   top: "58%", left: "-12%" },
];

export default function Hero() {
  const { profile, ui } = useSiteContent();
  const { locale } = useLocale();
  const isArabic = locale === "ar";

  const floatingBadgesLocalized = floatingBadges.map((badge, index) => ({
    ...badge,
    label: ui.hero.floatingBadges[index] ?? badge.label,
  }));

  return (
    <section id="home" className="relative overflow-hidden pt-16 sm:pt-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, hsl(var(--primary) / 0.12), transparent 70%)",
        }}
      />

      <TechParticles count={24} />

      <div className="container-narrow grid items-center gap-6 pb-12 lg:grid-cols-[1.2fr_1fr]">
        <div className="animate-fade-up-stagger">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#2b2f3b] bg-[#16171d] px-3 py-1 text-xs font-semibold text-[#38c755]">
            <span className="h-1.5 w-1.5 rounded-full bg-tea-green-400" />
            {ui.hero.leadershipBadge}
          </span>

          <p className="text-[14px] font-semibold uppercase tracking-[0.08em] text-[#8a90a8]">
            {profile.role}
          </p>
          <h1 className="mt-3 text-[42px] font-extrabold leading-[1.06] text-[#f0f1f4] sm:text-[48px]">
            {profile.name}
          </h1>

          <p className="mt-4 max-w-2xl text-[16px] text-[#f0f1f4]">
            {profile.subtitle}
          </p>
          <p className="mt-2 max-w-2xl text-[15px] text-[#8a90a8]">
            {profile.statement}
          </p>

          <ul className="mt-6 space-y-2 text-sm text-[#8a90a8]">
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
                <div key={s.label} className="premium-card flex flex-col items-center px-3 py-4 text-center">
                  <Icon className="mb-1.5 h-4 w-4 text-[#38c755]/70" />
                  <div className="text-[28px] font-extrabold text-[#38c755]">
                    {s.value}
                  </div>
                  <div className="mt-1 text-[11px] uppercase tracking-wide text-[#8a90a8]">
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
                  className="h-10 rounded-lg bg-[#38c755] px-5 text-[#0f1015] hover:scale-[1.02] hover:bg-[#4fd16a]"
                >
                  <a href={c.href}>{c.label}</a>
                </Button>
              ) : c.variant === "hire" ? (
                <Button
                  key={c.label}
                  asChild
                  className="h-10 rounded-lg border border-[#38c755]/60 bg-[#38c755]/10 px-5 text-[#38c755] hover:scale-[1.02] hover:bg-[#38c755]/20"
                >
                  <a
                    href={c.href}
                    className="inline-flex items-center gap-2"
                    onClick={() => trackEvent("hire_me_click", { cta_type: "hire" })}
                  >
                    <Briefcase className="h-4 w-4" /> {c.label}
                  </a>
                </Button>
              ) : (
                <Button
                  key={c.label}
                  asChild
                  variant="outline"
                  className="h-10 rounded-lg border-[#2b2f3b] bg-[#16171d] text-[#f0f1f4] hover:scale-[1.02] hover:bg-[#20222b]"
                >
                  <a
                    href={c.href}
                    className="inline-flex items-center gap-2"
                    onClick={() => trackEvent("resume_view", { cta_type: "resume" })}
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
                  className="absolute z-20 hidden lg:flex items-center gap-1.5 rounded-full border border-[#2b2f3b] bg-[#16171d]/90 px-2.5 py-1 text-[11px] font-semibold text-[#8a90a8] shadow-lg backdrop-blur-sm"
                  style={{
                    top: b.top,
                    bottom: b.bottom,
                    left: b.left,
                    right: b.right,
                  }}
                >
                  <Icon className="h-3 w-3 text-[#38c755]" />
                  {b.label}
                </div>
              );
            })}

            <img
              src={profile.avatarUrl}
              alt={`${profile.name} portrait`}
              className="relative z-10 w-full object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div aria-hidden className="innovation-label">
            <span>{ui.hero.innovationLines[0]}</span>
            <span>{ui.hero.innovationLines[1]}</span>
            <span>{ui.hero.innovationLines[2]}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
