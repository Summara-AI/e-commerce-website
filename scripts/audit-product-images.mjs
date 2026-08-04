import fs from "node:fs";
import path from "node:path";

const productsDir = path.resolve("public/media/products");
const galleryFile = path.resolve("src/lib/product-galleries.ts");

const SOURCE_GROUPS = [
  {
    product: "Escargot Original Facial Repair Cream",
    handle: "escargot-original-facial-repair-cream",
    sources: [
      "escargot original facial repair cream.jpg",
      "escargot original facial repair cream(1).jpg",
      "escargot original facial repair cream (2).jpg",
      "escargot original facial repair cream (5).jpg",
      "escargot original facial repair cream (7).jpg",
    ],
  },
  {
    product: "DERMAL Rice Collagen Essence Mask",
    handle: "dermal-rice-collagen-essence-mask",
    sources: ["DERMAL Rice Collagen Essence Mask.jpg"],
  },
  {
    product: "Haruharu Wonder Black Rice Pure Mineral Relief Daily Sunscreen SPF50",
    handle: "haruharu-wonder-black-rice-pure-mineral-relief-daily-sunscreen-spf50",
    sources: [
      "Haruharu Wonder Black Rice Pure Mineral Relief Daily Sunscreen SPF50.jpg",
      "Haruharu Wonder Black Rice Pure Mineral Relief Daily Sunscreen SPF50 (2).jpg",
      "Haruharu Wonder Black Rice Pure Mineral Relief Daily Sunscreen SPF50 (3).jpg",
      "PURE RICE, MINERAL SUNSCREEN (1 IMAGE).jpg",
      "PURE RICE, MINERAL SUNSCREEN (2 IMAGE).jpg",
      "PURE RICE, MINERAL SUNSCREEN (3 IMAGE).jpg",
      "PURE RICE, MINERAL SUNSCREEN (4 IMAGE).jpg",
      "PURE RICE, MINERAL SUNSCREEN (5 IMAGE).jpg",
    ],
  },
  {
    product: "DERMAL Blueberry Facial Sheet Mask",
    handle: "dermal-blueberry-facial-sheet-mask",
    sources: [
      "bLUEBERRY MASK (1 IMAGE).jpg",
      "BLUEBERRY MASK (IMAGE 2).jpg",
      "BLUEBERRY FACE MASK (3 IMAGE).jpg",
      "BLUEBERRY FACEMASK (4 IMAGE).jpg",
    ],
  },
  {
    product: "DERMAL Tea Tree Collagen Essence Mask",
    handle: "dermal-tea-tree-collagen-essence-mask",
    sources: [
      "tea tree collagen essence mask.jpg",
      "tea tree  collagen essence mask (1).jpg",
      "tea tree collagen essence mask (2).jpg",
    ],
  },
  {
    product: "DERMAL Kefir Facial Sheet Masks",
    handle: "dermal-kafir-facial-sheet-masks",
    sources: ["dermal kefir sheet mask.webp"],
  },
  {
    product: "DERMAL Cucumber Collagen Essence Mask",
    handle: "dermal-cucumber-collagen-essence-mask",
    sources: [
      "CucumberCollagenEssence1.jpg",
      "CucumberCollagenEssence2.jpg",
      "CucumberCollagenEssence3.jpg",
      "CucumberCollagenEssence4.jpg",
      "CucumberCollagenEssence5.jpg",
      "CucumberCollagenEssence6.jpg",
    ],
  },
  {
    product: "Lacto Cica Barrier Cream Moisturizer",
    handle: "lacto-cica-barrier-cream-moisturizer",
    sources: [
      "lacto cica barier cream.jpg",
      "lacto cica barrier cream (2).jpg",
      "lacto cica barrier cream (3).jpg",
      "lacto cica barrier cream(5).jpg",
      "lacto cica barrier cream(6).jpg",
      "lacto cica barrier cream (8).jpg",
      "lacto cica barrier cream (9).jpg",
      "lacto cica barrier cream (10).jpg",
      "lacto cica barrier cream (11).jpg",
      "lacto cica barrier cream (12).jpg",
    ],
  },
  {
    product: "Haruharu Wonder Black Rice Hyaluronic Toner",
    handle: "haruharu-wonder-black-rice-hyaluronic-toner",
    sources: [
      "Haruharu Wonder Black Rice Hyaluronic Toner (1).jpg",
      "Haruharu Wonder Black Rice Hyaluronic Toner (2).jpg",
      "Haruharu Wonder Black Rice Hyaluronic Toner (3).jpg",
      "Haruharu Wonder Black Rice Hyaluronic Toner (4).jpg",
      "Haruharu Wonder Black Rice Hyaluronic Toner (6).jpg",
      "Haruharu Wonder Black Rice Hyaluronic Toner (7).jpg",
      "Haruharu Wonder Black Rice Hyaluronic Toner (8).jpg",
      "Haruharu Wonder Black Rice Hyaluronic Toner (9).jpg",
      "Haruharu Wonder Black Rice Hyaluronic Toner (10).jpg",
    ],
  },
  {
    product: "HARUHARU Wonder Black Rice Moisture Cleansing Oil",
    handle: "haruharu-wonder-black-rice-moisture-cleansing-oil",
    sources: [
      "HARUHARU Wonder Black Rice Moisture Cleansing Oil.jpg",
      "HARUHARU Wonder Black Rice Moisture Cleansing Oil (2 IMAGE).jpg",
      "HARUHARU Wonder Black Rice Moisture Cleansing Oil (3 IMAGE).jpg",
      "HARUHARU Wonder Black Rice Moisture Cleansing Oil (4 IMAGE).jpg",
      "HARUHARU Wonder Black Rice Moisture Cleansing Oil (5 IMAGE).jpg",
      "HARUHARU Wonder Black Rice Moisture Cleansing Oil (6).jpg",
      "HARUHARU Wonder Black Rice Moisture Cleansing Oil (7).jpg",
      "HARUHARU Wonder Black Rice Moisture Cleansing Oil 5 IMAGE.jpg",
    ],
  },
  {
    product: "DERMAL Pomegranate Collagen Essence Mask",
    handle: "dermal-pomegranate-collagen-essence-mask",
    sources: [
      "PomegranaterCollagenEssence1.jpg",
      "PomegranaterCollagenEssence2.jpg",
      "PomegranaterCollagenEssence3.jpg",
      "PomegranaterCollagenEssence4.jpg",
      "PomegranaterCollagenEssence5.jpg",
      "PomegranaterCollagenEssence6.jpg",
    ],
  },
  {
    product: "DERMAL Charcoal Collagen Essence Mask",
    handle: "dermal-charcoal-collagen-essence-mask",
    sources: [
      "CharcoalCollagen1.jpg",
      "CharcoalCollagen2.jpg",
      "CharcoalCollagen3.jpg",
      "CharcoalCollagen4.jpg",
      "CharcoalCollagen5.jpg",
      "CharcoalCollagen6.jpg",
    ],
  },
  {
    product: "Mixsoon Bean Essence",
    handle: "mixsoon-bean-essence",
    sources: [
      "Mixsoon Bean Essence (1).jpg",
      "Mixsoon Bean Essence (2).jpg",
      "Mixsoon Bean Essence (3).jpg",
      "Mixsoon Bean Essence (6).jpg",
      "Mixsoon Bean Essence (7).jpg",
      "Mixsoon Bean Essence (8).jpg",
      "Mixsoon Bean Essence (9).jpg",
      "Mixsoon Bean Essence (10).jpg",
    ],
  },
  {
    product: "SKIN 1004 Madagascar Centella Poremizing Fresh Ampoule",
    handle: "skin-1004-madagascar-centella-poremizing-fresh-ampoule",
    sources: [
      "SKIN 1004 Madagascar Centella Poremizing Fresh Ampoule 100ml.jpg",
      "SKIN 1004 Madagascar Centella Poremizing Fresh Ampoule 100ml (1).jpg",
      "SKIN 1004 Madagascar Centella Poremizing Fresh Ampoule 100ml (2).jpg",
      "SKIN 1004 Madagascar Centella Poremizing Fresh Ampoule 100ml (3).jpg",
      "SKIN 1004 Madagascar Centella Poremizing Fresh Ampoule 100ml (7).jpg",
      "SKIN 1004 Madagascar Centella Poremizing Fresh Ampoule 100ml (8).jpg",
      "SKIN 1004 Madagascar Centella Poremizing Fresh Ampoule 100ml (9).jpg",
      "SKIN 1004 Madagascar Centella Poremizing Fresh Ampoule 100ml (11).jpg",
      "SKIN 1004 Madagascar Centella Poremizing Fresh Ampoule 100ml (20.jpg",
    ],
  },
  {
    product: "Anjo Professional Snail BB Cream",
    handle: "anjo-professional-snail-bb-cream",
    sources: [
      "Anjo professional snail bb cream.jpg",
      "Anjo professional snail bb cream (1).jpg",
      "Anjo professional snail bb cream (3).jpg",
      "Anjo professional snail bb cream (4).jpg",
      "Anjo professional snail bb cream (5).jpg",
    ],
  },
  {
    product: "LADAMER Oligoforce Serum Hydrating",
    handle: "ladamer-oligoforce-serum-hydrating",
    sources: [
      "LADAMER Oligoforce Serum Hydrating (1).jpg",
      "LADAMER Oligoforce Serum Hydrating (2).jpg",
      "LADAMER Oligoforce Serum Hydrating (3).jpg",
      "LADAMER Oligoforce Serum Hydrating (4).jpg",
      "LADAMER Oligoforce Serum Hydrating (5).jpg",
      "LADAMER Oligoforce Serum Hydrating (9).jpg",
    ],
  },
  {
    product: "LADAMER Cell Clinic BB Cream",
    handle: "ladamer-cell-clinic-bb-cream",
    sources: [
      "LADAMER CELL CLINIC B CREAM.jpg",
      "LADAMER CELL CLINIC B CREAM (1).jpg",
      "LADAMER CELL CLINIC B CREAM (4).jpg",
      "LADAMER CELL CLINIC B CREAM (5).jpg",
      "LADAMER CELL CLINIC B CREAM (8).jpg",
      "LADAMER CELL CLINIC B CREAM (5)].jpg",
    ],
  },
  {
    product: "LADAMER Oligoforce Caviar Ampoule",
    handle: "ladamer-oligoforce-caviar-ampoule",
    sources: [
      "Ampuole, oligoforce ampoule.jpg",
      "Ampuole, oligoforce ampoule (2).jpg",
      "Ampuole, oligoforce ampoule (3).jpg",
      "Ampuole, oligoforce ampoule (4).jpg",
      "Ampuole, oligoforce ampoule (6).jpg",
      "Ampuole, oligoforce ampoule (9).jpg",
    ],
  },
  {
    product: "ELENSILIA Escargot Anti Wrinkle Multi Balm",
    handle: "elensilia-escargot-anti-wrinkle-multi-balm",
    sources: [
      "ellencilia escargot anti wrinkle multi balm.jpg",
      "ellencilia escargot anti wrinkle multi balm (1).jpg",
      "ellencilia escargot anti wrinkle multi balm(3).jpg",
      "ellencilia escargot anti wrinkle multi balm(5).jpg",
      "ellencilia escargot anti wrinkle multi balm (6).jpg",
      "ellencilia escargot anti wrinkle multi balm (9).jpg",
      "ELENSILIA ESCARGOT ANTI WRINKLE MUTI BALM.jpg",
    ],
  },
  {
    product: "Elensilia CPP+ Collagen Peptide Eye Cream",
    handle: "elensilia-cpp-collagen-peptide-eye-cream",
    sources: [
      "ellencilia peptide eye cream.png",
      "ellencilia peptide eye cream(2).png",
      "ellencilia peptide eye cream (3).png",
      "ellencilia peptide eye cream (7).jpg",
      "ellensilia peptide eye cream.jpg",
    ],
  },
  {
    product: "LactoDerm Beneficial Moisturizing Cream",
    handle: "lactoderm-beneficial-moisturizing-cream",
    sources: [
      "lactoderm beneficial mosturizing cream (1).jpg",
      "lactoderm beneficial mosturizing cream (2).jpg",
      "lactoderm beneficial mosturizing cream (3).jpg",
      "lactoderm beneficial mosturizing cream(4).jpg",
      "lactoderm beneficial mosturizing cream (5).jpg",
      "lactoderm beneficial mosturizing cream(7).jpg",
      "lactoderm beneficial mosturizing cream (8).jpg",
    ],
  },
  {
    product: "K-Beauty Starter Kit (bundle)",
    handle: "k-beauty-starter-kit",
    sources: ["k-beauty-starter-kit.png", "Bundle1.png"],
  },
  {
    product: "K-Glow AM Trio (bundle)",
    handle: "k-glow-am-trio",
    sources: ["k-glow-am-trio.png", "Bundle2.png"],
  },
];

const diskFiles = new Set(
  fs.readFileSync(path.resolve("scripts/inventory-files.txt"), "utf8").trim().split(/\r?\n/),
);

const gallerySrc = fs.readFileSync(galleryFile, "utf8");

function galleryForHandle(handle) {
  const re = new RegExp(
    `"${handle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}":\\s*\\[([\\s\\S]*?)\\],`,
  );
  const m = gallerySrc.match(re);
  if (!m) return [];
  return [...m[1].matchAll(/\/media\/products\/([^"`]+)/g)].map((x) => x[1]);
}

const assigned = new Set(SOURCE_GROUPS.flatMap((g) => g.sources));

const unassigned = [...diskFiles].filter((f) => {
  if (assigned.has(f)) return false;
  if (f.includes("-gallery-")) return false;
  if (f.endsWith(".jpg") && f.includes("-") && !f.includes(" ")) return false;
  if (f.endsWith(".png") && f.includes("-") && !f.includes(" ")) return false;
  if (f.endsWith(".webp") && f.includes("-")) return false;
  return true;
});

console.log("=== GALLERY AUDIT ===\n");
for (const g of SOURCE_GROUPS) {
  const wired = galleryForHandle(g.handle);
  const missingOnDisk = wired.filter((f) => !diskFiles.has(f));
  console.log(
    `${g.product}\n  handle: ${g.handle}\n  source images: ${g.sources.length}\n  gallery wired: ${wired.length}\n  gallery missing on disk: ${missingOnDisk.length ? missingOnDisk.join(", ") : "none"}\n  gap: ${g.sources.length - wired.length}\n`,
  );
}

console.log("=== UNASSIGNED SOURCE-LIKE FILES ===");
for (const f of unassigned.sort()) console.log(f);
