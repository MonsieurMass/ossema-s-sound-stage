import { useEffect, useMemo, useState } from "react";
import { getAvailableSocialLinks, isReleaseOut } from "@/data/ossema";

const links = [
  { href: "#sons", label: "Sons" },
  { href: "#paroles", label: "Paroles" },
  { href: "#artiste", label: "Artiste" },
  { href: "#visuels", label: "Visuels" },
  { href: "#merch", label: "Merch" },
  { href: "#cercle", label: "Cercle" },
];

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const released = isReleaseOut();
  const socials = useMemo(() => getAvailableSocialLinks(), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-vellum/85 backdrop-blur-md border-b border-border py-3" : "py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 flex justify-between items-center gap-4">
          <a href="#top" className="font-serif italic text-lg md:text-xl tracking-tighter transition-colors text-ink">
            Kymia <span className="text-signature">Music</span>
          </a>
          <div className="hidden md:flex space-x-8 caption text-ink items-center">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-signature transition-colors">
                {link.label}
              </a>
            ))}
            <a href={released ? "#plateformes" : "#presave"} className="silver-border px-4 py-2 hover:bg-ink hover:text-vellum transition-colors">
              {released ? "Ecouter" : "Pre-save"}
            </a>
          </div>

          <button
            onClick={() => setOpen((value) => !value)}
            className="md:hidden relative size-12 flex items-center justify-center"
            aria-label="Ouvrir le menu"
          >
            <span className={`absolute h-px w-6 bg-ink transition-all ${open ? "rotate-45" : "-translate-y-2"}`} />
            <span className={`absolute h-px w-6 bg-ink transition-all ${open ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute h-px w-6 bg-ink transition-all ${open ? "-rotate-45" : "translate-y-2"}`} />
          </button>
        </div>
      </nav>

      <div className={`fixed inset-0 z-[60] md:hidden transition-all duration-500 ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}>
        <div className={`absolute inset-0 bg-ink/70 backdrop-blur-md transition-opacity ${open ? "opacity-100" : "opacity-0"}`} onClick={() => setOpen(false)} />
        <div className={`absolute right-0 top-0 h-full w-full bg-midnight text-vellum px-8 py-10 flex flex-col transition-transform duration-500 ${open ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex items-center justify-between mb-12">
            <p className="font-serif-display italic text-2xl">Kymia Music</p>
            <button onClick={() => setOpen(false)} className="caption opacity-60">Fermer</button>
          </div>

          <div className="flex flex-col gap-6 mb-auto">
            {links.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-serif-display text-4xl italic tracking-tight"
                style={{ transitionDelay: `${index * 40}ms` }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-vellum/10 flex flex-wrap gap-5">
            {socials.length > 0 ? socials.map((social) => (
              <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="caption opacity-60">
                {social.name}
              </a>
            )) : <span className="caption opacity-40">Reseaux a connecter</span>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
