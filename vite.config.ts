import { defineConfig, loadEnv, type PluginOption } from "vite";
import react from "@vitejs/plugin-react-swc";
import viteCompression from "vite-plugin-compression";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import zaakiyChatHandler from "./api/zaakiy-chat";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

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
    if (env.GOOGLE_GENAI_API_KEY && !process.env.GOOGLE_GENAI_API_KEY) {
      process.env.GOOGLE_GENAI_API_KEY = env.GOOGLE_GENAI_API_KEY;
    }
    if (env.GOOGLE_GENAI_MODEL && !process.env.GOOGLE_GENAI_MODEL) {
      process.env.GOOGLE_GENAI_MODEL = env.GOOGLE_GENAI_MODEL;
    }

    const parseResult = await readJsonBody(req);
    const body = parseResult.ok ? parseResult.data : {};

    const apiReq = {
      method: req.method,
      headers: req.headers as Record<string, string | string[] | undefined>,
      body,
    };

    const apiRes = {
      req: apiReq,
      status(code: number) {
        res.statusCode = code;
        return this;
      },
      setHeader(name: string, value: string) {
        res.setHeader(name, value);
      },
      json(data: unknown) {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(data));
      },
    };

    await zaakiyChatHandler(apiReq, apiRes);
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
  const isAnalyze = mode === "analyze";
  const plugins: PluginOption[] = [
    react(),
    createZaakiyApiWrapper(env),
    viteCompression({ algorithm: "gzip", ext: ".gz", threshold: 10240 }),
    viteCompression({
      algorithm: "brotliCompress",
      ext: ".br",
      threshold: 10240,
    }),
  ];
  const shouldPrerender =
    mode === "production" &&
    (process.env.PRERENDER === "true" ||
      (process.env.CI !== "true" && process.env.VERCEL !== "1"));

  // vite-plugin-prerender has ESM/CJS interop issues in dev config loading.
  // Set PRERENDER=true in the deploy environment so public routes expose
  // page-specific metadata before JavaScript executes. CI can validate the
  // normal SPA build without requiring a system Chromium installation.
  if (shouldPrerender) {
    const vitePrerender = require("vite-plugin-prerender");
    plugins.push(
      vitePrerender({
        staticDir: path.join(__dirname, "dist"),
        routes: [
          "/",
          "/about",
          "/projects",
          "/projects/enterprise-retail-integration",
          "/projects/airline-retailing-aggregation",
          "/projects/automotive-omnichannel-platform",
          "/projects/real-estate-erp-architecture",
          "/projects/garage-management-and-diagnostics",
          "/projects/headless-healthcare-digital-experience",
          "/projects/zaakiy-v3rse",
          "/contact",
          "/faq",
          "/tools",
          "/tools/json-formatter-online",
          "/tools/api-client-tool",
          "/tools/curl-to-json-converter",
          "/blog",
          "/blogs",
          "/blog/javascript-algorithms",
          "/blog/nodejs-api-best-practices",
          "/nodejs-developer-uae",
          "/react-developer-dubai",
          "/api-integration-services",
          "/full-stack-consultant-uae",
          "/software-engineer-uae",
        ],
        renderer: new vitePrerender.PuppeteerRenderer({
          // Wait for intro preloader (1900ms) + SeoMeta useEffect to run
          renderAfterTime: 3500,
          headless: true,
        }),
      }),
    );
  }

  if (isAnalyze) {
    const { visualizer } = require("rollup-plugin-visualizer");
    plugins.push(
      visualizer({
        filename: path.resolve(__dirname, "dist", "bundle-analysis.html"),
        gzipSize: true,
        brotliSize: true,
        open: false,
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
      ],
    },
    build: {
      target: "esnext",
      cssCodeSplit: true,
      minify: "esbuild",
      sourcemap: isAnalyze,
      rollupOptions: {
        output: {
          // Filenames are intentionally left to Vite's hashed defaults.
          // A fixed name (e.g. "assets/index.js") combined with the
          // `immutable, max-age=31536000` header in vercel.json pins
          // returning visitors to a stale entry chunk for a year.
          manualChunks(id) {
            if (
              id.includes("node_modules/react/") ||
              id.includes("node_modules/react-dom/") ||
              id.includes("node_modules/scheduler/")
            ) {
              return "vendor";
            }
            if (id.includes("node_modules/react-router")) {
              return "routingData";
            }
            // @radix-ui and lucide-react are deliberately NOT lumped into a
            // single "ui" chunk: one entry-level Radix import would then drag
            // every Radix package and icon into the critical path. Left to
            // Vite, they split per consuming route chunk.
            if (id.includes("node_modules/dompurify/")) {
              return "contentHeavy";
            }
          },
        },
      },
    },
  };
});
