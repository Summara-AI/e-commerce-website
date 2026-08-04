import fs from "node:fs";

const files = [
  "src/lib/catalog.ts",
  "src/lib/collections.ts",
  "src/lib/extended-catalog-products.ts",
];

for (const file of files) {
  let content = fs.readFileSync(file, "utf8");
  const updated = content
    .replace(/\r?\n\s*imageSrc:\s*\r?\n\s*"[^"]+",/g, "")
    .replace(/\r?\n\s*imageSrc: "[^"]+",/g, "");
  fs.writeFileSync(file, updated, "utf8");
  console.log(`Updated ${file}`);
}
