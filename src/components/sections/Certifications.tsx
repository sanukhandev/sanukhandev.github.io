import { useMemo, useState } from "react";
import { Award, ExternalLink } from "lucide-react";
import { certifications } from "@/data/siteData";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 3;

export default function Certifications() {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(certifications.length / PAGE_SIZE));

  const paged = useMemo(
    () => certifications.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [page],
  );

  return (
    <section className="section-pad">
      <div className="container-narrow">
        <SectionHeading
          title="Licenses & Certifications"
          subtitle="Continuously leveling up."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {paged.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-tea-green-500/40"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-tea-green-500/15 text-tea-green-400">
                  <Award className="h-4 w-4" />
                </span>
                <span className="text-xs font-semibold text-muted-foreground">{c.issuer}</span>
              </div>
              <h3 className="text-sm font-semibold leading-snug">{c.title}</h3>
              <a
                href={c.url}
                className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-tea-green-400 hover:text-tea-green-300"
              >
                View Certificate <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-1.5">
          {Array.from({ length: totalPages }).map((_, i) => {
            const n = i + 1;
            return (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={cn(
                  "h-8 min-w-8 rounded-full px-3 text-xs font-semibold transition-colors",
                  page === n
                    ? "bg-tea-green-500 text-jet-black-950"
                    : "border border-border bg-card text-muted-foreground hover:text-foreground",
                )}
              >
                {n}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
