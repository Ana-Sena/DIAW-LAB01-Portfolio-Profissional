import { useEffect } from "react";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Projects from "../sections/Projects";
import Experiences from "../sections/Experiences";
import Contact from "../sections/Contact";
export default function Home() {
  useEffect(() => {
    document.title = "Ana Júlia | Produto & Tecnologia";
  }, []);
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
