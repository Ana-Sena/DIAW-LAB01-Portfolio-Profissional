// Rasteriza apenas as três capas próprias para o Figma, preservando o site em SVG.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { createCanvas, loadImage } from "@napi-rs/canvas";
mkdirSync("docs/figma-assets", { recursive: true });
for (const slug of ["petmatch", "fiis", "experiencia-po"]) {
  const canvas = createCanvas(1200, 960);
  const cover = await loadImage(
    readFileSync(`frontend/public/images/${slug}.svg`),
  );
  canvas.getContext("2d").drawImage(cover, 0, 0, 1200, 960);
  writeFileSync(`docs/figma-assets/${slug}.png`, canvas.toBuffer("image/png"));
}
