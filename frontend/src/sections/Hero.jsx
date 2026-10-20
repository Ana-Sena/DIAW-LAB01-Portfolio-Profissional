import { useLanguage } from "../i18n/LanguageContext";
import Icon from "../components/Icon";
const areas = [
  ["bulb", "Product", "Discovery"],
  ["list", "Gestão de", "backlog"],
  ["people", "Colaboração", "com equipes"],
  ["code", "Tecnologia", "e Produto"],
];
export default function Hero() {
  const { language, t } = useLanguage();
  return (
    <section id="inicio" className="hero section">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              {t("Product Ownership & Engenharia de Software")}
            </p>
            <h1>
              {t("Conectando")}
              <br />
              {t("pessoas, ideias")}
              <br />
              {t("e")} <em>{t("tecnologia.")}</em>
            </h1>
            <p className="hero-description">
              {t(
                "Sou estudante de Engenharia de Software e atuo como estagiária de",
              )}{" "}
              <strong>
                {language === "en" ? "Product Owner intern" : "Product Owner"}
              </strong>
              {t(
                ", participando da transformação de necessidades de negócio em soluções digitais.",
              )}
            </p>
            <div className="actions">
              <a className="button" href="#projetos">
                {t("Ver projetos")}
                <Icon name="arrow" />
              </a>
              <a className="button secondary" href="#sobre">
                {t("Sobre mim")}
              </a>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="shape shape-one" />
            <div className="shape shape-two" />
            <svg viewBox="0 0 420 460" className="art-line">
              <path d="M367 -10C180 110 370 139 222 235S75 340 124 470" />
            </svg>
            <span className="art-caption">
              {t("Pessoas.")}
              <br />
              {t("Ideias.")}
              <br />
              {t("Possibilidades.")}
            </span>
            <span className="art-spark">✳</span>
          </div>
        </div>
        <div className="focus-grid">
          {areas.map(([icon, line1, line2]) => (
            <div className="focus-item" key={icon}>
              <Icon name={icon} />
              <p>
                {t(line1)}
                <br />
                {t(line2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
