import { Link } from "react-router-dom";
import Icon from "./Icon";
import { formatPeriod } from "../services/dates";
export default function ProjectCard({ project }) {
  return (
    <li className="timeline-item">
      <div className="timeline-date">
        {project.startDate ? (
          <time dateTime={project.startDate}>{formatPeriod(project)}</time>
        ) : (
          <span>
            TODO
            <br />
            Data a confirmar
          </span>
        )}
      </div>
      <article className="project-card">
        <figure className="project-image">
          <img
            src={project.imagePath}
            alt={`Capa ilustrativa do estudo ${project.title}; não representa uma aplicação em funcionamento.`}
          />
          <figcaption>Capa ilustrativa</figcaption>
        </figure>
        <div className="project-copy">
          <p className="eyebrow">
            {project.slug === "petmatch"
              ? "Desafio de produto"
              : "Projeto acadêmico"}
          </p>
          <h3>{project.title}</h3>
          <p>{project.summary}</p>
          <ul className="tags" aria-label="Áreas de trabalho">
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          {project.technologies.length > 0 && (
            <p className="meta">
              Tecnologias: {project.technologies.join(", ")}
            </p>
          )}
        </div>
        <Link
          className="button secondary small"
          to={`/cases/${project.slug}`}
          aria-label={`Ver detalhes de ${project.title}`}
        >
          Ver detalhes <Icon name="arrow" />
        </Link>
      </article>
    </li>
  );
}
