const Nav = () => (
  <nav className="fixed top-0 inset-x-0 z-50 mix-blend-difference px-6 md:px-10 py-6 flex justify-between items-end">
    <a href="#top" className="text-vellum font-serif italic text-xl md:text-2xl tracking-tighter">
      Kymia Music
    </a>
    <div className="hidden sm:flex space-x-6 md:space-x-10 text-vellum caption">
      <a href="#sons" className="hover:opacity-60 transition-opacity">Sons</a>
      <a href="#paroles" className="hover:opacity-60 transition-opacity">Paroles</a>
      <a href="#visuels" className="hover:opacity-60 transition-opacity">Visuels</a>
      <a href="#cercle" className="hover:opacity-60 transition-opacity">Cercle</a>
    </div>
  </nav>
);

export default Nav;
