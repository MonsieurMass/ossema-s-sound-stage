import { ossema } from "@/data/ossema";

const Footer = () => (
  <footer className="border-t border-border py-10 px-6 md:px-10">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
      <p className="caption opacity-40">
        © {new Date().getFullYear()} {ossema.label}. Tous droits réservés.
      </p>
      <div className="flex gap-8">
        {ossema.social.map((s) => (
          <a
            key={s.name}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="caption opacity-50 hover:opacity-100 transition-opacity"
          >
            {s.name}
          </a>
        ))}
      </div>
      <p className="caption opacity-40">Mentions légales</p>
    </div>
  </footer>
);

export default Footer;
