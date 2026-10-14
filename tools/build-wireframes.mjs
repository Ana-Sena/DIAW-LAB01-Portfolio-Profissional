import { writeFileSync } from "node:fs";
const escape = (value) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;");
let svg =
  '<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1800" viewBox="0 0 1600 1800"><rect width="1600" height="1800" fill="#eae6ed"/>';
const rect = (x, y, w, h, fill = "#FAF8FB") => {
  svg += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${fill}" stroke="#D5B5CF"/>`;
};
const text = (x, y, label, size = 16, serif = false) => {
  svg += `<text x="${x}" y="${y}" font-family="${serif ? "Georgia" : "Arial"},serif" font-size="${size}" fill="#302A38">${escape(label)}</text>`;
};
const lines = (x, y, w, count) => {
  for (let i = 0; i < count; i++)
    svg += `<rect x="${x}" y="${y + i * 15}" width="${w - (i === count - 1 ? 40 : 0)}" height="5" rx="2" fill="#cfc6d3"/>`;
};
text(40, 45, "PORTFÓLIO ANA JÚLIA · WIREFRAMES DE MÉDIA FIDELIDADE", 20);
text(
  40,
  75,
  "Rosa Névoa · Textos e formas editáveis · Dados pendentes não são inventados",
  14,
);
rect(40, 120, 830, 1590);
text(65, 155, "HOME · DESKTOP", 15);
rect(65, 175, 780, 55);
text(85, 209, "Ana Júlia.", 24, true);
text(445, 207, "Início   Sobre Mim   Projetos   Experiências   Contato", 13);
text(90, 280, "PRODUCT OWNERSHIP & ENGENHARIA DE SOFTWARE", 12);
text(90, 330, "Conectando pessoas,", 37, true);
text(90, 377, "ideias e tecnologia.", 37, true);
lines(90, 409, 370, 4);
rect(90, 486, 155, 40, "#D5B5CF");
text(115, 511, "Ver projetos →", 14);
rect(260, 486, 120, 40);
text(280, 511, "Sobre mim", 14);
rect(540, 265, 270, 270, "#F0E7F0");
text(574, 393, "Formas abstratas", 20, true);
text(595, 420, "Sem fotografia", 13);
for (let i = 0; i < 4; i++) {
  rect(90 + i * 181, 560, 165, 90, "#F0E7F0");
  text(
    110 + i * 181,
    600,
    ["Discovery", "Backlog", "Colaboração", "Tecnologia"][i],
    16,
  );
}
rect(65, 680, 780, 250, "#F0E7F0");
text(90, 722, "Sobre mim", 29, true);
text(730, 719, "PT | EN", 14);
lines(90, 755, 430, 5);
rect(570, 747, 245, 110);
text(590, 784, "Citação sobre propósito", 16, true);
text(90, 885, "Formação · Engenharia de Software     Áreas de interesse", 15);
text(90, 983, "Projetos", 29, true);
text(90, 1010, "Jan./2026 (aprox.) · Set./2026 — em andamento", 12);
for (let i = 0; i < 2; i++) {
  rect(120, 1030 + i * 135, 695, 115);
  rect(140, 1048 + i * 135, 115, 77, "#F0E7F0");
  text(152, 1090 + i * 135, "Ilustração", 13);
  text(
    275,
    1064 + i * 135,
    ["PetMatch", "Laje — Plataforma de FIIs"][i],
    20,
    true,
  );
  lines(275, 1080 + i * 135, 320, 2);
  text(275, 1120 + i * 135, "Áreas de trabalho", 12);
  text(680, 1064 + i * 135, "Ver detalhes →", 13);
}
text(90, 1355, "Experiências", 29, true);
rect(120, 1380, 695, 125, "#F0E7F0");
text(145, 1415, "Estagiária de Product Owner", 21, true);
text(145, 1442, "dti digital · Março/2026 — Atual", 13);
lines(145, 1465, 480, 2);
text(90, 1560, "Contato", 29, true);
text(90, 1591, "Links confirmados", 15);
rect(420, 1530, 395, 110, "#F0E7F0");
text(445, 1560, "Contato direto por e-mail", 16);
text(445, 1608, "Escrever um e-mail →", 15);
text(420, 1675, String(new Date().getFullYear()), 16, true);
rect(920, 120, 300, 1000);
text(940, 155, "HOME · MOBILE", 15);
rect(940, 175, 260, 45);
text(955, 205, "Ana Júlia.", 21, true);
text(1160, 203, "☰", 20);
text(940, 264, "Conectando pessoas,", 24, true);
text(940, 297, "ideias e tecnologia.", 24, true);
lines(940, 320, 240, 4);
rect(940, 390, 260, 80, "#F0E7F0");
text(970, 433, "Formas abstratas", 18, true);
for (let i = 0; i < 4; i++) {
  rect(940 + (i % 2) * 135, 490 + Math.floor(i / 2) * 65, 125, 55, "#F0E7F0");
  text(
    949 + (i % 2) * 135,
    523 + Math.floor(i / 2) * 65,
    ["Discovery", "Backlog", "Colaboração", "Tecnologia"][i],
    12,
  );
}
for (const [i, label] of [
  "Sobre mim · PT / EN",
  "Projetos · timeline",
  "Experiências",
  "Contato · E-mail",
].entries()) {
  rect(940, 640 + i * 105, 260, 88);
  text(957, 668 + i * 105, label, 18, true);
  lines(957, 685 + i * 105, 225, 2);
}
text(940, 1095, "Menu acessível · Conteúdo empilhado", 12);
rect(920, 1170, 640, 540);
text(940, 1205, "CASE · ESTRUTURA REUTILIZÁVEL", 15);
text(945, 1245, "← Voltar para projetos / experiências", 14);
text(945, 1300, "Título do case", 35, true);
text(945, 1330, "Categoria · Natureza · Período confirmado", 14);
lines(945, 1350, 350, 3);
rect(1350, 1250, 185, 160, "#F0E7F0");
text(1366, 1330, "Capa ilustrativa", 18, true);
rect(945, 1440, 160, 210, "#F0E7F0");
text(960, 1467, "Neste case", 16);
text(960, 1505, "Contexto", 14);
text(960, 1535, "Desafio", 14);
text(960, 1565, "Processo", 14);
text(960, 1595, "Aprendizados", 14);
text(1130, 1468, "Contexto / Desafio / Processo", 20, true);
lines(1130, 1490, 390, 5);
text(1130, 1595, "Decisões e aprendizados", 20, true);
lines(1130, 1615, 390, 3);
text(
  40,
  1760,
  "Rosa Névoa · Relatos e informações confirmados pela autora · Materiais de referência não publicados.",
  15,
);
svg += "</svg>";
writeFileSync("docs/wireframes.svg", svg);
