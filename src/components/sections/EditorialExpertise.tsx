import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { expertiseAreas } from "@/data/expertise";
import { useLocale } from "@/hooks/use-locale";

/** An asymmetric, bilingual collage with real links and selectable text. */
export function EditorialExpertise() {
  const { locale } = useLocale();
  const ar = locale === "ar";

  return (
    <section id="expertise" className="sk-expertise" aria-labelledby="sk-expertise-title">
      <div className="sk-shell">
        <header className="sk-expertise__header">
          <div>
            <p className="sk-expertise__eyebrow">{ar ? "وراء كل نظام فريق" : "SYSTEMS. PEOPLE. OUTCOMES."}</p>
            <h2 id="sk-expertise-title">
              {ar ? "أبني عبر التخصصات." : "Building across"}{" "}
              <span>{ar ? "بروح الفريق." : "boundaries."}</span>
            </h2>
          </div>
          <p className="sk-expertise__intro">
            {ar
              ? "من الشيفرة والبنية المعمارية إلى العمليات واحتياجات الأعمال: أفضل الحلول تأتي من تعاون الفرق وتكامل الخبرات."
              : "From code and architecture to operations and business context, the best solutions connect disciplines and make room for the whole team."}
          </p>
        </header>
        <div className="sk-expertise__grid">
          {expertiseAreas.map((area) => (
            <Link
              key={area.id}
              to={area.href}
              className={`sk-expertise__tile sk-expertise__tile--${area.id}`}
              aria-label={`${area.title[locale]} — ${ar ? "معرفة المزيد" : "Explore expertise"}`}
            >
              <span className="sk-expertise__number" aria-hidden="true">{area.number}</span>
              <div className="sk-expertise__tile-copy">
                <h3>{area.title[locale]}</h3>
                <p>{area.description[locale]}</p>
                <ul className="sk-expertise__tags" aria-label={ar ? "التخصصات" : "Specialties"}>
                  {area.specialties[locale].map((specialty) => <li key={specialty}>{specialty}</li>)}
                </ul>
              </div>
              <ArrowUpRight className="sk-expertise__arrow" size={22} aria-hidden="true" />
            </Link>
          ))}
        </div>
        <p className="sk-expertise__footer">
          <span aria-hidden="true">↗</span>{" "}
          {ar ? "التخصصات تتكامل. المسؤولية مشتركة." : "Cross-functional by practice. Team-first by default."}
        </p>
      </div>
    </section>
  );
}
