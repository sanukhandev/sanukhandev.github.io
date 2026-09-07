// Builds the 1200x630 social card from the source portrait.
//
// Why this exists: og:image previously pointed at sanu.avif, a 1024x1536
// portrait. LinkedIn, X, Facebook, Slack and WhatsApp scrapers do not decode
// AVIF, so every share rendered without an image. This emits a JPG at the
// dimensions declared in the meta tags.
import sharp from "sharp";
import path from "path";

const OUT = path.resolve("public/assets/images/og-card.jpg");
const PORTRAIT = path.resolve("public/assets/images/sanu.webp");

const W = 1200;
const H = 630;
const BG = "#0f1015"; // jet-black-950
const ACCENT = "#26c06e"; // hsl(148 67% 45%)

const portrait = await sharp(PORTRAIT)
  .resize({ height: H, fit: "cover", position: "top" })
  .toBuffer();
const { width: pw } = await sharp(portrait).metadata();

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

const overlay = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="fade" x1="0" x2="1">
      <stop offset="0.55" stop-color="${BG}" stop-opacity="1"/>
      <stop offset="1" stop-color="${BG}" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#fade)"/>
  <rect x="72" y="150" width="4" height="132" fill="${ACCENT}"/>
  <text x="104" y="150" font-family="Segoe UI, Helvetica, Arial, sans-serif"
        font-size="22" font-weight="600" letter-spacing="4" fill="${ACCENT}">
    ${esc("DUBAI, UAE")}
  </text>
  <text x="104" y="222" font-family="Segoe UI, Helvetica, Arial, sans-serif"
        font-size="68" font-weight="700" fill="#f2f3f7">${esc("Sanu Khan")}</text>
  <text x="104" y="282" font-family="Segoe UI, Helvetica, Arial, sans-serif"
        font-size="34" font-weight="600" fill="#a7acbe">
    ${esc("Tech Lead & Cloud Architect")}
  </text>
  <text x="104" y="366" font-family="Segoe UI, Helvetica, Arial, sans-serif"
        font-size="25" font-weight="500" fill="#8a90a8">
    ${esc("13+ years · Distributed systems · Event-driven platforms")}
  </text>
  <text x="104" y="404" font-family="Segoe UI, Helvetica, Arial, sans-serif"
        font-size="25" font-weight="500" fill="#8a90a8">
    ${esc("Azure · AWS · Kubernetes · Node.js · React")}
  </text>
  <text x="104" y="520" font-family="Segoe UI, Helvetica, Arial, sans-serif"
        font-size="27" font-weight="700" fill="#f2f3f7">${esc("sanukhan.dev")}</text>
</svg>`);

await sharp({ create: { width: W, height: H, channels: 3, background: BG } })
  .composite([
    { input: portrait, left: W - pw, top: 0 },
    { input: overlay, left: 0, top: 0 },
  ])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(OUT);

const { size } = await sharp(OUT).metadata();
console.log(`wrote ${OUT} (${(size / 1024).toFixed(1)} KB)`);
