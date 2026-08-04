/**
 * Compress product images referenced by galleries (and any file > 300KB).
 * Run: node scripts/compress-product-images.mjs
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const productsDir = path.resolve("public/media/products");
const galleryFile = path.resolve("src/lib/product-galleries.ts");
const MAX_EDGE = 1600;
const JPEG_QUALITY = 82;
const PNG_QUALITY = 80;

const gallerySrc = fs.readFileSync(galleryFile, "utf8");
const referenced = new Set(
  [...gallerySrc.matchAll(/\$\{base\}\/([^`]+)/g)].map((m) => m[1]),
);

const allFiles = fs.readdirSync(productsDir);
const targets = new Set(referenced);

for (const name of allFiles) {
  const stat = fs.statSync(path.join(productsDir, name));
  if (stat.size > 300 * 1024) targets.add(name);
}

const report = [];

for (const name of [...targets].sort()) {
  const filePath = path.join(productsDir, name);
  if (!fs.existsSync(filePath)) continue;

  const before = fs.statSync(filePath).size;
  const ext = path.extname(name).toLowerCase();
  const tmp = `${filePath}.tmp`;

  let pipeline = sharp(filePath).rotate();
  const meta = await pipeline.metadata();
  const w = meta.width ?? 0;
  const h = meta.height ?? 0;

  if (Math.max(w, h) > MAX_EDGE) {
    pipeline = pipeline.resize({
      width: w >= h ? MAX_EDGE : undefined,
      height: h > w ? MAX_EDGE : undefined,
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  if (ext === ".jpg" || ext === ".jpeg") {
    pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });
  } else if (ext === ".webp") {
    pipeline = pipeline.webp({ quality: JPEG_QUALITY });
  } else if (ext === ".png") {
    const hasAlpha = meta.hasAlpha;
    if (hasAlpha) {
      pipeline = pipeline.png({ quality: PNG_QUALITY, compressionLevel: 9, palette: true });
    } else {
      pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });
      const jpegName = name.replace(/\.png$/i, ".jpg");
      const jpegPath = path.join(productsDir, jpegName);
      await pipeline.toFile(tmp);
      fs.renameSync(tmp, jpegPath);
      if (jpegName !== name) fs.unlinkSync(filePath);
      const after = fs.statSync(jpegPath).size;
      report.push({
        file: jpegName,
        beforeKB: Math.round(before / 1024),
        afterKB: Math.round(after / 1024),
        converted: "png→jpg",
      });
      continue;
    }
  } else {
    continue;
  }

  await pipeline.toFile(tmp);
  fs.renameSync(tmp, filePath);
  const after = fs.statSync(filePath).size;
  report.push({
    file: name,
    beforeKB: Math.round(before / 1024),
    afterKB: Math.round(after / 1024),
    saved: `${Math.round((1 - after / before) * 100)}%`,
  });
}

const totalBefore = report.reduce((s, r) => s + r.beforeKB, 0);
const totalAfter = report.reduce((s, r) => s + r.afterKB, 0);

console.log(`Compressed ${report.length} files`);
console.log(`Total: ${totalBefore} KB → ${totalAfter} KB`);
console.log(JSON.stringify(report.filter((r) => r.beforeKB > 300 || r.converted), null, 2));
