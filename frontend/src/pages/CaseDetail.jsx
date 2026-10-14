import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getCase } from "../services/content";
import NotFound from "./NotFound";
import { formatPeriod } from "../services/dates";
export default function CaseDetail() {
  const { slug } = useParams();
  const data = getCase(slug);
  useEffect(() => {
    document.title = data
      ? `${data.title} | Ana Júlia`
      : "Estudo de caso | Ana Júlia";
  }, [data]);
  if (!data) return <NotFound caseMissing />;
  return (
    <main id="conteudo" className="case-page container">
      <Link
        className="back-link"
        to={slug === "experiencia-po" ? "/#experiencias" : "/#projetos"}
      >
        ← Voltar{" "}
        {slug === "experiencia-po" ? "para experiências" : "para projetos"}
      </Link>
      <article>
        <header className="case-hero">
          <div>
            <p className="eyebrow">Estudo de caso</p>
            <h1>{data.title}</h1>
            <p className="case-category">{data.category}</p>
            <p>{data.summary}</p>
            <p className="case-nature">{data.nature}</p>
            <p className="meta">
              {formatPeriod(data)}
              {data.technologies.length > 0
                ? ` · ${data.technologies.join(", ")}`
                : ""}
            </p>
            <ul className="tags">
              {data.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </div>
          <figure>
            <img
              src={data.imagePath}
              alt={`Capa ilustrativa de ${data.title}.`}
            />
            <figcaption>
              Ilustração editorial · não representa uma tela de produto.
            </figcaption>
          </figure>
        </header>
        <div className="case-body">
          <aside className="case-index" aria-label="Nesta página">
            <p className="eyebrow">Neste case</p>
            <nav>
              {data.sections.map((section, i) => (
                <a key={i} href={`#etapa-${i}`}>
                  {section.title}
                </a>
              ))}
            </nav>
          </aside>
          <div className="case-sections">
            {data.sections.map((section, i) => (
              <section id={`etapa-${i}`} key={i}>
                <p className="eyebrow">{String(i + 1).padStart(2, "0")}</p>
                <h2>{section.title}</h2>
                {section.paragraphs.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
                {section.items.length > 0 && (
                  <ul>
                    {section.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            <Link
              className="button secondary"
              to={slug === "experiencia-po" ? "/#experiencias" : "/#projetos"}
            >
              ← Voltar
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
