import { useRef, useState } from "react";
import { ossema, isReleaseOut } from "@/data/ossema";
import { Play, Maximize2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const VideoSection = () => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const youtubeId = ossema.release.youtubeId;
  const released = isReleaseOut();

  const handleOpen = () => {
    if (!youtubeId) return;
    setOpen(true);
    trackEvent("video_play", { youtubeId });
  };

  const handleFullscreen = async () => {
    if (!wrapperRef.current) return;
    await wrapperRef.current.requestFullscreen?.();
  };

  return (
    <section id="visuels" data-animate="fade-up" className="py-32 md:py-40 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-10 md:mb-16 gap-6">
          <div>
            <p className="caption opacity-50 mb-3">Clip officiel</p>
            <h2 className="font-serif-display text-4xl md:text-6xl italic tracking-tighter">Visuels</h2>
          </div>
          <p className="caption opacity-40 hidden md:block">
            {youtubeId ? "Kymia Films · lecture integree" : released ? "Clip en cours de mise en ligne" : "Clip a venir"}
          </p>
        </div>

        <div ref={wrapperRef} className="aspect-video silver-border relative overflow-hidden bg-ink group">
          {open && youtubeId ? (
            <>
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                title="Clip officiel"
                className="absolute inset-0 w-full h-full"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
              <button
                onClick={handleFullscreen}
                className="absolute right-4 top-4 z-10 bg-ink/60 text-vellum px-4 py-3 caption flex items-center gap-2 hover:bg-vellum hover:text-ink transition-colors"
              >
                <Maximize2 size={14} /> Plein ecran
              </button>
            </>
          ) : (
            <button onClick={handleOpen} className="absolute inset-0 w-full h-full" aria-label="Lire le clip officiel">
              <img
                src={ossema.release.videoStill}
                alt="Apercu du clip officiel"
                className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                loading="lazy"
                width={1600}
                height={896}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-signature/35 via-transparent to-ink/85" />
              <div className="absolute left-6 md:left-8 top-6 md:top-8 text-left">
                <p className="caption text-signature-glow mb-2">Kymia Films</p>
                <h3 className="font-serif-display text-4xl md:text-6xl italic text-vellum tracking-tight">{ossema.release.title}</h3>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="translate-x-8 md:translate-x-12 -translate-y-2 md:-translate-y-3 size-20 md:size-24 rounded-full border border-vellum/40 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:border-vellum transition-all duration-500">
                  <Play size={22} className="text-vellum ml-1" fill="currentColor" />
                </div>
              </div>
              {!youtubeId && (
                <div className="absolute bottom-4 left-4 caption text-vellum/70 bg-ink/40 backdrop-blur-sm px-3 py-2">
                  {released ? "Clip bientot en ligne" : "Clip a venir"}
                </div>
              )}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
