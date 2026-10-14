import cases from "../data/cases.json";
import experiences from "../data/experiences.json";

// O conteúdo faz parte do próprio site e está disponível sem conexão com uma API.
export const projects = cases
  .filter((item) => item.slug !== "experiencia-po")
  .sort((a, b) => (a.startDate || "").localeCompare(b.startDate || ""));
export { experiences };
export const getCase = (slug) => cases.find((item) => item.slug === slug);
