import { MessageCircle, Send, X, Bot, ArrowRight, Minimize2 } from "lucide-react";
import { FormEvent, KeyboardEvent, useMemo, useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/hooks/use-locale";
import { useSiteContent } from "@/data/siteContent";
import { useDevToArticles } from "@/hooks/use-devto-articles";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
};

const MAX_OUTPUT_CHARS = Number(
  import.meta.env.VITE_ZAAKIY_MAX_OUTPUT_CHARS || 450,
);
const DAILY_QUOTA = Number(import.meta.env.VITE_ZAAKIY_DAILY_QUOTA || 200);
const CHAT_API_URL = import.meta.env.VITE_ZAAKIY_API_URL || "/api/zaakiy-chat";

const dailyQuotaKey = () => {
  const day = new Date().toISOString().slice(0, 10);
  return `zaakiy-daily-quota-${day}`;
};

const readDailyUsage = () => {
  if (typeof window === "undefined") return 0;
  const raw = window.localStorage.getItem(dailyQuotaKey());
  const parsed = Number(raw || 0);
  return Number.isFinite(parsed) ? parsed : 0;
};

const writeDailyUsage = (value: number) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(dailyQuotaKey(), String(value));
};

const clipText = (text: string, max = MAX_OUTPUT_CHARS) => {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, Math.max(0, max - 1)).trim()}…`;
};

const getProfessionalFallbackResponse = (query: string, email: string, isArabic = false): string => {
  const q = query.toLowerCase();

  if (isArabic) {
    if (q.includes("مرحبا") || q.includes("أهلا") || q.includes("من أنت") || q.includes("من انت")) {
      return "مرحباً! أنا Zaakiy، مساعد معرض سانو خان. يمكنني الإجابة عن الأسئلة المتعلقة بخبرته الممتدة لأكثر من 13 عاماً في عمارة الحلول، والتكامل المؤسسي، وهندسة المنصات.";
    }

    if (q.includes("معمارية") || q.includes("تصميم") || q.includes("عمارة") || q.includes("نهج")) {
      return "يتعامل سانو مع العمارة المعمارية بتحديد حدود النطاق وملكية البيانات أولاً.\n\nأبرز المبادئ المعمارية:\n• فصل خدمات النطاق قبل اختيار قواعد البيانات\n• فرض التحقق الصارم من العقود عند حدود APIs\n• التصميم لمواجهة الأعطال المؤقتة مع تكرار متكافئ القوة (Idempotent)\n• إعطاء الأولوية للقابلية للملاحظة التشغيلية في بيئات الإنتاج";
    }

    if (q.includes("عمل") || q.includes("أنظمة") || q.includes("مشروع") || q.includes("خبرة") || q.includes("طيران") || q.includes("تجزئة")) {
      return "قام سانو بتصميم وتسليم أنظمة إنتاجية عالية التوسع:\n\n• منصة التجارة الإقليمية: مزامنة الكتالوج و PIM عبر 9 أسواق مؤسسية\n• سوق NDC للطيران: تجميع رحلات طيران متعددة الموردين وحجز B2B\n• بنية التجارة موحدة القنوات: تكامل قائم على الأحداث يربط ERP بالمتاجر\n• منصة تجارة المطارات: نظام تجارة متعدد المحطات وحجز الصالات";
    }

    if (q.includes("زاكي") || q.includes("zaakiy") || q.includes("v3rse") || q.includes("ذكاء")) {
      return "ZaakiyV3RSE هو مشروع بحث وتطوير مستمر لسانو يستكشف الذكاء التشغيلي وتنسيق وكلاء الذكاء الاصطناعي المستقلين واسترجاع السياق والأنظمة المرنة.";
    }

    if (q.includes("تواصل") || q.includes("بريد") || q.includes("توظيف") || q.includes("اتصال")) {
      return `يمكنك التواصل مع سانو مباشرة عبر البريد الإلكتروني ${email} أو عبر LinkedIn. مقره في دبي، الإمارات وهو منفتح لفرص القيادة المعمارية والهندسية.`;
    }

    if (q.includes("مهارات") || q.includes("تقنيات") || q.includes("ستاك")) {
      return "التخصصات التقنية:\n• العمارة: عمارة الحلول، التصميم الموجه بالنطاق (DDD)، الخدمات المصغرة (Microservices)، الأنظمة القائمة على الأحداث\n• الهندسة: Node.js, TypeScript, React, Azure Cloud, Kafka, REST/GraphQL APIs, PIM/ERP Integrations";
    }

    return `سانو خان هو معماري حلول وقائد هندسة منصات مقيم في دبي، الإمارات مع خبرة 13+ عاماً.\n\nيسعدني إجابتك عن أي سؤال أو يمكنك التواصل معه مباشرة عبر ${email}.`;
  }

  if (q.includes("hi") || q.includes("hello") || q.includes("hey") || q.includes("who are you")) {
    return "Hi — I'm Zaakiy, Sanu Khan's portfolio assistant. I can answer questions about his 13+ years in solution architecture, enterprise integrations, and platform engineering.";
  }

  if (q.includes("architecture") || q.includes("approach") || q.includes("design") || q.includes("how does sanu")) {
    return "Sanu approaches architecture by establishing explicit domain boundaries and data ownership first.\n\nKey architectural principles:\n• Decouple domain services before selecting databases\n• Enforce strict contract validation at API boundaries\n• Design for transient failure with idempotent retries\n• Prioritize operational observability in production";
  }

  if (q.includes("work") || q.includes("system") || q.includes("project") || q.includes("built") || q.includes("experience") || q.includes("airline") || q.includes("retail")) {
    return "Sanu has architected and delivered high-scale production systems:\n\n• Regional Commerce Platform: PIM/catalog sync across 9 enterprise markets\n• Airline NDC Marketplace: Multi-supplier flight aggregation & B2B booking\n• Omnichannel Commerce Fabric: Event-driven integration linking ERP & storefronts\n• Airport Commerce Platform: Multi-terminal retail and lounge reservation system";
  }

  if (q.includes("zaakiy") || q.includes("v3rse") || q.includes("ai") || q.includes("r&d")) {
    return "ZaakiyV3RSE is Sanu's ongoing R&D project exploring operational intelligence, autonomous AI agent orchestration, context retrieval, and resilient workflow systems.";
  }

  if (q.includes("contact") || q.includes("email") || q.includes("hire") || q.includes("reach") || q.includes("touch")) {
    return `You can reach Sanu directly via email at ${email} or connect on LinkedIn. He is based in Dubai, UAE and open to solution architecture and engineering leadership roles.`;
  }

  if (q.includes("skill") || q.includes("stack") || q.includes("tech") || q.includes("node") || q.includes("react")) {
    return "Technical Specializations:\n• Architecture: Solution Architecture, Domain-Driven Design, Microservices, Event-Driven Systems\n• Engineering: Node.js, TypeScript, React, Azure Cloud, Kafka, REST/GraphQL APIs, PIM/ERP Integrations";
  }

  return `Sanu Khan is a Solution Architect & Platform Engineering Leader based in Dubai, UAE with 13+ years of experience.\n\nFeel free to ask about his enterprise case studies or reach out directly at ${email}.`;
};

export default function ZaakiyChatWidget({
  extraContext,
}: {
  extraContext?: string;
} = {}) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { locale } = useLocale();
  const content = useSiteContent();
  const { data: articles } = useDevToArticles(20);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  const sessionIdRef = useRef(
    `zaakiy-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
  );
  const scopeSentRef = useRef(false);

  const isArabic = locale === "ar";
  const email = content.footer.contact.email;

  // Start with empty messages feed so welcome state is displayed initially
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Focus input on open, and handle Escape key to close
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      launcherRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown as unknown as EventListener);
    return () => window.removeEventListener("keydown", handleKeyDown as unknown as EventListener);
  }, [open]);

  const siteScope = useMemo(() => {
    const works = content.works
      .map((w) => `${w.title}: ${w.outcome}`)
      .slice(0, 5)
      .join(" | ");
    const services = content.services
      .map((s) => `${s.company} - ${s.role} (${s.duration})`)
      .join(" | ");
    const skills = content.skills.clusters
      .map((c) => `${c.title}: ${c.tags.join(", ")}`)
      .join(" | ");

    const blogs =
      articles && articles.length > 0
        ? articles
            .map(
              (a) =>
                `"${a.title}" (${a.tags.slice(0, 3).join(", ")}) → https://sanukhan.dev${a.localPath}`,
            )
            .join(" | ")
        : "";

    return [
      `Identity: Zaakiy — Sanu Khan's Portfolio Assistant.`,
      `Persona & Tone: Professional, calm, concise, technical, and helpful solution architect representative. Keep responses clear and under 3-4 bullet points or concise paragraphs.`,
      `Sanu Khan: Solution Architect & Platform Engineering Leader based in Dubai, UAE with 13+ years experience.`,
      `Key Systems Built: Regional Enterprise Commerce Platform (9 regional markets PIM integration), Enterprise Omnichannel Commerce Fabric, Airline NDC & Travel B2B Marketplace, Airport Commerce & Travel Retail Platform.`,
      `Personal R&D: ZaakiyV3RSE — An AI-native operations intelligence platform exploring agent orchestration, context retrieval, and adaptive workflows.`,
      `Experience History: ${services}`,
      `Skills & Domains: ${skills}`,
      `Verified Works: ${works}`,
      ...(blogs ? [`Blogs & Articles: ${blogs}`] : []),
      `Contact email: ${email}`,
    ].join("\n");
  }, [content, email, articles]);

  const appendMessage = (role: ChatRole, text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `${role}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
        role,
        text,
      },
    ]);
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 50);
  };

  const handleSendQuery = async (queryText: string) => {
    const userText = queryText.trim();
    if (!userText || loading) return;

    setInput("");
    appendMessage("user", userText);

    const usage = readDailyUsage();
    if (usage >= DAILY_QUOTA) {
      appendMessage(
        "assistant",
        isArabic
          ? `وصلنا إلى الحد اليومي للأسئلة. يرجى التواصل مباشرة مع سانو عبر البريد الإلكتروني: ${email}`
          : `Daily query limit reached. Please connect directly with Sanu via email at ${email}.`,
      );
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(CHAT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale,
          userQuestion: userText,
          siteScope: scopeSentRef.current ? undefined : siteScope,
          extraContext: extraContext || undefined,
          email,
          maxOutputChars: MAX_OUTPUT_CHARS,
          sessionId: sessionIdRef.current,
        }),
      });

      if (!response.ok) {
        throw new Error("api_offline");
      }

      const payload = (await response.json()) as { text?: string };
      const modelText = payload.text?.trim();
      if (!modelText) {
        throw new Error("empty_response");
      }

      writeDailyUsage(usage + 1);
      scopeSentRef.current = true;
      appendMessage("assistant", modelText);
    } catch {
      // Professional technical fallback when offline / static hosting
      writeDailyUsage(usage + 1);
      const fallback = getProfessionalFallbackResponse(userText, email, isArabic);
      appendMessage("assistant", fallback);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await handleSendQuery(input);
  };

  const onKeyDown = async (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await handleSendQuery(input);
    }
  };

  const suggestedQuestions = isArabic
    ? [
        { label: "استكشاف الأعمال المعمارية", query: "ما هي المنصات الإنتاجية التي بناها سانو؟" },
        { label: "كيف يصمم سانو الأنظمة؟", query: "كيف يتعامل سانو مع تصميم الأنظمة والعمارة المعمارية؟" },
        { label: "ما هو ZaakiyV3RSE؟", query: "ما هو مشروع ZaakiyV3RSE للبحث والتطوير؟" },
        { label: "خبرة التكامل المؤسسي", query: "أخبرني عن خبرة سانو في التكامل المؤسسي" },
      ]
    : [
        { label: "Explore architecture work", query: "What production systems has Sanu built?" },
        { label: "How does Sanu approach system design?", query: "How does Sanu approach system design and architecture?" },
        { label: "What is ZaakiyV3RSE?", query: "What is ZaakiyV3RSE R&D?" },
        { label: "Show enterprise experience", query: "Tell me about Sanu's enterprise integration experience" },
      ];

  return (
    <div className="zaakiy-chat fixed bottom-4 right-4 z-[70] max-w-[calc(100vw-1.5rem)] sm:bottom-6 sm:right-6">
      {open && (
        <div
          role="dialog"
          aria-label={isArabic ? "مساعد معرض سانو خان" : "Zaakiy Portfolio Assistant"}
          className="mb-3 flex flex-col w-[min(380px,calc(100vw-1.5rem))] h-[min(560px,calc(100vh-6rem))] max-h-[620px] overflow-hidden rounded-[16px] border border-border bg-background shadow-xl transition-all duration-200"
        >
          {/* Header (56-64px height, understated neutral tone) */}
          <div className="flex h-14 shrink-0 items-center justify-between border-b border-border/70 bg-secondary/20 px-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-accent/20 bg-accent/10 text-accent">
                <Bot className="h-3.5 w-3.5" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="brand-zaakiy text-[14px] font-semibold text-primary">Zaakiy</span>
                <span className="mt-0.5 text-[11px] text-muted-foreground font-normal">
                  {isArabic ? "مساعد المعرض" : "Portfolio Assistant"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={isArabic ? "تصغير المساعد" : "Minimize assistant"}
                className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-primary transition-colors"
              >
                <Minimize2 className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={isArabic ? "إغلاق المساعد" : "Close assistant"}
                className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-primary transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Conversation & Welcome Body */}
          <div
            ref={scrollRef}
            className={cn(
              "flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-4 font-sans text-primary",
              isArabic ? "text-right" : "text-left",
            )}
          >
            {/* Welcome State (Shown when no messages have been sent) */}
            {messages.length === 0 && (
              <div className="space-y-4 py-1">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold uppercase text-accent tracking-wider">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>{isArabic ? "وضع المعرض" : "Portfolio Mode"}</span>
                  </div>
                  <h4 className="text-[15px] font-semibold text-primary tracking-tight">
                    {isArabic ? "مرحباً — أنا Zaakiy." : "Hi — I'm Zaakiy."}
                  </h4>
                  <p className="text-[13px] leading-relaxed text-secondary font-normal">
                    {isArabic
                      ? "يمكنني مساعدتك في استكشاف أعمال سانو عبر عمارة الحلول، والتكامل المؤسسي، وهندسة المنصات، والقيادة التقنية."
                      : "I can help you explore Sanu's work across solution architecture, enterprise integration, platform engineering, and technical leadership."}
                  </p>
                  <p className="text-[12px] text-muted-foreground">
                    {isArabic
                      ? "اسأل عن نظام، أو مجال، أو قرار معماري."
                      : "Ask about a system, domain, or architectural decision."}
                  </p>
                </div>

                {/* Suggested Questions Stack */}
                <div className="pt-3 space-y-2 border-t border-border/50">
                  <p className="text-[11px] font-mono uppercase text-muted-foreground tracking-wider font-semibold">
                    {isArabic ? "أسئلة مقترحة" : "Suggested"}
                  </p>
                  <div className="grid grid-cols-1 gap-1.5">
                    {suggestedQuestions.map((q) => (
                      <button
                        key={q.label}
                        type="button"
                        onClick={() => handleSendQuery(q.query)}
                        className="group flex items-center justify-between rounded-lg border border-border/70 bg-secondary/20 px-3 py-2 text-left rtl:text-right text-[12.5px] font-medium text-primary hover:border-accent/40 hover:bg-secondary/50 transition-colors"
                      >
                        <span>{q.label}</span>
                        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-accent transition-colors rtl:rotate-180" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Conversation Messages */}
            {messages.map((m) => (
              <div key={m.id} className="w-full">
                {m.role === "user" ? (
                  <div className="ml-auto rtl:ml-0 rtl:mr-auto max-w-[80%] rounded-[12px] bg-accent/10 border border-accent/20 px-3.5 py-2 text-[13px] text-primary leading-relaxed">
                    {m.text}
                  </div>
                ) : (
                  <div className="flex items-start gap-2.5 max-w-[95%]">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-accent/20 bg-accent/10 text-accent">
                      <Bot className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex-1 space-y-1.5 text-[13px] leading-relaxed text-primary font-normal whitespace-pre-line">
                      {m.text}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Loading Indicator */}
            {loading && (
              <div className="flex items-center gap-2 text-[12px] text-muted-foreground py-1 pl-8 rtl:pl-0 rtl:pr-8">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                <span>{isArabic ? "يفكر…" : "Thinking…"}</span>
              </div>
            )}
          </div>

          {/* Composer Input Area */}
          <form onSubmit={onSubmit} className="border-t border-border/70 bg-background p-3 space-y-2 shrink-0">
            <div className="flex items-center gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                rows={1}
                maxLength={400}
                placeholder={isArabic ? "اسأل عن أعمال سانو…" : "Ask about Sanu's work…"}
                className="min-h-[42px] max-h-[90px] flex-1 resize-none rounded-xl border border-border bg-secondary/15 px-3.5 py-2.5 text-[13px] text-primary outline-none placeholder:text-muted-foreground focus:border-accent/60 focus:bg-background transition-colors"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-white transition-colors hover:bg-accent/90 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
                aria-label={isArabic ? "إرسال السؤال" : "Send query"}
              >
                <Send className="h-4 w-4 rtl:rotate-180" />
              </button>
            </div>
            <div className="flex items-center justify-between text-[11px] text-muted-foreground px-1">
              <span>
                {isArabic ? "مدعوم بواسطة " : "Powered by "}
                <span className="brand-zaakiy font-semibold text-accent">ZaakiyV3RSE</span>
              </span>
              <span className="font-mono text-[10px]">
                {isArabic ? "وضع المعرض" : "Portfolio mode"}
              </span>
            </div>
          </form>
        </div>
      )}

      {/* Understated Floating Launcher Button */}
      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex h-11 items-center gap-2 rounded-full border border-accent/30 bg-accent px-4 text-xs font-semibold text-white shadow-md transition-all hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent/40",
          open && "ring-2 ring-accent/40 bg-accent/90"
        )}
        aria-label={isArabic ? "فتح مساعد Zaakiy" : "Open Zaakiy Portfolio Assistant"}
      >
        <MessageCircle className="h-4 w-4" />
        <span className="font-medium">{isArabic ? "اسأل Zaakiy" : "Ask Zaakiy"}</span>
      </button>
    </div>
  );
}

