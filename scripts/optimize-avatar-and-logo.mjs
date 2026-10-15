import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import opentype from 'opentype.js';

console.log('=== Optimizing Avatar & Regenerating Roba Logo/Favicons ===\n');

// -------------------------------------------------------------
// PART 1: Avatar Optimization
// -------------------------------------------------------------
const avatarInput = path.resolve('public/assets/images/avatar_latest.png');
if (!fs.existsSync(avatarInput)) {
  console.error('Avatar image not found at:', avatarInput);
  process.exit(1);
}

console.log('1. Optimizing avatar_latest.png for web render...');
const rawPipeline = sharp(avatarInput);

// Full size (1122x1402)
await rawPipeline.clone().avif({ quality: 82, effort: 6 }).toFile(path.resolve('public/hero-avatar-latest.avif'));
await rawPipeline.clone().webp({ quality: 85, effort: 6 }).toFile(path.resolve('public/hero-avatar-latest.webp'));
console.log('  ✓ Generated hero-avatar-latest.avif & webp (1122x1402)');

// 720w
await rawPipeline.clone().resize(720).avif({ quality: 82, effort: 6 }).toFile(path.resolve('public/hero-avatar-latest-720.avif'));
await rawPipeline.clone().resize(720).webp({ quality: 85, effort: 6 }).toFile(path.resolve('public/hero-avatar-latest-720.webp'));
console.log('  ✓ Generated hero-avatar-latest-720.avif & webp (720w)');

// 480w
await rawPipeline.clone().resize(480).avif({ quality: 82, effort: 6 }).toFile(path.resolve('public/hero-avatar-latest-480.avif'));
await rawPipeline.clone().resize(480).webp({ quality: 85, effort: 6 }).toFile(path.resolve('public/hero-avatar-latest-480.webp'));
console.log('  ✓ Generated hero-avatar-latest-480.avif & webp (480w)');

// Overwrite legacy cutout files for backward compatibility & about page
await rawPipeline.clone().avif({ quality: 82, effort: 6 }).toFile(path.resolve('public/hero-avatar-cutout.avif'));
await rawPipeline.clone().resize(720).avif({ quality: 82, effort: 6 }).toFile(path.resolve('public/hero-avatar-cutout-720.avif'));
await rawPipeline.clone().resize(360).avif({ quality: 82, effort: 6 }).toFile(path.resolve('public/hero-avatar-cutout-360.avif'));
console.log('  ✓ Updated legacy hero-avatar-cutout.avif files');

// -------------------------------------------------------------
// PART 2: Roba Font for SK Badge & Keratus for SanuKhan.dev
// -------------------------------------------------------------
console.log('\n2. Processing fonts: Roba (badge) & Keratus (wordmark)...');

const robaPath = path.resolve('public/assets/fonts/Roba-Regular.ttf');
const keratusPath = path.resolve('public/assets/fonts/Keratus-Medium.ttf');

const robaBuf = fs.readFileSync(robaPath);
const robaFont = opentype.parse(robaBuf.buffer.slice(robaBuf.byteOffset, robaBuf.byteOffset + robaBuf.byteLength));
console.log('  ✓ Loaded Roba font');

const keratusBuf = fs.readFileSync(keratusPath);
const keratusFont = opentype.parse(keratusBuf.buffer.slice(keratusBuf.byteOffset, keratusBuf.byteOffset + keratusBuf.byteLength));
console.log('  ✓ Loaded Keratus font');

// SK Monogram in Roba font inside 512x512 badge
// Badge bounds: (32, 32) to (480, 480), size 448x448, rx=112
const skSize = 350;
const sampleSK = robaFont.getPath('SK', 0, 0, skSize);
const bbSK = sampleSK.getBoundingBox();
const wSK = bbSK.x2 - bbSK.x1;
const hSK = bbSK.y2 - bbSK.y1;
const offX = 256 - (bbSK.x1 + wSK / 2);
const offY = 256 - (bbSK.y1 + hSK / 2);
const centeredSK = robaFont.getPath('SK', offX, offY, skSize);
const skRobaPathData = centeredSK.toPathData(2);
console.log('  ✓ Roba SK centered bounds:', centeredSK.getBoundingBox());

// Standalone 512x512 favicon SVG using Roba SK badge
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
  <path d="${skRobaPathData}" fill="#FFFFFF" />
</svg>`;

fs.writeFileSync(path.resolve('public/favicon.svg'), faviconSvg, 'utf8');
console.log('  ✓ Generated public/favicon.svg (Roba font SK badge)');

// Render all raster favicons via Sharp
const svgBuffer = Buffer.from(faviconSvg);
const faviconFiles = [
  { name: 'public/favicon-16x16.png', size: 16 },
  { name: 'public/favicon-32x32.png', size: 32 },
  { name: 'public/apple-touch-icon.png', size: 180 },
  { name: 'public/android-chrome-192x192.png', size: 192 },
  { name: 'public/android-chrome-512x512.png', size: 512 },
];

for (const fav of faviconFiles) {
  await sharp(svgBuffer).resize(fav.size, fav.size).png().toFile(path.resolve(fav.name));
  console.log(`  ✓ Generated ${fav.name} (${fav.size}x${fav.size})`);
}

// Generate multi-resolution favicon.ico (16, 32, 48px)
const icoSizes = [16, 32, 48];
const pngBuffers = [];
for (const s of icoSizes) {
  const buf = await sharp(svgBuffer).resize(s, s).png().toBuffer();
  pngBuffers.push({ width: s, height: s, buffer: buf });
}

const count = pngBuffers.length;
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(count, 4);

let offset = 6 + count * 16;
const entries = [];
for (const img of pngBuffers) {
  const entry = Buffer.alloc(16);
  entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0);
  entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(img.buffer.length, 8);
  entry.writeUInt32LE(offset, 12);
  offset += img.buffer.length;
  entries.push(entry);
}

const icoBuffer = Buffer.concat([header, ...entries, ...pngBuffers.map(p => p.buffer)]);
fs.writeFileSync(path.resolve('public/favicon.ico'), icoBuffer);
console.log('  ✓ Generated public/favicon.ico (16, 32, 48px)');

// -------------------------------------------------------------
// PART 3: Combined Logo SVG (Roba SK Badge + Keratus SanuKhan.dev)
// -------------------------------------------------------------
console.log('\n3. Building Combined Logo SVG...');
const textFontSize = 26;
const textBaselineY = 28;
const textStartX = 52; // 12px gap from 40px badge

const pSanu = keratusFont.getPath('Sanu', textStartX, textBaselineY, textFontSize);
const advSanu = keratusFont.getAdvanceWidth('Sanu', textFontSize);
const dSanu = pSanu.toPathData(2);

const pKhan = keratusFont.getPath('Khan', textStartX + advSanu, textBaselineY, textFontSize);
const advKhan = keratusFont.getAdvanceWidth('Khan', textFontSize);
const dKhan = pKhan.toPathData(2);

const pDev = keratusFont.getPath('.dev', textStartX + advSanu + advKhan, textBaselineY, textFontSize);
const advDev = keratusFont.getAdvanceWidth('.dev', textFontSize);
const dDev = pDev.toPathData(2);

const totalLogoWidth = Math.ceil(textStartX + advSanu + advKhan + advDev + 6);
const badgeSKScale = 40 / 512;
const badgeSKTransform = `matrix(${badgeSKScale} 0 0 ${badgeSKScale} 0 0)`;

const combinedLogoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalLogoWidth} 40" width="${totalLogoWidth}" height="40" fill="none">
  <defs>
    <linearGradient id="sk-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E84A1C" />
      <stop offset="50%" stop-color="#D5360C" />
      <stop offset="100%" stop-color="#9C2003" />
    </linearGradient>
  </defs>
  <!-- SK Badge in Roba Font -->
  <g class="sk-logo__badge">
    <rect x="0" y="0" width="40" height="40" rx="10" ry="10" fill="url(#sk-logo-grad)" />
    <rect x="0.5" y="0.5" width="39" height="39" rx="9.5" ry="9.5" stroke="#FFFFFF" stroke-opacity="0.22" fill="none" />
    <g transform="${badgeSKTransform}">
      <path d="${skRobaPathData}" fill="#FFFFFF" />
    </g>
  </g>
  <!-- SanuKhan.dev in Keratus Font (Thin, Regular, Bold style) -->
  <g class="sk-logo__text" aria-label="SanuKhan.dev">
    <!-- Sanu (Thin style) -->
    <path class="sk-logo__sanu" d="${dSanu}" fill="currentColor" opacity="0.82" />
    <!-- Khan (Regular style) -->
    <path class="sk-logo__khan" d="${dKhan}" fill="currentColor" />
    <!-- .dev (Bold style with theme gradient combo) -->
    <path class="sk-logo__dev" d="${dDev}" fill="url(#sk-logo-grad)" stroke="url(#sk-logo-grad)" stroke-width="0.8" />
  </g>
</svg>`;

fs.writeFileSync(path.resolve('public/assets/images/logo.svg'), combinedLogoSvg, 'utf8');
console.log(`  ✓ Generated public/assets/images/logo.svg (viewBox="0 0 ${totalLogoWidth} 40")`);

const pathsExport = {
  viewBoxWidth: totalLogoWidth,
  skRobaPathData,
  dSanu,
  dKhan,
  dDev,
};
fs.writeFileSync(path.resolve('scripts/logo-paths.json'), JSON.stringify(pathsExport, null, 2), 'utf8');
console.log('  ✓ Updated scripts/logo-paths.json');

console.log('\n=== All optimizations and assets complete! ===');
