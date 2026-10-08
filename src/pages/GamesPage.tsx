import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Gamepad2,
  Grid3X3,
  Cpu,
  Sparkles,
  Trophy,
  Clock,
  ArrowRight,
  Zap,
  Flame,
  ChevronRight,
  Swords,
  Crown,
  Move,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import SeoMeta from "@/components/SeoMeta";
import { buildBreadcrumbListSchema } from "@/lib/schema";
import { useLocale } from "@/hooks/use-locale";
import { getLocalizedPageSeo } from "@/lib/seo";
import { getScores, getPersonalBest, type GameScore } from "@/lib/gameStore";

// 64-square opening preview for Chess vs Zaakiy (Italian Game position: 1. e4 e5 2. Nf3 Nc6 3. Bc4)
const CHESS_PREVIEW_PIECES: Array<{ symbol: string; color: "w" | "b" | null }> = [
  // Rank 8
  { symbol: "♜", color: "b" }, { symbol: "", color: null }, { symbol: "♝", color: "b" }, { symbol: "♛", color: "b" },
  { symbol: "♚", color: "b" }, { symbol: "♝", color: "b" }, { symbol: "♞", color: "b" }, { symbol: "♜", color: "b" },
  // Rank 7
  { symbol: "♟", color: "b" }, { symbol: "♟", color: "b" }, { symbol: "♟", color: "b" }, { symbol: "♟", color: "b" },
  { symbol: "", color: null }, { symbol: "♟", color: "b" }, { symbol: "♟", color: "b" }, { symbol: "♟", color: "b" },
  // Rank 6
  { symbol: "", color: null }, { symbol: "", color: null }, { symbol: "♞", color: "b" }, { symbol: "", color: null },
  { symbol: "", color: null }, { symbol: "", color: null }, { symbol: "", color: null }, { symbol: "", color: null },
  // Rank 5
  { symbol: "", color: null }, { symbol: "", color: null }, { symbol: "", color: null }, { symbol: "", color: null },
  { symbol: "♟", color: "b" }, { symbol: "", color: null }, { symbol: "", color: null }, { symbol: "", color: null },
  // Rank 4
  { symbol: "", color: null }, { symbol: "", color: null }, { symbol: "♗", color: "w" }, { symbol: "", color: null },
  { symbol: "♙", color: "w" }, { symbol: "", color: null }, { symbol: "", color: null }, { symbol: "", color: null },
  // Rank 3
  { symbol: "", color: null }, { symbol: "", color: null }, { symbol: "", color: null }, { symbol: "", color: null },
  { symbol: "", color: null }, { symbol: "♘", color: "w" }, { symbol: "", color: null }, { symbol: "", color: null },
  // Rank 2
  { symbol: "♙", color: "w" }, { symbol: "♙", color: "w" }, { symbol: "♙", color: "w" }, { symbol: "♙", color: "w" },
  { symbol: "", color: null }, { symbol: "♙", color: "w" }, { symbol: "♙", color: "w" }, { symbol: "♙", color: "w" },
  // Rank 1
  { symbol: "♖", color: "w" }, { symbol: "♘", color: "w" }, { symbol: "♗", color: "w" }, { symbol: "♕", color: "w" },
  { symbol: "♔", color: "w" }, { symbol: "", color: null }, { symbol: "", color: null }, { symbol: "♖", color: "w" },
];

export default function GamesPage() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";
  const seo = getLocalizedPageSeo("gamesIndex", locale);

  const [topScores, setTopScores] = useState<GameScore[]>([]);
  const [personalBest, setPersonalBest] = useState<GameScore | null>(null);

  useEffect(() => {
    setTopScores(getScores("rabbit-hole").slice(0, 5));
    setPersonalBest(getPersonalBest("rabbit-hole"));
  }, []);

  const todayStr = useMemo(() => new Date().toISOString().slice(0, 10), []);

  return (
    <>
      <SeoMeta
        title={seo.title}
        description={seo.description}
        canonicalPath={seo.canonicalPath}
        keywords={seo.keywords}
        schema={buildBreadcrumbListSchema([
          { name: isArabic ? "الرئيسية" : "Home", path: "/" },
          { name: isArabic ? "الألعاب" : "Games", path: "/games" },
        ])}
      />

      <Navbar />

      <main className="min-h-screen bg-background pt-24 md:pt-28 pb-16 text-foreground relative overflow-hidden">
        {/* Ambient architectural atmosphere */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(20,122,58,0.14),transparent_70%)] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(86,200,120,0.10),transparent_70%)]"
        />

        <div className="container-narrow space-y-12 md:space-y-16">
          {/* Header section with drafting hierarchy */}
          <header className="border-b border-border/60 pb-8 relative">
            {/* Corner Drafting Crosshairs */}
            <span
              aria-hidden="true"
              className="absolute top-0 right-0 font-mono text-[11px] text-accent/40 select-none pointer-events-none"
            >
              +
            </span>

            {/* Breadcrumb row */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-xs font-mono text-secondary mb-4"
            >
              <Link to="/" className="hover:text-accent font-medium transition-colors">
                {isArabic ? "الرئيسية" : "Home"}
              </Link>
              <ChevronRight className="h-3 w-3 rtl:rotate-180 opacity-60" />
              <span className="text-accent font-bold">
                {isArabic ? "الألعاب والتجارب" : "Games"}
              </span>
            </nav>

            {/* Eyebrow Kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-accent font-bold mb-3">
              <Gamepad2 className="h-4 w-4" />
              <span>
                {isArabic
                  ? "01 — مختبر الألعاب التفاعلية // تجارب التركيز"
                  : "01 — INTERACTIVE ARCADE // COGNITIVE LAB & FOCUS EXPERIMENTS"}
              </span>
              <span className="inline-flex items-center gap-1.5 ml-2 rounded-full border border-accent/40 bg-accent/15 px-2.5 py-0.5 text-[10px] font-mono text-accent font-bold">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                {isArabic ? "مباشر" : "SYSTEM ONLINE"}
              </span>
            </div>

            {/* Editorial Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-primary">
              {isArabic ? (
                <>
                  ألعاب وألغاز يومية تفاعلية<span className="text-accent">.</span>
                </>
              ) : (
                <>
                  Tactile Daily Games<span className="text-accent">.</span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="mt-4 text-base sm:text-lg text-secondary leading-relaxed max-w-2xl font-normal">
              {isArabic
                ? "ألغاز خوارزمية وتجارب تفاعلية سريعة صُممت للمهندسين والمفكرين وحلالي المشكلات. أعد شحن تركيزك الذهني، واختبر سرعتك، وتنافس في لوحة الشرف اليومية."
                : "Algorithmic puzzles and focus-reset experiments built for software engineers, architects, and problem solvers. Reset your mental state, benchmark spatial speed, and claim your spot on the board."}
            </p>

            {/* Live Telemetry Pills */}
            <div className="mt-6 flex flex-wrap gap-2.5 sm:gap-3 text-xs font-mono">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-foreground font-semibold shadow-xs">
                <Clock className="h-3.5 w-3.5 text-accent" />
                <span>{isArabic ? "تحديث يومي: 00:00 UTC" : "RESET: 00:00 UTC"}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-foreground font-semibold shadow-xs">
                <Zap className="h-3.5 w-3.5 text-accent" />
                <span>{isArabic ? "استجابة فورية: عميل محلي" : "LATENCY: ZERO (CLIENT-SIDE)"}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-foreground font-semibold shadow-xs">
                <Trophy className="h-3.5 w-3.5 text-accent" />
                <span>{isArabic ? "لوحة المتصدرين: نشطة" : "LEADERBOARD: ACTIVE"}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-foreground font-semibold shadow-xs">
                <Flame className="h-3.5 w-3.5 text-accent" />
                <span>
                  {isArabic ? `لغز اليوم: ${todayStr}` : `CIRCUIT DATE: ${todayStr}`}
                </span>
              </span>
            </div>
          </header>

          {/* Games Showcase Grid */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-primary tracking-tight">
                  {isArabic ? "الألعاب المتاحة وقيد التطوير" : "Active & In-Development Catalog"}
                </h2>
                <p className="text-sm text-secondary mt-1">
                  {isArabic
                    ? "اختر لغزاً لتحدي الذاكرة المكانية وسرعة المعالجة."
                    : "Select a game to challenge spatial memory, sequence routing, and cognitive speed."}
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="group relative rounded-2xl border border-accent/40 bg-card p-6 shadow-sm hover:border-accent transition-all duration-300 flex flex-col justify-between">
                <div><div className="flex items-center justify-between gap-2 mb-4"><span className="inline-flex items-center gap-1.5 rounded-md border border-accent/30 bg-accent/10 px-2.5 py-1 text-xs font-mono font-bold text-accent uppercase"><Crown className="h-3.5 w-3.5" /> 8×8 · RANDOM CLUES</span><span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-accent"><span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" /> LIVE</span></div><h3 className="text-2xl font-extrabold text-primary tracking-tight group-hover:text-accent transition-colors">The Queens Problem</h3><p className="mt-1 text-xs font-mono text-muted-foreground">Colored queens // tactical placement</p><p className="mt-4 text-sm text-secondary leading-relaxed">Place eight queens without letting any attack another. Every new pattern arrives with a fresh randomized clue layout.</p></div><div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-end"><Link to="/games/queens-problem" className="inline-flex items-center gap-2 rounded-lg bg-accent text-white dark:text-[#0C100D] px-4 py-2 text-xs font-bold font-mono tracking-wider uppercase hover:opacity-90 transition-all">Solve queens <ArrowRight className="h-3.5 w-3.5" /></Link></div>
              </div>
              {/* Card 1: Rabbit Hole (Drag-to-Draft Trail Puzzle) */}
              <div className="group relative rounded-2xl border border-border/80 bg-card p-6 shadow-sm hover:border-accent/60 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                <span
                  aria-hidden="true"
                  className="absolute top-2.5 right-2.5 font-mono text-[10px] text-accent/40 select-none pointer-events-none"
                >
                  +
                </span>

                <div>
                  {/* Status & Category */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-accent/40 bg-accent/10 px-2.5 py-1 text-xs font-mono font-bold text-accent uppercase">
                      <Grid3X3 className="h-3.5 w-3.5" />
                      {isArabic ? "شبكة 7×7 · مسار بالسحب" : "7×7 GRID · DRAG-TO-DRAFT"}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-accent">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                      {isArabic ? "تحدي اليوم مباشر" : "DAILY #1 · LIVE"}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-extrabold text-primary tracking-tight group-hover:text-accent transition-colors">
                    Rabbit Hole
                  </h3>
                  <p className="mt-1 text-xs font-mono text-secondary flex items-center gap-1.5 font-medium">
                    <Move className="h-3 w-3 text-accent" />
                    <span>
                      {isArabic
                        ? "اسحب بحرية لتخطيط مسارك الخاص عبر 49 مربعاً"
                        : "Drag to draft your custom continuous path"}
                    </span>
                  </p>

                  {/* Description */}
                  <p className="mt-4 text-sm text-secondary leading-relaxed font-normal">
                    {isArabic
                      ? "اسحب بالفأرة أو باللمس لرسم مسارك الخوارزمي الخاص عبر 49 مربعاً. تنقل بمرونة، وتراجع عند اللزوم، وتجنب الانغلاق للوصول إلى المسار الهاملتوني الكامل."
                      : "Drag smoothly across tiles to draft your custom route through the 49-cell matrix. Steer freely, backtrack to reroute, and solve the full Hamiltonian circuit without getting trapped."}
                  </p>

                  {/* Mini Visual Simulation Matrix */}
                  <div
                    aria-hidden="true"
                    className="mt-5 rounded-xl border border-border/80 bg-secondary/30 p-3 select-none"
                  >
                    <div className="text-[10px] font-mono text-secondary font-semibold mb-2 flex items-center justify-between">
                      <span>{isArabic ? "معاينة مسار السحب" : "DRAG TRAIL SIMULATION"}</span>
                      <span className="text-accent font-bold">49 CELLS</span>
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {Array.from({ length: 49 }, (_, idx) => {
                        const isSampleTrail = [0, 1, 2, 3, 4, 5, 6, 13, 12, 11, 10, 9, 8, 7, 14, 15, 16, 17, 18].includes(idx);
                        const isHead = idx === 18;
                        return (
                          <div
                            key={idx}
                            className={`aspect-square rounded-[3px] transition-colors duration-300 ${
                              isHead
                                ? "bg-accent shadow-[0_0_8px_rgba(86,200,120,0.8)] animate-pulse"
                                : isSampleTrail
                                ? "bg-accent/70"
                                : "bg-border/60"
                            }`}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Game Specs */}
                  <div className="mt-5 grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="rounded-lg border border-border/80 bg-card p-2.5">
                      <span className="text-[10px] uppercase text-secondary font-semibold block">
                        {isArabic ? "طريقة التحكم" : "CONTROL"}
                      </span>
                      <span className="font-extrabold text-foreground text-xs">DRAG & DRAFT</span>
                    </div>
                    <div className="rounded-lg border border-border/80 bg-card p-2.5">
                      <span className="text-[10px] uppercase text-secondary font-semibold block">
                        {isArabic ? "الصعوبة" : "DIFFICULTY"}
                      </span>
                      <span className="font-extrabold text-accent text-xs">HAMILTONIAN</span>
                    </div>
                  </div>
                </div>

                {/* Card CTA */}
                <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
                  <div className="text-xs font-mono text-secondary">
                    {personalBest ? (
                      <span className="text-accent font-bold">
                        {isArabic
                          ? `أفضل وقت: ${(personalBest.completionTime / 1000).toFixed(1)} ث`
                          : `PB: ${(personalBest.completionTime / 1000).toFixed(1)}s`}
                      </span>
                    ) : (
                      <span className="font-medium">{isArabic ? "لم تسجل بعد" : "No PB yet"}</span>
                    )}
                  </div>
                  <Link
                    to="/games/rabbit-hole"
                    className="inline-flex items-center gap-2 rounded-lg bg-accent text-white dark:text-[#0C100D] px-4 py-2 text-xs font-bold font-mono tracking-wider uppercase hover:opacity-95 shadow-xs transition-all"
                  >
                    <span>{isArabic ? "ابدأ الرسم" : "Draft Trail"}</span>
                    <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Card 2: Chess vs Zaakiy (with Tactical Diagram Preview) */}
              <div className="group relative rounded-2xl border border-border/80 bg-card p-6 shadow-sm hover:border-accent/60 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                <span
                  aria-hidden="true"
                  className="absolute top-2.5 right-2.5 font-mono text-[10px] text-accent/40 select-none pointer-events-none"
                >
                  +
                </span>

                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-accent/40 bg-accent/10 px-2.5 py-1 text-xs font-mono font-bold text-accent uppercase">
                      <Swords className="h-3.5 w-3.5" />
                      {isArabic ? "شطرنج · وكيل الذكاء الاصطناعي" : "CHESS · AGENTIC AI"}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-accent">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                      {isArabic ? "مباشر" : "LIVE ENGINE"}
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-primary tracking-tight group-hover:text-accent transition-colors">
                    Chess vs Zaakiy
                  </h3>
                  <p className="mt-1 text-xs font-mono text-secondary font-medium">
                    {isArabic ? "استراتيجية بشرية // رد ذكاء اصطناعي" : "Human strategy // AI agent response"}
                  </p>

                  <p className="mt-4 text-sm text-secondary leading-relaxed font-normal">
                    {isArabic
                      ? "العب بالقطع البيضاء ضد وكيل زاكي. يتلقى الذكاء الاصطناعي موقع اللوحة الحالي والنقلات القانونية ويرد بنقلة تكتيكية معتمدة."
                      : "Play white against the Zaakiy agent. The engine evaluates position FEN states and legal moves, returning validated moves through the agentic API."}
                  </p>

                  {/* 8x8 Chessboard Tactical Diagram Preview */}
                  <div
                    aria-hidden="true"
                    className="mt-5 rounded-xl border border-border/80 bg-secondary/30 p-3 select-none"
                  >
                    <div className="text-[10px] font-mono text-secondary font-semibold mb-2 flex items-center justify-between">
                      <span>{isArabic ? "معاينة الرقعة التكتيكية" : "TACTICAL OPENING APERTURE"}</span>
                      <span className="text-accent font-bold">8×8 · ITALIAN GAME</span>
                    </div>

                    <div className="grid grid-cols-8 gap-0.5 rounded-lg overflow-hidden border border-border/80 bg-border/40 p-1 max-w-[240px] mx-auto shadow-xs">
                      {CHESS_PREVIEW_PIECES.map((sq, idx) => {
                        const isDark = (Math.floor(idx / 8) + (idx % 8)) % 2 === 1;
                        const isHighlighted = idx === 36 || idx === 45; // e4 and Nf3
                        return (
                          <div
                            key={idx}
                            className={`aspect-square rounded-[2px] flex items-center justify-center text-[12px] sm:text-[13px] font-bold leading-none transition-all ${
                              isHighlighted
                                ? "bg-accent/40 ring-1 ring-accent"
                                : isDark
                                ? "bg-accent/20 dark:bg-[#142d1c]"
                                : "bg-card dark:bg-[#203c2a]"
                            }`}
                          >
                            {sq.symbol && (
                              <span
                                className={
                                  sq.color === "w"
                                    ? "text-primary dark:text-[#F4F7F5] font-black drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]"
                                    : "text-foreground/90 dark:text-[#111814] font-black drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]"
                                }
                              >
                                {sq.symbol}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono text-secondary font-medium px-1">
                      <span>WHITE: SANU</span>
                      <span className="text-accent font-bold">1. e4 e5 2. Nf3 Nc6</span>
                      <span>BLACK: ZAAKIY</span>
                    </div>
                  </div>

                  {/* Game Specs */}
                  <div className="mt-5 grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="rounded-lg border border-border/80 bg-card p-2.5">
                      <span className="text-[10px] uppercase text-secondary font-semibold block">
                        {isArabic ? "الخصم" : "OPPONENT"}
                      </span>
                      <span className="font-extrabold text-foreground text-xs">ZAAKIY AI</span>
                    </div>
                    <div className="rounded-lg border border-border/80 bg-card p-2.5">
                      <span className="text-[10px] uppercase text-secondary font-semibold block">
                        {isArabic ? "التحقق" : "VALIDATION"}
                      </span>
                      <span className="font-extrabold text-accent text-xs">CHESS.JS DUAL</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
                  <span className="text-xs font-mono text-secondary font-medium">
                    {isArabic ? "أبيض ضد أسود" : "Standard 8×8"}
                  </span>
                  <Link
                    to="/games/chess"
                    className="inline-flex items-center gap-2 rounded-lg bg-accent text-white dark:text-[#0C100D] px-4 py-2 text-xs font-bold font-mono tracking-wider uppercase hover:opacity-95 shadow-xs transition-all"
                  >
                    <span>{isArabic ? "العب الشطرنج" : "Play Chess"}</span>
                    <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Card 3: Circuit Breaker (In Lab Blueprint) */}
              <div className="group relative rounded-2xl border border-dashed border-border bg-card/60 p-6 flex flex-col justify-between backdrop-blur-xs">
                <span
                  aria-hidden="true"
                  className="absolute top-2.5 right-2.5 font-mono text-[10px] text-muted-foreground/40 select-none pointer-events-none"
                >
                  +
                </span>

                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary/40 px-2.5 py-1 text-xs font-mono font-bold text-secondary uppercase">
                      <Cpu className="h-3.5 w-3.5" />
                      {isArabic ? "بوابات منطقية · مرونة الأنظمة" : "LOGIC GATES · RESILIENCE"}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-amber-500 dark:text-amber-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                      {isArabic ? "قيد التطوير في المختبر" : "IN LAB // COMPILING"}
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-primary tracking-tight">
                    Circuit Breaker
                  </h3>
                  <p className="mt-1 text-xs font-mono text-secondary font-medium">
                    {isArabic
                      ? "محاكاة توجيه الحزم وعزل الأعطال الموزعة"
                      : "Distributed Packet Routing & Cascading Outages"}
                  </p>

                  <p className="mt-4 text-sm text-secondary leading-relaxed font-normal">
                    {isArabic
                      ? "وجّه تدفق حزم البيانات حول العقد المتعطلة وافتح قواطع الدوائر لمنع الانهيار الشامل قبل استنفاد حصص زمن الاستجابة."
                      : "Reroute live traffic around degraded microservice nodes and trip breakers to isolate cascade failures before API timeouts exhaust system budgets."}
                  </p>

                  <div
                    aria-hidden="true"
                    className="mt-5 rounded-xl border border-dashed border-border bg-secondary/20 p-4 select-none relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-secondary font-semibold mb-3">
                      <span>BLUEPRINT // TOPOLOGY_SIM</span>
                      <span className="text-amber-500 font-bold">STATE: COMPILING</span>
                    </div>

                    <div className="flex items-center justify-between gap-2 px-2 py-4">
                      <div className="flex flex-col items-center gap-1">
                        <div className="h-7 w-7 rounded-md border border-accent bg-accent/10 flex items-center justify-center text-[10px] font-mono font-bold text-accent">
                          GW
                        </div>
                        <span className="text-[9px] font-mono text-secondary font-semibold">GATEWAY</span>
                      </div>
                      <div className="h-0.5 flex-1 border-t border-dashed border-accent/40 relative">
                        <div className="absolute -top-1 left-1/2 h-2 w-2 rounded-full bg-accent animate-ping" />
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <div className="h-7 w-7 rounded-md border border-amber-500 bg-amber-500/10 flex items-center justify-center text-[10px] font-mono font-bold text-amber-500">
                          AUTH
                        </div>
                        <span className="text-[9px] font-mono text-secondary font-semibold">AUTH_SVC</span>
                      </div>
                      <div className="h-0.5 flex-1 border-t border-dashed border-border" />
                      <div className="flex flex-col items-center gap-1">
                        <div className="h-7 w-7 rounded-md border border-border bg-secondary flex items-center justify-center text-[10px] font-mono font-bold text-secondary">
                          DB
                        </div>
                        <span className="text-[9px] font-mono text-secondary font-semibold">PRIMARY_DB</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-dashed border-border flex items-center justify-between text-xs font-mono text-secondary">
                  <span className="font-medium">{isArabic ? "مرحلة المعاينة الهندسية" : "Schematic Stage"}</span>
                  <span className="rounded-md border border-border bg-secondary/40 px-2.5 py-1 text-[11px] font-mono text-secondary font-semibold">
                    {isArabic ? "قريباً" : "Under Active Lab Build"}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Hall of Fame & Daily Leaderboard Preview */}
          <section className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8 relative shadow-sm">
            <span
              aria-hidden="true"
              className="absolute top-2.5 left-2.5 font-mono text-[11px] text-accent/40 select-none pointer-events-none"
            >
              +
            </span>
            <span
              aria-hidden="true"
              className="absolute top-2.5 right-2.5 font-mono text-[11px] text-accent/40 select-none pointer-events-none"
            >
              +
            </span>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-border/60">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-accent font-bold mb-1">
                  <Trophy className="h-3.5 w-3.5" />
                  <span>
                    {isArabic
                      ? "لوحة الشرف العالمية // أفضل الجولات"
                      : "HALL OF FAME // GLOBAL SPEED RANKING"}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-primary tracking-tight">
                  {isArabic
                    ? "أسرع الجولات في حفرة الأرنب اليوم"
                    : "Rabbit Hole Daily Leaderboard"}
                </h2>
                <p className="text-xs sm:text-sm text-secondary mt-1">
                  {isArabic
                    ? "تُحسب النتائج بناءً على سرعة الربط ودقة المسار دون أخطاء."
                    : "Rankings computed strictly on completion milliseconds and fault penalties."}
                </p>
              </div>

              <Link
                to="/games/rabbit-hole"
                className="inline-flex items-center gap-2 rounded-lg border border-accent bg-accent/15 px-4 py-2 text-xs font-mono font-bold uppercase text-accent hover:bg-accent/25 transition-colors w-fit"
              >
                <Sparkles className="h-3.5 w-3.5 text-accent" />
                <span className="font-bold">{isArabic ? "سجل نتيجتك في اللغز" : "Post Your Score →"}</span>
              </Link>
            </div>

            {/* Leaderboard Table / Cards */}
            <div className="divide-y divide-border/60">
              {topScores.map((score, index) => {
                const rankMedals = ["🥇", "🥈", "🥉"];
                return (
                  <div
                    key={score.id}
                    className="py-3.5 flex items-center justify-between gap-4 text-sm font-mono"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-6 text-center text-sm font-bold text-accent">
                        {index < 3 ? rankMedals[index] : `#${index + 1}`}
                      </span>
                      <span className="font-bold text-primary truncate">
                        {score.playerName}
                      </span>
                      {index === 0 && (
                        <span className="hidden sm:inline-flex rounded-full border border-accent/40 bg-accent/15 px-2.5 py-0.5 text-[10px] text-accent font-bold">
                          DAILY CHAMP
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-xs shrink-0 font-mono">
                      <span className="text-secondary font-semibold">
                        {score.score.toLocaleString()} pts
                      </span>
                      <span className="font-extrabold text-accent text-sm">
                        {(score.completionTime / 1000).toFixed(1)}s
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Architectural Philosophy Note */}
          <section className="rounded-2xl border border-dashed border-accent/40 bg-accent/5 p-6 sm:p-8 relative">
            <div className="max-w-2xl">
              <span className="font-mono text-xs uppercase text-accent font-bold tracking-wider block mb-2">
                {isArabic ? "ملاحظة معمارية // فلسفة التصميم" : "ARCHITECTURAL NOTE // COGNITIVE RESET"}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-primary mb-2">
                {isArabic
                  ? "لماذا ألعاب وتجارب تفاعلية في محفظة معمارية برمجية؟"
                  : "Why interactive games in a solution architecture portfolio?"}
              </h3>
              <p className="text-sm text-secondary leading-relaxed font-normal">
                {isArabic
                  ? "هندسة الأنظمة ليست مجرد مخططات بيانية جامدة؛ بل تعتمد أساساً على التفكير المكاني، وإدراك الأنماط المتسلسلة، وسرعة اتخاذ القرار بهدوء. صُممت هذه الألعاب لتكون استراحة تفكير سريعة مدتها 45 ثانية لإعادة تهيئة التركيز بين جلسات العمل العميق."
                  : "Software and solution architecture is rarely about drawing static diagrams—it is about spatial reasoning, pattern navigation under tight constraints, and keeping calm when latency is high. These mini-games serve as high-density 45-second micro-resets to clear mental state and benchmark concentration."}
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
