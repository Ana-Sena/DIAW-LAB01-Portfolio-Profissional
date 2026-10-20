import { useLanguage } from "../i18n/LanguageContext";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getCase } from "../services/content";
import NotFound from "./NotFound";
import { formatPeriod } from "../services/dates";
export default function CaseDetail() {
  const { language, t } = useLanguage();
  const { slug } = useParams();
  const data = getCase(slug, language);
  useEffect(() => {
    if (data) document.title = `${data.title} | Ana Júlia`;
  }, [data, language]);
  if (!data) return <NotFound caseMissing />;
  return (
    <main id="conteudo" className="case-page container">
      <Link
        className="back-link"
        to={slug === "experiencia-po" ? "/#experiencias" : "/#projetos"}
      >
        {t("← Voltar")}{" "}
        {slug === "experiencia-po"
          ? t("para experiências")
          : t("para projetos")}
      </Link>
      <article>
        <header className="case-hero">
          <div>
            <p className="eyebrow">{t("Estudo de caso")}</p>
            <h1>{data.title}</h1>
            <p className="case-category">{data.category}</p>
            <p>{data.summary}</p>
            <p className="case-nature">{data.nature}</p>
            <p className="meta">
              {formatPeriod(data, language)}
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
              alt={t("Capa ilustrativa de {0}.", data.title)}
            />
            <figcaption>
              {t("Ilustração editorial · não representa uma tela de produto.")}
            </figcaption>
          </figure>
        </header>
        <div className="case-body">
          <aside className="case-index" aria-label={t("Nesta página")}>
            <p className="eyebrow">{t("Neste case")}</p>
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
              {t("← Voltar")}
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
