/**
 * Image Optimization Script
 * Converts all portfolio images to WebP and compresses them.
 * Run: node scripts/optimize-images.js
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const assetsDir = path.join(__dirname, '..', 'src', 'assets');
const publicDir = path.join(__dirname, '..', 'public');

// Images to convert to WebP + compress
const imagesToProcess = [
  // src/assets images
  { input: path.join(assetsDir, 'me-5.png'),      output: path.join(assetsDir, 'me-5.webp'),      quality: 85 },
  { input: path.join(assetsDir, 'me-4.jpg'),      output: path.join(assetsDir, 'me-4.webp'),      quality: 82 },
  { input: path.join(assetsDir, 'me-about.jpg'),  output: path.join(assetsDir, 'me-about.webp'),  quality: 82 },
  { input: path.join(assetsDir, 'Nocturne.png'),  output: path.join(assetsDir, 'Nocturne.webp'),  quality: 82 },
  { input: path.join(assetsDir, 'entero.png'),    output: path.join(assetsDir, 'entero.webp'),    quality: 82 },
  { input: path.join(assetsDir, 'con360.png'),    output: path.join(assetsDir, 'con360.webp'),    quality: 82 },
  { input: path.join(assetsDir, 'me-3.png'),      output: path.join(assetsDir, 'me-3.webp'),      quality: 82 },
  // logo compressed PNG (keep as PNG for favicon compatibility, but also make WebP)
  { input: path.join(assetsDir, 'logo.png'),      output: path.join(assetsDir, 'logo.webp'),      quality: 85 },
  // public logo
  { input: path.join(publicDir, 'logo.png'),      output: path.join(publicDir, 'logo.png'),       quality: 85, format: 'png', resize: { width: 512, withoutEnlargement: true } },
];

// OG image generation — 1200x630 branded card
const ogImageOutput = path.join(publicDir, 'og-image.jpg');

async function processImages() {
  console.log('🖼  Starting image optimization...\n');

  for (const img of imagesToProcess) {
    if (!fs.existsSync(img.input)) {
      console.log(`  ⚠  Skipping (not found): ${path.basename(img.input)}`);
      continue;
    }

    try {
      const before = fs.statSync(img.input).size;
      let pipeline = sharp(img.input);

      if (img.resize) {
        pipeline = pipeline.resize(img.resize);
      }

      if (img.format === 'png') {
        await pipeline.png({ quality: img.quality, compressionLevel: 9 }).toFile(img.output);
      } else {
        await pipeline.webp({ quality: img.quality }).toFile(img.output);
      }

      const after = fs.statSync(img.output).size;
      const saving = (((before - after) / before) * 100).toFixed(1);
      console.log(`  ✓  ${path.basename(img.input)} → ${path.basename(img.output)}`);
      console.log(`     ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB  (${saving}% smaller)\n`);
    } catch (err) {
      console.error(`  ✗  Error processing ${path.basename(img.input)}: ${err.message}`);
    }
  }

  // Generate OG image (simple branded card - 1200x630)
  try {
    const svgBuffer = Buffer.from(`
      <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#13132b"/>
            <stop offset="100%" style="stop-color:#1f1f38"/>
          </linearGradient>
        </defs>
        <rect width="1200" height="630" fill="url(#bg)"/>
        <!-- Accent bar -->
        <rect x="0" y="0" width="6" height="630" fill="#4bd5ff"/>
        <!-- Name -->
        <text x="80" y="240" font-family="Arial, sans-serif" font-size="68" font-weight="700" fill="#ffffff" letter-spacing="-1">Sukumar Kavishan</text>
        <!-- Title -->
        <text x="80" y="310" font-family="Arial, sans-serif" font-size="32" font-weight="400" fill="#4bd5ff">Senior Software Engineer</text>
        <!-- Specialisations -->
        <text x="80" y="380" font-family="Arial, sans-serif" font-size="24" fill="rgba(255,255,255,0.6)">Capital Markets · SWIFT Settlement · Application Security</text>
        <!-- IEEE badge -->
        <rect x="80" y="430" width="280" height="42" rx="6" fill="rgba(240,192,64,0.15)" stroke="#f0c040" stroke-width="1"/>
        <text x="170" y="458" font-family="Arial, sans-serif" font-size="18" fill="#f0c040" font-weight="600">IEEE IECON 2024</text>
        <!-- Globe availability -->
        <text x="80" y="540" font-family="Arial, sans-serif" font-size="20" fill="rgba(255,255,255,0.45)">Open to: Australia · Europe · Singapore · Dubai</text>
        <!-- URL -->
        <text x="80" y="590" font-family="Arial, sans-serif" font-size="18" fill="rgba(75,213,255,0.5)">kavishansukumar.web.app</text>
      </svg>
    `);

    await sharp(svgBuffer)
      .jpeg({ quality: 92 })
      .toFile(ogImageOutput);

    console.log('  ✓  og-image.jpg generated (1200×630)\n');
  } catch (err) {
    console.error(`  ✗  OG image generation failed: ${err.message}`);
  }

  // Flag unused giant image
  const unused = path.join(assetsDir, 'me-2.png');
  if (fs.existsSync(unused)) {
    const size = fs.statSync(unused).size;
    console.log(`  ⚠  UNUSED: me-2.png is ${(size / 1024 / 1024).toFixed(1)}MB — safe to delete after verifying it's not referenced.`);
  }

  console.log('\n✅  Image optimization complete!\n');
}

processImages();
