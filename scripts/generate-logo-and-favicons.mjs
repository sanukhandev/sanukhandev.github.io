import fs from 'node:fs';
import path from 'node:path';
import opentype from 'opentype.js';
import sharp from 'sharp';

const fontPath = path.resolve('public/assets/fonts/Keratus-Medium.ttf');
if (!fs.existsSync(fontPath)) {
  console.error('Font not found at:', fontPath);
  process.exit(1);
}

const fontBuf = fs.readFileSync(fontPath);
const font = opentype.parse(fontBuf.buffer.slice(fontBuf.byteOffset, fontBuf.byteOffset + fontBuf.byteLength));
console.log('Successfully loaded font:', font.names.fontFamily?.en || 'Keratus');

// -------------------------------------------------------------
// 1. Build the 512x512 SK Logo Favicon SVG
// -------------------------------------------------------------
// In a 512x512 canvas, badge rect: (32, 32) to (480, 480) -> size 448x448, rx=112
// Centered at (256, 256)
const skSize = 296;
const sampleSK = font.getPath('SK', 0, 0, skSize);
const bbSK = sampleSK.getBoundingBox();
const wSK = bbSK.x2 - bbSK.x1;
const hSK = bbSK.y2 - bbSK.y1;
const offX = 256 - (bbSK.x1 + wSK / 2);
const offY = 256 - (bbSK.y1 + hSK / 2);
const skPath = font.getPath('SK', offX, offY, skSize);
const skPathData = skPath.toPathData(2);

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="sk-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E84A1C" />
      <stop offset="50%" stop-color="#D5360C" />
      <stop offset="100%" stop-color="#9C2003" />
    </linearGradient>
    <filter id="sk-shadow" x="-8%" y="-8%" width="116%" height="116%">
      <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#101010" flood-opacity="0.28" />
    </filter>
  </defs>
  <rect x="32" y="32" width="448" height="448" rx="112" ry="112" fill="url(#sk-grad)" filter="url(#sk-shadow)" />
  <rect x="32" y="32" width="448" height="448" rx="112" ry="112" fill="none" stroke="#FFFFFF" stroke-opacity="0.22" stroke-width="4" />
  <path d="${skPathData}" fill="#FFFFFF" />
</svg>`;

fs.writeFileSync(path.resolve('public/favicon.svg'), faviconSvg, 'utf8');
console.log('✓ Created public/favicon.svg');

// -------------------------------------------------------------
// 2. Generate Favicon PNGs and ICO via Sharp
// -------------------------------------------------------------
const svgBuffer = Buffer.from(faviconSvg);

async function generateFavicons() {
  const sizes = [
    { name: 'public/favicon-16x16.png', size: 16 },
    { name: 'public/favicon-32x32.png', size: 32 },
    { name: 'public/apple-touch-icon.png', size: 180 },
    { name: 'public/android-chrome-192x192.png', size: 192 },
    { name: 'public/android-chrome-512x512.png', size: 512 },
  ];

  for (const item of sizes) {
    await sharp(svgBuffer)
      .resize(item.size, item.size)
      .png()
      .toFile(path.resolve(item.name));
    console.log(`✓ Generated ${item.name} (${item.size}x${item.size})`);
  }

  // Generate multi-resolution favicon.ico containing 16x16, 32x32, and 48x48
  const icoSizes = [16, 32, 48];
  const pngBuffers = [];
  for (const s of icoSizes) {
    const buf = await sharp(svgBuffer).resize(s, s).png().toBuffer();
    pngBuffers.push({ width: s, height: s, buffer: buf });
  }

  const count = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(count, 4); // image count

  let offset = 6 + count * 16;
  const entries = [];
  for (const img of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2); // palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(img.buffer.length, 8); // size
    entry.writeUInt32LE(offset, 12); // offset
    offset += img.buffer.length;
    entries.push(entry);
  }

  const icoBuffer = Buffer.concat([header, ...entries, ...pngBuffers.map(p => p.buffer)]);
  fs.writeFileSync(path.resolve('public/favicon.ico'), icoBuffer);
  console.log('✓ Generated public/favicon.ico (16, 32, 48px multi-resolution)');
}

// -------------------------------------------------------------
// 3. Generate Combined Logo SVG (SK Badge + SanuKhan.dev text)
// -------------------------------------------------------------
// Design specifications:
// Height: 40px
// Badge: 40x40 with rx=10, fill=url(#sk-logo-gradient)
// Badge SK path: centered inside 40x40
const badgeSKScale = 40 / 512;
const badgeSKPath = `matrix(${badgeSKScale} 0 0 ${badgeSKScale} 0 0)`;

// Text: "SanuKhan.dev"
// At fontSize=26, baseline y=28 (badge center is 20, cap height is ~18 from y=10 to y=28)
const textFontSize = 26;
const textBaselineY = 28;
const textStartX = 52; // 12px gap from 40px badge

// 1. "Sanu" - thin style
const pSanu = font.getPath('Sanu', textStartX, textBaselineY, textFontSize);
const advSanu = font.getAdvanceWidth('Sanu', textFontSize);
const dSanu = pSanu.toPathData(2);

// 2. "Khan" - regular style
const pKhan = font.getPath('Khan', textStartX + advSanu, textBaselineY, textFontSize);
const advKhan = font.getAdvanceWidth('Khan', textFontSize);
const dKhan = pKhan.toPathData(2);

// 3. ".dev" - bold style
const pDev = font.getPath('.dev', textStartX + advSanu + advKhan, textBaselineY, textFontSize);
const advDev = font.getAdvanceWidth('.dev', textFontSize);
const dDev = pDev.toPathData(2);

const totalLogoWidth = Math.ceil(textStartX + advSanu + advKhan + advDev + 6);

// Standalone Combined Logo SVG
const combinedLogoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalLogoWidth} 40" width="${totalLogoWidth}" height="40" fill="none">
  <defs>
    <linearGradient id="sk-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E84A1C" />
      <stop offset="50%" stop-color="#D5360C" />
      <stop offset="100%" stop-color="#9C2003" />
    </linearGradient>
  </defs>
  <!-- SK Badge -->
  <g class="sk-logo__badge">
    <rect x="0" y="0" width="40" height="40" rx="10" ry="10" fill="url(#sk-logo-grad)" />
    <rect x="0.5" y="0.5" width="39" height="39" rx="9.5" ry="9.5" stroke="#FFFFFF" stroke-opacity="0.22" fill="none" />
    <g transform="${badgeSKPath}">
      <path d="${skPathData}" fill="#FFFFFF" />
    </g>
  </g>
  <!-- Wordmark: SanuKhan.dev in Thin, Regular, Bold style -->
  <g class="sk-logo__text" aria-label="SanuKhan.dev">
    <!-- Sanu (Thin) -->
    <path class="sk-logo__sanu" d="${dSanu}" fill="currentColor" opacity="0.82" />
    <!-- Khan (Regular) -->
    <path class="sk-logo__khan" d="${dKhan}" fill="currentColor" />
    <!-- .dev (Bold with theme gradient combo) -->
    <path class="sk-logo__dev" d="${dDev}" fill="url(#sk-logo-grad)" stroke="url(#sk-logo-grad)" stroke-width="0.8" />
  </g>
</svg>`;

fs.mkdirSync(path.resolve('public/assets/images'), { recursive: true });
fs.writeFileSync(path.resolve('public/assets/images/logo.svg'), combinedLogoSvg, 'utf8');
console.log(`✓ Generated public/assets/images/logo.svg (viewBox="0 0 ${totalLogoWidth} 40")`);

// Output path data for React Component
const exportData = {
  viewBoxWidth: totalLogoWidth,
  skPathData,
  dSanu,
  dKhan,
  dDev,
};

fs.writeFileSync(path.resolve('scripts/logo-paths.json'), JSON.stringify(exportData, null, 2), 'utf8');
console.log('✓ Exported scripts/logo-paths.json');

await generateFavicons();
console.log('\nAll logo and favicon assets generated successfully!');
