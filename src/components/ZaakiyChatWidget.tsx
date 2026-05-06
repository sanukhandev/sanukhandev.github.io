import { MessageCircle, Send, X } from "lucide-react";
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
  import.meta.env.VITE_ZAAKIY_MAX_OUTPUT_CHARS || 250,
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

  const greeting = isArabic
    ? `مرحباً، أنا Zaakiy AI مساعد سانو خان. اسألني عن الموقع. ادعمني بقهوة: ${koFi}`
    : `Hi, I am Zaakiy AI, Sanu Khan's personal assistant. Ask about this site. Buy me a coffee: ${koFi}`;

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
      `Name: ${profile.name}`,
      `Role: ${profile.role}`,
      `Subtitle: ${profile.subtitle}`,
      `Statement: ${profile.statement}`,
      `Meta: ${profile.meta.join("; ")}`,
      `Experience: ${services}`,
      `Skills: ${skills}`,
      `Works: ${works}`,
      ...(blogs ? [`Blogs: ${blogs}`] : []),
      `Contact email: ${email}`,
      `Coffee link: ${koFi}`,
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
        isArabic
          ? `وصلنا حد اليوم. تواصل عبر البريد: ${email}`
          : `Daily chat limit reached. Please connect on email: ${email}`,
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
          // Send full siteScope on the first message to prime the server
          // session; omit on subsequent messages so the stored scope is used
          // and never accidentally overwritten with a partial payload.
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
          // ignore json parse failure
        }
        // Log full detail for debugging; throw a generic error for the UI
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
      // Log unexpected errors; show a friendly message to the user
      if (!(err instanceof Error && err.message === "service_error")) {
        console.error("[ZaakiyChat]", err);
      }
      appendMessage(
        "assistant",
        isArabic
          ? "عذراً، حدث خطأ. يُرجى المحاولة مجدداً."
          : "Sorry, something went wrong. Please try again.",
      );
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
    <div className="zaakiy-chat fixed bottom-3 right-3 z-[70] sm:bottom-5 sm:right-5">
      {open && (
        <div className="mb-3 w-[calc(100vw-1.5rem)] max-w-[340px] overflow-hidden rounded-2xl border border-default bg-secondary/95 shadow-[0_16px_40px_-20px_rgba(0,0,0,0.75)] backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-default px-4 py-3">
            <div>
              <h3 className="text-[15px] font-semibold text-primary">
                Zaakiy AI
              </h3>
              <p className="text-[11px] text-secondary">Powered by Zaakiy AI</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-md p-1.5 text-secondary transition-colors hover:bg-[#20222b] hover:text-primary"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div
            ref={scrollRef}
            className={cn(
              "max-h-[340px] min-h-[280px] space-y-2 overflow-y-auto px-4 py-3",
              isArabic ? "text-right" : "text-left",
            )}
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "max-w-[90%] rounded-xl px-3 py-2 text-[13px] leading-relaxed",
                  m.role === "assistant"
                    ? "border border-accent-soft bg-accent-soft text-[#d7ffe2]"
                    : "ml-auto border border-default bg-[#20222b] text-primary",
                )}
              >
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="w-fit rounded-xl border border-default bg-[#20222b] px-3 py-2 text-[12px] text-secondary">
                {isArabic ? "Zaakiy AI يكتب..." : "Zaakiy AI is typing..."}
              </div>
            )}
          </div>

          <form onSubmit={onSubmit} className="border-t border-default p-3">
            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                rows={1}
                maxLength={400}
                placeholder={
                  isArabic ? "اكتب سؤالك..." : "Type your question..."
                }
                className="min-h-[40px] flex-1 resize-none rounded-lg border border-default bg-secondary px-3 py-2 text-[13px] text-primary outline-none placeholder:text-secondary focus:border-accent-soft"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-on-accent transition-opacity disabled:cursor-not-allowed disabled:opacity-55"
                aria-label={isArabic ? "إرسال" : "Send"}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-1 text-[10px] text-secondary">
              {isArabic
                ? "ردود قصيرة وضمن بيانات الموقع فقط"
                : "Short replies, site-data scope only"}
            </p>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex h-12 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-all duration-300",
          open
            ? "border-accent bg-accent text-on-accent"
            : "border-accent-soft bg-accent-soft text-accent hover:bg-accent-soft",
        )}
        aria-label="Toggle Zaakiy AI chat"
      >
        <MessageCircle className="h-4 w-4" />
        Zaakiy AI
      </button>
    </div>
  );
}
