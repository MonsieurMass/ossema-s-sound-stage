import { ossema, isReleaseOut, isUrlReady } from "@/data/ossema";
import { Bookmark, ArrowRight } from "lucide-react";

const PreSave = () => {
  const released = isReleaseOut();
  const hasPreSave = isUrlReady(ossema.release.presaveUrl);

  if (released) {
    return (
      <section className="py-24 md:py-32 px-6 md:px-10 border-t border-border">
        <div className="max-w-5xl mx-auto silver-border bg-secondary/40 p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="caption opacity-50 mb-3">Campagne active</p>
            <h2 className="font-serif-display text-4xl md:text-5xl italic tracking-tighter mb-3">
              La sortie est lancee
            </h2>
            <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
              Le bloc pre-save laisse maintenant place aux plateformes d'ecoute et a la fan list.
            </p>
          </div>
          <a
            href="#plateformes"
            className="silver-border bg-ink text-vellum px-6 py-4 caption font-bold flex items-center justify-center gap-3 hover:bg-foreground/90 transition-colors"
          >
            <ArrowRight size={14} /> Voir les plateformes
          </a>
        </div>
      </section>
    );
  }

  return (
    <section id="presave" className="py-24 md:py-32 px-6 md:px-10 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <p className="caption opacity-50 mb-3">Avant la sortie</p>
            <h2 className="font-serif-display text-4xl md:text-5xl italic tracking-tighter">
              Pre-sauvegarder le titre
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
            Ajoute {ossema.release.title} a ta bibliotheque avant la sortie pour capter l'audience chaude des les premiers jours.
          </p>
        </div>

        {hasPreSave ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {ossema.streaming.slice(0, 3).map((platform) => (
              <a
                key={platform.name}
                href={ossema.release.presaveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="silver-border bg-vellum text-ink px-6 py-5 flex items-center justify-between hover:bg-ink hover:text-vellum transition-colors duration-500 group"
              >
                <span className="flex items-center gap-3">
                  <Bookmark size={16} />
                  <span className="caption font-bold">Pre-save sur</span>
                  <span className="font-serif-display italic text-xl">{platform.name}</span>
                </span>
                <span className="caption opacity-40 group-hover:opacity-100 transition-opacity">↗</span>
              </a>
            ))}
          </div>
        ) : (
          <div className="silver-border bg-secondary/40 p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="caption opacity-50 mb-3">Activation en attente</p>
              <h3 className="font-serif-display text-3xl italic tracking-tight mb-3">
                Lien de pre-save a connecter
              </h3>
              <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
                Le design est pret, mais le lien Linkfire ou Feature.fm n'est pas encore branche. En attendant, la meilleure conversion reste la fan list.
              </p>
            </div>
            <a
              href="#cercle"
              className="silver-border bg-ink text-vellum px-6 py-4 caption font-bold flex items-center justify-center gap-3 hover:bg-foreground/90 transition-colors"
            >
              <ArrowRight size={14} /> Rejoindre le cercle
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default PreSave;
