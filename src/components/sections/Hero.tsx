import { Zap, MapPin, Briefcase, CircleDot, Download } from "lucide-react";
import { profile } from "@/data/siteData";
import { Button } from "@/components/ui/button";

const metaIcons = [Briefcase, MapPin, CircleDot];

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-28 sm:pt-32">
      {/* Subtle radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, hsl(var(--primary) / 0.12), transparent 70%)",
        }}
      />

      <div className="container-narrow grid items-center gap-10 pb-20 lg:grid-cols-[1.2fr_1fr]">
        <div className="animate-fade-up">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-tea-green-500/40 bg-tea-green-500/10 px-3 py-1 text-xs font-semibold text-tea-green-300">
            <span className="h-1.5 w-1.5 rounded-full bg-tea-green-400" />
            Available for new projects
          </span>

          <h1 className="flex flex-wrap items-center gap-3 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            {profile.greeting}
            <Zap className="h-8 w-8 text-tea-green-400 sm:h-10 sm:w-10" />
          </h1>

          <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            {profile.tagline}
          </p>

          <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
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

          <div className="mt-8 grid max-w-md grid-cols-3 gap-3">
            {profile.stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-border bg-card px-3 py-4 text-center"
              >
                <div className="text-2xl font-bold text-tea-green-400">{s.value}</div>
                <div className="mt-1 text-[11px] uppercase tracking-wide text-muted-foreground">
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
                  className="bg-tea-green-500 text-jet-black-950 hover:bg-tea-green-400"
                >
                  <a href={c.href}>{c.label}</a>
                </Button>
              ) : (
                <Button
                  key={c.label}
                  asChild
                  variant="outline"
                  className="border-border bg-transparent text-foreground hover:bg-secondary"
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
          <img
            src={profile.avatarUrl}
            alt={`${profile.name} portrait`}
            className="w-full object-contain"
          />
          <div className="mt-3 text-center text-xs font-semibold text-tea-green-300 sm:text-sm">
            Building Innovations since 2011
          </div>
        </div>
      </div>
    </section>
  );
}
