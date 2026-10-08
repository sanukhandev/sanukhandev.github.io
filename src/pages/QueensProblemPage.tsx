import { useMemo, useState } from "react";
import { Check, Crown, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import SeoMeta from "@/components/SeoMeta";

const SIZE = 8;
const queenColors = ["#56c878", "#f59e0b", "#38bdf8", "#c084fc", "#fb7185"];
const canPlace = (queens: number[], row: number, column: number) => queens.every((placed, placedRow) => placed < 0 || (placed !== column && Math.abs(placed - column) !== Math.abs(placedRow - row)));
const makeSolution = () => {
  const result = Array(SIZE).fill(-1) as number[];
  const solve = (row: number): boolean => {
    if (row === SIZE) return true;
    for (const column of [...Array(SIZE).keys()].sort(() => Math.random() - 0.5)) {
      if (canPlace(result, row, column)) { result[row] = column; if (solve(row + 1)) return true; result[row] = -1; }
    }
    return false;
  };
  solve(0);
  return result;
};
const makePuzzle = () => {
  const solution = makeSolution();
  const clueRows = new Set([Math.floor(Math.random() * SIZE), Math.floor(Math.random() * SIZE)]);
  return { clues: solution.map((column, row) => clueRows.has(row) ? column : -1) };
};

export default function QueensProblemPage() {
  const [puzzle, setPuzzle] = useState(makePuzzle);
  const [queens, setQueens] = useState(puzzle.clues);
  const [solved, setSolved] = useState(false);
  const [message, setMessage] = useState("Place one queen in every row. No queen may attack another.");
  const count = useMemo(() => queens.filter((column) => column >= 0).length, [queens]);
  const reset = () => { const next = makePuzzle(); setPuzzle(next); setQueens(next.clues); setSolved(false); setMessage("Fresh pattern loaded. Try not to start a royal war."); };
  const choose = (row: number, column: number) => { if (!solved && puzzle.clues[row] < 0) { setQueens((current) => current.map((value, index) => index === row ? column : value)); setMessage("Interesting. The kingdom remains technically intact."); } };
  const check = () => {
    if (queens.some((column) => column < 0)) return setMessage("Every row needs a queen. Even the quiet ones.");
    if (queens.every((column, row) => canPlace(queens, row, column))) { setSolved(true); setMessage("Solved. Zaakiy would congratulate you, but it has standards."); }
    else setMessage("Those queens are attacking each other. Diplomacy failed.");
  };
  return <><SeoMeta title="The Queens Problem — Sanu Khan Games" description="Solve a fresh randomized eight queens puzzle." canonicalPath="/games/queens-problem" /><main className="min-h-screen bg-background text-foreground"><div className="container-narrow py-8 md:py-12"><header className="flex items-center justify-between"><Link to="/games" className="text-sm text-secondary hover:text-accent">← All games</Link><span className="brand-zaakiy text-lg">SANU KHAN / GAMES</span></header><section className="mx-auto mt-14 max-w-5xl"><div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-accent"><Crown size={15} /> Randomized logic puzzle</p><h1 className="text-5xl font-black tracking-[-0.06em] md:text-7xl">The Queens Problem<span className="text-accent">.</span></h1><p className="mt-4 max-w-xl text-secondary">Place eight queens so none can attack another. Every new pattern gets fresh clues.</p></div><button type="button" onClick={reset} className="inline-flex items-center gap-2 self-start rounded-lg border border-border px-4 py-2 text-sm font-bold text-secondary hover:border-accent hover:text-accent"><RotateCcw size={15} /> New pattern</button></div><div className="grid gap-8 lg:grid-cols-[minmax(0,560px)_280px]"><div className="premium-card p-3 sm:p-5"><div className="grid aspect-square grid-cols-8 overflow-hidden rounded-xl border border-border">{queens.flatMap((queenColumn, row) => Array.from({ length: SIZE }, (_, column) => { const dark = (row + column) % 2 === 1; const queen = queenColumn === column; const clue = puzzle.clues[row] === column; return <button key={`${row}-${column}`} type="button" onClick={() => choose(row, column)} aria-label={`Row ${row + 1}, column ${column + 1}${queen ? ", queen" : ""}`} className={`relative flex items-center justify-center text-[clamp(1.8rem,7vw,4rem)] ${dark ? "bg-[#2b5037]" : "bg-[#dbe8d8]"} ${queen ? "ring-2 ring-inset ring-accent" : ""}`}>{queen && <span style={{ color: queenColors[row % queenColors.length] }} className={clue ? "drop-shadow-[0_0_5px_rgba(255,255,255,.7)]" : "opacity-90"}>♛</span>}</button>; }))}</div><div className="mt-4 flex items-center justify-between rounded-lg bg-secondary/40 px-4 py-3 text-sm text-secondary"><span>{count}/8 queens placed</span><button type="button" onClick={check} disabled={solved} className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 font-bold text-white dark:text-[#0C100D] disabled:opacity-50"><Check size={15} /> Check board</button></div><p className={`mt-4 rounded-lg px-4 py-3 text-sm font-bold ${solved ? "bg-accent/15 text-accent" : "bg-secondary/40 text-secondary"}`}>{message}</p></div><aside className="premium-card p-5"><h2 className="text-xl font-bold">Royal rules</h2><ul className="mt-4 space-y-3 text-sm leading-6 text-secondary"><li>One queen per row.</li><li>One queen per column.</li><li>No shared diagonal.</li><li className="text-accent">Colored queens mark the generated clue pattern.</li></ul><div className="mt-6 border-t border-border pt-4 text-xs leading-5 text-muted-foreground">New pattern means new clues, new arrangement, same impossible-looking confidence test.</div></aside></div></section></div></main></>;
}
