import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "./Icon";
export const navigation = [
  ["inicio", "Início"],
  ["sobre", "Sobre Mim"],
  ["projetos", "Projetos"],
  ["experiencias", "Experiências"],
  ["contato", "Contato"],
];
export default function Header() {
  const [open, setOpen] = useState(false),
    [active, setActive] = useState("inicio");
  const location = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [location]);
  useEffect(() => {
    if (location.pathname !== "/") {
      setActive(
        location.pathname === "/cases/experiencia-po"
          ? "experiencias"
          : "projetos",
      );
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-20% 0px -55% 0px" },
    );
    navigation.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [location.pathname]);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" to="/#inicio" aria-label="Ana Júlia, início">
          Ana Júlia<span>.</span>
        </Link>
        <button
          className="menu-toggle"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
        <nav
          id="main-navigation"
          className={open ? "navigation open" : "navigation"}
          aria-label="Navegação principal"
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
        >
          {navigation.map(([id, label]) => (
            <Link
              key={id}
              className={active === id ? "active" : ""}
              to={`/#${id}`}
              aria-current={active === id ? "location" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
