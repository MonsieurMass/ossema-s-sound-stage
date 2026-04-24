import { useRef } from "react";
import { ossema, formatTime } from "@/data/ossema";
import { Play, Pause, Rewind, FastForward, Volume2 } from "lucide-react";
import { useAudio } from "@/audio/AudioProvider";

const Player = () => {
  const { isPlaying, currentTime, duration, toggle, seek, hasSource } = useAudio();
  const trackRef = useRef<HTMLDivElement>(null);
  const progress = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current || !hasSource) return;
    const rect = trackRef.current.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    seek(Math.max(0, Math.min(1, ratio)) * duration);
  };

  const skip = (delta: number) => {
    if (!hasSource) return;
    seek(Math.max(0, Math.min(duration, currentTime + delta)));
  };

  return (
    <section
      id="sons"
      className="w-full max-w-6xl mx-auto px-6 md:px-10 -mt-8 md:-mt-16 relative z-10 scroll-mt-24"
    >
      <div className="silver-border bg-vellum/95 backdrop-blur-md p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Pochette + titre */}
          <div className="flex items-center gap-5 md:w-[300px] shrink-0">
            <div className="size-20 md:size-24 shrink-0 overflow-hidden silver-border relative group">
              <img
                src={ossema.release.cover}
                alt="Pochette de Noir Vif"
                className="w-full h-full object-cover"
                loading="lazy"
                width={1024}
                height={1024}
              />
              {isPlaying && (
                <div className="absolute inset-0 bg-ink/30 flex items-center justify-center">
                  <div className="flex items-end gap-0.5 h-5">
                    {[0, 1, 2, 3].map((i) => (
                      <span
                        key={i}
                        className="w-0.5 h-full bg-vellum eq-bar"
                        style={{ animationDelay: `${i * 0.12}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="caption opacity-50 mb-1">
                Track {ossema.release.track} · {ossema.release.album}
              </p>
              <h3 className="font-serif-display italic text-xl md:text-2xl tracking-tight truncate">
                {ossema.release.title}
              </h3>
              <p className="caption opacity-50 mt-1">{ossema.artist}</p>
            </div>
          </div>

          {/* Contrôles + barre */}
          <div className="flex-1 min-w-0 flex flex-col gap-3">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <button
                onClick={() => skip(-15)}
                disabled={!hasSource}
                aria-label="Reculer 15 secondes"
                className="p-2 text-ink/70 hover:text-signature transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Rewind size={18} />
              </button>
              <button
                onClick={toggle}
                disabled={!hasSource}
                aria-label={isPlaying ? "Pause" : "Lecture"}
                className="size-14 shrink-0 bg-signature text-vellum flex items-center justify-center hover:bg-signature-glow transition-colors disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" fill="currentColor" />}
              </button>
              <button
                onClick={() => skip(15)}
                disabled={!hasSource}
                aria-label="Avancer 15 secondes"
                className="p-2 text-ink/70 hover:text-signature transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <FastForward size={18} />
              </button>
              <span className="caption opacity-30 ml-auto hidden md:flex items-center gap-1.5">
                <Volume2 size={12} /> Casque conseillé
              </span>
            </div>

            <div>
              <div
                ref={trackRef}
                onClick={handleTrackClick}
                className={`relative h-2 w-full ${hasSource ? "cursor-pointer" : "cursor-not-allowed"} group`}
              >
                <div className="absolute top-1/2 inset-x-0 h-px bg-border -translate-y-1/2" />
                <div
                  className="absolute top-1/2 left-0 h-px bg-signature -translate-y-1/2 transition-[width] duration-100"
                  style={{ width: `${progress}%` }}
                />
                <div
                  className="absolute top-1/2 size-3 bg-signature -translate-y-1/2 -translate-x-1/2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ left: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="caption tabular-nums">{formatTime(currentTime)}</span>
                <span className="caption tabular-nums opacity-50">
                  {hasSource
                    ? formatTime(duration)
                    : "Audio bientôt en ligne"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Player;
