import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import english from "./en.json";

const LanguageContext = createContext(null);
const storageKey = "portfolio-language";

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try {
      return localStorage.getItem(storageKey) === "en" ? "en" : "pt";
    } catch {
      return "pt";
    }
  });

  useEffect(() => {
    document.documentElement.lang = language === "en" ? "en" : "pt-BR";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        language === "en"
          ? "Ana Júlia's portfolio: Software Engineering, Product Ownership, research and digital solutions."
          : "Portfólio de Ana Júlia: Engenharia de Software, Product Ownership, pesquisa e construção de soluções digitais.",
      );
    try {
      localStorage.setItem(storageKey, language);
    } catch {
      // A tradução continua funcionando quando o armazenamento está bloqueado.
    }
  }, [language]);

  const t = useCallback(
    (text, ...values) => {
      const translated = language === "en" ? (english[text] ?? text) : text;
      return translated.replace(
        /\{(\d+)\}/g,
        (_, index) => values[index] ?? "",
      );
    },
    [language],
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
