import { MapPin, Briefcase, CircleDot, Download } from "lucide-react";
import { profile } from "@/data/siteData";
import { Button } from "@/components/ui/button";
import TechParticles from "@/components/TechParticles";

const metaIcons = [Briefcase, MapPin, CircleDot];

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-16 sm:pt-20">
      {/* Subtle radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, hsl(var(--primary) / 0.12), transparent 70%)",
        }}
      />

      {/* Floating tech icon particles */}
      <TechParticles count={24} />

      <div className="container-narrow grid items-center gap-6 pb-12 lg:grid-cols-[1.2fr_1fr]">
        <div className="animate-fade-up-stagger">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#2b2f3b] bg-[#16171d] px-3 py-1 text-xs font-semibold text-[#38c755]">
            <span className="h-1.5 w-1.5 rounded-full bg-tea-green-400" />
            13+ Years of Engineering Leadership
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
            {profile.impactMetrics.map((s) => (
              <div key={s.label} className="premium-card px-3 py-4 text-center">
                <div className="text-[28px] font-extrabold text-[#38c755]">
                  {s.value}
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-wide text-[#8a90a8]">
                  {s.label}
                </div>
              </div>
            ))}
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
              ) : (
                <Button
                  key={c.label}
                  asChild
                  variant="outline"
                  className="h-10 rounded-lg border-[#2b2f3b] bg-[#16171d] text-[#f0f1f4] hover:scale-[1.02] hover:bg-[#20222b]"
                >
                  <a href={c.href} className="inline-flex items-center gap-2">
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
            <img
              src={profile.avatarUrl}
              alt={`${profile.name} portrait`}
              className="relative z-10 w-full object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div aria-hidden className="innovation-label">
            <span>Building</span>
            <span>Innovations</span>
            <span>since 2011</span>
          </div>
        </div>
      </div>
    </section>
  );
}
