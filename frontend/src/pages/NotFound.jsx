import { Link } from "react-router-dom";
export default function NotFound({ caseMissing = false }) {
  return (
    <main id="conteudo" className="container not-found">
      <p className="eyebrow">404 · Página não encontrada</p>
      <h1>
        {caseMissing
          ? "Este case não foi encontrado."
          : "Parece que este caminho ainda não existe."}
      </h1>
      <p>Você pode voltar ao início e conhecer meus projetos.</p>
      <Link className="button" to="/#inicio">
        Voltar ao início <span aria-hidden="true">→</span>
      </Link>
    </main>
  );
}
