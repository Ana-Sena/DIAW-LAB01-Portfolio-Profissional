import Icon from "../components/Icon";
const areas = [
  ["bulb", "Product", "Discovery"],
  ["list", "Gestão de", "backlog"],
  ["people", "Colaboração", "com equipes"],
  ["code", "Tecnologia", "e Produto"],
];
export default function Hero() {
  return (
    <section id="inicio" className="hero section">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              Product Ownership & Engenharia de Software
            </p>
            <h1>
              Conectando
              <br />
              pessoas, ideias
              <br />e <em>tecnologia.</em>
            </h1>
            <p className="hero-description">
              Sou estudante de Engenharia de Software e atuo como estagiária de{" "}
              <strong>Product Owner</strong>, participando da transformação de
              necessidades de negócio em soluções digitais.
            </p>
            <div className="actions">
              <a className="button" href="#projetos">
                Ver projetos <Icon name="arrow" />
              </a>
              <a className="button secondary" href="#sobre">
                Sobre mim
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
              Pessoas.
              <br />
              Ideias.
              <br />
              Possibilidades.
            </span>
            <span className="art-spark">✳</span>
          </div>
        </div>
        <div className="focus-grid">
          {areas.map(([icon, line1, line2]) => (
            <div className="focus-item" key={icon}>
              <Icon name={icon} />
              <p>
                {line1}
                <br />
                {line2}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
