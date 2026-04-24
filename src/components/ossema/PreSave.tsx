import { ossema } from "@/data/ossema";
import { Bookmark } from "lucide-react";

/**
 * Pre-save CTA section: dedicated block above the streaming grid
 * with one button per platform that the label can wire to real
 * Linkfire / Feature.fm pre-save links.
 */
const PreSave = () => (
  <section className="py-24 md:py-32 px-6 md:px-10 border-t border-border">
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div>
          <p className="caption opacity-50 mb-3">Avant la sortie</p>
          <h2 className="font-serif-display text-4xl md:text-5xl italic tracking-tighter">
            Pré-sauvegarder le titre
          </h2>
        </div>
        <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
          Ajoutez {ossema.release.title} à votre bibliothèque en un clic.
          Le morceau apparaîtra automatiquement le jour de la sortie.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        {ossema.streaming.slice(0, 3).map((p) => (
          <a
            key={p.name}
            href={ossema.release.presaveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="silver-border bg-vellum text-ink px-6 py-5 flex items-center justify-between hover:bg-ink hover:text-vellum transition-colors duration-500 group"
          >
            <span className="flex items-center gap-3">
              <Bookmark size={16} />
              <span className="caption font-bold">Pré-save sur</span>
              <span className="font-serif-display italic text-xl">{p.name}</span>
            </span>
            <span className="caption opacity-40 group-hover:opacity-100 transition-opacity">
              ↗
            </span>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default PreSave;
