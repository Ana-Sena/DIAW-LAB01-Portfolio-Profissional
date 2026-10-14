import { projects as data } from "../services/content";
import ProjectCard from "../components/ProjectCard";
import Timeline from "../components/Timeline";
export default function Projects() {
  return (
    <section id="projetos" className="section">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Da descoberta às decisões</p>
            <h2>Projetos</h2>
          </div>
          <span className="section-aside">
            Processos, escolhas e aprendizados
          </span>
        </div>
        <p className="section-intro">
          Uma seleção de trabalhos que refletem meu interesse por pessoas,
          problemas e construção de produtos.
        </p>
        {data.length === 0 ? (
          <p className="feedback">Nenhum projeto disponível no momento.</p>
        ) : (
          <>
            <p className="meta timeline-note">
              Do primeiro case aos projetos em andamento.
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
