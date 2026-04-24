import { useEffect, useState } from "react";

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-vellum/85 backdrop-blur-md border-b border-border py-3"
          : "py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 flex justify-between items-center gap-4">
        <a
          href="#top"
          className={`font-serif italic text-lg md:text-xl tracking-tighter transition-colors ${
            scrolled ? "text-ink" : "text-ink"
          }`}
        >
          Kymia <span className="text-signature">Music</span>
        </a>
        <div className="hidden md:flex space-x-8 caption text-ink">
          <a href="#sons" className="hover:text-signature transition-colors">Sons</a>
          <a href="#paroles" className="hover:text-signature transition-colors">Paroles</a>
          <a href="#artiste" className="hover:text-signature transition-colors">Artiste</a>
          <a href="#visuels" className="hover:text-signature transition-colors">Visuels</a>
          <a href="#cercle" className="hover:text-signature transition-colors">Cercle</a>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
