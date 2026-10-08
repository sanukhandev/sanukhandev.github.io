export type GameScore = {
  id: string;
  gameSlug: string;
  playerName: string;
  score: number;
  completionTime: number; // in milliseconds
  faults?: number;
  puzzleDate?: string;
  completedAt: string;
  mode?: "daily" | "practice";
};

export type GameProgress = {
  path: number[];
  startedAt: number | null;
  completed: boolean;
  faults?: number;
};

const scoresKey = "games:scores";
const playerNameKey = "games:player-name";
const guideEnabledKey = "games:guide-enabled";

const progressKey = (gameSlug: string, puzzleDate: string) =>
  `games:progress:${gameSlug}:${puzzleDate}`;

const read = <T>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    return JSON.parse(localStorage.getItem(key) ?? "null") ?? fallback;
  } catch {
    return fallback;
  }
};

const todayStr = () => new Date().toISOString().slice(0, 10);

export const getSeededScores = (gameSlug: string): GameScore[] => {
  const today = todayStr();
  return [
    {
      id: "seed-1",
      gameSlug,
      playerName: "Amina Al-Nuaimi",
      score: 4780,
      completionTime: 29400,
      faults: 0,
      puzzleDate: today,
      completedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      mode: "daily",
    },
    {
      id: "seed-2",
      gameSlug,
      playerName: "Tariq V3",
      score: 4690,
      completionTime: 34200,
      faults: 0,
      puzzleDate: today,
      completedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      mode: "daily",
    },
    {
      id: "seed-3",
      gameSlug,
      playerName: "Mira Patel",
      score: 4560,
      completionTime: 41800,
      faults: 1,
      puzzleDate: today,
      completedAt: new Date(Date.now() - 3600000 * 7).toISOString(),
      mode: "daily",
    },
    {
      id: "seed-4",
      gameSlug,
      playerName: "Omar Zein",
      score: 4480,
      completionTime: 49300,
      faults: 0,
      puzzleDate: today,
      completedAt: new Date(Date.now() - 3600000 * 10).toISOString(),
      mode: "daily",
    },
    {
      id: "seed-5",
      gameSlug,
      playerName: "Lena R.",
      score: 4320,
      completionTime: 55700,
      faults: 2,
      puzzleDate: today,
      completedAt: new Date(Date.now() - 3600000 * 14).toISOString(),
      mode: "daily",
    },
  ];
};

export const getScores = (gameSlug: string, puzzleDate?: string): GameScore[] => {
  const stored = read<GameScore[]>(scoresKey, []);
  const filtered = stored.filter(
    (score) =>
      score.gameSlug === gameSlug &&
      (!puzzleDate || score.puzzleDate === puzzleDate || !score.puzzleDate)
  );

  if (filtered.length > 0) {
    return [...filtered].sort((a, b) => a.completionTime - b.completionTime);
  }

  // Provide seeded scores for the current date or all-time
  return getSeededScores(gameSlug).sort(
    (a, b) => a.completionTime - b.completionTime
  );
};

export const saveScore = (score: GameScore) => {
  if (typeof window === "undefined") return;
  const current = read<GameScore[]>(scoresKey, []);
  const updated = [...current, score];
  localStorage.setItem(scoresKey, JSON.stringify(updated));
};

export const getPersonalBest = (gameSlug: string): GameScore | null => {
  const scores = read<GameScore[]>(scoresKey, []).filter(
    (score) => score.gameSlug === gameSlug
  );
  if (scores.length === 0) return null;
  return scores.reduce(
    (best, curr) => (curr.completionTime < best.completionTime ? curr : best),
    scores[0]
  );
};

export const getProgress = (
  gameSlug: string,
  puzzleDate: string
): GameProgress =>
  read<GameProgress>(progressKey(gameSlug, puzzleDate), {
    path: [],
    startedAt: null,
    completed: false,
    faults: 0,
  });

export const saveProgress = (
  gameSlug: string,
  puzzleDate: string,
  progress: GameProgress
) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(
    progressKey(gameSlug, puzzleDate),
    JSON.stringify(progress)
  );
};

export const clearProgress = (gameSlug: string, puzzleDate: string) => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(progressKey(gameSlug, puzzleDate));
};

export const getPlayerName = (): string => {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(playerNameKey) ?? "";
};

export const savePlayerName = (name: string) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(playerNameKey, name.trim());
};

export const getGuideEnabled = (): boolean => {
  if (typeof window === "undefined") return true;
  return localStorage.getItem(guideEnabledKey) !== "false";
};

export const saveGuideEnabled = (enabled: boolean) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(guideEnabledKey, enabled ? "true" : "false");
};
