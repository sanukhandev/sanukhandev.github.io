import { defineConfig, loadEnv, type PluginOption } from "vite";
import react from "@vitejs/plugin-react-swc";
import viteCompression from "vite-plugin-compression";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import { mcpProcessor, type ZaakiyLocale } from "./src/lib/mcp-processor";
import { mcpGenerativeSupport } from "./src/lib/mcp-generative-support";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

type HistoryMessage = { role: "user" | "assistant"; text: string };
type SessionEntry = { messages: HistoryMessage[]; siteScope?: string };
const conversationMemory = new Map<string, SessionEntry>();

const readJsonBody = async (
  req: import("http").IncomingMessage,
): Promise<{ ok: true; data: unknown } | { ok: false }> => {
  const chunks: Uint8Array[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  const raw = Buffer.concat(chunks).toString("utf8");
  if (!raw) return { ok: true, data: {} };
  try {
    return { ok: true, data: JSON.parse(raw) };
  } catch {
    return { ok: false };
  }
};

const sendJson = (
  res: import("http").ServerResponse,
  status: number,
  data: unknown,
) => {
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
  return parts
    .map((p) => p.text || "")
    .join(" ")
    .trim();
};

// Global regex used only with .replace() – safe to reuse with lastIndex mutation.
const leakPattern = /(SITE_SCOPE|USER_QUESTION|LOCALE|CONVERSATION)\s*:?/gi;
// Non-global regex for .test() – deterministic, no lastIndex side-effects.
const leakPatternTest = /(SITE_SCOPE|USER_QUESTION|LOCALE|CONVERSATION)\s*:?/i;

const sanitizeModelText = (raw: string) =>
  raw
    .replace(leakPattern, "")
    .replace(/\s*\|\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const looksLeakyOrInvalid = (text: string) => {
  if (!text) return true;
  if (leakPatternTest.test(text)) return true;
  const lowered = text.toLowerCase();
  return (
    lowered.startsWith("name:") ||
    lowered.startsWith("role:") ||
    lowered.includes("contextsummary")
  );
};

const fallbackReply = (
  locale: ZaakiyLocale,
  email: string,
  question: string,
) => {
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

const getHistory = (sessionId: string) =>
  conversationMemory.get(sessionId)?.messages || [];

const getSessionScope = (sessionId: string) =>
  (conversationMemory.get(sessionId)?.siteScope || "").trim();

const setSessionScope = (sessionId: string, siteScope: string) => {
  const entry = conversationMemory.get(sessionId);
  if (!entry) {
    conversationMemory.set(sessionId, { messages: [], siteScope });
    return;
  }
  entry.siteScope = siteScope;
};

const pushHistory = (
  sessionId: string,
  role: "user" | "assistant",
  text: string,
) => {
  const entry = conversationMemory.get(sessionId) || { messages: [] };
  entry.messages.push({ role, text });
  if (entry.messages.length > 12) {
    entry.messages.splice(0, entry.messages.length - 12);
  }
  conversationMemory.set(sessionId, entry);
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

      const parseResult = await readJsonBody(req);
      if (!parseResult.ok) {
        sendJson(res, 400, { error: "Invalid JSON in request body" });
        return;
      }

      const body = parseResult.data as {
        locale?: "en" | "ar";
        userQuestion?: string;
        siteScope?: string;
        email?: string;
        maxOutputChars?: number;
        sessionId?: string;
      };

      const locale: ZaakiyLocale = body.locale === "ar" ? "ar" : "en";
      const userQuestion = (body.userQuestion || "").trim();
      const incomingSiteScope = (body.siteScope || "").trim();
      const email = (body.email || "khan.sanukhan@outlook.com").trim();
      const maxOutputChars = Math.max(
        120,
        Math.min(500, Number(body.maxOutputChars || 250)),
      );
      const sessionId = (body.sessionId || "anonymous-session").trim();
      if (incomingSiteScope) {
        setSessionScope(sessionId, incomingSiteScope);
      }
      const siteScope = incomingSiteScope || getSessionScope(sessionId);

      if (!userQuestion || !siteScope) {
        sendJson(res, 400, { error: "Missing required fields" });
        return;
      }

      const scopedContext = mcpProcessor.getEnhancedContext(siteScope, locale);
      const queryContext = mcpProcessor.getQueryContext(
        scopedContext,
        userQuestion,
        14,
      );
      const historySnapshot = getHistory(sessionId).slice();
      pushHistory(sessionId, "user", userQuestion);

      const mergedPrompt = mcpGenerativeSupport.buildScopedPrompt({
        context: scopedContext,
        queryContext,
        userQuestion,
        email,
        maxChars: maxOutputChars,
        conversationHistory: historySnapshot.map((h) => ({
          role: h.role,
          text: h.text,
        })),
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
        sendJson(res, googleResp.status, {
          error: "Upstream GenAI error",
          detail,
        });
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
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const plugins: PluginOption[] = [react(), createZaakiyApiWrapper(env)];
  const isCiBuild = process.env.CI === "true" || process.env.VERCEL === "1";
  const shouldPrerender = mode === "production" && !isCiBuild;

  // Skip pre-compressed asset generation on Vercel — Vercel's edge handles
  // brotli/gzip compression automatically and serving .br/.gz companion files
  // from the deploy directory causes MIME-type ambiguity (Content-Type:
  // application/octet-stream instead of application/javascript).
  if (!isCiBuild) {
    plugins.push(
      viteCompression({
        algorithm: "gzip",
        ext: ".gz",
        deleteOriginFile: false,
      }),
      viteCompression({
        algorithm: "brotliCompress",
        ext: ".br",
        deleteOriginFile: false,
      }),
    );
  }

  // vite-plugin-prerender has ESM/CJS interop issues in dev config loading.
  // Also skip it in CI/Vercel because Puppeteer requires system libs
  // (e.g. libnss3) that are not available in the default build image.
  if (shouldPrerender) {
    const vitePrerender = require("vite-plugin-prerender");
    plugins.push(
      vitePrerender({
        staticDir: path.join(__dirname, "dist"),
        routes: [
          "/",
          "/faq",
          "/tools",
          "/tools/json-formatter-online",
          "/tools/api-client-tool",
          "/tools/curl-to-json-converter",
          "/blog",
          "/nodejs-developer-uae",
          "/react-developer-dubai",
          "/api-integration-services",
          "/full-stack-consultant-uae",
          "/services/nodejs-backend-engineer",
          "/services/react-developer-dubai",
          "/services/azure-cloud-architect",
          "/services/full-stack-developer-uae",
        ],
        renderer: new vitePrerender.PuppeteerRenderer({
          // Wait for intro preloader (1900ms) + SeoMeta useEffect to run
          renderAfterTime: 3500,
          headless: true,
        }),
      }),
    );
  }

  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins,
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
    build: {
      cssCodeSplit: true,
      minify: "esbuild",
      rollupOptions: {
        output: {
          entryFileNames: "assets/index.js",
          chunkFileNames: "assets/[name]-[hash].js",
          assetFileNames: (assetInfo) =>
            assetInfo.name?.endsWith(".css")
              ? "assets/index.css"
              : "assets/[name]-[hash][extname]",
          manualChunks(id) {
            if (
              id.includes("node_modules/react/") ||
              id.includes("node_modules/react-dom/") ||
              id.includes("node_modules/scheduler/")
            ) {
              return "vendor";
            }
            if (
              id.includes("node_modules/react-router") ||
              id.includes("node_modules/@tanstack/")
            ) {
              return "routingData";
            }
            if (
              id.includes("node_modules/@radix-ui/") ||
              id.includes("node_modules/lucide-react/")
            ) {
              return "ui";
            }
          },
        },
      },
    },
  };
});
