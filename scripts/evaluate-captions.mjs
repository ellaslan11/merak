#!/usr/bin/env node
/**
 * Caption quality comparison for CS 153 evaluation.
 * Run: npm run evaluate:captions
 */
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const cache = JSON.parse(
  readFileSync(join(root, "lib/visionCache.json"), "utf8")
);

const photos = [
  { id: "photo-ski", caption: "trail sign with the crew", location: "Heavenly, Lake Tahoe" },
  { id: "photo-vangogh", caption: "swirly sky selfie", location: "Van Gogh immersive" },
  { id: "photo-bar", caption: "macallan glow", location: "Downtown bar" },
  { id: "photo-white-lie", caption: "all white, zero lies", location: "Dorm common room" },
  { id: "photo-fries", caption: "waffle fries & boa", location: "Late-night run" },
  { id: "photo-festival", caption: "golden hour field", location: "Outdoor festival" },
  { id: "photo-bakery", caption: "cardamom bun case", location: "Cardamom bun bakery" },
  { id: "photo-birthday", caption: "it is your birthday", location: "Dorm" },
  { id: "photo-formal", caption: "written in backdrop", location: "Written In formal" },
  { id: "photo-dog", caption: "mom's dog on the pavers", location: "Back patio" },
];

function locationOnly(p) {
  return `A moment from ${p.location}.`;
}

console.log("# Merak caption evaluation (automated)\n");
console.log("| Photo | Location-only | Vision cache (BLIP-style) | User caption |");
console.log("|-------|---------------|---------------------------|--------------|");

for (const p of photos) {
  const vision = cache[p.id]?.caption ?? "—";
  const loc = locationOnly(p).replace(/\|/g, "\\|");
  const user = p.caption.replace(/\|/g, "\\|");
  const vis = vision.replace(/\|/g, "\\|");
  console.log(`| ${p.id} | ${loc} | ${vis} | ${user} |`);
}

console.log("\n## Summary\n");
console.log(
  "- **Location-only** is what the parser uses without vision — generic but safe."
);
console.log(
  "- **Vision cache** adds scene detail (friends, food, setting) for Merak's feed cards."
);
console.log(
  "- **User caption** is ground truth from Ella's camera roll metadata in the demo."
);
console.log(
  "\nRun live BLIP via `HF_TOKEN` + `/api/analyze-photo` to compare against cache."
);
