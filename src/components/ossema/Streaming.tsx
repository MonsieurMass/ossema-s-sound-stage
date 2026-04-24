import { ossema } from "@/data/ossema";

const Streaming = () => (
  <section className="bg-secondary/40 border-y border-border">
    <div className="max-w-6xl mx-auto">
      <div className="px-6 md:px-10 pt-16 pb-8 flex justify-between items-end">
        <p className="caption opacity-50">Écouter sur</p>
        <p className="caption opacity-30 hidden sm:block">Disponible partout</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
        {ossema.streaming.map((p) => (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-vellum p-10 md:p-14 flex flex-col items-start hover:bg-secondary transition-colors duration-500"
          >
            <span className="caption opacity-30 group-hover:opacity-100 transition-opacity">
              {p.code}
            </span>
            <span className="font-serif-display text-2xl md:text-3xl mt-4 tracking-tight">
              {p.name}
            </span>
            <span className="caption opacity-0 group-hover:opacity-50 mt-3 transition-opacity duration-500">
              Écouter ↗
            </span>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default Streaming;
