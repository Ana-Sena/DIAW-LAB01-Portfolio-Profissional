import { useLanguage } from "../i18n/LanguageContext";

export default function LanguageSwitch() {
  const { language, setLanguage, t } = useLanguage();
  return (
    <div
      className="language-switch"
      role="group"
      aria-label={t("Idioma do site")}
    >
      <button
        lang="pt-BR"
        onClick={() => setLanguage("pt")}
        aria-pressed={language === "pt"}
      >
        PT
      </button>
      <button
        lang="en"
        onClick={() => setLanguage("en")}
        aria-pressed={language === "en"}
      >
        EN
      </button>
    </div>
  );
}
