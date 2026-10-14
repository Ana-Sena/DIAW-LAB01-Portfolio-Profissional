// Importação editorial local. Os dados são incorporados ao frontend durante o build.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
const text = readFileSync("Portfolio_Para_Codex/CASES_PORTFOLIO.md", "utf8");
const metadata = [
  {
    slug: "petmatch",
    title: "PetMatch",
    category: "Produto · Desafio de recrutamento · Product Ownership",
    nature:
      "Case exploratório de processo seletivo para demonstrar habilidades de Product Ownership. Não houve desenvolvimento de aplicativo.",
    startDate: "2026-01",
    endDate: "2026-01",
    approximateDate: true,
    ongoing: false,
    summary:
      "Facilitando a adoção responsável: priorização de funcionalidades, histórias de usuário e critérios de aceitação.",
    tags: ["Produto", "Backlog", "User Stories"],
    materials: [],
  },
  {
    slug: "fiis",
    title: "Laje — Plataforma de FIIs",
    category:
      "Projeto acadêmico · Product Discovery · UX Research · Requisitos",
    nature:
      "Projeto acadêmico em andamento, iniciado em setembro de 2026. Discovery concluído; implementação ainda não iniciada.",
    startDate: "2026-09",
    endDate: null,
    approximateDate: false,
    ongoing: true,
    summary:
      "Da pesquisa à definição de soluções para investidores: o Laje concluiu a fase de Discovery e se prepara para iniciar a implementação.",
    tags: ["Pesquisa", "UX", "Requisitos"],
    materials: [],
  },
  {
    slug: "experiencia-po",
    title: "Atuação como Product Owner na dti digital",
    category:
      "Experiência profissional · Product Ownership · Metodologias Ágeis",
    nature:
      "Experiência profissional de estágio, descrita sem informações confidenciais.",
    startDate: "2026-03",
    endDate: null,
    approximateDate: false,
    ongoing: true,
    summary:
      "Conectando negócio, usuários e tecnologia em uma aplicação voltada à consultoria de marketing.",
    tags: ["Product Ownership", "Colaboração", "Agilidade"],
    materials: [],
  },
];
const clean = (value) =>
  value.replace(/\*\*/g, "").replace(/\*([^*]+)\*/g, "$1");
const blocks = text.split(/^# Case \d[^\n]*\n/gm).slice(1);
const cases = metadata.map((meta, i) => {
  const sections = blocks[i]
    .split(/^## /gm)
    .slice(1)
    .map((block) => {
      const [title, ...lines] = block.split("\n");
      const content = lines.join("\n").split(/\n---/)[0].trim();
      return {
        title: clean(title),
        paragraphs: content
          .split(/\n\s*\n/)
          .filter((p) => p.trim() && !p.trim().startsWith("- "))
          .map(clean),
        items: lines
          .filter((l) => l.startsWith("- "))
          .map((l) => clean(l.slice(2))),
      };
    })
    .filter((s) => !["Sugestões visuais", "Pendente"].includes(s.title));
  return {
    ...meta,
    technologies: [],
    imagePath: `/images/${meta.slug}.svg`,
    sections,
  };
});
cases[1].sections.unshift({
  title: "Momento do projeto",
  paragraphs: [
    "O Laje é um projeto acadêmico sobre Fundos Imobiliários, iniciado em setembro de 2026 e ainda em andamento. A fase de Discovery foi concluída e o projeto vai começar a ser trabalhado na implementação. O case apresenta o processo de pesquisa e definição de requisitos realizado até aqui; nenhuma funcionalidade foi desenvolvida.",
  ],
  items: [],
});
cases[2].sections.find(
  (section) => section.title === "Contexto",
).paragraphs[0] =
  "Desde março de 2026, atuo como estagiária de Product Owner na dti digital, em uma aplicação voltada à consultoria de marketing, cujo objetivo é auxiliar empresas na tomada de decisões relacionadas aos seus investimentos em publicidade. Continuo nessa atuação atualmente.";
mkdirSync("frontend/src/data", { recursive: true });
writeFileSync(
  "frontend/src/data/cases.json",
  JSON.stringify(cases, null, 2) + "\n",
);
