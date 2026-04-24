import { useState } from "react";
import { ossema, isReleaseOut } from "@/data/ossema";
import { Play } from "lucide-react";

const VideoSection = () => {
  const [open, setOpen] = useState(false);
  const youtubeId = ossema.release.youtubeId;
  const released = isReleaseOut();

  return (
    <section id="visuels" className="py-32 md:py-40 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-10 md:mb-16">
          <div>
            <p className="caption opacity-50 mb-3">Clip officiel</p>
            <h2 className="font-serif-display text-4xl md:text-6xl italic tracking-tighter">
              Visuels
            </h2>
          </div>
          <p className="caption opacity-40 hidden md:block">
            {youtubeId ? "Lecture integree" : released ? "Clip en cours de mise en ligne" : "Clip a venir"}
          </p>
        </div>

        <div className="aspect-video silver-border relative overflow-hidden bg-ink group">
          {open && youtubeId ? (
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
              title="Clip officiel"
              className="absolute inset-0 w-full h-full"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button
              onClick={() => youtubeId && setOpen(true)}
              className="absolute inset-0 w-full h-full"
              aria-label="Lire le clip officiel"
            >
              <img
                src={ossema.release.videoStill}
                alt="Apercu du clip officiel"
                className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                loading="lazy"
                width={1600}
                height={896}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="size-20 md:size-24 rounded-full border border-vellum/40 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:border-vellum transition-all duration-500">
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
