import { build } from "esbuild";
import fs from "fs";
import path from "path";

const root = process.cwd();
const dist = path.join(root, "dist");

// ---------- Bundle Service Worker ----------
await build({
  entryPoints: ["src/background/service-worker.ts"],
  bundle: true,
  outfile: "dist/background/service-worker.js",
  platform: "browser",
  format: "esm",
  target: "es2020",
});

// ---------- Bundle Content Script ----------
await build({
  entryPoints: ["src/content/platforms/leetcode/index.ts"],
  bundle: true,
  outfile: "dist/content/platforms/leetcode/index.js",
  platform: "browser",
  format: "iife",
  target: "es2020",
});

// ---------- Bundle Popup ----------
await build({
  entryPoints: ["src/popup/popup.ts"],
  bundle: true,
  outfile: "dist/popup/popup.js",
  platform: "browser",
  format: "iife",
  target: "es2020",
});

// ---------- Copy Manifest ----------
fs.copyFileSync(
  path.join(root, "manifest.json"),
  path.join(dist, "manifest.json"),
);

// ---------- Copy Popup HTML/CSS ----------
const popupSrc = path.join(root, "src", "popup");
const popupDist = path.join(dist, "popup");

fs.mkdirSync(popupDist, { recursive: true });

for (const file of fs.readdirSync(popupSrc)) {
  if (file.endsWith(".html") || file.endsWith(".css")) {
    fs.copyFileSync(path.join(popupSrc, file), path.join(popupDist, file));
  }
}

console.log("✅ Build completed.");
