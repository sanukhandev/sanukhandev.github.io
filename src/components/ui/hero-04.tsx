import { memo } from "react";
import { ArrowRight, ArrowDownRight, MapPin } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";
import { MatrixScrambleWord } from "@/components/ui/MatrixScrambleWord";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";

export function HeroSection04() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";

  const stats = [
    {
      value: "13+",
      label: isArabic ? "سنوات الخبرة" : "Years experience",
      note: isArabic ? "أنظمة إنتاجية" : "Production systems",
    },
    {
      value: "20+",
      label: isArabic ? "أنظمة ومنصات" : "Systems & platforms",
      note: isArabic ? "تكاملات معقدة" : "High throughput",
    },
    {
      value: "7",
      label: isArabic ? "مجالات مختلفة" : "Industries",
      note: isArabic ? "تجزئة · طيران · سيارات" : "Retail · Air · Auto",
    },
    {
      value: "AE",
      label: isArabic ? "منذ 2021 · متاح" : "Since 2021 · Available",
      note: isArabic ? "عمارة وقيادة تقنية" : "Architect & Lead",
      isLocation: true,
    },
  ];

  const systemTags = isArabic
    ? ["العمارة المعمارية", "تكامل المؤسسات", "هندسة المنصات", "الذكاء الاصطناعي"]
    : ["Architecture", "Enterprise Integration", "Platform Engineering", "AI & Automation"];

  const matrixWordsEn = ["messy", "complex", "transformative", "distributed", "mission-critical"];
  const matrixWordsAr = ["تعقيدات", "تحولات", "تحديات", "توسعات"];

  return (
    <section id="home" className="xp-hero" aria-labelledby="xp-home-title">
      <div className="xp-hero-grain" aria-hidden="true" />
      <div className="xp-shell xp-hero-inner">
        <div className="xp-hero-topline">
          <span className="xp-status"><span className="xp-status-dot" />{isArabic ? "معماري حلول · هندسة المنصات" : "SOFTWARE ENGINEER · SOLUTION ARCHITECT · DUBAI, UAE"}</span>
          <span className="xp-hero-coordinates" aria-hidden="true">[REF: ENG_2026]</span>
        </div>

        <div className="xp-hero-stage">
          <div className="xp-hero-main">
            <h1 id="xp-home-title" className="xp-hero-heading">
              {isArabic ? (
                <>أصمم الأنظمة لمواجهة{" "}
                  <MatrixScrambleWord words={matrixWordsAr} isArabic={true} />{" "}الأعمال الواقعية.</>
              ) : (
                <>I design systems for{" "}
                  <MatrixScrambleWord words={matrixWordsEn} />{" "}business problems.</>
              )}
            </h1>
            <p className="xp-hero-intro">
              {isArabic
                ? "العمارة والتكامل وهندسة المنصات للأنظمة التي تحتاج للصمود أمام التعقيدات التشغيلية والتجارية الواقعية."
                : "Software engineering, architecture and integration for production systems that need to survive real-world complexity."}
            </p>
            <div className="xp-hero-cta">
              <a className="xp-pill xp-pill-primary" href="#work">
                {isArabic ? "عرض أعمالي المختارة" : "View selected work"} <ArrowRight size={18} aria-hidden="true" className="rtl:rotate-180" />
              </a>
              <a className="xp-pill xp-pill-outline" href="#about">
                {isArabic ? "نبذة عني" : "About me"} <ArrowDownRight size={18} aria-hidden="true" />
              </a>
            </div>
            <div className="xp-hero-skillline" aria-label={isArabic ? "التخصصات" : "Specializations"}>
              {systemTags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          </div>

          <figure className="xp-hero-portrait">
            <div className="xp-hero-image-wrap">
              <MediaPlaceholder kind="portrait" className="xp-hero-image" />
              <span className="xp-portrait-index" aria-hidden="true">FIG. 00 / AE</span>
            </div>
            <figcaption className="xp-portrait-caption">
              <span className="xp-portrait-caption-rule" aria-hidden="true" />
              <span className="quote-handwritten">{isArabic ? "أنظمة معقدة. قرارات واضحة. نتائج أفضل." : "Complex systems. Clear decisions. Better outcomes."}</span>
              <span className="xp-portrait-coordinates" aria-hidden="true">25.2048° N, 55.2708° E · AE</span>
            </figcaption>
          </figure>
        </div>

        <div className="xp-hero-metrics" aria-label={isArabic ? "نبذة سريعة" : "At a glance"}>
          {stats.map((stat) => (
            <div className="xp-metric" key={stat.label}>
              <div className="xp-metric-number">
                {stat.isLocation && <MapPin size={21} aria-hidden="true" />}
                <strong>{stat.value}</strong>
              </div>
              <div className="xp-metric-body"><span>{stat.label}</span><small>{stat.note}</small></div>
            </div>
          ))}
        </div>
      </div>
      <a className="xp-scroll-indicator" href="#work" aria-label={isArabic ? "انتقل إلى الأعمال المختارة" : "Scroll to selected work"}>
        <span>{isArabic ? "تمرير" : "SCROLL TO EXPLORE"}</span>
        <ArrowDownRight size={17} aria-hidden="true" />
      </a>
    </section>
  );
}

export default memo(HeroSection04);
