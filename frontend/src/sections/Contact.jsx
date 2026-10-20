import { useLanguage } from "../i18n/LanguageContext";
import Icon from "../components/Icon";
import { profile } from "../data/profile";
const links = [
  ["mail", "E-mail", `mailto:${profile.email}`],
  ["linkedin", "LinkedIn", profile.linkedin],
  ["github", "GitHub", profile.github],
];
export default function Contact() {
  const { t } = useLanguage();
  return (
    <section id="contato" className="section contact-section">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              {t("Toda boa ideia começa com uma conversa")}
            </p>
            <h2>{t("Contato")}</h2>
          </div>
        </div>
        <div className="contact-grid">
          <div className="contact-copy">
            <h3>{t("Vamos conversar?")}</h3>
            <p>
              {t(
                "Estou aberta a novas oportunidades, trocas de ideias e conversas sobre produto, tecnologia e pessoas.",
              )}
            </p>
            <div className="contact-flower" aria-hidden="true">
              <Icon name="leaf" />
            </div>
            <ul className="contact-links">
              {links.map(([icon, label, url]) => (
                <li key={t(label)}>
                  <a
                    href={url}
                    {...(icon !== "mail"
                      ? {
                          target: "_blank",
                          rel: "noopener noreferrer",
                        }
                      : {})}
                  >
                    <Icon name={icon} />
                    {t(label)}
                    <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="contact-panel">
            <span className="icon-circle">
              <Icon name="mail" />
            </span>
            <h3>{t("Uma mensagem, muitas possibilidades.")}</h3>
            <p>
              {t(
                "Tem uma oportunidade, uma ideia ou quer trocar experiências? Vou gostar de ouvir você.",
              )}
            </p>
            <a className="contact-address" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <a className="button" href={`mailto:${profile.email}`}>
              {t("Escrever um e-mail")}
              <Icon name="arrow" />
            </a>
            <p className="form-note">
              {t(
                "O botão abre seu aplicativo de e-mail para você escrever e enviar a mensagem.",
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
