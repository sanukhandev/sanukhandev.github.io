import { useRef, useState } from "react";
import { useInView, useReducedMotion } from "@/hooks/useInView";

type ZaakiyBrainProps = {
  locale: "en" | "ar";
};

const connections = [
  { from: [122, 146], to: [204, 108], label: "Signals", labelAr: "الإشارات" },
  { from: [204, 108], to: [288, 142], label: "Context", labelAr: "السياق" },
  { from: [288, 142], to: [365, 108], label: "Decisions", labelAr: "القرارات" },
  { from: [204, 218], to: [290, 196], label: "Evidence", labelAr: "الأدلة" },
  { from: [290, 196], to: [374, 235], label: "Outcomes", labelAr: "النتائج" },
  { from: [164, 286], to: [245, 258], label: "Knowledge", labelAr: "المعرفة" },
  { from: [245, 258], to: [345, 294], label: "Verification", labelAr: "التحقق" },
];

const nodes = [
  [122, 146], [204, 108], [288, 142], [365, 108],
  [204, 218], [290, 196], [374, 235], [164, 286], [245, 258], [345, 294],
] as const;

export function ZaakiyBrain({ locale }: ZaakiyBrainProps) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px -15% 0px" });
  const [active, setActive] = useState<number | null>(null);
  const isArabic = locale === "ar";
  const activeLabel = active === null ? null : connections[active]?.[isArabic ? "labelAr" : "label"];

  return (
    <div
      ref={ref}
      className="zaakiy-brain"
      tabIndex={0}
      role="img"
      aria-label={isArabic
        ? "رسم تصوري للذكاء التشغيلي يربط الإشارات بالسياق والقرارات والنتائج"
        : "Conceptual operations-intelligence diagram connecting signals, context, decisions and outcomes"}
      onFocus={() => setActive(1)}
      onBlur={() => setActive(null)}
      onPointerLeave={() => setActive(null)}
    >
      <svg viewBox="0 0 500 400" aria-hidden="true" focusable="false">
        <path
          className="zaakiy-brain__outline"
          d="M249 53c-31-25-78-16-93 20-40-8-70 25-58 61-36 22-29 73 4 91-8 42 24 70 60 67 14 37 62 43 89 16 29 27 75 18 87-18 38 4 64-29 52-64 31-23 22-70-10-87 8-39-26-76-65-66-15-31-38-36-66-20Z"
        />
        <path className="zaakiy-brain__seam" d="M249 56c-13 38-13 83 0 124 13 42 13 86-1 164" />
        {connections.map((connection, index) => {
          const highlighted = active === index || (active === null && index === 1);
          return (
            <path
              key={`${connection.label}-path`}
              className={highlighted ? "zaakiy-brain__connection is-active" : "zaakiy-brain__connection"}
              d={`M ${connection.from[0]} ${connection.from[1]} C ${(connection.from[0] + connection.to[0]) / 2} ${connection.from[1] - 28}, ${(connection.from[0] + connection.to[0]) / 2} ${connection.to[1] + 28}, ${connection.to[0]} ${connection.to[1]}`}
              onPointerEnter={() => setActive(index)}
              style={{
                opacity: inView || reducedMotion ? (highlighted ? 1 : 0.44) : 0,
                transition: reducedMotion ? "none" : `opacity 0.5s ease-out ${index * 0.06}s`,
              }}
            />
          );
        })}
        {nodes.map(([cx, cy], index) => (
          <circle
            key={`${cx}-${cy}`}
            className={active !== null && [0, 1, 2, 5, 6].includes(index) ? "zaakiy-brain__node is-active" : "zaakiy-brain__node"}
            cx={cx}
            cy={cy}
            r={index === 1 || index === 5 ? 7 : 5}
            style={{
              opacity: inView || reducedMotion ? 1 : 0,
              transform: active === index ? "scale(1.45)" : "scale(1)",
              transformOrigin: `${cx}px ${cy}px`,
              transition: reducedMotion ? "none" : `opacity 0.35s ease-out ${0.3 + index * 0.04}s, transform 0.25s ease-out`,
            }}
          />
        ))}
      </svg>
      <div className="zaakiy-brain__caption" aria-live="polite">
        <span>{activeLabel ?? (isArabic ? "الإشارات ← السياق ← القرارات ← النتائج" : "Signals → Context → Decisions → Outcomes")}</span>
      </div>
      <p className="sr-only">
        {isArabic
          ? "رسم توضيحي تجريدي غير متصل بنظام حي. حرّك المؤشر أو استخدم لوحة المفاتيح لاستكشاف المسارات المفاهيمية."
          : "An abstract research visual, not connected to a live system. Move the pointer or use the keyboard to explore conceptual pathways."}
      </p>
    </div>
  );
}
