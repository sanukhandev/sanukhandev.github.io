import sharp from "sharp";
import fs from "fs";
import path from "path";

async function generateAssets() {
  const imagesDir = path.resolve("public/assets/images");
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  const refFace = path.join(imagesDir, "reference-face-model.png");
  const avatarLatest = path.join(imagesDir, "avatar_latest.png");

  console.log("Generating editorial visual assets...");

  // 1. Sanu Face Portrait (Square & Avatar sizes)
  if (fs.existsSync(refFace)) {
    await sharp(refFace)
      .resize(800, 800, { fit: "cover", position: "north" })
      .webp({ quality: 90 })
      .toFile(path.join(imagesDir, "sanu-face-portrait.webp"));

    await sharp(refFace)
      .resize(160, 160, { fit: "cover", position: "north" })
      .webp({ quality: 90 })
      .toFile(path.join(imagesDir, "sanu-thumb.webp"));

    // 2. Artistic warm mood crop for Bento / Impact
    // Modulate with warm tones and slight tint
    await sharp(refFace)
      .resize(600, 750, { fit: "cover", position: "north" })
      .modulate({
        brightness: 0.95,
        saturation: 1.15,
        hue: 15,
      })
      .tint({ r: 213, g: 54, b: 12 }) // warm brand orange accent tint
      .webp({ quality: 88 })
      .toFile(path.join(imagesDir, "sanu-mood-crop.webp"));

    console.log("Created sanu-face-portrait, sanu-thumb, sanu-mood-crop");
  }

  // 3. Hero cutout - verify avatar_latest
  if (fs.existsSync(avatarLatest)) {
    await sharp(avatarLatest)
      .resize(1000, 1250, { fit: "inside" })
      .webp({ quality: 92 })
      .toFile(path.join(imagesDir, "sanu-hero-cutout.webp"));
    console.log("Created sanu-hero-cutout.webp");
  }

  // 4. Create Hero 3D Artifact image (Floating Card in Hero top-right)
  // An elegant SVG rendered to high-res WebP with a 3D architectural geometric torus / sphere
  const artifactSvg = Buffer.from(`
    <svg width="600" height="600" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bg" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stop-color="#E6D5BD" />
          <stop offset="70%" stop-color="#DFCEB6" />
          <stop offset="100%" stop-color="#D5360C" stop-opacity="0.25" />
        </radialGradient>
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF" />
          <stop offset="40%" stop-color="#E84A1C" />
          <stop offset="100%" stop-color="#9C2003" />
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="18" stdDeviation="24" flood-color="#101010" flood-opacity="0.35" />
        </filter>
        <linearGradient id="glowGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#D5360C" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <rect width="600" height="600" fill="url(#bg)"/>
      <ellipse cx="300" cy="480" rx="190" ry="28" fill="#101010" opacity="0.18" filter="blur(16px)" />
      <!-- Stylized 3D Torus / Orb with architectural precision -->
      <g filter="url(#shadow)">
        <circle cx="300" cy="290" r="150" fill="url(#ringGrad)"/>
        <circle cx="300" cy="290" r="95" fill="url(#bg)"/>
        <path d="M 230 190 Q 300 130 370 190 Q 300 250 230 190 Z" fill="url(#glowGrad)" opacity="0.75" />
      </g>
      <!-- Architectural coordinate crosshairs -->
      <path d="M 120 300 L 480 300" stroke="#101010" stroke-width="1" stroke-dasharray="4 6" opacity="0.25" />
      <path d="M 300 120 L 300 480" stroke="#101010" stroke-width="1" stroke-dasharray="4 6" opacity="0.25" />
      <circle cx="300" cy="300" r="4" fill="#D5360C" />
      <circle cx="480" cy="300" r="3" fill="#101010" opacity="0.4" />
      <circle cx="120" cy="300" r="3" fill="#101010" opacity="0.4" />
      <text x="312" y="296" font-family="monospace" font-size="12" fill="#101010" opacity="0.6">SYS_ARCH: ZAAKIY-01</text>
    </svg>
  `);
  await sharp(artifactSvg)
    .webp({ quality: 90 })
    .toFile(path.join(imagesDir, "hero-artifact-3d.webp"));
  console.log("Created hero-artifact-3d.webp");

  // 5. Workstation demo showcase
  const workstationSvg = Buffer.from(`
    <svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="wsBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#181716" />
          <stop offset="100%" stop-color="#101010" />
        </linearGradient>
        <linearGradient id="codeGlow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#D5360C" />
          <stop offset="100%" stop-color="#E84A1C" />
        </linearGradient>
      </defs>
      <rect width="1280" height="720" fill="url(#wsBg)"/>
      <!-- Grid backdrop -->
      <pattern id="wsGrid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(230, 213, 189, 0.05)" stroke-width="1"/>
      </pattern>
      <rect width="1280" height="720" fill="url(#wsGrid)"/>
      <!-- Dual screen monitors -->
      <g transform="translate(180, 80)">
        <!-- Top Screen: Code Architecture IDE -->
        <rect x="180" y="20" width="560" height="260" rx="8" fill="#131211" stroke="rgba(230, 213, 189, 0.2)" stroke-width="2"/>
        <!-- Window titlebar -->
        <rect x="180" y="20" width="560" height="28" rx="8" fill="#211F1D"/>
        <circle cx="198" cy="34" r="5" fill="#D5360C"/>
        <circle cx="214" cy="34" r="5" fill="#E6D5BD" opacity="0.6"/>
        <circle cx="230" cy="34" r="5" fill="#E6D5BD" opacity="0.3"/>
        <text x="250" y="38" font-family="monospace" font-size="11" fill="#E6D5BD" opacity="0.7">event-driven-mesh.ts — Zaakiy Core</text>
        <!-- Code lines -->
        <text x="200" y="75" font-family="monospace" font-size="12" fill="#D5360C">import { EventHubProducer, KafkaStream } from "@azure/event-hubs";</text>
        <text x="200" y="100" font-family="monospace" font-size="12" fill="#E6D5BD" opacity="0.8">export class EnterpriseMessageMesh implements DistributedOrchestrator {</text>
        <text x="220" y="125" font-family="monospace" font-size="12" fill="#E6D5BD" opacity="0.5">  private readonly clusterHealth = new HealthMonitor({ targetSLA: 0.9999 });</text>
        <text x="220" y="150" font-family="monospace" font-size="12" fill="#E6D5BD" opacity="0.5">  public async routeTransaction(batch: CommerceEventBatch): Promise&lt;Ack&gt; {</text>
        <text x="240" y="175" font-family="monospace" font-size="12" fill="#D5360C">    await this.idempotentProducer.publish(batch.deduplicateKey());</text>
        <text x="240" y="200" font-family="monospace" font-size="12" fill="#E6D5BD" opacity="0.7">    return { status: 200, latencyMs: 14.2, verified: true };</text>
        <text x="220" y="225" font-family="monospace" font-size="12" fill="#E6D5BD" opacity="0.5">  }</text>
        <text x="200" y="250" font-family="monospace" font-size="12" fill="#E6D5BD" opacity="0.8">}</text>

        <!-- Lower Laptop / Tablet Display -->
        <rect x="220" y="310" width="480" height="260" rx="8" fill="#1C1B19" stroke="rgba(230, 213, 189, 0.2)" stroke-width="2"/>
        <rect x="220" y="310" width="480" height="26" rx="8" fill="#282623"/>
        <text x="240" y="327" font-family="monospace" font-size="11" fill="#E6D5BD" opacity="0.7">Real-Time Telemetry &amp; Throughput Dashboard</text>
        <!-- Telemetry UI -->
        <rect x="240" y="350" width="130" height="60" rx="6" fill="#131211" stroke="rgba(213, 54, 12, 0.4)" stroke-width="1"/>
        <text x="252" y="372" font-family="sans-serif" font-size="10" fill="#E6D5BD" opacity="0.6">EVENT THROUGHPUT</text>
        <text x="252" y="396" font-family="sans-serif" font-size="18" font-weight="bold" fill="#D5360C">48.2k/sec</text>

        <rect x="390" y="350" width="130" height="60" rx="6" fill="#131211" stroke="rgba(230, 213, 189, 0.2)" stroke-width="1"/>
        <text x="402" y="372" font-family="sans-serif" font-size="10" fill="#E6D5BD" opacity="0.6">P99 LATENCY</text>
        <text x="402" y="396" font-family="sans-serif" font-size="18" font-weight="bold" fill="#E6D5BD">18ms</text>

        <rect x="540" y="350" width="130" height="60" rx="6" fill="#131211" stroke="rgba(230, 213, 189, 0.2)" stroke-width="1"/>
        <text x="552" y="372" font-family="sans-serif" font-size="10" fill="#E6D5BD" opacity="0.6">RELIABILITY</text>
        <text x="552" y="396" font-family="sans-serif" font-size="18" font-weight="bold" fill="#E6D5BD">99.99%</text>

        <!-- Wave / Bar chart -->
        <path d="M 240 510 L 290 470 L 340 490 L 390 440 L 440 455 L 490 420 L 540 445 L 590 400 L 640 410" fill="none" stroke="url(#codeGlow)" stroke-width="3"/>
        <path d="M 240 510 L 290 470 L 340 490 L 390 440 L 440 455 L 490 420 L 540 445 L 590 400 L 640 410 L 640 540 L 240 540 Z" fill="url(#codeGlow)" opacity="0.15"/>
      </g>
    </svg>
  `);
  await sharp(workstationSvg)
    .webp({ quality: 90 })
    .toFile(path.join(imagesDir, "sanu-workstation.webp"));
  console.log("Created sanu-workstation.webp");

  // 6. Contact glowing background mesh
  const glowMeshSvg = Buffer.from(`
    <svg width="1440" height="800" viewBox="0 0 1440 800" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="meshGlow1" cx="30%" cy="40%" r="50%">
          <stop offset="0%" stop-color="#D5360C" stop-opacity="0.85"/>
          <stop offset="60%" stop-color="#801D04" stop-opacity="0.4"/>
          <stop offset="100%" stop-color="#101010" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="meshGlow2" cx="80%" cy="60%" r="55%">
          <stop offset="0%" stop-color="#174A54" stop-opacity="0.75"/>
          <stop offset="50%" stop-color="#0F2B31" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="#101010" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="meshGlow3" cx="50%" cy="85%" r="45%">
          <stop offset="0%" stop-color="#E84A1C" stop-opacity="0.5"/>
          <stop offset="100%" stop-color="#101010" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1440" height="800" fill="#101010"/>
      <rect width="1440" height="800" fill="url(#meshGlow1)"/>
      <rect width="1440" height="800" fill="url(#meshGlow2)"/>
      <rect width="1440" height="800" fill="url(#meshGlow3)"/>
      <!-- Soft blurred artistic motion waves -->
      <path d="M 0 400 Q 360 200 720 500 T 1440 300" fill="none" stroke="#D5360C" stroke-width="80" opacity="0.15" filter="blur(60px)"/>
      <path d="M 0 600 Q 500 350 1000 650 T 1440 450" fill="none" stroke="#E6D5BD" stroke-width="40" opacity="0.1" filter="blur(50px)"/>
    </svg>
  `);
  await sharp(glowMeshSvg)
    .webp({ quality: 90 })
    .toFile(path.join(imagesDir, "contact-glow-mesh.webp"));
  console.log("Created contact-glow-mesh.webp");

  console.log("All assets generated successfully!");
}

generateAssets().catch(console.error);
