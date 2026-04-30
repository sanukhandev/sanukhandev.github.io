import { MessageCircle, Send, X } from "lucide-react";
import { FormEvent, KeyboardEvent, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/hooks/use-locale";
import { useSiteContent } from "@/data/siteContent";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
};

const MAX_OUTPUT_CHARS = Number(import.meta.env.VITE_ZAAKIY_MAX_OUTPUT_CHARS || 250);
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

export default function ZaakiyChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { locale } = useLocale();
  const content = useSiteContent();
  const scrollRef = useRef<HTMLDivElement>(null);
  const sessionIdRef = useRef(`zaakiy-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`);

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

    return [
      `Name: ${profile.name}`,
      `Role: ${profile.role}`,
      `Subtitle: ${profile.subtitle}`,
      `Statement: ${profile.statement}`,
      `Meta: ${profile.meta.join("; ")}`,
      `Experience: ${services}`,
      `Skills: ${skills}`,
      `Works: ${works}`,
      `Contact email: ${email}`,
      `Coffee link: ${koFi}`,
    ].join("\n");
  }, [content, email]);

  const appendMessage = (role: ChatRole, text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: `${role}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`, role, text: clipText(text) },
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
          siteScope,
          email,
          maxOutputChars: MAX_OUTPUT_CHARS,
          sessionId: sessionIdRef.current,
        }),
      });

      if (!response.ok) {
        throw new Error(`GenAI request failed: ${response.status}`);
      }

      const payload = (await response.json()) as { text?: string };
      const modelText = payload.text?.trim();
      if (!modelText) {
        throw new Error("Empty model response");
      }

      writeDailyUsage(usage + 1);
      appendMessage("assistant", modelText);
    } catch {
      appendMessage(
        "assistant",
        isArabic
          ? `عذراً، الخدمة غير متاحة الآن. تواصل عبر البريد: ${email}`
          : `Sorry, service is unavailable right now. Please connect on email: ${email}`,
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
        <div className="mb-3 w-[calc(100vw-1.5rem)] max-w-[340px] overflow-hidden rounded-2xl border border-[#2b2f3b] bg-[#16171d]/95 shadow-[0_16px_40px_-20px_rgba(0,0,0,0.75)] backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-[#2b2f3b] px-4 py-3">
            <div>
              <h3 className="text-[15px] font-semibold text-[#f0f1f4]">Zaakiy AI</h3>
              <p className="text-[11px] text-[#8a90a8]">Powered by Zaakiy AI</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-md p-1.5 text-[#8a90a8] transition-colors hover:bg-[#20222b] hover:text-[#f0f1f4]"
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
                    ? "border border-[#38c755]/35 bg-[#38c755]/10 text-[#d7ffe2]"
                    : "ml-auto border border-[#2b2f3b] bg-[#20222b] text-[#f0f1f4]",
                )}
              >
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="w-fit rounded-xl border border-[#2b2f3b] bg-[#20222b] px-3 py-2 text-[12px] text-[#8a90a8]">
                {isArabic ? "Zaakiy AI يكتب..." : "Zaakiy AI is typing..."}
              </div>
            )}
          </div>

          <form onSubmit={onSubmit} className="border-t border-[#2b2f3b] p-3">
            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                rows={1}
                maxLength={400}
                placeholder={isArabic ? "اكتب سؤالك..." : "Type your question..."}
                className="min-h-[40px] flex-1 resize-none rounded-lg border border-[#2b2f3b] bg-[#20222b] px-3 py-2 text-[13px] text-[#f0f1f4] outline-none placeholder:text-[#8a90a8] focus:border-[#38c755]/55"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#38c755] text-[#0f1015] transition-opacity disabled:cursor-not-allowed disabled:opacity-55"
                aria-label={isArabic ? "إرسال" : "Send"}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-1 text-[10px] text-[#8a90a8]">
              {isArabic ? "ردود قصيرة وضمن بيانات الموقع فقط" : "Short replies, site-data scope only"}
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
            ? "border-[#38c755] bg-[#38c755] text-[#0f1015]"
            : "border-[#38c755]/45 bg-[#38c755]/10 text-[#38c755] hover:bg-[#38c755]/20",
        )}
        aria-label="Toggle Zaakiy AI chat"
      >
        <MessageCircle className="h-4 w-4" />
        Zaakiy AI
      </button>
    </div>
  );
}
