import { Link } from "react-router-dom";
import { ossema, getAvailableSocialLinks } from "@/data/ossema";

const Footer = () => {
  const socials = getAvailableSocialLinks();

  return (
    <footer className="border-t border-border py-10 px-6 md:px-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="caption opacity-40">
          © {new Date().getFullYear()} {ossema.label}. Tous droits reserves.
        </p>

        <div className="flex gap-8 items-center">
          {socials.length > 0 ? (
            socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="caption opacity-50 hover:opacity-100 transition-opacity"
              >
                {social.name}
              </a>
            ))
          ) : (
            <span className="caption opacity-30">Reseaux a connecter</span>
          )}
        </div>

        <div className="flex gap-6">
          <Link to="/mentions-legales" className="caption opacity-40 hover:opacity-100 transition-opacity">
            Mentions legales
          </Link>
          <Link to="/confidentialite" className="caption opacity-40 hover:opacity-100 transition-opacity">
            Confidentialite
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
