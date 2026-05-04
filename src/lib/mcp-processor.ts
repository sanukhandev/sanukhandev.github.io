export type ZaakiyLocale = "en" | "ar";

type Intent =
  | "profile"
  | "experience"
  | "skills"
  | "works"
  | "contact"
  | "coffee"
  | "general";

type ScopeDataset = {
  profile: string[];
  experience: string[];
  skills: string[];
  works: string[];
  contact: string[];
  coffee: string[];
  misc: string[];
  all: string[];
};

type FactSource = Exclude<keyof ScopeDataset, "all">;

type RankedFact = {
  fact: string;
  source: FactSource;
  overlap: number;
};

export type QueryContext = {
  intent: Intent;
  relevantFacts: string[];
  sourceTaggedFacts: RankedFact[];
  sourceDigest: string;
  conciseContext: string;
  confidence: number;
};

export type McpContext = {
  locale: ZaakiyLocale;
  dataset: ScopeDataset;
};

const scopeCache = new Map<string, McpContext>();

const makeCacheKey = (scope: string, locale: ZaakiyLocale) =>
  `${locale}:${scope}`;

const toFacts = (scope: string) =>
  scope
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 80);

const splitPipeValues = (input: string) =>
  input
    .split("|")
    .map((v) => v.trim())
    .filter(Boolean);

const tokenize = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1);

const sourcePriority: Record<FactSource, number> = {
  profile: 6,
  experience: 5,
  skills: 5,
  works: 4,
  contact: 3,
  coffee: 2,
  misc: 1,
};

const toDataset = (facts: string[]): ScopeDataset => {
  const dataset: ScopeDataset = {
    profile: [],
    experience: [],
    skills: [],
    works: [],
    contact: [],
    coffee: [],
    misc: [],
    all: [],
  };

  for (const fact of facts) {
    const [rawKey, ...rest] = fact.split(":");
    const key = (rawKey || "").trim().toLowerCase();
    const value = rest.join(":").trim();
    if (!value) {
      dataset.misc.push(fact);
      continue;
    }

    if (["name", "role", "subtitle", "statement", "meta"].includes(key)) {
      if (key === "meta") {
        dataset.profile.push(
          ...value
            .split(";")
            .map((v) => v.trim())
            .filter(Boolean),
        );
      } else {
        dataset.profile.push(`${rawKey.trim()}: ${value}`);
      }
      continue;
    }

    if (key === "experience") {
      dataset.experience.push(...splitPipeValues(value));
      continue;
    }

    if (key === "skills") {
      dataset.skills.push(...splitPipeValues(value));
      continue;
    }

    if (key === "works") {
      dataset.works.push(...splitPipeValues(value));
      continue;
    }

    if (key.includes("contact") || key.includes("email")) {
      dataset.contact.push(value);
      continue;
    }

    if (
      key.includes("coffee") ||
      key.includes("kofi") ||
      key.includes("ko-fi")
    ) {
      dataset.coffee.push(value);
      continue;
    }

    dataset.misc.push(fact);
  }

  dataset.all = [
    ...dataset.profile,
    ...dataset.experience,
    ...dataset.skills,
    ...dataset.works,
    ...dataset.contact,
    ...dataset.coffee,
    ...dataset.misc,
  ].slice(0, 120);

  return dataset;
};

const getIntentKeywords = (locale: ZaakiyLocale): Record<Intent, string[]> => {
  if (locale === "ar") {
    return {
      profile: ["من", "نبذة", "الدور", "الاسم", "تعريف", "سيرة"],
      experience: ["خبرة", "وظيفة", "عمل", "شركة", "سنوات", "مشروع"],
      skills: ["مهارات", "تقنيات", "برمجة", "stack", "ادوات"],
      works: ["اعمال", "مشاريع", "portfolio", "نتائج", "دراسة حالة"],
      contact: ["تواصل", "ايميل", "بريد", "اتصال"],
      coffee: ["قهوة", "دعم", "تبرع", "ko-fi"],
      general: [],
    };
  }

  return {
    profile: ["who", "about", "bio", "name", "role", "summary"],
    experience: ["experience", "work", "job", "career", "company", "years"],
    skills: ["skill", "stack", "tech", "technology", "tools"],
    works: ["project", "work", "portfolio", "case", "result"],
    contact: ["contact", "email", "reach", "connect"],
    coffee: ["coffee", "donate", "support", "kofi", "ko-fi"],
    general: [],
  };
};

const detectIntent = (
  question: string,
  locale: ZaakiyLocale,
): { intent: Intent; confidence: number } => {
  const keywords = getIntentKeywords(locale);
  const q = question.toLowerCase();
  let best: Intent = "general";
  let bestScore = 0;

  (Object.keys(keywords) as Intent[]).forEach((intent) => {
    if (intent === "general") return;
    const score = keywords[intent].reduce(
      (acc, word) => (q.includes(word) ? acc + 1 : acc),
      0,
    );
    if (score > bestScore) {
      bestScore = score;
      best = intent;
    }
  });

  return { intent: best, confidence: bestScore };
};

const byIntent = (dataset: ScopeDataset, intent: Intent) => {
  switch (intent) {
    case "profile":
      return dataset.profile;
    case "experience":
      return dataset.experience;
    case "skills":
      return dataset.skills;
    case "works":
      return dataset.works;
    case "contact":
      return dataset.contact;
    case "coffee":
      return dataset.coffee;
    default:
      return dataset.all;
  }
};

const sourceLabel = (source: FactSource, locale: ZaakiyLocale) => {
  if (locale === "ar") {
    switch (source) {
      case "profile":
        return "الملف";
      case "experience":
        return "الخبرة";
      case "skills":
        return "المهارات";
      case "works":
        return "الأعمال";
      case "contact":
        return "التواصل";
      case "coffee":
        return "الدعم";
      default:
        return "عام";
    }
  }

  return source;
};

const buildSourceDigest = (facts: RankedFact[], locale: ZaakiyLocale) => {
  if (!facts.length) {
    return locale === "ar"
      ? "لا توجد مصادر مطابقة."
      : "No matching sources found.";
  }

  const counts = new Map<FactSource, number>();
  for (const item of facts) {
    counts.set(item.source, (counts.get(item.source) || 0) + 1);
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([source, count]) => `${sourceLabel(source, locale)}:${count}`)
    .join(" | ");
};

const rankFacts = (
  facts: string[],
  question: string,
  source: FactSource,
  intentBonus = 0,
): RankedFact[] => {
  const qTokens = new Set(tokenize(question));
  return facts
    .map((fact) => {
      const fTokens = tokenize(fact);
      const overlap = fTokens.reduce(
        (acc, token) => (qTokens.has(token) ? acc + 1 : acc),
        0,
      );
      const weightedOverlap = overlap + intentBonus + sourcePriority[source];
      return { fact, source, overlap: weightedOverlap };
    })
    .sort((a, b) => b.overlap - a.overlap || b.fact.length - a.fact.length);
};

const collectAllSourceFacts = (dataset: ScopeDataset): RankedFact[] => {
  const all: RankedFact[] = [];
  const sources: FactSource[] = [
    "profile",
    "experience",
    "skills",
    "works",
    "contact",
    "coffee",
    "misc",
  ];

  for (const source of sources) {
    all.push(...dataset[source].map((fact) => ({ fact, source, overlap: 0 })));
  }

  return all;
};

export const mcpProcessor = {
  getEnhancedContext(scope: string, locale: ZaakiyLocale): McpContext {
    const key = makeCacheKey(scope, locale);
    const cached = scopeCache.get(key);
    if (cached) {
      return cached;
    }

    const facts = toFacts(scope);
    const dataset = toDataset(facts);
    const context: McpContext = {
      locale,
      dataset,
    };

    scopeCache.set(key, context);
    return context;
  },

  getQueryContext(
    context: McpContext,
    userQuestion: string,
    maxFacts = 14,
  ): QueryContext {
    const { intent, confidence } = detectIntent(userQuestion, context.locale);
    const intentFacts = byIntent(context.dataset, intent);
    const fallbackFacts = collectAllSourceFacts(context.dataset);

    const intentSource: FactSource =
      intent === "general"
        ? "misc"
        : intent === "profile"
          ? "profile"
          : intent === "experience"
            ? "experience"
            : intent === "skills"
              ? "skills"
              : intent === "works"
                ? "works"
                : intent === "contact"
                  ? "contact"
                  : "coffee";

    const rankedIntentFacts = rankFacts(
      intentFacts,
      userQuestion,
      intentSource,
      5,
    );
    const rankedGlobalFacts = fallbackFacts
      .map((item) => rankFacts([item.fact], userQuestion, item.source)[0])
      .filter(Boolean)
      .sort((a, b) => b.overlap - a.overlap || b.fact.length - a.fact.length);

    const cap = Math.max(6, Math.min(24, maxFacts));
    const dedup = new Map<string, RankedFact>();

    for (const item of [...rankedIntentFacts, ...rankedGlobalFacts]) {
      if (!item || !item.fact) continue;
      if (!dedup.has(item.fact)) {
        dedup.set(item.fact, item);
      }
      if (dedup.size >= cap) break;
    }

    const sourceTaggedFacts = [...dedup.values()];
    const relevantFacts = sourceTaggedFacts.map((item) => item.fact);
    const conciseContext = sourceTaggedFacts
      .map(
        (item) =>
          `- [${sourceLabel(item.source, context.locale)}] ${item.fact}`,
      )
      .join("\n");

    return {
      intent,
      confidence,
      relevantFacts,
      sourceTaggedFacts,
      sourceDigest: buildSourceDigest(sourceTaggedFacts, context.locale),
      conciseContext,
    };
  },
};
