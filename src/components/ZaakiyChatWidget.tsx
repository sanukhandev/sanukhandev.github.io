import { MessageCircle, Send, X, Bot, Sparkles } from "lucide-react";
import { FormEvent, KeyboardEvent, useMemo, useRef, useState } from "react";
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
  import.meta.env.VITE_ZAAKIY_MAX_OUTPUT_CHARS || 300,
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
  const sessionIdRef = useRef(
    `zaakiy-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
  );
  const scopeSentRef = useRef(false);

  const isArabic = locale === "ar";
  const email = content.footer.contact.email;
  const koFi = "https://ko-fi.com/sanukhan";

  const greeting = content.ui.zaakiychat.greeting(koFi);

  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "greeting", role: "assistant", text: clipText(greeting) },
  ]);

  const siteScope = useMemo(() => {
    const profile = content.profile;
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
      `Identity: Zaakiy — Sanu Khan's personal AI Assistant. Respond in a friendly, conversational, helpful human voice as Sanu's personal representative.`,
      `Sanu Khan: Technical Architect & Engineering Lead based in Dubai, UAE with 13+ years experience.`,
      `Key Systems Built: Marks & Spencer Regional Commerce Platform (9 regional markets PIM integration), Al-Futtaim TradePoint Omnichannel Platform, TPConnects Airline B2B Content Marketplace, Airport Commerce & Duty-Free Platform.`,
      `Personal R&D: ZaakiyV3RSE — An AI-native operations intelligence platform exploring agent orchestration, context retrieval, and adaptive workflows.`,
      `Experience History: ${services}`,
      `Skills & Domains: ${skills}`,
      `Verified Works: ${works}`,
      ...(blogs ? [`Blogs & Articles: ${blogs}`] : []),
      `Contact email: ${email}`,
      `Buy me a coffee link: ${koFi}`,
    ].join("\n");
  }, [content, email, articles]);

  const appendMessage = (role: ChatRole, text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `${role}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
        role,
        text: clipText(text),
      },
    ]);
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 0);
  };

  const sendMessage = async () => {
    const userText = input.trim();
    if (!userText || loading) return;

    setInput("");
    appendMessage("user", userText);

    const usage = readDailyUsage();
    if (usage >= DAILY_QUOTA) {
      appendMessage(
        "assistant",
        content.ui.zaakiychat.dailyLimitReached(email),
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
        let errDetail = `HTTP ${response.status}`;
        try {
          const errBody = (await response.json()) as {
            error?: string;
            detail?: string;
          };
          if (errBody.detail) errDetail += `: ${errBody.detail}`;
          else if (errBody.error) errDetail += `: ${errBody.error}`;
        } catch {
          // ignore
        }
        console.error("[ZaakiyChat]", errDetail);
        throw new Error("service_error");
      }

      const payload = (await response.json()) as { text?: string };
      const modelText = payload.text?.trim();
      if (!modelText) {
        throw new Error("Empty model response");
      }

      writeDailyUsage(usage + 1);
      scopeSentRef.current = true;
      appendMessage("assistant", modelText);
    } catch (err) {
      if (!(err instanceof Error && err.message === "service_error")) {
        console.error("[ZaakiyChat]", err);
      }
      appendMessage("assistant", content.ui.zaakiychat.errorOccurred);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await sendMessage();
  };

  const onKeyDown = async (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await sendMessage();
    }
  };

  return (
    <div className="zaakiy-chat fixed bottom-4 right-4 z-[70] max-w-[calc(100vw-1.5rem)] sm:bottom-6 sm:right-6">
      {open && (
        <div className="mb-3 w-[min(360px,calc(100vw-1.5rem))] overflow-hidden rounded-2xl border border-border bg-background/95 shadow-2xl backdrop-blur-xl transition-all duration-300">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/60 bg-secondary/30 px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-accent/10 border border-accent/30 text-accent">
                <Bot className="h-4 w-4" />
                <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-background" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-primary flex items-center gap-1.5">
                  <span>Zaakiy AI</span>
                  <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-mono text-accent font-semibold">
                    Assistant
                  </span>
                </h3>
                <p className="text-[10px] text-muted-foreground">
                  Sanu Khan's Personal AI Representative
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-lg p-1.5 text-secondary hover:bg-secondary hover:text-primary transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages Feed */}
          <div
            ref={scrollRef}
            className={cn(
              "max-h-[340px] min-h-[260px] space-y-3 overflow-y-auto px-4 py-3",
              isArabic ? "text-right" : "text-left",
            )}
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed shadow-sm",
                  m.role === "assistant"
                    ? "border border-border bg-secondary/40 text-primary rounded-tl-sm"
                    : "ml-auto bg-accent text-white font-medium rounded-tr-sm",
                )}
              >
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 rounded-xl border border-border bg-secondary/30 px-3.5 py-2 text-[12px] text-muted-foreground w-fit">
                <Sparkles className="h-3.5 w-3.5 text-accent animate-spin" />
                <span>{content.ui.zaakiychat.aiTyping}</span>
              </div>
            )}
          </div>

          {/* Input Box */}
          <form onSubmit={onSubmit} className="border-t border-border/60 bg-secondary/20 p-3">
            <div className="flex items-center gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                rows={1}
                maxLength={400}
                placeholder={content.ui.zaakiychat.placeholder}
                className="min-h-[40px] flex-1 resize-none rounded-xl border border-border bg-background px-3 py-2 text-[13px] text-primary outline-none placeholder:text-muted-foreground focus:border-accent/50 transition-colors"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-white transition-all duration-200 hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-40 shadow-sm"
                aria-label={content.ui.zaakiychat.sendButtonLabel}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-1.5 text-center text-[10px] text-muted-foreground">
              {content.ui.zaakiychat.scopeDisclaimer}
            </p>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex h-12 items-center gap-2.5 rounded-full px-5 text-sm font-semibold shadow-lg transition-all duration-300 hover:scale-105",
          open
            ? "bg-accent text-white ring-2 ring-accent/40"
            : "border border-accent/40 bg-accent text-white hover:bg-accent/90",
        )}
        aria-label="Toggle Zaakiy AI chat"
      >
        <MessageCircle className="h-4 w-4 text-white" />
        <span className="brand-zaakiy font-bold text-white">Zaakiy AI</span>
      </button>
    </div>
  );
}
