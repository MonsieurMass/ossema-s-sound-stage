import { useEffect, useMemo, useRef, useState } from "react";
import { Expand, Download, Wand2 } from "lucide-react";
import { ossema } from "@/data/ossema";
import { downloadPoster } from "@/lib/poster";
import { trackEvent } from "@/lib/analytics";
import PosterGeneratorModal from "@/components/ossema/PosterGeneratorModal";

const Lyrics = ({ currentTime }: { currentTime: number }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [posterOpen, setPosterOpen] = useState(false);
  const lines = ossema.lyrics;

  const activeIndex = useMemo(() => {
    let idx = 0;
    for (let i = 0; i < lines.length; i++) {
      if (currentTime >= lines[i].time) idx = i;
      else break;
    }
    return idx;
  }, [currentTime, lines]);

  useEffect(() => {
    const node = containerRef.current?.querySelector<HTMLElement>(`[data-line="${activeIndex}"]`);
    node?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [activeIndex]);

  const handleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await sectionRef.current?.requestFullscreen?.();
    } else {
      await document.exitFullscreen?.();
    }
  };

  const handleStoryExport = async () => {
    const line = lines[activeIndex]?.text ?? ossema.release.title;
    await downloadPoster(
      {
        line,
        format: "story",
        theme: "noir",
        typography: "playfair",
        branding: true,
        artist: ossema.artist,
        handle: "@ossema",
      },
      `ossema-lyric-story-${activeIndex + 1}.png`
    );
    await trackEvent("poster_download", { line, format: "story", theme: "noir", source: "lyrics-share" });
  };

  return (
    <>
      <section ref={sectionRef} id="paroles" data-animate="fade-up" className="-mt-16 md:-mt-24 bg-midnight-deep text-vellum py-24 md:py-36 relative z-10">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12 md:mb-16 border-b border-vellum/10 pb-6">
            <div>
              <p className="caption opacity-50 mb-3"><span className="text-signature-glow">Paroles</span> — Synchronisees</p>
              <h2 className="font-serif-display text-3xl md:text-5xl italic">{ossema.release.title}</h2>
            </div>
            <div className="flex flex-wrap items-center gap-3 md:justify-end">
              <span className="caption opacity-40">Ligne {activeIndex + 1} / {lines.length}</span>
              <button onClick={handleFullscreen} className="silver-border px-4 py-3 caption hover:bg-vellum hover:text-ink transition-colors flex items-center gap-2">
                <Expand size={14} /> Fullscreen
              </button>
              <button onClick={handleStoryExport} className="silver-border px-4 py-3 caption hover:bg-vellum hover:text-ink transition-colors flex items-center gap-2">
                <Download size={14} /> Story
              </button>
              <button onClick={() => setPosterOpen(true)} className="bg-signature text-vellum px-4 py-3 caption hover:bg-signature-glow transition-colors flex items-center gap-2">
                <Wand2 size={14} /> Creer mon poster
              </button>
            </div>
          </div>

          <div ref={containerRef} className="h-[55vh] overflow-y-auto scroll-smooth space-y-8 md:space-y-10 pr-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="h-[20vh]" aria-hidden />

            {lines.map((line, index) => {
              const distance = Math.abs(index - activeIndex);
              const isActive = index === activeIndex;
              const opacity = isActive ? 1 : Math.max(0.15, 0.55 - distance * 0.12);
              return (
                <p
                  key={index}
                  data-line={index}
                  style={{ opacity }}
                  className={`font-serif-display text-2xl md:text-4xl lg:text-5xl leading-[1.15] tracking-tight transition-all duration-700 ${isActive ? "text-signature-glow translate-x-0" : "text-vellum"}`}
                >
                  {line.text}
                </p>
              );
            })}

            <div className="h-[30vh]" aria-hidden />
          </div>
        </div>
      </section>
      <PosterGeneratorModal open={posterOpen} onClose={() => setPosterOpen(false)} />
    </>
  );
};

export default Lyrics;
