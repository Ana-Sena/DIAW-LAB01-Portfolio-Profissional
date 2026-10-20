import { useLanguage } from "../i18n/LanguageContext";
import { Link } from "react-router-dom";
import { getExperiences } from "../services/content";
import Timeline from "../components/Timeline";
import Icon from "../components/Icon";
import { formatMonth } from "../services/dates";
export default function Experiences() {
  const { language, t } = useLanguage();
  const data = getExperiences(language);
  return (
    <section id="experiencias" className="section section-tinted">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{t("Aprendendo na prática")}</p>
            <h2>{t("Experiências")}</h2>
          </div>
        </div>
        {data.length === 0 ? (
          <p className="feedback">
            {t("Nenhuma experiência disponível no momento.")}
          </p>
        ) : (
          <Timeline>
            {data.map((item, index) => (
              <li className="timeline-item" key={index}>
                <div className="timeline-date">
                  {item.startDate ? (
                    <time dateTime={item.startDate}>
                      {formatMonth(item.startDate, language)} —{" "}
                      {item.endDate
                        ? formatMonth(item.endDate, language)
                        : t("Atual")}
                    </time>
                  ) : (
                    <span>
                      TODO
                      <br />
                      {t("Período a confirmar")}
                    </span>
                  )}
                </div>
                <article className="experience-card">
                  <p className="eyebrow">Product Ownership</p>
                  <h3>{item.title}</h3>
                  <p className="meta">
                    {item.organization ||
                      t(
                        "Empresa de consultoria em marketing · TODO: confirmar instituição",
                      )}
                  </p>
                  <p>{item.description}</p>
                  <ul className="tags">
                    <li>{t("Priorização de backlog")}</li>
                    <li>{t("Histórias de usuário")}</li>
                    <li>{t("Refinamentos")}</li>
                    <li>Stakeholders</li>
                  </ul>
                  <Link className="text-link" to={`/cases/${item.caseSlug}`}>
                    {t("Ler sobre minha experiência")}
                    <Icon name="arrow" />
                  </Link>
                </article>
              </li>
            ))}
          </Timeline>
        )}
      </div>
    </section>
  );
}
