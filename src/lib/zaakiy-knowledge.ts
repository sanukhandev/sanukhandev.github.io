import { getContent, Locale } from "@/lib/i18n";

const STOP_WORDS = new Set([
  // English stop words
  "the", "a", "an", "and", "or", "in", "on", "at", "to", "for", "of", "with",
  "is", "are", "was", "were", "be", "been", "does", "do", "did", "can", "could",
  "will", "would", "how", "what", "why", "when", "where", "which", "who", "whom",
  "whose", "you", "your", "he", "his", "she", "her", "it", "its", "they", "their",
  "i", "my", "me", "tell", "about", "show",
  // Arabic stop words
  "في", "من", "على", "إلى", "الى", "مع", "عن", "أو", "او", "و", "هل", "ما",
  "ماذا", "كيف", "هو", "هي", "هم", "هن", "أنت", "انت", "أنا", "انا", "نحن",
  "كان", "كانت", "يكون", "ذلك", "تلك", "هذا", "هذه", "التي", "الذي", "الذين",
  "أخبرني", "اخبرني", "اعطني", "اريد", "أريد"
]);

/**
 * Tokenize a string into lowercase alphabetic/numeric words (supports English and Arabic Unicode),
 * filtering out common stop words for high-precision semantic matching.
 */
export const tokenize = (text: string, filterStopWords = true): string[] => {
  const words = text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1);

  if (!filterStopWords) return words;
  return words.filter((w) => !STOP_WORDS.has(w));
};

/**
 * Generates an authoritative, comprehensive text knowledge base directly from the content JSON.
 * This is sent to the AI API or used for semantic matching.
 */
export function generateKnowledgeScope(locale: Locale = "en", extraContext?: string): string {
  const c = getContent(locale);

  const lines: string[] = [
    `=== IDENTITY & PROFILE ===`,
    `Name: Sanu Khan`,
    `Role: ${c.hero.eyebrow}`,
    `Location: ${c.hero.location}`,
    `Mission: ${c.hero.subheading}`,
    `Bio Summary: ${c.impact.bio1} ${c.impact.bio2}`,
    ``,
    `=== VERIFIED METRICS & SCALE ===`,
    ...c.hero.stats.map((s) => `- ${s.label}: ${s.value} (${s.description})`),
    `- High-Throughput: ${c.bento.blocks.throughput.metric} ${c.bento.blocks.throughput.metricLabel} - ${c.bento.blocks.throughput.desc}`,
    `- Uptime Discipline: ${c.bento.blocks.production.title} - ${c.bento.blocks.production.desc}`,
    ``,
    `=== CORE CAPABILITIES & SERVICES ===`,
    ...c.services.items.map((s) => `- ${s.title}: ${s.desc} [Stack: ${s.skills.join(", ")}]`),
    `Core Architecture Domains: ${c.impact.capabilities.join(", ")}`,
    ``,
    `=== SELECTED PRODUCTION CASE STUDIES ===`,
    ...c.projects.items.map((p) => `- ${p.title} (${p.tag}): ${p.desc} [Stack: ${p.stack.join(", ")}]`),
    ``,
    `=== 4-PHASE ENGINEERING METHODOLOGY ===`,
    ...c.process.steps.map((step) => `- Phase ${step.num} (${step.title}): ${step.desc}`),
    ``,
    `=== RESEARCH & INNOVATION (ZAAKIY V3RSE) ===`,
    `Project: Zaakiy V3RSE`,
    `Tagline: ${c.zaakiy.heading}`,
    `Overview: ${c.zaakiy.description}`,
    `Pillars: ${c.zaakiy.chips.join(", ")}`,
    ``,
    `=== FREQUENTLY ASKED QUESTIONS (GROUND TRUTH) ===`,
    ...c.faq.items.map((item) => `Q: ${item.q}\nA: ${item.a}`),
    ``,
    `=== PUBLISHED TECHNICAL WRITING ===`,
    ...c.writing.articles.map((a) => `- "${a.title}" [${a.tag}]: ${a.desc}`),
    ``,
    `=== CONTACT & AVAILABILITY ===`,
    `Email: ${c.footer.email}`,
    `Location: ${c.footer.location}`,
    `Status: Available for Solution Expert & Platform Engineering Leadership roles.`,
  ];

  if (extraContext) {
    lines.push(``, `=== ACTIVE PAGE CONTEXT ===`, extraContext.slice(0, 1000));
  }

  return lines.join("\n");
}

/**
 * Intelligent response generator that uses the content JSON to answer user questions
 * with high accuracy, zero hallucinations, and full bilingual support (English & Arabic).
 */
export function getSmartContentResponse(
  query: string,
  locale: Locale = "en",
  extraContext?: string,
): string {
  const c = getContent(locale);
  const isArabic = locale === "ar";
  const cleanQuery = query.trim();
  const lowerQuery = cleanQuery.toLowerCase();
  const qTokens = new Set(tokenize(cleanQuery, true));

  // 1. Check for Greetings
  const greetingsEn = ["hi", "hello", "hey", "hola", "good morning", "good evening", "greetings"];
  const greetingsAr = ["مرحبا", "أهلا", "اهلا", "السلام عليكم", "صباح الخير", "مساء الخير", "هلا"];
  const isGreeting = isArabic
    ? greetingsAr.some((g) => lowerQuery.includes(g))
    : greetingsEn.some((g) => lowerQuery.includes(g));

  if (isGreeting && cleanQuery.length < 35) {
    return isArabic
      ? `مرحباً! أنا Zaakiy، المساعد الذكي لمعرض سانو خان (${c.hero.location}).\n\nيمكنني إجابتك عن خبرته المعمارية الممتدة لأكثر من 13 عاماً، ومشاريع التجزئة والطيران، وتقنيات الحوسبة السحابية وKafka، أو منهجيته في هندسة الحلول.`
      : `Hi! I'm Zaakiy, Sanu Khan's portfolio assistant (${c.hero.location}).\n\nI can help you explore his 13+ years in solutions architecture, enterprise case studies (Retail & Airline), cloud & event streaming stack, or his 4-phase engineering methodology. How can I help?`;
  }

  // 2. Contact & Hire (Prioritize direct contact queries)
  const contactKeywords = isArabic
    ? ["تواصل", "بريد", "إيميل", "ايميل", "اتصال", "توظيف", "وظيفة", "تعيين", "مقابلة", "linkedin"]
    : ["contact", "email", "reach", "hire", "touch", "call", "meeting", "connect with sanu", "get in touch", "linkedin"];

  if (contactKeywords.some((k) => lowerQuery.includes(k))) {
    return isArabic
      ? `سانو خان مقيم في ${c.hero.location}.\n\nيمكنك التواصل معه مباشرة عبر البريد الإلكتروني:\n✉️ ${c.footer.email}\n\nهو متاح لفرص القيادة الهندسية، واستشارات هندسة الحلول، وتحديث المنصات المؤسسية.`
      : `Sanu Khan is based in ${c.hero.location}.\n\nYou can connect directly via email:\n✉️ ${c.footer.email}\n\nHe is open to Solution Expert, Platform Engineering Leadership, and high-stakes architecture modernization engagements.`;
  }

  // 3. Engineering Methodology & Architecture Approach
  const methodologyKeywords = isArabic
    ? ["منهجية", "طريقة", "كيف يعمل", "تصميم الأنظمة", "تصميم الانظمة", "خطوات", "مراحل", "فلسفة"]
    : ["methodology", "approach", "how does sanu", "system design", "process", "steps", "phases", "design systems"];

  if (methodologyKeywords.some((k) => lowerQuery.includes(k))) {
    const stepsFormatted = c.process.steps
      .map((s) => `${s.num}. ${s.title}: ${s.desc}`)
      .join("\n\n");

    return isArabic
      ? `يتبع سانو منهجية هندسية صارمة قائمة على العقود من 4 مراحل:\n\n${stepsFormatted}\n\nالمبادئ المعمارية الأساسية:\n• ${c.impact.capabilities.slice(0, 4).join("\n• ")}`
      : `Sanu follows a disciplined, contract-first 4-phase engineering methodology:\n\n${stepsFormatted}\n\nCore Architecture Domains:\n• ${c.impact.capabilities.slice(0, 4).join("\n• ")}`;
  }

  // 4. Zaakiy V3RSE R&D (Autonomous AI Agents & Operational Intelligence)
  const zaakiyKeywords = isArabic
    ? ["زاكي", "zaakiy", "v3rse", "ذكاء اصطناعي", "وكلاء", "روبوت"]
    : ["zaakiy", "v3rse", "ai agent", "agents", "operational intelligence", "rag"];

  if (zaakiyKeywords.some((k) => lowerQuery.includes(k))) {
    return isArabic
      ? `مشروع Zaakiy V3RSE:\n\n${c.zaakiy.heading}\n\n${c.zaakiy.description}\n\nالركائز الأساسية:\n• ${c.zaakiy.chips.join(" • ")}`
      : `Zaakiy V3RSE R&D Project:\n\n${c.zaakiy.heading}\n\n${c.zaakiy.description}\n\nCore Pillars:\n• ${c.zaakiy.chips.join(" • ")}`;
  }

  // 5. Direct FAQ Matching (When user asks specific portfolio FAQ questions)
  let bestFaqMatch: { q: string; a: string; score: number } | null = null;
  for (const item of c.faq.items) {
    const questionTokens = tokenize(item.q, true);
    let score = 0;
    
    // Only match against meaningful question tokens
    for (const token of questionTokens) {
      if (qTokens.has(token)) score += 3;
    }

    if (!bestFaqMatch || score > bestFaqMatch.score) {
      bestFaqMatch = { q: item.q, a: item.a, score };
    }
  }

  // If at least 2 distinct keywords match an explicit FAQ question
  if (bestFaqMatch && bestFaqMatch.score >= 6) {
    return `${bestFaqMatch.a}\n\n${
      isArabic
        ? `هل تود معرفة المزيد حول هذا الجانب أو استعراض المشاريع ذات الصلة؟`
        : `Would you like more details on this topic or to explore related production case studies?`
    }`;
  }

  // 6. Skills, Tech Stack & Cloud Platforms
  const techKeywords = isArabic
    ? ["مهارات", "تقنيات", "أدوات", "ستاك", "لغات", "كافكا", "نود", "رياكت", "سحابة", "أزور"]
    : ["skill", "skills", "stack", "tech", "technology", "tools", "languages", "kafka", "node", "react", "typescript", "azure", "cloud", "aws"];

  if (techKeywords.some((k) => lowerQuery.includes(k))) {
    return isArabic
      ? `الحزمة التقنية والخبرات الأساسية لسانو خان:\n\n• الإمكانيات: ${c.hero.capabilities.join(" • ")}\n• المجالات المعمارية: ${c.impact.capabilities.join(" • ")}\n• المنصات والخدمات: Node.js, TypeScript, React, Next.js, Azure Cloud, AWS, Apache Kafka, SAP ERP Integration, Kubernetes.`
      : `Sanu Khan's core technical stack and architectural specializations:\n\n• Core Capabilities: ${c.hero.capabilities.join(" • ")}\n• Architecture Domains: ${c.impact.capabilities.join(" • ")}\n• Runtime & Cloud Stack: Node.js, TypeScript, React, Next.js, Azure Cloud, AWS, Apache Kafka, SAP ERP Integration, Kubernetes.`;
  }

  // 7. Projects & Selected Production Systems
  const projectKeywords = isArabic
    ? ["مشروع", "مشاريع", "أعمال", "اعمال", "عمل", "تجزئة", "طيران", "منصة", "بنى", "بناها", "أنظمة", "انظمة", "دراسة حالة", "نظام"]
    : ["project", "projects", "work", "works", "built", "retail", "airline", "ndc", "case study", "studies", "system", "systems", "commerce"];

  if (projectKeywords.some((k) => lowerQuery.includes(k))) {
    const isRetail = lowerQuery.includes("retail") || lowerQuery.includes("تجزئة") || lowerQuery.includes("commerce");
    const isAirline = lowerQuery.includes("airline") || lowerQuery.includes("طيران") || lowerQuery.includes("ndc");

    if (isRetail) {
      const p = c.projects.items[0];
      return isArabic
        ? `• ${p.title} (${p.tag}):\n${p.desc}\n\nالحزمة التقنية: ${p.stack.join(" • ")}\nالمسار: ${p.slug}`
        : `• ${p.title} (${p.tag}):\n${p.desc}\n\nTech Stack: ${p.stack.join(" • ")}\nPath: ${p.slug}`;
    }

    if (isAirline) {
      const p = c.projects.items[1];
      return isArabic
        ? `• ${p.title} (${p.tag}):\n${p.desc}\n\nالحزمة التقنية: ${p.stack.join(" • ")}\nالمسار: ${p.slug}`
        : `• ${p.title} (${p.tag}):\n${p.desc}\n\nTech Stack: ${p.stack.join(" • ")}\nPath: ${p.slug}`;
    }

    // General projects list directly from content JSON
    const projectBullets = c.projects.items
      .map((p) => `• ${p.title} [${p.tag}]:\n  ${p.desc}\n  (${isArabic ? "التقنيات" : "Stack"}: ${p.stack.join(", ")})`)
      .join("\n\n");

    return isArabic
      ? `قام سانو بتصميم وتسليم أنظمة إنتاجية عالية التوسع، أبرزها:\n\n${projectBullets}\n\nيمكنك استكشاف جميع دراسات الحالة في صفحة /projects.`
      : `Sanu has architected and delivered high-scale production systems, featured below:\n\n${projectBullets}\n\nYou can explore deep-dive case studies at /projects.`;
  }

  // 8. Scale, Metrics & Verified Track Record
  const metricsKeywords = isArabic
    ? ["أرقام", "ارقام", "مقاييس", "إحصائيات", "احصائيات", "سجل", "سعة", "توسع", "جاهزية", "أداء"]
    : ["metric", "metrics", "stats", "scale", "track record", "uptime", "throughput", "concurrency", "numbers"];

  if (metricsKeywords.some((k) => lowerQuery.includes(k))) {
    const statsList = c.hero.stats.map((s) => `• ${s.value} — ${s.label} (${s.description})`).join("\n");
    const throughput = c.bento.blocks.throughput;
    const uptime = c.bento.blocks.production;

    return isArabic
      ? `السجل المهني والمقاييس الموثقة لسانو خان:\n\n${statsList}\n\n• ${throughput.title}: ${throughput.desc}\n• ${uptime.title}: ${uptime.desc}`
      : `Sanu Khan's verified track record and production metrics:\n\n${statsList}\n\n• ${throughput.title}: ${throughput.desc}\n• ${uptime.title}: ${uptime.desc}`;
  }

  // 9. Published Articles & Technical Writing
  const writingKeywords = isArabic
    ? ["مقال", "مقالات", "كتابة", "مدونة", "أفكار", "نشر", "قراءة"]
    : ["article", "articles", "blog", "blogs", "writing", "notes", "read", "duckdb", "proxy", "gateway"];

  if (writingKeywords.some((k) => lowerQuery.includes(k))) {
    const articlesList = c.writing.articles
      .map((a) => `• "${a.title}" [${a.tag}]\n  ${a.desc}\n  /blogs/${a.slug}`)
      .join("\n\n");

    return isArabic
      ? `أحدث المقالات التقنية لسانو خان:\n\n${articlesList}\n\nيمكنك قراءة جميع المقالات في صفحة /blogs.`
      : `Featured technical writing by Sanu Khan:\n\n${articlesList}\n\nYou can read all essays and guides at /blogs.`;
  }

  // 10. Bio & Profile Overview (Who is Sanu)
  const bioKeywords = isArabic
    ? ["من هو", "نبذة", "عن سانو", "سيرة", "تعريف", "سانو خان", "خبرة"]
    : ["who is", "about sanu", "bio", "background", "sanu khan", "profile", "overview", "experience"];

  if (bioKeywords.some((k) => lowerQuery.includes(k))) {
    return isArabic
      ? `${c.impact.bio1}\n\n${c.hero.subheading}\n\n• الخبرة: ${c.hero.stats[0].value} ${c.hero.stats[0].label}\n• الأنظمة: ${c.hero.stats[1].value} ${c.hero.stats[1].label}\n• الأسواق: ${c.hero.stats[2].value} ${c.hero.stats[2].label}\n\nتواصل معه عبر: ${c.footer.email}`
      : `${c.impact.bio1}\n\n${c.hero.subheading}\n\n• Experience: ${c.hero.stats[0].value} ${c.hero.stats[0].label}\n• Delivered: ${c.hero.stats[1].value} ${c.hero.stats[1].label}\n• Regional Footprint: ${c.hero.stats[2].value} ${c.hero.stats[2].label}\n\nContact: ${c.footer.email}`;
  }

  // 11. Fallback (Grounded in Content JSON)
  return isArabic
    ? `سانو خان هو ${c.hero.eyebrow} مقيم في ${c.hero.location} مع خبرة ${c.hero.stats[0].value}.\n\n${c.hero.subheading}\n\nيسعدني إجابتك عن:\n• المشاريع الإنتاجية (التجزئة والطيران)\n• المنهجية الهندسية ومبادئ تصميم الأنظمة\n• الحزمة التقنية (Node.js, Kafka, Azure Cloud)\n\nأو يمكنك التواصل معه مباشرة عبر ${c.footer.email}.`
    : `Sanu Khan is a ${c.hero.eyebrow} based in ${c.hero.location} with ${c.hero.stats[0].value} of platform engineering experience.\n\n${c.hero.subheading}\n\nFeel free to ask about:\n• Production case studies (Retail Commerce & Airline NDC)\n• 4-phase system design & architecture methodology\n• Cloud & event streaming stack (Node.js, Kafka, Azure)\n\nOr connect directly via email at ${c.footer.email}.`;
}

/**
 * Strips script tags, HTML markup, and dangerous characters from client-provided context,
 * wrapping it with an explicit untrusted label.
 */
export function sanitizeClientContext(raw?: string): string | undefined {
  if (!raw || typeof raw !== "string") return undefined;
  const stripped = raw
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/[^\p{L}\p{N}\s\-_/.:]/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 160);
  if (!stripped) return undefined;
  return `[Untrusted Client Context / Current View]: ${stripped}`;
}
