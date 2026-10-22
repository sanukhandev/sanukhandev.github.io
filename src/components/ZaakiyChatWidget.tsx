import { Send, X, Bot, ArrowRight, Minimize2 } from "lucide-react";
import { FormEvent, KeyboardEvent, useMemo, useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/hooks/use-locale";
import { getContent, Locale } from "@/lib/i18n";
import { generateKnowledgeScope, getSmartContentResponse } from "@/lib/zaakiy-knowledge";

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

export default function ZaakiyChatWidget({
  extraContext,
}: {
  extraContext?: string;
} = {}) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { locale } = useLocale();
  const activeLocale = (locale === "ar" ? "ar" : "en") as Locale;
  const content = getContent(activeLocale);
  const isArabic = activeLocale === "ar";
  const email = content.footer.email;

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  const sessionIdRef = useRef(
    `zaakiy-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
  );

  // Start with empty messages feed so welcome state is displayed initially
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Focus input on open, and refocus launcher only after user closes (avoid initial mount reflow)
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
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

  // Dynamically compute authoritative site knowledge scope from content JSON
  const siteScope = useMemo(() => {
    return generateKnowledgeScope(activeLocale, extraContext);
  }, [activeLocale, extraContext]);

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
          ? `وصلنا إلى الحد اليومي للاستفسارات. يرجى التواصل مباشرة مع سانو عبر البريد الإلكتروني: ${email}`
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
          locale: activeLocale,
          userQuestion: userText,
          siteScope,
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
      appendMessage("assistant", modelText);
    } catch {
      // Smart technical response engine grounded in localized content JSON
      writeDailyUsage(usage + 1);
      const smartReply = getSmartContentResponse(userText, activeLocale, extraContext);
      appendMessage("assistant", smartReply);
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
        { label: "استكشاف الأعمال والمشاريع", query: "ما هي المنصات الإنتاجية التي بناها سانو؟" },
        { label: "منهجية تصميم الأنظمة", query: "كيف يتعامل سانو مع تصميم الأنظمة والعمارة المعمارية؟" },
        { label: "الحزمة والمهارات التقنية", query: "ما هي التقنيات والمنصات الرئيسية في حزمتك الأساسية؟" },
        { label: "أبحاث Zaakiy V3RSE", query: "ما هو مشروع ZaakiyV3RSE للبحث والتطوير؟" },
      ]
    : [
        { label: "Explore production case studies", query: "What production systems has Sanu built?" },
        { label: "System design methodology", query: "How does Sanu approach system design and architecture?" },
        { label: "Core technologies & stack", query: "Which technologies and platforms are in your core stack?" },
        { label: "Zaakiy V3RSE R&D", query: "What is ZaakiyV3RSE R&D?" },
      ];

  return (
    <div
      style={{ contain: "layout style" }}
      className="zaakiy-chat fixed bottom-4 right-4 z-[70] max-w-[calc(100vw-1.5rem)] sm:bottom-6 sm:right-6"
    >
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="zaakiy-chat-title"
          aria-label={isArabic ? "مساعد معرض سانو خان" : "Zaakiy Portfolio Assistant"}
          className="zaakiy-chat__dialog mb-3 flex flex-col w-[min(380px,calc(100vw-1.5rem))] h-[min(560px,calc(100vh-6rem))] max-h-[620px] overflow-hidden rounded-[16px] shadow-xl transition-all duration-200"
        >
          {/* Header (56-64px height, understated neutral tone) */}
          <div className="zaakiy-chat__header flex h-14 shrink-0 items-center justify-between px-4">
            <div className="flex items-center gap-2.5">
              <div className="zaakiy-chat__bot-icon flex h-7 w-7 items-center justify-center rounded-lg">
                <Bot className="h-3.5 w-3.5" />
              </div>
              <div className="flex flex-col leading-none">
                <span id="zaakiy-chat-title" className="brand-zaakiy text-[14px] font-semibold text-primary">Zaakiy</span>
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
              "zaakiy-chat__body flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-4 font-sans",
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
                      ? `المساعد الذكي لمعرض سانو خان (${content.hero.location}). يمكنني مساعدتك في استكشاف عمارة الحلول، والتكامل المؤسسي، وهندسة المنصات.`
                      : `Smart assistant for Sanu Khan's portfolio (${content.hero.location}). I can help you explore solutions architecture, enterprise integrations, and platform engineering.`}
                  </p>
                  <p className="text-[12px] text-muted-foreground">
                    {isArabic
                      ? "اسأل عن أي نظام، أو منهجية عمل، أو قرار تقني."
                      : "Ask about any system, engineering methodology, or architectural decision."}
                  </p>
                </div>

                {/* Suggested Questions Stack */}
                <div className="zaakiy-chat__suggested-wrapper pt-3 space-y-2">
                  <p className="text-[11px] font-mono uppercase text-muted-foreground tracking-wider font-semibold">
                    {isArabic ? "أسئلة مقترحة" : "Suggested"}
                  </p>
                  <div className="grid grid-cols-1 gap-1.5">
                    {suggestedQuestions.map((q) => (
                      <button
                        key={q.label}
                        type="button"
                        onClick={() => handleSendQuery(q.query)}
                        className="zaakiy-chat__suggested-btn group flex items-center justify-between rounded-lg px-3 py-2 text-left rtl:text-right text-[12.5px] font-medium transition-colors"
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
                  <div className="zaakiy-chat__user-bubble ml-auto rtl:ml-0 rtl:mr-auto max-w-[80%] rounded-[12px] px-3.5 py-2 text-[13px] leading-relaxed">
                    {m.text}
                  </div>
                ) : (
                  <div className="flex items-start gap-2.5 max-w-[95%]">
                    <div className="zaakiy-chat__bot-icon mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md">
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
          <form onSubmit={onSubmit} className="zaakiy-chat__form p-3 space-y-2 shrink-0">
            <div className="flex items-center gap-2">
              <textarea
                ref={inputRef}
                aria-label={isArabic ? "اكتب سؤالك" : "Ask about Sanu's work"}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                rows={1}
                maxLength={400}
                placeholder={isArabic ? "اسأل عن أعمال سانو…" : "Ask about Sanu's work…"}
                className="zaakiy-chat__input min-h-[42px] max-h-[90px] flex-1 resize-none rounded-xl px-3.5 py-2.5 text-[13px] outline-none placeholder:text-muted-foreground transition-colors"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="zaakiy-chat__send-btn inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
                aria-label={isArabic ? "إرسال السؤال" : "Send query"}
              >
                <Send className="h-4 w-4 rtl:rotate-180" />
              </button>
            </div>
            <div className="flex items-center justify-between text-[11px] text-muted-foreground px-1">
              <span>
                {isArabic ? "مدعوم بواسطة " : "Powered by "}
                <span className="inline-flex items-baseline font-sans font-medium" dir="ltr">
                  <span className="text-foreground font-normal">Zaakiy</span>
                  <span className="text-[#EF470D] font-bold">V3RSE</span>
                </span>
              </span>
              <span className="font-mono text-[10px]">
                {isArabic ? "وضع المعرض" : "Portfolio mode"}
              </span>
            </div>
          </form>
        </div>
      )}

      {/* Floating Launcher Button with Compact Glassmorphism */}
      <div className="zaakiy-chat__launcher relative inline-flex flex-col items-end">
        <button
          ref={launcherRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "zaakiy-chat__launcher-button inline-flex h-10 sm:h-11 items-center gap-2 rounded-full border border-white/20 bg-[#101010]/90 px-3.5 sm:px-4 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md shadow-xl transition-all hover:bg-[#D5360C] hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-[#D5360C]",
            open && "bg-[#D5360C] border-white/30"
          )}
          aria-label={isArabic ? "اسأل Zaakiy — فتح مساعد Zaakiy" : "Ask Zaakiy — Open Zaakiy Portfolio Assistant"}
        >
          <Bot className="h-4 w-4 text-[#E6D5BD]" />
          <span className="font-medium">{isArabic ? "اسأل Zaakiy" : "Ask Zaakiy"}</span>
        </button>
      </div>
    </div>
  );
}
