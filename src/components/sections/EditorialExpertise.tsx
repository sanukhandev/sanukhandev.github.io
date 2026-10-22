import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useSectionData } from "@/lib/i18n";
import { useLocale } from "@/hooks/use-locale";

/**
 * EditorialExpertise — 07 / Building Across Boundaries
 * 2026 Calm Precision capability grid: Built to Connect. Designed to Scale.
 */
export function EditorialExpertise() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  const exp = useSectionData("expertise");

  return (
    <section
      id="expertise"
      className="relative w-full bg-[#09090B] text-[#FAFAFA] py-20 sm:py-24 md:py-28"
      aria-labelledby="sk-expertise-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-[#D5360C] text-sm">✳</span>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E6D5BD]">
                {exp.badge}
              </span>
            </div>
            <h2
              id="sk-expertise-title"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.05]"
            >
              {exp.heading1}
              <br />
              <span className="text-[#D5360C]">{exp.heading2}</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
            {exp.lead}
          </p>
        </header>

        {/* Consistent Obsidian Cards Grid with Specular Borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 pt-12 sm:pt-14">
          {exp.areas.map((area, index) => {
            const isFeatured = index === 0;

            return (
              <Link
                key={area.id}
                to={area.href}
                className={`group relative flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#121215]/90 p-6 sm:p-7 backdrop-blur-xl shadow-xl shadow-black/40 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D5360C]/50 hover:shadow-2xl ${
                  isFeatured ? "md:col-span-2 lg:col-span-2" : "col-span-1"
                }`}
                aria-label={`${area.title} — ${ar ? "معرفة المزيد" : "Explore expertise"}`}
              >
                {/* Corner registration crosshairs for architectural precision */}
                <div aria-hidden="true" className="absolute top-2.5 start-3 text-[10px] font-mono text-white/20 select-none">+</div>
                <div aria-hidden="true" className="absolute top-2.5 end-3 text-[10px] font-mono text-white/20 select-none">+</div>

                <div>
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08]">
                    <span className="text-xs font-mono font-bold text-[#AD2A09] dark:text-[#E6D5BD] tracking-widest tabular-nums">
                      {area.number} ✳
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all rtl:rotate-90" />
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-white mb-2.5">
                    {area.title}
                  </h3>

                  <p className="text-xs sm:text-[13.5px] leading-relaxed text-zinc-300 font-normal">
                    {area.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/[0.08]">
                  <ul
                    className="flex flex-wrap gap-2 text-[11px] font-mono text-zinc-400 uppercase tracking-wider"
                    aria-label={ar ? "التخصصات" : "Specialties"}
                  >
                    {area.specialties.map((specialty) => (
                      <li
                        key={specialty}
                        className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-[#E6D5BD]"
                      >
                        {specialty}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="pt-10 flex items-center gap-2 text-xs font-mono text-zinc-400">
          <span className="text-[#D5360C]">↗</span>
          <span>
            {ar
              ? "التخصصات تتكامل. والمسؤولية الهندسية مشتركة."
              : "Cross-functional by practice. Architecture-driven by default."}
          </span>
        </div>
      </div>
    </section>
  );
}
