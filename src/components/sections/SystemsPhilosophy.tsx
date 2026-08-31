import { useLocale } from "@/hooks/use-locale";
import { ShieldCheck, RefreshCw, Activity } from "lucide-react";

export default function SystemsPhilosophy() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";

  const principles = [
    {
      id: "design-for-reality",
      title: "DESIGN FOR REALITY",
      description:
        "Architecture starts with actual business constraints, failure modes and operational requirements.",
      icon: ShieldCheck,
    },
    {
      id: "build-for-change",
      title: "BUILD FOR CHANGE",
      description:
        "Clear boundaries, contracts and ownership allow systems to evolve without constant rewrites.",
      icon: RefreshCw,
    },
    {
      id: "operate-by-design",
      title: "OPERATE BY DESIGN",
      description:
        "Observability, deployment, recovery and support are architecture concerns — not afterthoughts.",
      icon: Activity,
    },
  ];

  return (
    <section id="philosophy" className="section-pad bg-secondary/10 scroll-mt-20">
      <div id="principles" className="container-narrow">
        {/* Headline & Supporting Copy */}
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-2">
            SYSTEMS PHILOSOPHY
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-primary leading-tight">
            {isArabic
              ? "الأنظمة هي منتجات. والعمليات هي الواجهة."
              : "Systems Are Products. Operations Are The Interface."}
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-secondary font-medium">
            {isArabic
              ? "الهندسة المعمارية الجيدة ليست مجرد مخطط. إنها نظام يظل مفهوماً ومراقَباً وقابلاً للتشغيل بعد وصوله إلى بيئة الإنتاج."
              : "Good architecture isn't a diagram. It's a system that remains understandable, observable and operable after it reaches production."}
          </p>
        </div>

        {/* 3 Minimal Principles */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {principles.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.id}
                className="rounded-2xl border border-border/70 bg-background/60 p-6 sm:p-7 shadow-sm"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent mb-4">
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-accent mb-2">
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed text-secondary font-normal">
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
