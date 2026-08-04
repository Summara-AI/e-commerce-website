/**
 * Set product cover (index 0) images — run: node scripts/set-product-covers.mjs
 */
import fs from "node:fs";
import path from "node:path";

const productsDir = path.resolve("public/media/products");
const galleryFile = path.resolve("src/lib/product-galleries.ts");

/** handle → exact source filename on disk (from user cover list + attachments) */
const COVER_SOURCE_BY_HANDLE = {
  "ladamer-oligoforce-caviar-ampoule": "Ampuole, oligoforce ampoule.jpg",
  "anjo-professional-snail-bb-cream": "Anjo professional snail bb cream (3).jpg",
  "dermal-blueberry-facial-sheet-mask": "BLUEBERRY MASK (IMAGE 2).jpg",
  "dermal-charcoal-collagen-essence-mask": "CharcoalCollagen2.jpg",
  "dermal-cucumber-collagen-essence-mask": "CucumberCollagenEssence2.jpg",
  "dermal-kafir-facial-sheet-masks": "dermal kefir sheet mask.webp",
  "dermal-pomegranate-collagen-essence-mask": "PomegranaterCollagenEssence2.jpg",
  "dermal-rice-collagen-essence-mask": "DERMAL Rice Collagen Essence Mask.jpg",
  "dermal-tea-tree-collagen-essence-mask": "tea tree collagen essence mask.jpg",
  "elensilia-cpp-collagen-peptide-eye-cream": "ellencilia peptide eye cream(2).png",
  "elensilia-escargot-anti-wrinkle-multi-balm":
    "ellencilia escargot anti wrinkle multi balm (1).jpg",
  "escargot-original-facial-repair-cream": "escargot original facial repair cream (5).jpg",
  "haruharu-wonder-black-rice-hyaluronic-toner":
    "Haruharu Wonder Black Rice Hyaluronic Toner (3).jpg",
  "haruharu-wonder-black-rice-moisture-cleansing-oil":
    "HARUHARU Wonder Black Rice Moisture Cleansing Oil.jpg",
  "haruharu-wonder-black-rice-pure-mineral-relief-daily-sunscreen-spf50":
    "PURE RICE, MINERAL SUNSCREEN (5 IMAGE).jpg",
  "lacto-cica-barrier-cream-moisturizer": "lacto cica barrier cream (2).jpg",
  "lactoderm-beneficial-moisturizing-cream": "lactoderm beneficial mosturizing cream(7).jpg",
  "ladamer-cell-clinic-bb-cream": "LADAMER CELL CLINIC B CREAM.jpg",
  "ladamer-oligoforce-serum-hydrating": "LADAMER Oligoforce Serum Hydrating (2).jpg",
  "mixsoon-bean-essence": "Mixsoon Bean Essence (1).jpg",
  "skin-1004-madagascar-centella-poremizing-fresh-ampoule":
    "SKIN 1004 Madagascar Centella Poremizing Fresh Ampoule 100ml (20.jpg",
};

const gallerySrc = fs.readFileSync(galleryFile, "utf8");

function parseGalleries(src) {
  const map = {};
  const re = /"([^"]+)":\s*\[([\s\S]*?)\],/g;
  let m;
  while ((m = re.exec(src))) {
    const handle = m[1];
    const paths = [...m[2].matchAll(/\$\{base\}\/([^`]+)/g)].map((x) => x[1]);
    map[handle] = paths;
  }
  return map;
}

const galleries = parseGalleries(gallerySrc);
const missing = [];
const report = [];

for (const [handle, coverSource] of Object.entries(COVER_SOURCE_BY_HANDLE)) {
  const from = path.join(productsDir, coverSource);
  if (!fs.existsSync(from)) {
    missing.push({ handle, coverSource });
    continue;
  }

  const ext = path.extname(coverSource).toLowerCase() || ".jpg";
  const heroFile = `${handle}${ext}`;
  const heroPath = `/media/products/${heroFile}`;

  fs.copyFileSync(from, path.join(productsDir, heroFile));

  const current = galleries[handle];
  if (!current) {
    missing.push({ handle, error: "no gallery in product-galleries.ts" });
    continue;
  }

  const reordered = [heroFile, ...current.filter((f) => f !== heroFile)];
  galleries[handle] = reordered;

  report.push({
    handle,
    coverSource,
    heroFile,
    total: reordered.length,
  });
}

if (missing.length) {
  console.error("MISSING:", JSON.stringify(missing, null, 2));
  process.exit(1);
}

const lines = [];
lines.push(`/**`);
lines.push(` * PDP image galleries — cover image is always index 0.`);
lines.push(` * Covers set via: node scripts/set-product-covers.mjs`);
lines.push(` */`);
lines.push(``);
lines.push(`const base = "/media/products";`);
lines.push(``);
lines.push(`export const PRODUCT_GALLERY_BY_HANDLE: Record<string, readonly string[]> = {`);

for (const [handle, files] of Object.entries(galleries)) {
  lines.push(`  "${handle}": [`);
  for (const file of files) {
    lines.push(`    \`\${base}/${file}\`,`);
  }
  lines.push(`  ],`);
}

lines.push(`};`);
lines.push(``);
lines.push(`export function getProductGallery(handle: string): readonly string[] {`);
lines.push(`  return PRODUCT_GALLERY_BY_HANDLE[handle] ?? [];`);
lines.push(`}`);
lines.push(``);

fs.writeFileSync(galleryFile, lines.join("\n"), "utf8");
console.log(JSON.stringify(report, null, 2));
