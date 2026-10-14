import { useState } from "react";
import Icon from "../components/Icon";
const copy = {
  pt: {
    title: "Sobre mim",
    paragraphs: [
      "Sou estudante de Engenharia de Software e estagiária de Product Owner. Tenho interesse em unir tecnologia, pessoas e negócio para desenvolver produtos que realmente façam sentido para quem os utiliza.",
      "Gosto de entender o problema, organizar ideias, colaborar com diferentes áreas e acompanhar o desenvolvimento de funcionalidades que gerem valor. Quero continuar aprendendo e me desenvolvendo na conexão entre Produto e Engenharia de Software.",
    ],
    quote:
      "Conectar necessidades, pessoas e tecnologia para criar soluções com propósito.",
    education: "Formação",
    course: "Engenharia de Software",
    status: "Em andamento",
    interests: "Áreas de interesse",
  },
  en: {
    title: "About me",
    paragraphs: [
      "I am a Software Engineering student and a Product Owner intern. I am interested in bringing technology, people and business together to develop products that make sense for the people who use them.",
      "I enjoy understanding problems, organizing ideas, collaborating across teams and following the development of features that create value. I want to keep learning and growing at the intersection of Product and Software Engineering.",
    ],
    quote:
      "Connecting needs, people and technology to create purposeful solutions.",
    education: "Education",
    course: "Software Engineering",
    status: "In progress",
    interests: "Areas of interest",
  },
};
const interests = [
  "Product Ownership",
  "Product Discovery",
  "Metodologias Ágeis",
  "User Research",
  "Gestão de Backlog",
  "Tecnologia e Negócio",
];
export default function About() {
  const [language, setLanguage] = useState("pt");
  const t = copy[language];
  return (
    <section id="sobre" className="section section-tinted">
      <div className="container" lang={language === "pt" ? "pt-BR" : "en"}>
        <div className="section-heading">
          <div>
            <p className="eyebrow">Um pouco da minha trajetória</p>
            <h2>{t.title}</h2>
          </div>
          <div
            className="language-switch"
            role="group"
            aria-label="Idioma da apresentação"
          >
            <button
              onClick={() => setLanguage("pt")}
              aria-pressed={language === "pt"}
            >
              PT
            </button>
            <button
              onClick={() => setLanguage("en")}
              aria-pressed={language === "en"}
            >
              EN
            </button>
          </div>
        </div>
        <div className="about-grid">
          <div className="about-copy">
            {t.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <blockquote>
            <Icon name="leaf" />
            <p>“{t.quote}”</p>
          </blockquote>
        </div>
        <div className="about-details">
          <div>
            <h3 className="subheading">
              <Icon name="cap" />
              {t.education}
            </h3>
            <div className="education-card">
              <span className="icon-circle">
                <Icon name="code" />
              </span>
              <div>
                <strong>{t.course}</strong>
                <p>PUC Minas</p>
              </div>
              <span className="tag">{t.status}</span>
            </div>
          </div>
          <div>
            <h3 className="subheading">
              <Icon name="heart" />
              {t.interests}
            </h3>
            <ul className="tags interest-tags">
              {interests.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
