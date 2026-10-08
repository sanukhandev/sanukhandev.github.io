import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  RotateCcw,
  Undo2,
  Trophy,
  Volume2,
  VolumeX,
  Share2,
  CheckCircle2,
  AlertTriangle,
  Flame,
  User,
  HelpCircle,
  ChevronRight,
  Move,
  Flag,
  Compass,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import SeoMeta from "@/components/SeoMeta";
import { buildBreadcrumbListSchema } from "@/lib/schema";
import { useLocale } from "@/hooks/use-locale";
import { getLocalizedPageSeo } from "@/lib/seo";
import {
  getScores,
  getPersonalBest,
  saveScore,
  getPlayerName,
  savePlayerName,
  type GameScore,
} from "@/lib/gameStore";
import { gameAudio } from "@/lib/gameAudio";

const GAME_SLUG = "rabbit-hole";
const TOTAL_CELLS = 49;
const GRID_SIZE = 7;
const CHECKPOINT_STEPS = [0, 12, 24, 36, 48];

function createPuzzlePath(): number[] {
  const route = Array.from({ length: GRID_SIZE }, (_, row) =>
    (row % 2 === 0 ? [...Array(GRID_SIZE).keys()] : [...Array(GRID_SIZE).keys()].reverse())
      .map((column) => row * GRID_SIZE + column),
  ).flat();

  // Backbite randomization keeps the path valid while changing its shape.
  for (let iteration = 0; iteration < 1200; iteration += 1) {
    const fromStart = Math.random() < 0.5;
    const endpoint = fromStart ? route[0] : route[route.length - 1];
    const candidates = getOrthogonalNeighbors(endpoint).filter((cell) => {
      const index = route.indexOf(cell);
      return fromStart ? index > 1 : index < route.length - 2;
    });
    if (!candidates.length) continue;
    const neighbor = candidates[Math.floor(Math.random() * candidates.length)];
    const index = route.indexOf(neighbor);
    if (fromStart) {
      route.splice(0, index, ...route.slice(0, index).reverse());
    } else {
      route.splice(index + 1, route.length - index - 1, ...route.slice(index + 1).reverse());
    }
  }
  return route;
}

const edgeKey = (a: number, b: number) => [a, b].sort((x, y) => x - y).join(":");
const hasWall = (walls: string[], a: number, b: number) => walls.includes(edgeKey(a, b));

function createPuzzleWalls(route: number[]): string[] {
  const routeEdges = new Set(route.slice(1).map((cell, index) => edgeKey(cell, route[index])));
  const candidates: string[] = [];
  for (let cell = 0; cell < TOTAL_CELLS; cell += 1) {
    for (const neighbor of getOrthogonalNeighbors(cell)) {
      const edge = edgeKey(cell, neighbor);
      if (cell < neighbor && !routeEdges.has(edge)) candidates.push(edge);
    }
  }
  return candidates.sort(() => Math.random() - 0.5).slice(0, 6);
}

// Helper to get orthogonal adjacent neighbors (Up, Down, Left, Right)
function getOrthogonalNeighbors(cell: number): number[] {
  const row = Math.floor(cell / GRID_SIZE);
  const col = cell % GRID_SIZE;
  const neighbors: number[] = [];

  if (row > 0) neighbors.push((row - 1) * GRID_SIZE + col); // Up
  if (row < GRID_SIZE - 1) neighbors.push((row + 1) * GRID_SIZE + col); // Down
  if (col > 0) neighbors.push(row * GRID_SIZE + (col - 1)); // Left
  if (col < GRID_SIZE - 1) neighbors.push(row * GRID_SIZE + (col + 1)); // Right

  return neighbors;
}

function isAdjacent(cellA: number, cellB: number): boolean {
  const rA = Math.floor(cellA / GRID_SIZE);
  const cA = cellA % GRID_SIZE;
  const rB = Math.floor(cellB / GRID_SIZE);
  const cB = cellB % GRID_SIZE;
  return Math.abs(rA - rB) + Math.abs(cA - cB) === 1;
}

const formatTimer = (ms: number): string => {
  const seconds = (ms / 1000).toFixed(1);
  return `${seconds}s`;
};

// Lightweight confetti burst on full route completion
function ConfettiBurst() {
  const particles = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 360,
        y: -Math.random() * 260 - 50,
        color: ["#147A3A", "#56C878", "#38C755", "#4ADE80", "#FACC15", "#38BDF8"][i % 6],
        size: Math.random() * 8 + 6,
        delay: Math.random() * 0.2,
      })),
    []
  );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-40 overflow-hidden flex items-center justify-center select-none"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full opacity-0 animate-[fadeUp_1.8s_cubic-bezier(0.16,1,0.3,1)_forwards]"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            transform: `translate(${p.x}px, ${p.y}px)`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function RabbitHolePage() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";
  const seo = getLocalizedPageSeo("rabbitHole", locale);

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  // Challenge modes: Daily Origin (starts at top-left 0) or Freeform Drafter (starts on any cube)
  const [mode, setMode] = useState<"daily" | "freeform">("daily");
  const [puzzlePath, setPuzzlePath] = useState(createPuzzlePath);
  const [puzzleWalls, setPuzzleWalls] = useState(() => createPuzzleWalls(puzzlePath));

  const [playerName, setPlayerName] = useState(() => getPlayerName() || "");
  const [selected, setSelected] = useState<number[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [deadEnd, setDeadEnd] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [shakingCell, setShakingCell] = useState<number | null>(null);
  const [hintCell, setHintCell] = useState<number | null>(null);

  // Audio state
  const [soundEnabled, setSoundEnabled] = useState(() => gameAudio.isEnabled());
  const [copiedShare, setCopiedShare] = useState(false);

  // Leaderboard & Personal Best
  const [leaderboardTab, setLeaderboardTab] = useState<"daily" | "all">("daily");
  const [scores, setScores] = useState<GameScore[]>([]);
  const [personalBest, setPersonalBest] = useState<GameScore | null>(null);

  // DOM refs for precision SVG coordinates & drag tracking
  const boardContainerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const lastPointerCellRef = useRef<number | null>(null);

  // Dynamic geometry measurement for seamless cube-center vector connections
  const [boardSize, setBoardSize] = useState({ width: 0, height: 0 });
  const [cellCenters, setCellCenters] = useState<{ x: number; y: number }[]>([]);

  // Sync drag ref
  useEffect(() => {
    isDraggingRef.current = isDragging;
  }, [isDragging]);

  // Measure exact pixel centers of all 49 checker cubes
  const measureBoard = useCallback(() => {
    if (!gridRef.current || !boardContainerRef.current) return;
    const containerRect = boardContainerRef.current.getBoundingClientRect();
    const w = containerRect.width;
    const h = containerRect.height;
    if (w === 0 || h === 0) return;

    const centers: { x: number; y: number }[] = [];
    const cellNodes = gridRef.current.querySelectorAll<HTMLElement>("[data-cell-index]");

    cellNodes.forEach((node) => {
      const idx = parseInt(node.getAttribute("data-cell-index") || "", 10);
      if (!isNaN(idx)) {
        const r = node.getBoundingClientRect();
        centers[idx] = {
          x: r.left - containerRect.left + r.width / 2,
          y: r.top - containerRect.top + r.height / 2,
        };
      }
    });

    setBoardSize({ width: w, height: h });
    setCellCenters(centers);
  }, []);

  // Update geometry on mount, resize, and container changes
  useEffect(() => {
    measureBoard();
    const handleResize = () => measureBoard();
    window.addEventListener("resize", handleResize);

    const containerEl = boardContainerRef.current;
    let ro: ResizeObserver | null = null;
    if (containerEl && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => {
        measureBoard();
      });
      ro.observe(containerEl);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (ro) ro.disconnect();
    };
  }, [measureBoard]);

  // Refresh scores and PB
  const reloadScores = useCallback(() => {
    setScores(getScores(GAME_SLUG, leaderboardTab === "daily" ? today : undefined));
    setPersonalBest(getPersonalBest(GAME_SLUG));
  }, [leaderboardTab, today]);

  useEffect(() => {
    reloadScores();
  }, [reloadScores]);

  // Live timer ticker
  useEffect(() => {
    if (!startedAt || finished) return;

    const interval = setInterval(() => {
      setElapsedMs(Date.now() - startedAt);
    }, 50);

    return () => clearInterval(interval);
  }, [startedAt, finished]);

  // Global mouse up / touch end listener to cleanly release drag
  useEffect(() => {
    const handleGlobalRelease = () => {
      isDraggingRef.current = false;
      lastPointerCellRef.current = null;
      setIsDragging(false);
    };

    window.addEventListener("pointerup", handleGlobalRelease);
    window.addEventListener("mouseup", handleGlobalRelease);
    window.addEventListener("touchend", handleGlobalRelease);
    window.addEventListener("pointercancel", handleGlobalRelease);

    return () => {
      window.removeEventListener("pointerup", handleGlobalRelease);
      window.removeEventListener("mouseup", handleGlobalRelease);
      window.removeEventListener("touchend", handleGlobalRelease);
      window.removeEventListener("pointercancel", handleGlobalRelease);
    };
  }, []);

  // Sound toggle handler
  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    gameAudio.setEnabled(next);
  };

  // Restart / Reset path
  const handleRestart = useCallback(() => {
    gameAudio.playReset();
    setSelected([]);
    setStartedAt(null);
    setFinished(false);
    setDeadEnd(false);
    setElapsedMs(0);
    setShakingCell(null);
    setHintCell(null);
    const nextPath = createPuzzlePath();
    setPuzzlePath(nextPath);
    setPuzzleWalls(createPuzzleWalls(nextPath));
  }, []);

  // Undo one step
  const handleUndo = useCallback(() => {
    if (selected.length <= 1) {
      handleRestart();
      return;
    }
    gameAudio.playReset();
    setSelected((prev) => prev.slice(0, -1));
    setDeadEnd(false);
    setFinished(false);
  }, [handleRestart, selected.length]);

  const handleHint = () => {
    if (finished) return;
    const next = selected.length === 0 ? puzzlePath[0] : puzzlePath[selected.length];
    setHintCell(next ?? null);
    window.setTimeout(() => setHintCell(null), 1600);
  };

  // Current head of the drafted trail
  const currentHead = selected.length > 0 ? selected[selected.length - 1] : null;

  // Compute valid open orthogonal neighbors of the current head
  const openNeighbors = useMemo(() => {
    if (currentHead === null) return [];
    return getOrthogonalNeighbors(currentHead).filter((n) => !selected.includes(n) && !hasWall(puzzleWalls, currentHead, n));
  }, [currentHead, selected, puzzleWalls]);

  // Check if dead end occurs
  useEffect(() => {
    if (selected.length > 0 && selected.length < TOTAL_CELLS && !finished) {
      setDeadEnd(openNeighbors.length === 0);
    } else {
      setDeadEnd(false);
    }
  }, [selected, openNeighbors, finished]);

  // Core cell interaction logic: supports both step-by-step clicks and continuous dragging
  const handleCellInteraction = useCallback(
    (cell: number) => {
      if (finished) return;

      setSelected((prevSelected) => {
        // Case 1: Starting fresh path from empty board
        if (prevSelected.length === 0) {
          if (mode === "daily" && cell !== puzzlePath[0]) {
            gameAudio.playError();
            setShakingCell(cell);
            setTimeout(() => setShakingCell(null), 250);
            return prevSelected;
          }
          if (!startedAt) {
            setStartedAt(Date.now());
          }
          gameAudio.playStep(1);
          return [cell];
        }

        const head = prevSelected[prevSelected.length - 1];

        // Case 2: Clicked on current head -> no-op
        if (cell === head) {
          return prevSelected;
        }

        // Case 3: Clicked / dragged to previous cell in trail -> Smooth Backtrack / Undo 1 step
        if (prevSelected.length >= 2 && cell === prevSelected[prevSelected.length - 2]) {
          gameAudio.playReset();
          return prevSelected.slice(0, -1);
        }

        // Case 4: Clicked / dragged onto an earlier cell in the trail -> Rewind up to that point
        const existingIdx = prevSelected.indexOf(cell);
        if (existingIdx >= 0) {
          gameAudio.playReset();
          return prevSelected.slice(0, existingIdx + 1);
        }

        // Case 5: Cell is an orthogonal adjacent unvisited neighbor -> Step forward!
        if (isAdjacent(head, cell) && !hasWall(puzzleWalls, head, cell) && !prevSelected.includes(cell)) {
          if (mode === "daily") {
            const checkpointStep = puzzlePath.indexOf(cell);
            const nextCheckpointStep = CHECKPOINT_STEPS.find((step) => !prevSelected.includes(puzzlePath[step]));
            if (CHECKPOINT_STEPS.includes(checkpointStep) && checkpointStep !== nextCheckpointStep) {
              gameAudio.playError();
              return prevSelected;
            }
          }
          const nextTrail = [...prevSelected, cell];
          gameAudio.playStep(nextTrail.length);

          // Full 49-cell Hamiltonian Path Completed!
          if (nextTrail.length === TOTAL_CELLS) {
            setFinished(true);
            const completionTime = startedAt ? Date.now() - startedAt : 1000;
            setElapsedMs(completionTime);
            gameAudio.playVictory();

            const baseScore = Math.max(100, 5000 - Math.round(completionTime / 20));
            const newScore: GameScore = {
              id: crypto.randomUUID(),
              gameSlug: GAME_SLUG,
              playerName: playerName.trim() || (isArabic ? "مجهول" : "Anonymous"),
              score: baseScore,
              completionTime,
              puzzleDate: today,
              completedAt: new Date().toISOString(),
              mode: mode === "daily" ? "daily" : "practice",
            };
            saveScore(newScore);
            setTimeout(reloadScores, 50);
          }

          return nextTrail;
        }

        // Case 6: Non-adjacent cell clicked -> Provide clear tactile & audio feedback
        gameAudio.playError();
        setShakingCell(cell);
        setTimeout(() => setShakingCell(null), 350);
        return prevSelected;
      });
    },
    [finished, startedAt, isArabic, playerName, today, mode, reloadScores, puzzlePath, puzzleWalls]
  );

  // Desktop pointer handlers
  const handleCellPointerDown = (cell: number) => {
    isDraggingRef.current = true;
    lastPointerCellRef.current = cell;
    setIsDragging(true);
    handleCellInteraction(cell);
  };

  const handleCellPointerEnter = (cell: number) => {
    if (isDraggingRef.current && lastPointerCellRef.current !== cell) {
      lastPointerCellRef.current = cell;
      handleCellInteraction(cell);
    }
  };

  // Mobile touch handlers using document.elementFromPoint
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const touch = e.touches[0];
    if (!touch) return;

    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    const cellElement = element?.closest("[data-cell-index]");
    const cellAttr = cellElement?.getAttribute("data-cell-index");
    if (cellAttr !== null && cellAttr !== undefined) {
      const cell = parseInt(cellAttr, 10);
      if (!isNaN(cell) && lastPointerCellRef.current !== cell) {
        lastPointerCellRef.current = cell;
        handleCellInteraction(cell);
      }
    }
  };

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === "r" || e.key === "R") {
        handleRestart();
      } else if (e.key === "u" || e.key === "U" || (e.ctrlKey && e.key === "z")) {
        handleUndo();
      } else if (e.key === "m" || e.key === "M") {
        handleToggleSound();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleRestart, handleUndo]);

  // Performance Rating Grade
  const performanceGrade = useMemo(() => {
    const count = selected.length;
    const secs = elapsedMs / 1000;
    if (count === TOTAL_CELLS) {
      if (secs < 35) return { grade: "S-TIER", label: "Master Grid Drafter", color: "text-accent" };
      if (secs < 55) return { grade: "A-TIER", label: "Optimal Route", color: "text-emerald-500" };
      return { grade: "B-TIER", label: "Hamiltonian Cleared", color: "text-blue-500" };
    }
    if (count >= 40) return { grade: "EXPEDITION", label: "High Coverage", color: "text-amber-500" };
    return { grade: "DRAFTING", label: "In Progress", color: "text-secondary" };
  }, [selected.length, elapsedMs]);

  // Share result to clipboard
  const handleShare = () => {
    const timeFormatted = formatTimer(elapsedMs);
    const coverage = `${selected.length}/49 cells (${Math.round((selected.length / TOTAL_CELLS) * 100)}%)`;
    const text = isArabic
      ? `🐇 مخطط مسار حفرة الأرنب [${today}]\n📍 التغطية: ${coverage}\n⏱️ الوقت: ${timeFormatted}\n🏅 التقييم: ${performanceGrade.grade}\n🔗 https://sanukhan.dev/games/rabbit-hole`
      : `🐇 Rabbit Hole Route Drafter [${today}]\n📍 Trail Coverage: ${coverage}\n⏱️ Time: ${timeFormatted}\n🏅 Grade: ${performanceGrade.grade}\n🔗 https://sanukhan.dev/games/rabbit-hole`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedShare(true);
        setTimeout(() => setCopiedShare(false), 2500);
      });
    }
  };

  // Precise SVG Path connecting centers of visited checker cubes
  const pathD = useMemo(() => {
    if (selected.length < 2 || cellCenters.length < TOTAL_CELLS) return "";
    const points = selected.map((c) => cellCenters[c]).filter(Boolean);
    if (points.length < 2) return "";

    return points.reduce((acc, pt, i) => {
      if (i === 0) return `M ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
      return `${acc} L ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
    }, "");
  }, [selected, cellCenters]);

  // Exact point of current head
  const headPoint = useMemo(() => {
    if (selected.length === 0 || cellCenters.length < TOTAL_CELLS) return null;
    const headCell = selected[selected.length - 1];
    return cellCenters[headCell] || null;
  }, [selected, cellCenters]);

  const progressPercent = Math.round((selected.length / TOTAL_CELLS) * 100);

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
          { name: isArabic ? "حفرة الأرنب" : "Rabbit Hole", path: "/games/rabbit-hole" },
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
              <span className="text-accent font-bold">Rabbit Hole</span>
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
                  <Flame className="h-4 w-4" />
                  <span>
                    {mode === "daily"
                      ? isArabic
                        ? `02 — مسار السحب اليومي // #${today}`
                        : `02 — DAILY DRAG CIRCUIT // #${today}`
                      : isArabic
                      ? "02 — التخطيط الحر للمسار"
                      : "02 — FREEFORM ROUTE DRAFTER"}
                  </span>
                  <span className="inline-flex items-center gap-1 ml-2 rounded-full border border-accent/40 bg-accent/15 px-2.5 py-0.5 text-[10px] text-accent font-mono font-bold">
                    <Move className="h-3 w-3 animate-pulse" />
                    {isArabic ? "اسحب أو انقر للتخطيط" : "CLICK OR DRAG"}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
                  Rabbit Hole<span className="text-accent">.</span>
                </h1>

                <p className="mt-2 text-sm sm:text-base text-secondary max-w-xl font-normal leading-relaxed">
                  {isArabic
                    ? "انقر أو اسحب لرسم مسارك الخاص عبر شبكة مكعبات الشطرنج 7×7. تحكم في اتجاه المسار بحرية، وتراجع بالسحب للخلف، وحاول تغطية جميع المكعبات الـ 49 دون انغلاق!"
                    : "Click or drag across the 7×7 checker cubes to draft your continuous Hamiltonian path. Steer freely, backtrack to reroute, and solve the 49-cube circuit seamlessly without dead ends."}
                </p>
              </div>

              {/* Mode Switcher */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <div className="inline-flex rounded-lg border border-border bg-card p-1 text-xs font-mono shadow-xs">
                  <button
                    type="button"
                    onClick={() => {
                      if (mode !== "daily") {
                        setMode("daily");
                        handleRestart();
                      }
                    }}
                    className={`rounded-md px-3.5 py-1.5 font-bold transition-all ${
                      mode === "daily"
                        ? "bg-accent text-white dark:text-[#0C100D] shadow-xs"
                        : "text-secondary hover:text-foreground font-semibold"
                    }`}
                  >
                    {isArabic ? "التحدي اليومي (البداية 0)" : "Daily Challenge (Start 01)"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (mode !== "freeform") {
                        setMode("freeform");
                        handleRestart();
                      }
                    }}
                    className={`rounded-md px-3.5 py-1.5 font-bold transition-all ${
                      mode === "freeform"
                        ? "bg-accent text-white dark:text-[#0C100D] shadow-xs"
                        : "text-secondary hover:text-foreground font-semibold"
                    }`}
                  >
                    {isArabic ? "تخطيط حر (ابدأ من أي مكعب)" : "Freeform (Start Anywhere)"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Game Layout */}
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] items-start">
            {/* Left Column: Board & Controls */}
            <div className="space-y-6">
              {/* Game HUD Bar */}
              <div className="rounded-2xl border border-border/80 bg-card p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-sm relative">
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

                {/* Left Telemetry: Timer & Drafted Count */}
                <div className="flex items-center gap-3 font-mono text-sm">
                  {/* Live Timer */}
                  <div className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2 text-foreground font-extrabold shadow-xs">
                    <Clock className="h-4 w-4 text-accent" />
                    <span className="w-14 tabular-nums text-base">
                      {formatTimer(elapsedMs)}
                    </span>
                  </div>

                  {/* Coverage Counter */}
                  <div className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2 text-foreground font-extrabold shadow-xs text-xs sm:text-sm">
                    <span className="text-primary tabular-nums">
                      {selected.length} / 49
                    </span>
                    <span className="text-[11px] text-secondary font-semibold hidden sm:inline">
                      ({progressPercent}%)
                    </span>
                  </div>

                  {/* Dead End Warning */}
                  {deadEnd && !finished && (
                    <div className="inline-flex items-center gap-1.5 rounded-xl border border-rose-500/50 bg-rose-500/15 px-3 py-2 text-xs text-rose-600 dark:text-rose-400 font-bold animate-pulse">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      <span>{isArabic ? "مسار مسدود! اسحب للخلف" : "Dead End! Step Back"}</span>
                    </div>
                  )}
                </div>

                {/* Right Controls: Undo, Restart, Sound */}
                <div className="flex items-center gap-2">
                  {/* Undo Button */}
                  <button
                    type="button"
                    onClick={handleUndo}
                    disabled={selected.length === 0}
                    title="Undo last step (Press U or Ctrl+Z)"
                    aria-label="Undo last step"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 text-xs font-mono font-bold text-foreground hover:border-accent hover:text-accent transition-all shadow-xs disabled:opacity-40 disabled:pointer-events-none"
                  >
                    <Undo2 className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">{isArabic ? "تراجع" : "Undo"}</span>
                  </button>

                  {/* Sound Toggle */}
                  <button
                    type="button"
                    onClick={handleToggleSound}
                    title={soundEnabled ? "Mute audio (Press M)" : "Enable audio (Press M)"}
                    aria-label="Toggle Audio"
                    className={`rounded-xl border p-2 text-xs font-mono font-semibold transition-all shadow-xs ${
                      soundEnabled
                        ? "border-accent/40 bg-accent/15 text-accent font-bold"
                        : "border-border bg-card text-secondary hover:text-foreground"
                    }`}
                  >
                    {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  </button>

                  <button
                    type="button"
                    onClick={handleHint}
                    disabled={finished}
                    title="Reveal the next waypoint"
                    aria-label="Hint"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-accent/40 bg-accent/10 px-3 py-2 text-xs font-mono font-bold text-accent hover:bg-accent/20 transition-all shadow-xs disabled:opacity-40"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">{isArabic ? "تلميح" : "Hint"}</span>
                  </button>

                  {/* Restart Button */}
                  <button
                    type="button"
                    onClick={handleRestart}
                    title="Clear and redraft path (Press R)"
                    aria-label="Redraft path"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 text-xs font-mono font-bold text-foreground hover:border-accent hover:text-accent transition-all shadow-xs"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">{isArabic ? "إعادة الرسم" : "Clear"}</span>
                  </button>
                </div>
              </div>

              {/* Progress Bar strip */}
              <div className="h-2 w-full rounded-full bg-border/60 overflow-hidden shadow-2xs">
                <div
                  className="h-full bg-accent transition-all duration-200"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Interactive Board Card */}
              <div className="rounded-2xl border-2 border-border/90 bg-card p-3 sm:p-6 shadow-xl flex flex-col items-center">
                {/* 7x7 Checker Cube Arena: perfectly bounded, overflow strictly clipped */}
                <div
                  ref={boardContainerRef}
                  onTouchStart={() => setIsDragging(true)}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={() => setIsDragging(false)}
                  className="relative w-full max-w-[480px] aspect-square rounded-2xl overflow-hidden p-2 sm:p-2.5 bg-muted/30 dark:bg-black/40 border border-border/80 shadow-inner select-none touch-none"
                >
                  {/* Seamless Dual-Layer Vector Conduit (Subpixel Alignment, Zero Overflow) */}
                  {pathD && boardSize.width > 0 && (
                    <svg
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 z-15 h-full w-full select-none"
                      viewBox={`0 0 ${boardSize.width} ${boardSize.height}`}
                    >
                      {/* Ambient soft glow conduit channel */}
                      <path
                        d={pathD}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-accent/30 dark:text-[#56C878]/35"
                      />

                      {/* Sharp luminous high-contrast core vector line */}
                      <path
                        d={pathD}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-accent dark:text-[#56C878] drop-shadow-[0_0_8px_rgba(86,200,120,0.85)]"
                      />

                      {/* Pulse beacon circle on the active drafting head */}
                      {headPoint && (
                        <circle
                          cx={headPoint.x}
                          cy={headPoint.y}
                          r="6"
                          className="fill-white dark:fill-[#0C100D] stroke-accent stroke-[2.5] drop-shadow-[0_0_8px_rgba(86,200,120,0.9)]"
                        />
                      )}
                    </svg>
                  )}

                  {/* 7x7 Checker Cubes Grid */}
                  <div
                    ref={gridRef}
                    role="grid"
                    aria-label="Rabbit Hole 7x7 Checker Board"
                    className="grid grid-cols-7 grid-rows-7 gap-1 sm:gap-1.5 h-full w-full relative z-20 select-none touch-none"
                  >
                    {Array.from({ length: TOTAL_CELLS }, (_, cell) => {
                      const row = Math.floor(cell / GRID_SIZE);
                      const col = cell % GRID_SIZE;
                      const isDarkChecker = (row + col) % 2 === 1;

                      const stepIndex = selected.indexOf(cell);
                      const isSelected = stepIndex >= 0;
                      const isHead = isSelected && stepIndex === selected.length - 1;
                      const isStart = stepIndex === 0;
                      const isValidNeighbor = openNeighbors.includes(cell) && !finished;
                      const isPreviousStep = selected.length >= 2 && cell === selected[selected.length - 2];
                      const isShaking = shakingCell === cell;
                      const isHint = hintCell === cell;

                      // Highlight the generated start node and numbered checkpoints.
                      const isDailyStartCell = mode === "daily" && selected.length === 0 && cell === puzzlePath[0];
                      const checkpointNumber = CHECKPOINT_STEPS.indexOf(puzzlePath.indexOf(cell)) + 1;
                      const isRightWall = col < GRID_SIZE - 1 && hasWall(puzzleWalls, cell, cell + 1);
                      const isBottomWall = row < GRID_SIZE - 1 && hasWall(puzzleWalls, cell, cell + GRID_SIZE);
                      const isRightWall = col < GRID_SIZE - 1 && hasWall(puzzleWalls, cell, cell + 1);
                      const isBottomWall = row < GRID_SIZE - 1 && hasWall(puzzleWalls, cell, cell + GRID_SIZE);

                      return (
                        <button
                          key={cell}
                          type="button"
                          data-cell-index={cell}
                          onPointerDown={() => handleCellPointerDown(cell)}
                          onPointerEnter={() => handleCellPointerEnter(cell)}
                          aria-label={`Cube ${col + 1}, ${row + 1}${isSelected ? ` Step ${stepIndex + 1}` : ""}`}
                          className={`relative aspect-square rounded-lg sm:rounded-xl border font-mono text-xs sm:text-sm font-bold flex flex-col items-center justify-center cursor-pointer transition-colors duration-100 select-none touch-none ${
                            isShaking
                              ? "border-rose-500 bg-rose-500/25 text-rose-500 animate-board-shake z-40"
                              : isHint
                              ? "border-accent bg-accent/30 text-accent ring-2 ring-accent z-30"
                              : isHead
                              ? "border-accent bg-accent text-white dark:text-[#0C100D] ring-2 ring-accent ring-offset-2 ring-offset-background z-30 font-black shadow-[0_0_16px_rgba(20,122,58,0.6)] dark:shadow-[0_0_16px_rgba(86,200,120,0.9)]"
                              : isSelected
                              ? "border-accent bg-accent text-white dark:text-[#0C100D] shadow-xs font-black z-25"
                              : isValidNeighbor
                              ? "border-2 border-dashed border-accent bg-accent/20 text-accent font-black hover:bg-accent/30 z-20"
                              : isDailyStartCell
                              ? "border-2 border-accent bg-accent/25 text-accent font-bold ring-2 ring-accent/60 z-20"
                              : isDarkChecker
                              ? "border-border/70 bg-[#E5EBE4] dark:bg-[#121B15] text-secondary/70 hover:border-accent/60 hover:bg-secondary/40"
                              : "border-border/70 bg-[#F1F5F0] dark:bg-[#18251C] text-secondary/70 hover:border-accent/60 hover:bg-secondary/40"
                          }`}
                        >
                          {isRightWall && <span aria-hidden="true" className="absolute -right-1 top-0 z-40 h-full w-1 rounded-full bg-foreground/80" />}
                          {isBottomWall && <span aria-hidden="true" className="absolute -bottom-1 left-0 z-40 h-1 w-full rounded-full bg-foreground/80" />}
                          {/* Visited Cube: Sequential Step Number */}
                          {isSelected && (
                            <span className="font-black leading-none drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)] tabular-nums">
                              {stepIndex + 1}
                            </span>
                          )}

                          {!isSelected && checkpointNumber > 0 && (
                            <span className="text-lg sm:text-xl font-black text-accent">{checkpointNumber}</span>
                          )}

                          {/* Start Node Badge */}
                          {isStart && (
                            <span className="text-[7px] sm:text-[8px] uppercase tracking-wider font-extrabold text-white/95 dark:text-[#0C100D]/95 mt-0.5 leading-none">
                              START
                            </span>
                          )}

                          {/* Daily Start Prompt (when unstarted) */}
                          {isDailyStartCell && (
                            <div className="flex flex-col items-center">
                              <Flag className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-accent animate-bounce mb-0.5" />
                              <span className="text-[8px] sm:text-[9px] font-black text-accent tracking-tighter">
                                START
                              </span>
                            </div>
                          )}

                          {/* Neighbor Prompt: Subtle Target Dot */}
                          {!isSelected && isValidNeighbor && (
                            <span className="h-2 w-2 rounded-full bg-accent animate-ping" />
                          )}

                          {/* Unvisited Micro Coordinate Marker */}
                          {!isSelected && !isDailyStartCell && !isValidNeighbor && (
                            <span className="text-[7px] sm:text-[8px] font-mono opacity-25 select-none pointer-events-none">
                              {String.fromCharCode(65 + col)}{row + 1}
                            </span>
                          )}

                          {/* Backtrack indicator hint on immediately previous cell */}
                          {isPreviousStep && (
                            <span
                              aria-hidden="true"
                              className="absolute top-0.5 right-1 text-[8px] sm:text-[9px] text-white/90 dark:text-[#0C100D]/90 font-mono"
                              title="Click or drag backward to rewind"
                            >
                              ↩
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Victory Celebration Overlay */}
                  {finished && (
                    <div className="absolute inset-0 z-40 rounded-2xl bg-background/95 backdrop-blur-md p-6 flex flex-col items-center justify-center text-center animate-[fadeUp_0.3s_ease-out]">
                      <ConfettiBurst />

                      <div className="h-12 w-12 rounded-2xl border border-accent/40 bg-accent/15 text-accent flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(86,200,120,0.3)]">
                        <Trophy className="h-6 w-6" />
                      </div>

                      <span className="text-xs font-mono uppercase text-accent font-bold tracking-widest mb-1">
                        {isArabic ? "تم رسم المسار الخوارزمي الكامل 49/49" : "49/49 FULL MATRIX ROUTE COMPILED"}
                      </span>

                      <h2 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight">
                        {isArabic ? "مسار هاملتوني مكتمل!" : "Perfect Hamiltonian Circuit!"}
                      </h2>

                      <p className="mt-2 text-xs sm:text-sm text-secondary max-w-xs font-medium">
                        {isArabic
                          ? "لقد قمت برسم مسار متصل غطى جميع المكعبات الـ 49 دون أي انغلاق."
                          : "You successfully drafted a continuous path covering every single checker cube in the matrix."}
                      </p>

                      {/* Stats Scorecard */}
                      <div className="mt-5 grid grid-cols-3 gap-2.5 sm:gap-4 max-w-sm w-full font-mono text-xs">
                        <div className="rounded-xl border border-border bg-card p-3 shadow-xs">
                          <span className="text-[10px] text-secondary font-semibold uppercase block">
                            {isArabic ? "الوقت" : "TIME"}
                          </span>
                          <span className="text-base sm:text-lg font-black text-accent">
                            {formatTimer(elapsedMs)}
                          </span>
                        </div>
                        <div className="rounded-xl border border-border bg-card p-3 shadow-xs">
                          <span className="text-[10px] text-secondary font-semibold uppercase block">
                            {isArabic ? "المكعبات" : "CUBES"}
                          </span>
                          <span className="text-base sm:text-lg font-black text-foreground">
                            49 / 49
                          </span>
                        </div>
                        <div className="rounded-xl border border-border bg-card p-3 shadow-xs">
                          <span className="text-[10px] text-secondary font-semibold uppercase block">
                            {isArabic ? "التقييم" : "RATING"}
                          </span>
                          <span className={`text-base sm:text-lg font-black ${performanceGrade.color}`}>
                            {performanceGrade.grade}
                          </span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={handleShare}
                          className="inline-flex items-center gap-2 rounded-xl bg-accent text-white dark:text-[#0C100D] px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider hover:opacity-95 transition-all shadow-xs"
                        >
                          {copiedShare ? (
                            <>
                              <CheckCircle2 className="h-3.5 w-3.5 text-white dark:text-[#0C100D]" />
                              <span>{isArabic ? "تم النسخ!" : "Copied to Clipboard!"}</span>
                            </>
                          ) : (
                            <>
                              <Share2 className="h-3.5 w-3.5" />
                              <span>{isArabic ? "مشاركة المسار" : "Share Route"}</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={handleRestart}
                          className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-mono font-bold text-foreground hover:border-accent hover:text-accent transition-all shadow-xs"
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                          <span>{isArabic ? "رسم مسار جديد" : "Draft New Route"}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Player Handle & Personal Best */}
              <div className="rounded-2xl border border-border/80 bg-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono shadow-xs">
                <div className="flex items-center gap-2.5 text-secondary">
                  <User className="h-4 w-4 text-accent shrink-0" />
                  <span className="font-semibold text-foreground">{isArabic ? "اسم المتسابق على اللوحة:" : "Your Board Handle:"}</span>
                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => {
                      setPlayerName(e.target.value);
                      savePlayerName(e.target.value);
                    }}
                    maxLength={24}
                    placeholder={isArabic ? "مجهول" : "Anonymous Architect"}
                    className="rounded-lg border border-border bg-secondary/40 px-3 py-1.5 text-foreground placeholder:text-muted-foreground outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 w-44 font-bold"
                  />
                </div>

                <div className="text-secondary text-[11px] font-semibold">
                  {personalBest && (
                    <span>
                      {isArabic
                        ? `أفضل وقت شخصي: ${(personalBest.completionTime / 1000).toFixed(1)} ث`
                        : `Personal Record: ${(personalBest.completionTime / 1000).toFixed(1)}s`}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Leaderboard & Tactile Drag Rules */}
            <aside className="space-y-6">
              {/* Leaderboard Card */}
              <div className="rounded-2xl border border-border/80 bg-card p-5 relative shadow-sm font-mono">
                <span
                  aria-hidden="true"
                  className="absolute top-2.5 right-2.5 font-mono text-[10px] text-accent/40 select-none pointer-events-none"
                >
                  +
                </span>

                <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-border/60">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-accent" />
                    <h2 className="text-base font-bold text-primary uppercase tracking-wide">
                      {isArabic ? "المتصدرون" : "Leaderboard"}
                    </h2>
                  </div>

                  {/* Filter tab */}
                  <div className="flex items-center gap-1 text-[11px] font-mono">
                    <button
                      type="button"
                      onClick={() => setLeaderboardTab("daily")}
                      className={`px-2.5 py-0.5 rounded transition-colors font-bold ${
                        leaderboardTab === "daily"
                          ? "bg-accent text-white dark:text-[#0C100D] shadow-xs"
                          : "text-secondary hover:text-foreground"
                      }`}
                    >
                      {isArabic ? "اليوم" : "Daily"}
                    </button>
                    <span className="text-border">|</span>
                    <button
                      type="button"
                      onClick={() => setLeaderboardTab("all")}
                      className={`px-2.5 py-0.5 rounded transition-colors font-bold ${
                        leaderboardTab === "all"
                          ? "bg-accent text-white dark:text-[#0C100D] shadow-xs"
                          : "text-secondary hover:text-foreground"
                      }`}
                    >
                      {isArabic ? "الكل" : "All-Time"}
                    </button>
                  </div>
                </div>

                {/* Score List */}
                <div className="space-y-2 text-xs">
                  {scores.slice(0, 7).map((score, idx) => {
                    const rankMedals = ["🥇", "🥈", "🥉"];
                    const isCurrentUser = playerName.trim() && score.playerName.toLowerCase() === playerName.trim().toLowerCase();
                    return (
                      <div
                        key={score.id}
                        className={`flex items-center justify-between py-2 px-2.5 rounded-lg border transition-colors ${
                          isCurrentUser
                            ? "border-accent/40 bg-accent/10"
                            : "border-transparent hover:bg-secondary/40"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="w-4 text-center font-black text-accent">
                            {idx < 3 ? rankMedals[idx] : idx + 1}
                          </span>
                          <span className="font-bold text-foreground truncate max-w-[130px]">
                            {score.playerName}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-[11px] text-secondary font-semibold">
                            {score.score} pts
                          </span>
                          <span className="font-black text-accent text-xs">
                            {(score.completionTime / 1000).toFixed(1)}s
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <p className="mt-5 text-[11px] leading-relaxed text-secondary font-medium border-t border-border/60 pt-3">
                  {isArabic
                    ? "تُحسب النتائج بناءً على تغطية المكعبات وسرعة التخطيط دون الوقوع في انغلاق."
                    : "Scores benchmark complete 49-cube trail coverage, routing speed, and flawless execution."}
                </p>
              </div>

              {/* Game Pattern Rules */}
              <div className="rounded-2xl border border-dashed border-border bg-card p-5 space-y-3 font-mono text-xs">
                <div className="flex items-center gap-2 text-primary font-bold">
                  <Compass className="h-4 w-4 text-accent" />
                  <span>{isArabic ? "قواعد ونمط مسار المكعبات" : "Checker Path Pattern Rules"}</span>
                </div>

                <ul className="space-y-2 text-secondary leading-relaxed text-[11px] font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold">01.</span>
                    <span>
                      {isArabic
                        ? "انقر أو اسحب بين المكعبات المتجاورة (أعلى، أسفل، يمين، يسار)."
                        : "Click or drag smoothly between adjacent orthogonal checker cubes."}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold">02.</span>
                    <span>
                      {isArabic
                        ? "للتراجع عن خطوة، اسحب أو انقر على المكعب السابق (المشار إليه بعلامة ↩)."
                        : "To undo, simply click or drag back to the previous cube (marked with ↩)."}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold">03.</span>
                    <span>
                      {isArabic
                        ? "خطط لمسارك بذكاء لتجنب الزوايا المغلقة وتغطية جميع المكعبات الـ 49."
                        : "Plan ahead to avoid self-trapping and draft a perfect 49-cube Hamiltonian circuit."}
                    </span>
                  </li>
                </ul>

                <div className="pt-2 border-t border-dashed border-border flex flex-wrap gap-2 text-[10px] text-secondary font-bold">
                  <span className="rounded bg-secondary/60 px-2 py-0.5 border border-border">
                    [U] / [Ctrl+Z] {isArabic ? "تراجع" : "Undo"}
                  </span>
                  <span className="rounded bg-secondary/60 px-2 py-0.5 border border-border">
                    [R] {isArabic ? "مسح" : "Clear"}
                  </span>
                  <span className="rounded bg-secondary/60 px-2 py-0.5 border border-border">
                    [M] {isArabic ? "صوت" : "Mute"}
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
