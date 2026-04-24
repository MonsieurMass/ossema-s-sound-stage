import { ossema } from "@/data/ossema";

const Timeline = () => (
  <section data-animate="fade-up" className="mt-24 md:mt-28">
    <div className="flex items-end justify-between gap-6 mb-10 md:mb-14">
      <div>
        <p className="caption text-signature-glow mb-3">Chronologie</p>
        <h3 className="font-serif-display text-3xl md:text-5xl italic tracking-tight text-vellum">
          Ligne de vie artistique
        </h3>
      </div>
      <p className="caption opacity-40 hidden md:block text-vellum">De Soleil Triste a Noir Vif</p>
    </div>

    <div className="relative">
      <div className="timeline-spine" aria-hidden="true" />
      <div className="space-y-10 md:space-y-14">
        {ossema.timeline.map((item, index) => {
          const rightSide = index % 2 === 1;
          return (
            <article key={item.title} className={`relative md:grid md:grid-cols-2 md:gap-12 ${rightSide ? "" : ""}`}>
              <div className={`${rightSide ? "md:col-start-2" : "md:col-start-1"} relative`}>
                <div className="timeline-card bg-vellum/5 border border-vellum/10 p-6 md:p-7 backdrop-blur-sm">
                  <p className="caption text-signature-glow mb-3">{item.date}</p>
                  <h4 className="font-serif-display text-2xl md:text-3xl italic mb-3 text-vellum">{item.title}</h4>
                  <p className="text-sm md:text-base text-vellum/75 leading-relaxed">{item.description}</p>
                </div>
                <span
                  className={`timeline-dot ${item.type !== "release" ? "is-hollow" : ""}`}
                  aria-hidden="true"
                />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

export default Timeline;
