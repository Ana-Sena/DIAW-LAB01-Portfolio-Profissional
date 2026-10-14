import { readFileSync, readdirSync, mkdirSync, writeFileSync } from "node:fs";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
mkdirSync("docs/reference-notes", { recursive: true });
for (const name of readdirSync("Portfolio_Para_Codex/REFERENCIAS")) {
  if (!name.endsWith(".pdf")) continue;
  const pdf = await getDocument({
    data: new Uint8Array(
      readFileSync(`Portfolio_Para_Codex/REFERENCIAS/${name}`),
    ),
    useSystemFonts: true,
  }).promise;
  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text +=
      `\n--- Página ${i} ---\n` +
      content.items.map((x) => x.str + (x.hasEOL ? "\n" : " ")).join("");
  }
  writeFileSync(`docs/reference-notes/${name}.txt`, text);
  console.log(`${name}: ${pdf.numPages} páginas\n${text}`);
}
