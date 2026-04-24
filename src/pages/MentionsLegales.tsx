import { Link } from "react-router-dom";
import PageSeo from "@/components/seo/PageSeo";
import { ossema } from "@/data/ossema";

const MentionsLegales = () => (
  <main className="min-h-screen bg-vellum text-ink">
    <PageSeo
      title={`Mentions legales | ${ossema.artist}`}
      description={`Mentions legales du site de campagne de ${ossema.artist}.`}
      image="/og-image.svg"
      url={ossema.site.url ? `${ossema.site.url}/mentions-legales` : undefined}
    />

    <section className="px-6 md:px-10 py-16 border-b border-border">
      <div className="max-w-4xl mx-auto flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="caption opacity-50 mb-3">Cadre legal</p>
          <h1 className="font-serif-display text-4xl md:text-6xl italic tracking-tighter">
            Mentions legales
          </h1>
        </div>
        <Link to="/" className="caption hover:text-signature transition-colors">
          Retour a l'accueil
        </Link>
      </div>
    </section>

    <section className="px-6 md:px-10 py-16 md:py-20">
      <div className="max-w-4xl mx-auto space-y-10 text-sm md:text-base leading-relaxed">
        <div>
          <h2 className="font-serif-display text-2xl italic mb-4">Editeur</h2>
          <p>{ossema.label}</p>
          <p className="text-muted-foreground mt-3">Adresse a completer: {ossema.legal.postalAddress}</p>
        </div>

        <div>
          <h2 className="font-serif-display text-2xl italic mb-4">Direction de publication</h2>
          <p>Publication assuree par l'equipe {ossema.label}.</p>
        </div>

        <div>
          <h2 className="font-serif-display text-2xl italic mb-4">Hebergement</h2>
          <p>{ossema.legal.hostName}</p>
          <p className="text-muted-foreground mt-3">Coordonnees a completer: {ossema.legal.hostAddress}</p>
        </div>

        <div>
          <h2 className="font-serif-display text-2xl italic mb-4">Propriete intellectuelle</h2>
          <p>
            Les contenus editoriaux, visuels, audio, paroles et elements graphiques presentes sur ce site restent
            proteges par le droit d'auteur et les droits voisins. Toute reproduction, representation ou exploitation
            sans autorisation ecrite prealable est interdite.
          </p>
        </div>

        <div>
          <h2 className="font-serif-display text-2xl italic mb-4">Mise a jour requise</h2>
          <p>
            Avant mise en ligne publique, complete les champs d'adresse editeur et hebergeur pour disposer de mentions
            legales definitives et exploitables.
          </p>
        </div>
      </div>
    </section>
  </main>
);

export default MentionsLegales;
