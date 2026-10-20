import { useLanguage } from "../i18n/LanguageContext";
import { Link } from "react-router-dom";
import Icon from "./Icon";
import { formatPeriod } from "../services/dates";
export default function ProjectCard({ project }) {
  const { language, t } = useLanguage();
  return (
    <li className="timeline-item">
      <div className="timeline-date">
        {project.startDate ? (
          <time dateTime={project.startDate}>
            {formatPeriod(project, language)}
          </time>
        ) : (
          <span>
            TODO
            <br />
            {t("Data a confirmar")}
          </span>
        )}
      </div>
      <article className="project-card">
        <figure className="project-image">
          <img
            src={project.imagePath}
            alt={t(
              "Capa ilustrativa do estudo {0}; não representa uma aplicação em funcionamento.",
              project.title,
            )}
          />
          <figcaption>{t("Capa ilustrativa")}</figcaption>
        </figure>
        <div className="project-copy">
          <p className="eyebrow">
            {project.slug === "petmatch"
              ? t("Desafio de produto")
              : t("Projeto acadêmico")}
          </p>
          <h3>{project.title}</h3>
          <p>{project.summary}</p>
          <ul className="tags" aria-label={t("Áreas de trabalho")}>
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          {project.technologies.length > 0 && (
            <p className="meta">
              {t("Tecnologias:")} {project.technologies.join(", ")}
            </p>
          )}
        </div>
        <Link
          className="button secondary small"
          to={`/cases/${project.slug}`}
          aria-label={t("Ver detalhes de {0}", project.title)}
        >
          {t("Ver detalhes")}
          <Icon name="arrow" />
        </Link>
      </article>
    </li>
  );
}
