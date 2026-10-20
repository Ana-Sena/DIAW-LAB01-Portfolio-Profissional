import cases from "../data/cases.json";
import experiences from "../data/experiences.json";
import englishCases from "../data/cases.en.json";
import englishExperiences from "../data/experiences.en.json";

// O conteúdo faz parte do próprio site e está disponível sem conexão com uma API.
const localizedCases = cases.map((item) => ({
  ...item,
  ...englishCases.find((translation) => translation.slug === item.slug),
  imagePath: item.imagePath.replace(".svg", ".en.svg"),
}));
const localizedExperiences = experiences.map((item) => ({
  ...item,
  ...englishExperiences.find(
    (translation) => translation.caseSlug === item.caseSlug,
  ),
}));

export const getProjects = (language = "pt") =>
  (language === "en" ? localizedCases : cases)
    .filter((item) => item.slug !== "experiencia-po")
    .sort((a, b) => (a.startDate || "").localeCompare(b.startDate || ""));
export const getExperiences = (language = "pt") =>
  language === "en" ? localizedExperiences : experiences;
export const getCase = (slug, language = "pt") =>
  (language === "en" ? localizedCases : cases).find(
    (item) => item.slug === slug,
  );
