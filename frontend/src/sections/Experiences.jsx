import { Link } from "react-router-dom";
import { experiences as data } from "../services/content";
import Timeline from "../components/Timeline";
import Icon from "../components/Icon";
import { formatMonth } from "../services/dates";
export default function Experiences() {
  return (
    <section id="experiencias" className="section section-tinted">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Aprendendo na prática</p>
            <h2>Experiências</h2>
          </div>
        </div>
        {data.length === 0 ? (
          <p className="feedback">Nenhuma experiência disponível no momento.</p>
        ) : (
          <Timeline>
            {data.map((item, index) => (
              <li className="timeline-item" key={index}>
                <div className="timeline-date">
                  {item.startDate ? (
                    <time dateTime={item.startDate}>
                      {formatMonth(item.startDate)} —{" "}
                      {item.endDate ? formatMonth(item.endDate) : "Atual"}
                    </time>
                  ) : (
                    <span>
                      TODO
                      <br />
                      Período a confirmar
                    </span>
                  )}
                </div>
                <article className="experience-card">
                  <p className="eyebrow">Product Ownership</p>
                  <h3>{item.title}</h3>
                  <p className="meta">
                    {item.organization ||
                      "Empresa de consultoria em marketing · TODO: confirmar instituição"}
                  </p>
                  <p>{item.description}</p>
                  <ul className="tags">
                    <li>Priorização de backlog</li>
                    <li>Histórias de usuário</li>
                    <li>Refinamentos</li>
                    <li>Stakeholders</li>
                  </ul>
                  <Link className="text-link" to={`/cases/${item.caseSlug}`}>
                    Ler sobre minha experiência <Icon name="arrow" />
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
