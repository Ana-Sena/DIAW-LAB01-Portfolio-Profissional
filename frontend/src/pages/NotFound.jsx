import { useLanguage } from "../i18n/LanguageContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";
export default function NotFound({ caseMissing = false }) {
  const { t } = useLanguage();
  useEffect(() => {
    document.title = `${t("404 · Página não encontrada")} | Ana Júlia`;
  }, [t]);
  return (
    <main id="conteudo" className="container not-found">
      <p className="eyebrow">{t("404 · Página não encontrada")}</p>
      <h1>
        {caseMissing
          ? t("Este case não foi encontrado.")
          : t("Parece que este caminho ainda não existe.")}
      </h1>
      <p>{t("Você pode voltar ao início e conhecer meus projetos.")}</p>
      <Link className="button" to="/#inicio">
        {t("Voltar ao início")}
        <span aria-hidden="true">→</span>
      </Link>
    </main>
  );
}
