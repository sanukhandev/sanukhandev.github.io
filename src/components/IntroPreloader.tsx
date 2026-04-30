import { CSSProperties } from "react";
import { useLocale } from "@/hooks/use-locale";

const PARTICLE_COUNT = 22;

const particleStyle = (index: number): CSSProperties => {
  const left = (index * 37) % 100;
  const drift = ((index % 2 === 0 ? 1 : -1) * (12 + (index % 5) * 7)).toFixed(0);
  const delay = (index % 9) * 0.35;
  const duration = 16 + (index % 6) * 3.1;
  const opacity = 0.08 + (index % 5) * 0.025;
  const size = 3 + (index % 4) * 1.5;

  return {
    left: `${left}%`,
    bottom: `-${8 + (index % 6) * 2}%`,
    width: `${size}px`,
    height: `${size}px`,
    ["--p-dur" as string]: `${duration}s`,
    ["--p-delay" as string]: `${delay}s`,
    ["--p-op" as string]: `${opacity.toFixed(2)}`,
    ["--p-drift" as string]: `${drift}px`,
  } as CSSProperties;
};

export default function IntroPreloader() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";

  const loadingIntroLabel = isArabic ? "جارٍ تحميل المقدمة" : "Loading intro";

  return (
    <div className="preloader-screen" role="status" aria-live="polite" aria-label={loadingIntroLabel}>
      <div className="preloader-grid" aria-hidden />

      <div className="preloader-particles" aria-hidden>
        {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
          <span key={`particle-${i}`} className="tech-particle preloader-particle" style={particleStyle(i)} />
        ))}
      </div>

      <div className="preloader-content">
        <div className="preloader-logo-wrap">
          <span className="preloader-logo-accent" aria-hidden />
          <span className="preloader-logo-main">SanuKhan</span>
          <span className="preloader-logo-dot">.dev</span>
        </div>

        <p className="preloader-message">
          {isArabic
            ? "جارٍ تجهيز تجربة تقنية سريعة وذكية لك..."
            : "Booting a fast, architecture-first portfolio experience..."}
        </p>
        <p className="preloader-submessage">
          {isArabic ? "هندسة، أداء، وتأثير." : "Architecture. Velocity. Impact."}
        </p>
      </div>
    </div>
  );
}
