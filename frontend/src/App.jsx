import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollManager from "./components/ScrollManager";
import Home from "./pages/Home";
import CaseDetail from "./pages/CaseDetail";
import NotFound from "./pages/NotFound";
import "./styles/global.css";
import "./styles/layout.css";
export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cases/:slug" element={<CaseDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
