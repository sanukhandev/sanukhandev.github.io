import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const WIDTH = 1280;
const HEIGHT = 800;

// Shared SVG definitions: grids, specular highlights, gradients, fonts
const SHARED_DEFS = `
  <defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
    </pattern>
    <pattern id="dotgrid" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.06)"/>
    </pattern>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#141418" stop-opacity="0.96"/>
      <stop offset="100%" stop-color="#0D0D10" stop-opacity="0.98"/>
    </linearGradient>
    <linearGradient id="strokeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.25)"/>
      <stop offset="100%" stop-color="rgba(255,255,255,0.05)"/>
    </linearGradient>
    <linearGradient id="orangeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF4F00"/>
      <stop offset="100%" stop-color="#D5360C"/>
    </linearGradient>
    <radialGradient id="ambientOrange" cx="50%" cy="50%" r="65%">
      <stop offset="0%" stop-color="#D5360C" stop-opacity="0.14"/>
      <stop offset="60%" stop-color="#09090B" stop-opacity="0"/>
    </radialGradient>
    <filter id="glowOrange" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3.5" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
`;

function renderBaseFrame(disciplineTag, metricLabel, metricValue) {
  return `
    <rect width="${WIDTH}" height="${HEIGHT}" fill="#09090B"/>
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#grid)"/>
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#ambientOrange)"/>

    <!-- Corner Telemetry & Coordinates -->
    <g font-family="monospace" font-size="11" fill="rgba(255,255,255,0.3)" letter-spacing="1">
      <text x="36" y="44">+ ${disciplineTag}</text>
      <text x="1000" y="44">${metricLabel}: ${metricValue} +</text>
      <text x="36" y="764">+ SANU KHAN // CALM PRECISION</text>
      <text x="1050" y="764">DXB · 25.2048° N +</text>
    </g>
  `;
}

// 1. Architecture: System Design & Failure Domains
function getArchitectureSvg() {
  return `
  <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    ${SHARED_DEFS}
    ${renderBaseFrame('SYSTEM DESIGN // DOMAIN BOUNDARIES', 'SLO INVARIANT', '99.99% UPTIME')}

    <!-- Conduits -->
    <g fill="none" stroke-width="1.5">
      <path d="M 280 400 L 520 400" stroke="#FF4F00" stroke-width="2" filter="url(#glowOrange)"/>
      <path d="M 760 400 L 1000 400" stroke="#FF4F00" stroke-width="2" filter="url(#glowOrange)"/>
      <path d="M 640 220 L 640 320" stroke="#FF4F00" stroke-width="2" filter="url(#glowOrange)"/>
      <path d="M 640 480 L 640 580" stroke="rgba(255,255,255,0.15)" stroke-dasharray="4 4"/>
      <path d="M 280 220 L 520 220 L 520 320" stroke="rgba(255,255,255,0.12)"/>
      <path d="M 760 220 L 1000 220 L 1000 320" stroke="rgba(255,255,255,0.12)"/>
    </g>

    <!-- Center Hub: Architecture & Domain Bus -->
    <g transform="translate(520, 320)">
      <rect width="240" height="160" rx="14" fill="url(#cardGrad)" stroke="url(#strokeGrad)" stroke-width="1"/>
      <rect x="1" y="1" width="238" height="1" fill="rgba(255,255,255,0.25)"/>
      <text x="24" y="36" font-family="monospace" font-size="11" font-weight="bold" fill="#FF4F00">DOMAIN EVENT BUS</text>
      <text x="24" y="66" font-family="sans-serif" font-size="18" font-weight="800" fill="#FAFAFA">SOLUTIONS ARCH</text>
      <text x="24" y="90" font-family="monospace" font-size="11" fill="#A1A1AA">Boundary Isolation &amp; ADRs</text>
      <circle cx="28" cy="130" r="4" fill="#10B981"/>
      <text x="40" y="134" font-family="monospace" font-size="11" fill="#E4E4E7">STATUS: OPTIMAL</text>
      <text x="8" y="18" font-family="monospace" font-size="10" fill="rgba(255,255,255,0.2)">+</text>
      <text x="224" y="18" font-family="monospace" font-size="10" fill="rgba(255,255,255,0.2)">+</text>
    </g>

    <!-- Left Card: Schema Contracts -->
    <g transform="translate(120, 320)">
      <rect width="180" height="160" rx="12" fill="url(#cardGrad)" stroke="url(#strokeGrad)" stroke-width="1"/>
      <rect x="1" y="1" width="178" height="1" fill="rgba(255,255,255,0.15)"/>
      <text x="20" y="34" font-family="monospace" font-size="10" fill="#A1A1AA">CONTRACT // 01</text>
      <text x="20" y="62" font-family="sans-serif" font-size="15" font-weight="bold" fill="#FAFAFA">SCHEMA FIRST</text>
      <text x="20" y="84" font-family="monospace" font-size="10" fill="#71717A">Protobuf / OpenAPI</text>
      <path d="M 20 112 L 160 112" stroke="rgba(255,255,255,0.08)"/>
      <text x="20" y="136" font-family="monospace" font-size="10" font-weight="bold" fill="#FF4F00">IDEMPOTENT ACK</text>
    </g>

    <!-- Right Card: Failure Domain Isolation -->
    <g transform="translate(980, 320)">
      <rect width="180" height="160" rx="12" fill="url(#cardGrad)" stroke="url(#strokeGrad)" stroke-width="1"/>
      <rect x="1" y="1" width="178" height="1" fill="rgba(255,255,255,0.15)"/>
      <text x="20" y="34" font-family="monospace" font-size="10" fill="#A1A1AA">RESILIENCE // 02</text>
      <text x="20" y="62" font-family="sans-serif" font-size="15" font-weight="bold" fill="#FAFAFA">FAILURE MODEL</text>
      <text x="20" y="84" font-family="monospace" font-size="10" fill="#71717A">Circuit Breakers</text>
      <path d="M 20 112 L 160 112" stroke="rgba(255,255,255,0.08)"/>
      <text x="20" y="136" font-family="monospace" font-size="10" font-weight="bold" fill="#10B981">AUTO-HEALING</text>
    </g>

    <!-- Top Card: Kafka Stream Ingestion -->
    <g transform="translate(550, 140)">
      <rect width="180" height="90" rx="10" fill="url(#cardGrad)" stroke="url(#strokeGrad)" stroke-width="1"/>
      <text x="18" y="28" font-family="monospace" font-size="10" fill="#FF4F00">STREAMING INGEST</text>
      <text x="18" y="52" font-family="sans-serif" font-size="14" font-weight="bold" fill="#FAFAFA">KAFKA CLUSTER</text>
      <text x="18" y="72" font-family="monospace" font-size="10" fill="#A1A1AA">Partitioning &amp; Replay</text>
    </g>

    <!-- Bottom Card: Distributed Observability -->
    <g transform="translate(550, 570)">
      <rect width="180" height="90" rx="10" fill="url(#cardGrad)" stroke="url(#strokeGrad)" stroke-width="1"/>
      <text x="18" y="28" font-family="monospace" font-size="10" fill="#10B981">TELEMETRY LAYER</text>
      <text x="18" y="52" font-family="sans-serif" font-size="14" font-weight="bold" fill="#FAFAFA">OPEN TELEMETRY</text>
      <text x="18" y="72" font-family="monospace" font-size="10" fill="#A1A1AA">Distributed Traces</text>
    </g>
  </svg>
  `;
}

// 2. Integration: Enterprise SAP, Kafka & Microservices
function getIntegrationSvg() {
  return `
  <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    ${SHARED_DEFS}
    ${renderBaseFrame('ENTERPRISE INTEGRATION // SAP &amp; EVENT HUBS', 'THROUGHPUT', '1M+ EVENTS/DAY')}

    <!-- Glowing Integration Pipelines -->
    <g fill="none" stroke-width="2">
      <path d="M 240 380 L 480 380 L 640 380" stroke="#FF4F00" filter="url(#glowOrange)"/>
      <path d="M 640 380 L 800 380 L 1040 380" stroke="#FF4F00" filter="url(#glowOrange)"/>
      <path d="M 400 240 L 400 380 L 400 520" stroke="rgba(255,255,255,0.12)" stroke-dasharray="3 3"/>
      <path d="M 880 240 L 880 380 L 880 520" stroke="rgba(255,255,255,0.12)" stroke-dasharray="3 3"/>
    </g>

    <!-- Enterprise ERP Node -->
    <g transform="translate(100, 310)">
      <rect width="200" height="140" rx="14" fill="url(#cardGrad)" stroke="url(#strokeGrad)" stroke-width="1"/>
      <rect x="1" y="1" width="198" height="1" fill="rgba(255,255,255,0.2)"/>
      <text x="20" y="32" font-family="monospace" font-size="10" fill="#FF4F00">LEGACY &amp; ENTERPRISE</text>
      <text x="20" y="60" font-family="sans-serif" font-size="16" font-weight="bold" fill="#FAFAFA">SAP S/4HANA ERP</text>
      <text x="20" y="82" font-family="monospace" font-size="10" fill="#A1A1AA">PIM &amp; Inventory Source</text>
      <text x="20" y="116" font-family="monospace" font-size="10" fill="#10B981">IDOC / ODATA BRIDGE</text>
    </g>

    <!-- Central Event Backbone -->
    <g transform="translate(480, 290)">
      <rect width="320" height="180" rx="16" fill="url(#cardGrad)" stroke="url(#strokeGrad)" stroke-width="1.5"/>
      <rect x="1" y="1" width="318" height="1" fill="rgba(255,255,255,0.3)"/>
      <text x="24" y="36" font-family="monospace" font-size="11" font-weight="bold" fill="#FF4F00">EVENT MESH BACKBONE</text>
      <text x="24" y="66" font-family="sans-serif" font-size="19" font-weight="800" fill="#FAFAFA">AZURE EVENT HUBS</text>
      <text x="24" y="90" font-family="monospace" font-size="11" fill="#A1A1AA">High-Throughput Kafka Stream Protocol</text>
      <path d="M 24 116 L 296 116" stroke="rgba(255,255,255,0.1)"/>
      <circle cx="28" cy="144" r="4" fill="#10B981"/>
      <text x="40" y="148" font-family="monospace" font-size="11" fill="#FAFAFA">P99 LATENCY: 14ms · 9 REGIONS</text>
    </g>

    <!-- Modern Microservices Destination -->
    <g transform="translate(980, 310)">
      <rect width="200" height="140" rx="14" fill="url(#cardGrad)" stroke="url(#strokeGrad)" stroke-width="1"/>
      <rect x="1" y="1" width="198" height="1" fill="rgba(255,255,255,0.2)"/>
      <text x="20" y="32" font-family="monospace" font-size="10" fill="#10B981">COMMERCE APIS</text>
      <text x="20" y="60" font-family="sans-serif" font-size="16" font-weight="bold" fill="#FAFAFA">DISTRIBUTED CONSUMER</text>
      <text x="20" y="82" font-family="monospace" font-size="10" fill="#A1A1AA">Storefronts &amp; Mobile Apps</text>
      <text x="20" y="116" font-family="monospace" font-size="10" fill="#FF4F00">REAL-TIME SYNC // ACK</text>
    </g>
  </svg>
  `;
}

// 3. Automation & AI Agents: Workflow Intelligence
function getAutomationSvg() {
  return `
  <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    ${SHARED_DEFS}
    ${renderBaseFrame('AGENTIC AUTOMATION // WORKFLOW INTELLIGENCE', 'DECISION ACCURACY', '99.8%')}

    <!-- Circuit Paths -->
    <g fill="none" stroke-width="2">
      <path d="M 280 400 L 520 400" stroke="#FF4F00" filter="url(#glowOrange)"/>
      <path d="M 760 400 L 1000 400" stroke="#FF4F00" filter="url(#glowOrange)"/>
      <path d="M 640 220 L 640 320" stroke="#FF4F00" filter="url(#glowOrange)"/>
      <path d="M 640 480 L 640 580" stroke="#FF4F00" filter="url(#glowOrange)"/>
    </g>

    <!-- Center Agentic Orchestrator -->
    <g transform="translate(500, 310)">
      <rect width="280" height="180" rx="16" fill="url(#cardGrad)" stroke="url(#strokeGrad)" stroke-width="1.5"/>
      <rect x="1" y="1" width="278" height="1" fill="rgba(255,255,255,0.25)"/>
      <text x="24" y="36" font-family="monospace" font-size="11" font-weight="bold" fill="#FF4F00">AUTONOMOUS ORCHESTRATION</text>
      <text x="24" y="66" font-family="sans-serif" font-size="18" font-weight="800" fill="#FAFAFA">AI AGENT ENGINE</text>
      <text x="24" y="90" font-family="monospace" font-size="11" fill="#A1A1AA">Context-Aware Decision Routing</text>
      <circle cx="28" cy="140" r="4" fill="#10B981"/>
      <text x="40" y="144" font-family="monospace" font-size="11" fill="#E4E4E7">STATUS: ACTIVE // CONTINUOUS</text>
    </g>

    <!-- Ingestion Triggers -->
    <g transform="translate(100, 330)">
      <rect width="190" height="140" rx="12" fill="url(#cardGrad)" stroke="url(#strokeGrad)" stroke-width="1"/>
      <text x="18" y="32" font-family="monospace" font-size="10" fill="#A1A1AA">STAGE 01 // INGEST</text>
      <text x="18" y="58" font-family="sans-serif" font-size="15" font-weight="bold" fill="#FAFAFA">EVENT TRIGGERS</text>
      <text x="18" y="80" font-family="monospace" font-size="10" fill="#71717A">Webhooks, Logs, Queues</text>
      <text x="18" y="114" font-family="monospace" font-size="10" fill="#FF4F00">NON-BLOCKING</text>
    </g>

    <!-- RAG Knowledge Base -->
    <g transform="translate(540, 130)">
      <rect width="200" height="100" rx="12" fill="url(#cardGrad)" stroke="url(#strokeGrad)" stroke-width="1"/>
      <text x="18" y="28" font-family="monospace" font-size="10" fill="#FF4F00">VECTOR MEMORY // RAG</text>
      <text x="18" y="52" font-family="sans-serif" font-size="14" font-weight="bold" fill="#FAFAFA">ENTERPRISE CONTEXT</text>
      <text x="18" y="74" font-family="monospace" font-size="10" fill="#A1A1AA">Semantic Embeddings</text>
    </g>

    <!-- Automated Execution Handlers -->
    <g transform="translate(980, 330)">
      <rect width="190" height="140" rx="12" fill="url(#cardGrad)" stroke="url(#strokeGrad)" stroke-width="1"/>
      <text x="18" y="32" font-family="monospace" font-size="10" fill="#10B981">STAGE 03 // EXECUTE</text>
      <text x="18" y="58" font-family="sans-serif" font-size="15" font-weight="bold" fill="#FAFAFA">DISPATCH HANDLERS</text>
      <text x="18" y="80" font-family="monospace" font-size="10" fill="#71717A">API Calls &amp; State Mutation</text>
      <text x="18" y="114" font-family="monospace" font-size="10" fill="#10B981">VERIFIABLE OUTCOME</text>
    </g>
  </svg>
  `;
}

// 4. Frontend & Full-Stack Platform Engineering
function getFrontendSvg() {
  return `
  <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    ${SHARED_DEFS}
    ${renderBaseFrame('FULL-STACK APPLICATION // NEXT.JS &amp; TYPESCRIPT', 'PERFORMANCE SCORE', '100 / 100')}

    <!-- Code Frame & UI Layer Matrix -->
    <g transform="translate(240, 200)">
      <rect width="800" height="420" rx="18" fill="url(#cardGrad)" stroke="url(#strokeGrad)" stroke-width="1.5"/>
      <rect x="1" y="1" width="798" height="1" fill="rgba(255,255,255,0.25)"/>

      <!-- Terminal Header -->
      <path d="M 0 44 L 800 44" stroke="rgba(255,255,255,0.08)"/>
      <circle cx="28" cy="22" r="5" fill="#EF4444"/>
      <circle cx="46" cy="22" r="5" fill="#F59E0B"/>
      <circle cx="64" cy="22" r="5" fill="#10B981"/>
      <text x="94" y="26" font-family="monospace" font-size="11" fill="#A1A1AA">app/[locale]/layout.tsx — React 19 RSC &amp; Server Components</text>

      <!-- Code Snippet & Architecture Layers -->
      <g font-family="monospace" font-size="13" fill="#D4D4D8">
        <text x="40" y="80"><tspan fill="#FF4F00">export default async function</tspan> RootLayout({ children, params }) {</text>
        <text x="64" y="110"><tspan fill="#A1A1AA">// Contract-first zero hydration overhead</tspan></text>
        <text x="64" y="140"><tspan fill="#FF4F00">const</tspan> { locale } = <tspan fill="#38BDF8">await</tspan> params;</text>
        <text x="64" y="170"><tspan fill="#FF4F00">const</tspan> telemetry = <tspan fill="#38BDF8">await</tspan> getEdgeTelemetryContext(locale);</text>
        <text x="64" y="210"><tspan fill="#FF4F00">return</tspan> (</text>
        <text x="88" y="240">&lt;<tspan fill="#10B981">EditorialProvider</tspan> telemetry={telemetry} locale={locale}&gt;</text>
        <text x="112" y="270">&lt;<tspan fill="#10B981">GlassLayout</tspan> specularBorders={true} /&gt;</text>
        <text x="88" y="300">&lt;/<tspan fill="#10B981">EditorialProvider</tspan>&gt;</text>
        <text x="64" y="330">);</text>
        <text x="40" y="360">}</text>
      </g>

      <!-- Floating Performance Pill -->
      <g transform="translate(560, 300)">
        <rect width="200" height="80" rx="10" fill="#09090B" stroke="#10B981" stroke-width="1"/>
        <text x="16" y="28" font-family="monospace" font-size="10" fill="#10B981">CORE WEB VITALS</text>
        <text x="16" y="50" font-family="sans-serif" font-size="15" font-weight="bold" fill="#FAFAFA">LCP &lt; 0.8s · INP 12ms</text>
        <text x="16" y="68" font-family="monospace" font-size="10" fill="#A1A1AA">Zero Layout Shift (CLS: 0)</text>
      </g>
    </g>
  </svg>
  `;
}

// 5. Cloud & Platform Engineering: Kubernetes & Infrastructure
function getCloudSvg() {
  return `
  <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    ${SHARED_DEFS}
    ${renderBaseFrame('CLOUD PLATFORM // AZURE, K8S &amp; TERRAFORM', 'AVAILABILITY', '99.999% SLA')}

    <!-- Cloud Topology Grid -->
    <g fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1.5">
      <path d="M 320 400 L 960 400" stroke="#FF4F00" stroke-width="2" filter="url(#glowOrange)"/>
      <path d="M 640 200 L 640 600" stroke="#FF4F00" stroke-width="2" filter="url(#glowOrange)"/>
      <circle cx="640" cy="400" r="160" stroke="rgba(255,255,255,0.08)" stroke-dasharray="6 6"/>
    </g>

    <!-- Center Kubernetes Cluster -->
    <g transform="translate(490, 310)">
      <rect width="300" height="180" rx="16" fill="url(#cardGrad)" stroke="url(#strokeGrad)" stroke-width="1.5"/>
      <rect x="1" y="1" width="298" height="1" fill="rgba(255,255,255,0.25)"/>
      <text x="24" y="36" font-family="monospace" font-size="11" font-weight="bold" fill="#FF4F00">CONTAINER RUNTIME</text>
      <text x="24" y="66" font-family="sans-serif" font-size="19" font-weight="800" fill="#FAFAFA">KUBERNETES // AKS</text>
      <text x="24" y="90" font-family="monospace" font-size="11" fill="#A1A1AA">Multi-Node Resilient Ingress</text>
      <circle cx="28" cy="140" r="4" fill="#10B981"/>
      <text x="40" y="144" font-family="monospace" font-size="11" fill="#FAFAFA">POD AUTOSCALE: 3 → 48 REPLICAS</text>
    </g>

    <!-- Edge Gateway -->
    <g transform="translate(120, 330)">
      <rect width="190" height="140" rx="12" fill="url(#cardGrad)" stroke="url(#strokeGrad)" stroke-width="1"/>
      <text x="18" y="32" font-family="monospace" font-size="10" fill="#10B981">INGRESS GATEWAY</text>
      <text x="18" y="58" font-family="sans-serif" font-size="15" font-weight="bold" fill="#FAFAFA">AZURE FRONT DOOR</text>
      <text x="18" y="80" font-family="monospace" font-size="10" fill="#71717A">Global WAF &amp; Anycast</text>
      <text x="18" y="114" font-family="monospace" font-size="10" fill="#FF4F00">TLS 1.3 · ZERO TRUST</text>
    </g>

    <!-- IaC Terraform Block -->
    <g transform="translate(970, 330)">
      <rect width="190" height="140" rx="12" fill="url(#cardGrad)" stroke="url(#strokeGrad)" stroke-width="1"/>
      <text x="18" y="32" font-family="monospace" font-size="10" fill="#FF4F00">DECLARATIVE IAC</text>
      <text x="18" y="58" font-family="sans-serif" font-size="15" font-weight="bold" fill="#FAFAFA">TERRAFORM CI/CD</text>
      <text x="18" y="80" font-family="monospace" font-size="10" fill="#71717A">Immutable Infrastructure</text>
      <text x="18" y="114" font-family="monospace" font-size="10" fill="#10B981">100% REPRODUCIBLE</text>
    </g>
  </svg>
  `;
}

// 6. Backend & Microservices: API Gateway & High-Throughput APIs
function getBackendSvg() {
  return `
  <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    ${SHARED_DEFS}
    ${renderBaseFrame('API GATEWAY &amp; MICROSERVICES // DISTRIBUTED ARCHITECTURE', 'REQUEST RATE', '48,000 REQ/SEC')}

    <g fill="none" stroke-width="2">
      <path d="M 280 400 L 520 400" stroke="#FF4F00" filter="url(#glowOrange)"/>
      <path d="M 760 400 L 1000 400" stroke="#FF4F00" filter="url(#glowOrange)"/>
      <path d="M 640 240 L 640 320" stroke="#FF4F00" filter="url(#glowOrange)"/>
      <path d="M 640 480 L 640 560" stroke="#FF4F00" filter="url(#glowOrange)"/>
    </g>

    <!-- Center API Gateway -->
    <g transform="translate(500, 320)">
      <rect width="280" height="160" rx="16" fill="url(#cardGrad)" stroke="url(#strokeGrad)" stroke-width="1.5"/>
      <text x="24" y="36" font-family="monospace" font-size="11" font-weight="bold" fill="#FF4F00">API GATEWAY // PROXY</text>
      <text x="24" y="66" font-family="sans-serif" font-size="19" font-weight="800" fill="#FAFAFA">TOKEN &amp; RATE LIMITING</text>
      <text x="24" y="90" font-family="monospace" font-size="11" fill="#A1A1AA">JWT Validation &amp; Route Mesh</text>
      <circle cx="28" cy="130" r="4" fill="#10B981"/>
      <text x="40" y="134" font-family="monospace" font-size="11" fill="#FAFAFA">LATENCY BUDGET: &lt;4ms</text>
    </g>

    <g transform="translate(100, 330)">
      <rect width="190" height="140" rx="12" fill="url(#cardGrad)" stroke="url(#strokeGrad)" stroke-width="1"/>
      <text x="18" y="32" font-family="monospace" font-size="10" fill="#A1A1AA">INBOUND CLIENTS</text>
      <text x="18" y="58" font-family="sans-serif" font-size="15" font-weight="bold" fill="#FAFAFA">REST &amp; GRAPHQL</text>
      <text x="18" y="80" font-family="monospace" font-size="10" fill="#71717A">Federated Subgraphs</text>
      <text x="18" y="114" font-family="monospace" font-size="10" fill="#FF4F00">UNIFIED CONTRACT</text>
    </g>

    <g transform="translate(980, 330)">
      <rect width="190" height="140" rx="12" fill="url(#cardGrad)" stroke="url(#strokeGrad)" stroke-width="1"/>
      <text x="18" y="32" font-family="monospace" font-size="10" fill="#10B981">DATA PERSISTENCE</text>
      <text x="18" y="58" font-family="sans-serif" font-size="15" font-weight="bold" fill="#FAFAFA">REDIS &amp; POSTGRES</text>
      <text x="18" y="80" font-family="monospace" font-size="10" fill="#71717A">Read Replicas &amp; Caching</text>
      <text x="18" y="114" font-family="monospace" font-size="10" fill="#10B981">CACHE HIT: 98.6%</text>
    </g>
  </svg>
  `;
}

// 7. AI & Operational Intelligence (Zaakiy V3RSE)
function getAiSvg() {
  return `
  <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    ${SHARED_DEFS}
    ${renderBaseFrame('ZAAKIY V3RSE // OPERATIONAL INTELLIGENCE', 'AGENT NETWORK', 'AUTONOMOUS')}

    <g fill="none" stroke-width="1.5">
      <path d="M 300 400 L 500 400" stroke="#FF4F00" stroke-width="2" filter="url(#glowOrange)"/>
      <path d="M 780 400 L 980 400" stroke="#FF4F00" stroke-width="2" filter="url(#glowOrange)"/>
      <circle cx="640" cy="400" r="140" stroke="rgba(255,255,255,0.06)" stroke-dasharray="4 4"/>
    </g>

    <g transform="translate(500, 290)">
      <rect width="280" height="220" rx="16" fill="url(#cardGrad)" stroke="url(#strokeGrad)" stroke-width="1.5"/>
      <rect x="1" y="1" width="278" height="1" fill="rgba(255,255,255,0.3)"/>
      <text x="24" y="36" font-family="monospace" font-size="11" font-weight="bold" fill="#FF4F00">AUTONOMOUS COGNITION</text>
      <text x="24" y="66" font-family="sans-serif" font-size="19" font-weight="800" fill="#FAFAFA">ZAAKIY V3RSE</text>
      <text x="24" y="90" font-family="monospace" font-size="11" fill="#A1A1AA">Contextual Decision Mesh</text>
      <path d="M 24 116 L 256 116" stroke="rgba(255,255,255,0.08)"/>
      <text x="24" y="146" font-family="monospace" font-size="11" fill="#D4D4D8">VECTOR EMBEDDINGS · RAG</text>
      <text x="24" y="172" font-family="monospace" font-size="11" fill="#D4D4D8">STREAM CORRELATION · ANOMALY</text>
      <circle cx="28" cy="198" r="4" fill="#10B981"/>
      <text x="40" y="202" font-family="monospace" font-size="11" fill="#10B981">LIVE TELEMETRY: STREAMING</text>
    </g>

    <g transform="translate(100, 330)">
      <rect width="200" height="140" rx="12" fill="url(#cardGrad)" stroke="url(#strokeGrad)" stroke-width="1"/>
      <text x="18" y="32" font-family="monospace" font-size="10" fill="#A1A1AA">INPUT TELEMETRY</text>
      <text x="18" y="58" font-family="sans-serif" font-size="15" font-weight="bold" fill="#FAFAFA">METRICS &amp; LOGS</text>
      <text x="18" y="80" font-family="monospace" font-size="10" fill="#71717A">Span Context &amp; Traces</text>
      <text x="18" y="114" font-family="monospace" font-size="10" fill="#FF4F00">REAL-TIME INGEST</text>
    </g>

    <g transform="translate(980, 330)">
      <rect width="200" height="140" rx="12" fill="url(#cardGrad)" stroke="url(#strokeGrad)" stroke-width="1"/>
      <text x="18" y="32" font-family="monospace" font-size="10" fill="#10B981">OUTPUT OUTCOMES</text>
      <text x="18" y="58" font-family="sans-serif" font-size="15" font-weight="bold" fill="#FAFAFA">VERIFIED ACTION</text>
      <text x="18" y="80" font-family="monospace" font-size="10" fill="#71717A">Self-Healing Mitigations</text>
      <text x="18" y="114" font-family="monospace" font-size="10" fill="#10B981">PREDICTIVE REMEDIATION</text>
    </g>
  </svg>
  `;
}

// 8. Enterprise Leadership, Consulting & Modernization
function getEnterpriseSvg() {
  return `
  <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    ${SHARED_DEFS}
    ${renderBaseFrame('TECHNICAL LEADERSHIP // MODERNIZATION STRATEGY', 'REGIONAL MARKETS', '9 GCC COUNTRIES')}

    <g fill="none" stroke-width="1.5">
      <path d="M 280 400 L 520 400" stroke="#FF4F00" stroke-width="2" filter="url(#glowOrange)"/>
      <path d="M 760 400 L 1000 400" stroke="#FF4F00" stroke-width="2" filter="url(#glowOrange)"/>
    </g>

    <g transform="translate(500, 310)">
      <rect width="280" height="180" rx="16" fill="url(#cardGrad)" stroke="url(#strokeGrad)" stroke-width="1.5"/>
      <text x="24" y="36" font-family="monospace" font-size="11" font-weight="bold" fill="#FF4F00">TECHNICAL OWNERSHIP</text>
      <text x="24" y="66" font-family="sans-serif" font-size="18" font-weight="800" fill="#FAFAFA">TECH LEADERSHIP</text>
      <text x="24" y="90" font-family="monospace" font-size="11" fill="#A1A1AA">Architecture &amp; Delivery Delivery</text>
      <circle cx="28" cy="140" r="4" fill="#10B981"/>
      <text x="40" y="144" font-family="monospace" font-size="11" fill="#E4E4E7">13+ YEARS PRODUCTION LEAD</text>
    </g>

    <g transform="translate(100, 330)">
      <rect width="190" height="140" rx="12" fill="url(#cardGrad)" stroke="url(#strokeGrad)" stroke-width="1"/>
      <text x="18" y="32" font-family="monospace" font-size="10" fill="#A1A1AA">STRATEGY</text>
      <text x="18" y="58" font-family="sans-serif" font-size="15" font-weight="bold" fill="#FAFAFA">ADR ROADMAPS</text>
      <text x="18" y="80" font-family="monospace" font-size="10" fill="#71717A">Clear Trade-Offs</text>
      <text x="18" y="114" font-family="monospace" font-size="10" fill="#FF4F00">DECISION CLARITY</text>
    </g>

    <g transform="translate(980, 330)">
      <rect width="190" height="140" rx="12" fill="url(#cardGrad)" stroke="url(#strokeGrad)" stroke-width="1"/>
      <text x="18" y="32" font-family="monospace" font-size="10" fill="#10B981">EXECUTION</text>
      <text x="18" y="58" font-family="sans-serif" font-size="15" font-weight="bold" fill="#FAFAFA">TEAM ENABLEMENT</text>
      <text x="18" y="80" font-family="monospace" font-size="10" fill="#71717A">Pragmatic Standards</text>
      <text x="18" y="114" font-family="monospace" font-size="10" fill="#10B981">HIGH VELOCITY</text>
    </g>
  </svg>
  `;
}

async function generateAll() {
  console.log('Generating 2026 Calm Precision architectural visuals...');

  // Convert sanu-workstation.webp to observability.jpg
  try {
    await sharp('public/assets/images/sanu-workstation.webp')
      .jpeg({ quality: 95, chromaSubsampling: '4:4:4' })
      .toFile('public/assets/observability.jpg');
    console.log('✓ observability.jpg generated from workstation telemetry visual');
  } catch (err) {
    console.error('observability error:', err);
  }

  const svgGenerators = [
    { file: 'architecture.jpg', fn: getArchitectureSvg },
    { file: 'integration.jpg', fn: getIntegrationSvg },
    { file: 'automation.jpg', fn: getAutomationSvg },
    { file: 'frontend.jpg', fn: getFrontendSvg },
    { file: 'cloud.jpg', fn: getCloudSvg },
    { file: 'backend.jpg', fn: getBackendSvg },
    { file: 'ai.jpg', fn: getAiSvg },
    { file: 'enterprise.jpg', fn: getEnterpriseSvg },
    { file: 'platform.jpg', fn: getCloudSvg },
    { file: 'saas.jpg', fn: getArchitectureSvg },
  ];

  for (const item of svgGenerators) {
    try {
      const svgBuffer = Buffer.from(item.fn());
      await sharp(svgBuffer)
        .jpeg({ quality: 95, chromaSubsampling: '4:4:4' })
        .toFile(path.join('public/assets', item.file));
      console.log(`✓ ${item.file} generated successfully`);
    } catch (err) {
      console.error(`Error generating ${item.file}:`, err);
    }
  }

  console.log('All 2026 Calm Precision images successfully rendered!');
}

generateAll();
