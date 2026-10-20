import { useLanguage } from "../i18n/LanguageContext";
import { getProjects } from "../services/content";
import ProjectCard from "../components/ProjectCard";
import Timeline from "../components/Timeline";
export default function Projects() {
  const { language, t } = useLanguage();
  const data = getProjects(language);
  return (
    <section id="projetos" className="section">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{t("Da descoberta às decisões")}</p>
            <h2>{t("Projetos")}</h2>
          </div>
          <span className="section-aside">
            {t("Processos, escolhas e aprendizados")}
          </span>
        </div>
        <p className="section-intro">
          {t(
            "Uma seleção de trabalhos que refletem meu interesse por pessoas, problemas e construção de produtos.",
          )}
        </p>
        {data.length === 0 ? (
          <p className="feedback">
            {t("Nenhum projeto disponível no momento.")}
          </p>
        ) : (
          <>
            <p className="meta timeline-note">
              {t("Do primeiro case aos projetos em andamento.")}
            </p>
            <Timeline>
              {data.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </Timeline>
          </>
        )}
      </div>
    </section>
  );
}
