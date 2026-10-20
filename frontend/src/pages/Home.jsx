import { useLanguage } from "../i18n/LanguageContext";
import { useEffect } from "react";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Projects from "../sections/Projects";
import Experiences from "../sections/Experiences";
import Contact from "../sections/Contact";
export default function Home() {
  const { t } = useLanguage();
  useEffect(() => {
    document.title = t("Ana Júlia | Produto & Tecnologia");
  }, [t]);
  return (
    <main id="conteudo">
      <Hero />
      <About />
      <Projects />
      <Experiences />
      <Contact />
    </main>
  );
}
