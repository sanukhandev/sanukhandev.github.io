export type ZaakiyLocale = "en" | "ar";

type Intent = "profile" | "experience" | "skills" | "works" | "contact" | "coffee" | "general";

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

export type QueryContext = {
  intent: Intent;
  relevantFacts: string[];
  conciseContext: string;
  confidence: number;
};

export type McpContext = {
  locale: ZaakiyLocale;
  scope: string;
  facts: string[];
  dataset: ScopeDataset;
  summary: string;
  refreshedAt: string;
};

const scopeCache = new Map<string, McpContext>();

const makeCacheKey = (scope: string, locale: ZaakiyLocale) => `${locale}:${scope}`;

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
        dataset.profile.push(...value.split(";").map((v) => v.trim()).filter(Boolean));
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

    if (key.includes("coffee") || key.includes("kofi") || key.includes("ko-fi")) {
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

const detectIntent = (question: string, locale: ZaakiyLocale): { intent: Intent; confidence: number } => {
  const keywords = getIntentKeywords(locale);
  const q = question.toLowerCase();
  let best: Intent = "general";
  let bestScore = 0;

  (Object.keys(keywords) as Intent[]).forEach((intent) => {
    if (intent === "general") return;
    const score = keywords[intent].reduce((acc, word) => (q.includes(word) ? acc + 1 : acc), 0);
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

const rankFacts = (facts: string[], question: string) => {
  const qTokens = new Set(tokenize(question));
  return facts
    .map((fact) => {
      const fTokens = tokenize(fact);
      const overlap = fTokens.reduce((acc, token) => (qTokens.has(token) ? acc + 1 : acc), 0);
      return { fact, overlap };
    })
    .sort((a, b) => b.overlap - a.overlap)
    .map((item) => item.fact);
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
    const summary = dataset.all.slice(0, 12).join(" | ");
    const context: McpContext = {
      locale,
      scope,
      facts,
      dataset,
      summary,
      refreshedAt: new Date().toISOString(),
    };

    scopeCache.set(key, context);
    return context;
  },

  getQueryContext(context: McpContext, userQuestion: string, maxFacts = 14): QueryContext {
    const { intent, confidence } = detectIntent(userQuestion, context.locale);
    const intentFacts = byIntent(context.dataset, intent);
    const rankedIntentFacts = rankFacts(intentFacts, userQuestion);
    const rankedGlobalFacts = rankFacts(context.dataset.all, userQuestion);

    const relevantFacts = Array.from(new Set([...rankedIntentFacts, ...rankedGlobalFacts]))
      .filter(Boolean)
      .slice(0, Math.max(6, Math.min(24, maxFacts)));

    return {
      intent,
      confidence,
      relevantFacts,
      conciseContext: relevantFacts.join("\n"),
    };
  },
};
