import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { createCanvas } from "@napi-rs/canvas";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
mkdirSync("docs/reference-notes", { recursive: true });
for (const name of [
  "FIIs_Entrevistas",
  "FIIs_Personas_Mapas",
  "FIIs_Propostas_Valor",
]) {
  const pdf = await getDocument({
    data: new Uint8Array(
      readFileSync(`Portfolio_Para_Codex/REFERENCIAS/${name}.pdf`),
    ),
    useSystemFonts: true,
  }).promise;
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i),
      viewport = page.getViewport({ scale: 1.2 });
    const canvas = createCanvas(
      Math.ceil(viewport.width),
      Math.ceil(viewport.height),
    );
    await page.render({ canvasContext: canvas.getContext("2d"), viewport })
      .promise;
    writeFileSync(
      `docs/reference-notes/${name}-${i}.png`,
      canvas.toBuffer("image/png"),
    );
  }
}
