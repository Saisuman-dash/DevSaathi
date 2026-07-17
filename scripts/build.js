import fs from "fs";
import path from "path";

const root = process.cwd();
const dist = path.join(root, "dist");

// ---------- Copy manifest ----------
fs.copyFileSync(
  path.join(root, "manifest.json"),
  path.join(dist, "manifest.json"),
);

// ---------- Copy popup ----------
const popupSrc = path.join(root, "src", "popup");
const popupDist = path.join(dist, "popup");

fs.mkdirSync(popupDist, { recursive: true });

for (const file of fs.readdirSync(popupSrc)) {
  if (file.endsWith(".html") || file.endsWith(".css")) {
    fs.copyFileSync(path.join(popupSrc, file), path.join(popupDist, file));
  }
}

console.log("✅ Build completed.");
