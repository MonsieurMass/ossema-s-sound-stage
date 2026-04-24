import { ossema } from "@/data/ossema";
import { ArrowUpRight } from "lucide-react";

// Logos SVG inline officiels (formes simplifiées, monochromes pour s'adapter au design)
const Logos: Record<string, JSX.Element> = {
  Spotify: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.5 17.32a.75.75 0 0 1-1.03.25c-2.82-1.72-6.36-2.11-10.54-1.16a.75.75 0 1 1-.33-1.46c4.57-1.04 8.5-.59 11.66 1.34.35.22.46.7.24 1.03zm1.47-3.27a.94.94 0 0 1-1.29.31c-3.23-1.99-8.16-2.56-11.98-1.4a.94.94 0 0 1-.55-1.8c4.38-1.33 9.82-.69 13.53 1.6.44.27.59.86.29 1.29zm.13-3.4C15.42 8.4 8.84 8.16 5.27 9.24a1.13 1.13 0 0 1-.66-2.16c4.1-1.24 11.36-.95 15.84 1.71a1.13 1.13 0 0 1-1.16 1.94z" />
    </svg>
  ),
  "Apple Music": (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23.999 6.948c0-2.547-2.057-4.612-4.594-4.612H4.595C2.058 2.336 0 4.401 0 6.948v10.104c0 2.547 2.058 4.612 4.595 4.612h14.81c2.537 0 4.594-2.065 4.594-4.612V6.948zm-7.054 1.66v6.816c0 .87-.27 1.55-.81 2.04-.54.49-1.21.74-2.01.74-.74 0-1.36-.21-1.85-.62-.49-.41-.74-.93-.74-1.55 0-.66.27-1.18.81-1.55.54-.37 1.31-.59 2.32-.66l1.49-.11v-1.18l-3.92.62v6.16c0 .87-.27 1.55-.81 2.04-.54.49-1.22.74-2.04.74-.74 0-1.36-.21-1.85-.62-.49-.41-.74-.93-.74-1.55 0-.66.27-1.18.81-1.55.54-.37 1.31-.59 2.32-.66l1.49-.11v-7.13l7.53-1.18z" />
    </svg>
  ),
  Deezer: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.81 4.16h5.18v3.02h-5.18zM18.81 8.42h5.18v3.02h-5.18zM12.41 8.42h5.18v3.02h-5.18zM18.81 12.69h5.18v3.02h-5.18zM12.41 12.69h5.18v3.02h-5.18zM6.01 12.69h5.18v3.02H6.01zM18.81 16.96h5.18v3.02h-5.18zM12.41 16.96h5.18v3.02h-5.18zM6.01 16.96h5.18v3.02H6.01zM-.39 16.96h5.18v3.02H-.39z" />
    </svg>
  ),
  YouTube: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" />
    </svg>
  ),
};

const Streaming = () => (
  <section className="bg-secondary/40 border-y border-border">
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-20">
      <div className="flex justify-between items-end mb-10">
        <div>
          <p className="caption opacity-50 mb-2">
            <span className="text-signature">Écouter</span> sur
          </p>
          <h2 className="font-serif-display text-3xl md:text-4xl tracking-tight">
            Toutes les plateformes
          </h2>
        </div>
        <p className="caption opacity-30 hidden sm:block">Sortie partout</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {ossema.streaming.map((p) => (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-vellum border border-border p-5 md:p-6 flex flex-col gap-4 hover:border-signature hover:bg-signature hover:text-vellum transition-all duration-300"
            aria-label={`Écouter ${ossema.release.title} sur ${p.name}`}
          >
            <div className="flex items-start justify-between">
              <div className="size-8 md:size-10 text-ink group-hover:text-vellum transition-colors">
                {Logos[p.name]}
              </div>
              <ArrowUpRight
                size={18}
                className="opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
              />
            </div>
            <div>
              <p className="caption opacity-50 group-hover:opacity-70 transition-opacity">
                {p.code}
              </p>
              <p className="font-serif-display text-lg md:text-xl mt-1">
                {p.name}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default Streaming;
