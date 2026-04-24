import { ossema } from "@/data/ossema";

const Artist = () => {
  return (
    <section
      id="artiste"
      className="relative py-24 md:py-32 px-6 md:px-10 overflow-hidden"
      style={{ background: "var(--gradient-night)" }}
    >
      {/* lueur rouge nocturne */}
      <div
        className="absolute inset-x-0 top-0 h-[60%] pointer-events-none"
        style={{ background: "var(--gradient-blood)" }}
      />

      <div className="relative max-w-6xl mx-auto grid grid-cols-12 gap-8 md:gap-12 items-center text-vellum">
        <div className="col-span-12 md:col-span-5">
          <div className="aspect-[4/5] overflow-hidden silver-border">
            <img
              src={ossema.release.portrait}
              alt={`${ossema.artist}, l'artiste`}
              className="w-full h-full object-cover grayscale contrast-110"
              loading="lazy"
            />
          </div>
        </div>

        <div className="col-span-12 md:col-span-7">
          <p className="caption opacity-60 mb-5 text-signature-glow">
            L'artiste · {ossema.label}
          </p>
          <h2 className="font-serif-display text-5xl md:text-7xl leading-[0.9] tracking-tighter mb-8">
            Béni <em className="text-signature-glow not-italic">·</em> maudit
          </h2>
          <div className="space-y-5 text-base md:text-lg leading-relaxed opacity-80 max-w-prose">
            <p>
              Ossema écrit la nuit, là où la rue rencontre le sacré. Voix grave, plume au scalpel,
              il dessine un rap français contemporain qui refuse l'esquive : la foi, la perte,
              la trique et la prière dans le même souffle.
            </p>
            <p>
              <em className="font-serif-display">La Nuit</em> est le premier morceau du projet
              <em className="font-serif-display"> Noir Vif</em>, coupé brut, mixé chaud,
              pensé pour le casque et les phares allumés.
            </p>
          </div>

          <dl className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5 max-w-2xl border-t border-vellum/15 pt-8">
            {[
              { label: "Écrit par",  value: "Ossema" },
              { label: "Production", value: "Kymia Lab" },
              { label: "Mix / Master", value: "Studio Onyx" },
              { label: "Label",      value: ossema.label },
            ].map((c) => (
              <div key={c.label}>
                <dt className="caption opacity-50 mb-1.5">{c.label}</dt>
                <dd className="font-serif-display italic text-lg">{c.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default Artist;
