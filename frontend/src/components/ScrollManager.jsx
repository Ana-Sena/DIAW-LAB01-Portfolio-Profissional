import { useEffect } from "react";
import { useLocation } from "react-router-dom";
export default function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
      else window.scrollTo(0, 0);
    });
    return () => cancelAnimationFrame(id);
  }, [pathname, hash]);
  return null;
}
