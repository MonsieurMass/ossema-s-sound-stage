import { useEffect, useMemo, useRef } from "react";
import { ossema } from "@/data/ossema";

const Lyrics = ({ currentTime }: { currentTime: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lines = ossema.lyrics;

  const activeIndex = useMemo(() => {
    let idx = 0;
    for (let i = 0; i < lines.length; i++) {
      if (currentTime >= lines[i].time) idx = i;
      else break;
    }
    return idx;
  }, [currentTime, lines]);

  // Auto-scroll active line into view
  useEffect(() => {
    const node = containerRef.current?.querySelector<HTMLElement>(
      `[data-line="${activeIndex}"]`
    );
    node?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [activeIndex]);

  return (
    <section id="paroles" className="bg-ink text-vellum py-24 md:py-36">
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        <div className="flex justify-between items-end mb-12 md:mb-16 border-b border-vellum/10 pb-6">
          <div>
            <p className="caption opacity-50 mb-3">
              <span className="text-signature-glow">Paroles</span> — Synchronisées
            </p>
            <h2 className="font-serif-display text-3xl md:text-5xl italic">
              {ossema.release.title}
            </h2>
          </div>
          <p className="caption opacity-40 hidden sm:block">Écrit par Ossema</p>
        </div>

        <div
          ref={containerRef}
          className="h-[55vh] overflow-y-auto scroll-smooth space-y-8 md:space-y-10 pr-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {/* Spacer top */}
          <div className="h-[20vh]" aria-hidden />

          {lines.map((line, i) => {
            const distance = Math.abs(i - activeIndex);
            const isActive = i === activeIndex;
            const opacity = isActive
              ? 1
              : Math.max(0.15, 0.55 - distance * 0.12);
            return (
              <p
                key={i}
                data-line={i}
                style={{ opacity }}
                className={`font-serif-display text-2xl md:text-4xl lg:text-5xl leading-[1.15] tracking-tight transition-all duration-700 ${
                  isActive
                    ? "text-signature-glow translate-x-0"
                    : "text-vellum"
                }`}
              >
                {line.text}
              </p>
            );
          })}

          {/* Spacer bottom */}
          <div className="h-[30vh]" aria-hidden />
        </div>
      </div>
    </section>
  );
};

export default Lyrics;
