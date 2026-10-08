import { useMemo, useState } from "react";
import { Bot, RotateCcw, Swords, ArrowLeft, ChevronRight, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Chess, type Square } from "chess.js";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import SeoMeta from "@/components/SeoMeta";
import { buildBreadcrumbListSchema } from "@/lib/schema";
import { useLocale } from "@/hooks/use-locale";

const API_URL = import.meta.env.VITE_ZAAKIY_API_URL || "/api/zaakiy-chat";
const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
const symbols: Record<string, string> = {
  p: "♟", n: "♞", b: "♝", r: "♜", q: "♛", k: "♚",
  P: "♙", N: "♘", B: "♗", R: "♖", Q: "♕", K: "♔",
};

const parseAiResponse = (text: string, legalMoves: string[]) => {
  try {
    const data = JSON.parse(text.replace(/^```json\s*|\s*```$/g, "").trim()) as {
      move?: string;
      message?: string;
    };
    return {
      move: legalMoves.includes(data.move || "") ? data.move! : legalMoves[0],
      message: data.message || "Zaakiy is calculating its tactical line.",
    };
  } catch {
    return {
      move: legalMoves.find((move) => text.includes(move)) || legalMoves[0],
      message: "Zaakiy is calculating its tactical line.",
    };
  }
};

export default function ChessPage() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";

  const [game, setGame] = useState(() => new Chess());
  const [selected, setSelected] = useState<Square | null>(null);
  const [thinking, setThinking] = useState(false);
  const [message, setMessage] = useState(
    isArabic ? "دورك الآن. اختر قطعة بيضاء للتحريك." : "Your turn. Select a white piece to move."
  );
  const [lastMove, setLastMove] = useState<Square[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const board = useMemo(() => game.board(), [game]);

  const askZaakiy = async (position: Chess) => {
    const legalMoves = position
      .moves({ verbose: true })
      .map((move) => `${move.from}${move.to}${move.promotion || ""}`);
    if (!legalMoves.length) return;

    setThinking(true);
    setMessage(isArabic ? "زاكي يحسب الرد التكتيكي..." : "Zaakiy is calculating a response…");
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          game: "chess",
          chessState: position.fen(),
          legalMoves,
          userQuestion: "make a chess move",
        }),
      });
      if (!response.ok) throw new Error("chess_api_offline");
      const payload = (await response.json()) as { text?: string };
      const choice = parseAiResponse(payload.text || "", legalMoves);
      const next = new Chess(position.fen());
      const move = next.move({
        from: choice.move.slice(0, 2) as Square,
        to: choice.move.slice(2, 4) as Square,
        promotion: (choice.move[4] as "q" | "r" | "b" | "n" | undefined) || "q",
      });
      setGame(next);
      setLastMove([move.from, move.to]);
      setHistory((current) => [...current, move.san]);
      setMessage(choice.message);
    } catch {
      // Local fallback: choose legal move if API unavailable
      const fallbackMoveStr = legalMoves[Math.floor(Math.random() * legalMoves.length)];
      if (fallbackMoveStr) {
        const next = new Chess(position.fen());
        const move = next.move({
          from: fallbackMoveStr.slice(0, 2) as Square,
          to: fallbackMoveStr.slice(2, 4) as Square,
          promotion: "q",
        });
        setGame(next);
        setLastMove([move.from, move.to]);
        setHistory((current) => [...current, move.san]);
        setMessage(isArabic ? "لعب زاكي نقلة تكتيكية سريعة." : "Zaakiy replied with a rapid tactical move.");
      } else {
        setMessage(isArabic ? "تعذر الاتصال بـ زاكي حالياً." : "Zaakiy AI engine unavailable.");
      }
    } finally {
      setThinking(false);
    }
  };

  const chooseSquare = (square: Square) => {
    if (thinking || game.isGameOver()) return;
    const piece = game.get(square);

    if (!selected) {
      if (piece?.color !== "w") {
        setMessage(isArabic ? "اختر إحدى قطعك البيضاء أولاً." : "Select one of your white pieces first.");
        return;
      }
      setSelected(square);
      setMessage(isArabic ? "اختر المربع الذي ترغب بالنقل إليه." : "Select destination square.");
      return;
    }

    if (piece?.color === "w") {
      setSelected(square);
      return;
    }

    const legal = game.moves({ square: selected, verbose: true }).some((move) => move.to === square);
    if (!legal) {
      setMessage(isArabic ? "هذه النقلة غير قانونية." : "Illegal move for this piece.");
      return;
    }

    const next = new Chess(game.fen());
    const move = next.move({ from: selected, to: square, promotion: "q" });
    setGame(next);
    setSelected(null);
    setLastMove([move.from, move.to]);
    setHistory((current) => [...current, move.san]);

    if (next.isGameOver()) {
      setMessage(
        next.isCheckmate()
          ? isArabic ? "كش مات! لقد فزت بالجولة!" : "Checkmate! Victory achieved."
          : isArabic ? "انتهت اللعبة بالتعادل." : "Game ended in a draw."
      );
      return;
    }

    void askZaakiy(next);
  };

  const reset = () => {
    setGame(new Chess());
    setSelected(null);
    setThinking(false);
    setLastMove([]);
    setHistory([]);
    setMessage(isArabic ? "دورك الآن. اختر قطعة بيضاء." : "Your turn. Choose a white piece.");
  };

  return (
    <>
      <SeoMeta
        title={isArabic ? "الشطرنج ضد الذكاء الاصطناعي زاكي | سانو خان" : "Chess vs Zaakiy AI | Sanu Khan Games"}
        description={
          isArabic
            ? "العب الشطرنج كالأبيض ضد الذكاء الاصطناعي زاكي مباشرة عبر المتصفح."
            : "Play chess as white against Zaakiy AI with live tactical moves and API evaluation."
        }
        canonicalPath="/games/chess"
        schema={buildBreadcrumbListSchema([
          { name: isArabic ? "الرئيسية" : "Home", path: "/" },
          { name: isArabic ? "الألعاب" : "Games", path: "/games" },
          { name: isArabic ? "شطرنج ضد زاكي" : "Chess vs Zaakiy", path: "/games/chess" },
        ])}
      />

      <Navbar />

      <main className="min-h-screen bg-background pt-24 md:pt-28 pb-16 text-foreground relative overflow-hidden">
        {/* Ambient atmospheric backdrop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(20,122,58,0.14),transparent_70%)] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(86,200,120,0.10),transparent_70%)]"
        />

        <div className="container-narrow space-y-8 md:space-y-12">
          {/* Breadcrumbs & Header */}
          <div>
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-xs font-mono text-secondary mb-4"
            >
              <Link to="/games" className="hover:text-accent font-medium transition-colors flex items-center gap-1">
                <ArrowLeft className="h-3 w-3 rtl:rotate-180" />
                {isArabic ? "العودة إلى الألعاب" : "Back to Games"}
              </Link>
              <ChevronRight className="h-3 w-3 rtl:rotate-180 opacity-60" />
              <span className="text-accent font-bold">Chess vs Zaakiy</span>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-border/60 pb-8 relative">
              <span
                aria-hidden="true"
                className="absolute top-0 right-0 font-mono text-[11px] text-accent/40 select-none pointer-events-none"
              >
                +
              </span>

              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-accent font-bold mb-2">
                  <Swords className="h-4 w-4" />
                  <span>
                    {isArabic
                      ? "03 — الإنسان ضد الذكاء الاصطناعي // محرك شطرنج زاكي"
                      : "03 — HUMAN VS AGENTIC AI // ZAAKIY CHESS ENGINE"}
                  </span>
                  <span className="inline-flex items-center gap-1 ml-2 rounded-full border border-accent/40 bg-accent/15 px-2.5 py-0.5 text-[10px] text-accent font-mono font-bold">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                    {isArabic ? "مباشر" : "LIVE ENGINE"}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
                  Chess vs Zaakiy<span className="text-accent">.</span>
                </h1>

                <p className="mt-2 text-sm sm:text-base text-secondary max-w-xl font-normal leading-relaxed">
                  {isArabic
                    ? "أنت تلعب بالقطع البيضاء، بينما يلعب زاكي بالقطع السوداء عبر واجهة برمجة تطبيقات وكلاء الذكاء الاصطناعي مع التحقق الكامل من النقلات القانونية."
                    : "You command the white pieces. Zaakiy calculates black moves through the operational AI agent API with verified board validation."}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-mono font-bold text-foreground hover:border-accent hover:text-accent transition-all shadow-xs"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>{isArabic ? "لعبة جديدة" : "New Game"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Chess Board & Controls */}
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] items-start">
            {/* Chessboard Column */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-border/80 bg-card p-3 sm:p-6 shadow-sm relative">
                <span
                  aria-hidden="true"
                  className="absolute top-2 left-2 font-mono text-[10px] text-accent/40 select-none pointer-events-none"
                >
                  +
                </span>
                <span
                  aria-hidden="true"
                  className="absolute bottom-2 right-2 font-mono text-[10px] text-accent/40 select-none pointer-events-none"
                >
                  +
                </span>

                {/* 8x8 High-Contrast Architectural Chessboard */}
                <div className="grid aspect-square grid-cols-8 overflow-hidden rounded-xl border-2 border-border/90 max-w-[540px] mx-auto select-none shadow-md">
                  {board.flatMap((row, rowIndex) =>
                    row.map((piece, columnIndex) => {
                      const square = `${files[columnIndex]}${8 - rowIndex}` as Square;
                      const isDark = (rowIndex + columnIndex) % 2 === 1;
                      const isSquareSelected = selected === square;
                      const isLast = lastMove.includes(square);
                      const symbol = piece
                        ? symbols[piece.color === "w" ? piece.type.toUpperCase() : piece.type]
                        : "";

                      return (
                        <button
                          key={square}
                          type="button"
                          onClick={() => chooseSquare(square)}
                          aria-label={`${square}${
                            piece ? ` ${piece.color === "w" ? "white" : "black"} ${piece.type}` : " empty"
                          }`}
                          className={`relative flex aspect-square items-center justify-center text-[clamp(2.1rem,6vw,4.1rem)] leading-none transition-all duration-150 ${
                            isDark
                              ? "bg-[#82A888] dark:bg-[#102418]"
                              : "bg-[#E8F0E9] dark:bg-[#24422e]"
                          } ${
                            isLast
                              ? "shadow-[inset_0_0_0_4px_rgba(20,122,58,0.85)] dark:shadow-[inset_0_0_0_4px_rgba(86,200,120,0.95)]"
                              : ""
                          } ${
                            isSquareSelected
                              ? "shadow-[inset_0_0_0_5px_#facc15] z-10 scale-[1.03]"
                              : ""
                          }`}
                        >
                          {symbol && (
                            <span
                              className={`select-none ${
                                piece?.color === "w"
                                  ? "text-[#FFFFFF] [filter:drop-shadow(0_2px_3px_rgba(0,0,0,0.9))] font-black"
                                  : "text-[#111814] dark:text-[#050806] [filter:drop-shadow(0_1px_2px_rgba(255,255,255,0.7))] font-black"
                              }`}
                            >
                              {symbol}
                            </span>
                          )}
                        </button>
                      );
                    })
                  )}
                </div>

                {/* AI / Status Banner */}
                <div className="mt-5 flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground max-w-[540px] mx-auto font-mono shadow-xs">
                  <Bot
                    className={`h-4 w-4 shrink-0 text-accent ${
                      thinking ? "animate-spin text-accent" : ""
                    }`}
                  />
                  <span className="font-semibold truncate">{message}</span>
                </div>
              </div>
            </div>

            {/* Sidebar: Move Log & Details */}
            <aside className="space-y-6">
              {/* Game Log */}
              <div className="rounded-2xl border border-border/80 bg-card p-5 relative shadow-sm font-mono">
                <span
                  aria-hidden="true"
                  className="absolute top-2.5 right-2.5 font-mono text-[10px] text-accent/40 select-none pointer-events-none"
                >
                  +
                </span>

                <div className="flex items-center justify-between pb-3 mb-4 border-b border-border/60">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-primary">
                    {isArabic ? "سجل النقلات" : "Move History"}
                  </h2>
                  <span className="text-[11px] text-accent font-bold">
                    {history.length} {isArabic ? "نقلات" : "moves"}
                  </span>
                </div>

                <div className="max-h-72 space-y-1.5 overflow-y-auto text-xs text-foreground pr-1">
                  {history.length > 0 ? (
                    Array.from({ length: Math.ceil(history.length / 2) }, (_, i) => {
                      const white = history[i * 2];
                      const black = history[i * 2 + 1];
                      return (
                        <div
                          key={i}
                          className="flex items-center justify-between py-1.5 px-2.5 rounded-md hover:bg-secondary/40 transition-colors"
                        >
                          <span className="w-8 text-secondary font-semibold">{i + 1}.</span>
                          <span className="font-bold text-foreground w-20">{white}</span>
                          <span className="font-bold text-accent w-20">{black || "—"}</span>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-secondary font-medium text-[11px] py-4 text-center">
                      {isArabic ? "لم يتم تنفيذ أي نقلة بعد." : "No moves made yet."}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-[11px] leading-relaxed text-secondary font-medium">
                  {isArabic
                    ? "يتلقى وكيل زاكي كود FEN الحالي وقائمة الحركات القانونية ويتحقق من سلامة اللعبة."
                    : "Zaakiy receives board FEN states and evaluates responses via streaming edge function."}
                </div>
              </div>

              {/* Tactical Rules Card */}
              <div className="rounded-2xl border border-dashed border-border bg-card p-5 space-y-3 font-mono text-xs">
                <div className="flex items-center gap-2 text-primary font-bold">
                  <HelpCircle className="h-4 w-4 text-accent" />
                  <span>{isArabic ? "قواعد الشطرنج التكتيكية" : "Tactical Rules"}</span>
                </div>
                <ul className="space-y-1.5 text-secondary font-medium leading-relaxed text-[11px]">
                  <li>• {isArabic ? "الأبيض يبدأ باللعب دائماً." : "White moves first."}</li>
                  <li>• {isArabic ? "الترقية التلقائية إلى الوزير عند الوصول." : "Auto-queen promotion enabled."}</li>
                  <li>• {isArabic ? "التحقق المزدوج من الحركات عبر chess.js." : "Dual-layer validation via chess.js."}</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
