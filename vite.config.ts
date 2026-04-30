import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from "url";
import { mcpProcessor, type ZaakiyLocale } from "./src/lib/mcp-processor";
import { mcpGenerativeSupport } from "./src/lib/mcp-generative-support";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

type HistoryMessage = { role: "user" | "assistant"; text: string };
const conversationMemory = new Map<string, HistoryMessage[]>();

const readJsonBody = async (req: import("http").IncomingMessage) => {
  const chunks: Uint8Array[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
};

const sendJson = (res: import("http").ServerResponse, status: number, data: unknown) => {
  res.statusCode = status;
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
};

const clipText = (text: string, max = 250) => {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, Math.max(0, max - 1)).trim()}…`;
};

const extractModelText = (payload: unknown) => {
  const data = payload as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };
  const parts = data.candidates?.[0]?.content?.parts || [];
  return parts.map((p) => p.text || "").join(" ").trim();
};

const leakPattern = /(SITE_SCOPE|USER_QUESTION|LOCALE|CONVERSATION)\s*:?/gi;

const sanitizeModelText = (raw: string) =>
  raw
    .replace(leakPattern, "")
    .replace(/\s*\|\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const looksLeakyOrInvalid = (text: string) => {
  if (!text) return true;
  if (leakPattern.test(text)) return true;
  const lowered = text.toLowerCase();
  return lowered.startsWith("name:") || lowered.startsWith("role:") || lowered.includes("contextsummary");
};

const fallbackReply = (locale: ZaakiyLocale, email: string, question: string) => {
  const q = question.trim().toLowerCase();
  const isGreeting = /^(hi|hello|hey|hola|مرحبا|السلام عليكم)/i.test(q);
  const exactEnglishFallback = `Please connect on email ${email}`;
  if (locale === "ar") {
    if (isGreeting) {
      return "أهلاً! أنا Zaakiy AI مساعد سانو خان. اسألني عن الأعمال أو الخبرات أو المهارات. ادعمني بقهوة: https://ko-fi.com/sanukhan";
    }
    return `تواصل عبر البريد ${email}`;
  }
  if (isGreeting) {
    return "Hey! I am Zaakiy AI, Sanu Khan's personal assistant. Ask me about work, experience, or skills. Buy me a coffee: https://ko-fi.com/sanukhan";
  }
  return exactEnglishFallback;
};

const getHistory = (sessionId: string) => conversationMemory.get(sessionId) || [];

const pushHistory = (sessionId: string, role: "user" | "assistant", text: string) => {
  const history = getHistory(sessionId);
  history.push({ role, text });
  if (history.length > 12) {
    history.splice(0, history.length - 12);
  }
  conversationMemory.set(sessionId, history);
};

const registerZaakiyApi = (
  middlewares: {
    use: (
      path: string,
      handler: (
        req: import("http").IncomingMessage,
        res: import("http").ServerResponse,
      ) => void | Promise<void>,
    ) => void;
  },
  env: Record<string, string>,
) => {
  middlewares.use("/api/zaakiy-chat", async (req, res) => {
    if (req.method === "OPTIONS") {
      sendJson(res, 200, { ok: true });
      return;
    }

    if (req.method === "GET") {
      sendJson(res, 200, {
        ok: true,
        message: "Zaakiy wrapper is running",
        model: env.GOOGLE_GENAI_MODEL || "gemini-2.5-flash-lite",
      });
      return;
    }

    if (req.method !== "POST") {
      sendJson(res, 405, { error: "Method not allowed" });
      return;
    }

    try {
      const apiKey = env.GOOGLE_GENAI_API_KEY;
      const model = env.GOOGLE_GENAI_MODEL || "gemini-2.5-flash-lite";

      if (!apiKey) {
        sendJson(res, 503, { error: "Missing GOOGLE_GENAI_API_KEY on server" });
        return;
      }

      const body = (await readJsonBody(req)) as {
        locale?: "en" | "ar";
        userQuestion?: string;
        siteScope?: string;
        email?: string;
        maxOutputChars?: number;
        sessionId?: string;
      };

      const locale: ZaakiyLocale = body.locale === "ar" ? "ar" : "en";
      const userQuestion = (body.userQuestion || "").trim();
      const siteScope = (body.siteScope || "").trim();
      const email = (body.email || "khan.sanukhan@outlook.com").trim();
      const maxOutputChars = Math.max(120, Math.min(500, Number(body.maxOutputChars || 250)));
      const sessionId = (body.sessionId || "anonymous-session").trim();

      if (!userQuestion || !siteScope) {
        sendJson(res, 400, { error: "Missing required fields" });
        return;
      }

      const scopedContext = mcpProcessor.getEnhancedContext(siteScope, locale);
      const queryContext = mcpProcessor.getQueryContext(scopedContext, userQuestion, 14);
      const history = getHistory(sessionId);
      pushHistory(sessionId, "user", userQuestion);

      const mergedPrompt = mcpGenerativeSupport.buildScopedPrompt({
        context: scopedContext,
        queryContext,
        userQuestion,
        email,
        maxChars: maxOutputChars,
        conversationHistory: history.map((h) => ({ role: h.role, text: h.text })),
      });

      const googleResp = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: mergedPrompt }] }],
            generationConfig: {
              temperature: 0.6,
              topP: 0.9,
              maxOutputTokens: 220,
            },
          }),
        },
      );

      if (!googleResp.ok) {
        const detail = await googleResp.text();
        sendJson(res, googleResp.status, { error: "Upstream GenAI error", detail });
        return;
      }

      const payload = await googleResp.json();
      const text = extractModelText(payload);
      if (!text) {
        sendJson(res, 502, { error: "Empty model response" });
        return;
      }

      const sanitized = sanitizeModelText(text);
      const safeText = looksLeakyOrInvalid(sanitized)
        ? fallbackReply(locale, email, userQuestion)
        : sanitized;

      const clipped = clipText(safeText, maxOutputChars);
      pushHistory(sessionId, "assistant", clipped);

      sendJson(res, 200, { text: clipped });
    } catch (error) {
      sendJson(res, 500, {
        error: "Zaakiy wrapper failed",
        detail: error instanceof Error ? error.message : "unknown",
      });
    }
  });
};

const createZaakiyApiWrapper = (env: Record<string, string>) => ({
  name: "zaakiy-api-wrapper",
  configureServer(server: import("vite").ViteDevServer) {
    registerZaakiyApi(server.middlewares, env);
  },
  configurePreviewServer(server: import("vite").PreviewServer) {
    registerZaakiyApi(server.middlewares, env);
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins: [react(), createZaakiyApiWrapper(env)],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "@tanstack/query-core",
      ],
    },
  };
});
