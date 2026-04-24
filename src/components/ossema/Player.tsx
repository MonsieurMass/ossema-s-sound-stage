import { useEffect, useRef, useState } from "react";
import { ossema, formatTime } from "@/data/ossema";
import { Play, Pause } from "lucide-react";

interface PlayerProps {
  currentTime: number;
  isPlaying: boolean;
  onToggle: () => void;
  onSeek: (t: number) => void;
}

const Player = ({ currentTime, isPlaying, onToggle, onSeek }: PlayerProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const duration = ossema.release.duration;
  const progress = Math.min(100, (currentTime / duration) * 100);

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    onSeek(Math.max(0, Math.min(1, ratio)) * duration);
  };

  return (
    <div id="sons" className="w-full max-w-6xl mx-auto px-6 md:px-10 -mt-8 md:-mt-12 relative z-10">
      <div className="silver-border bg-vellum/80 backdrop-blur-md p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8">
          {/* Left: cover + title */}
          <div className="flex items-center gap-5 min-w-0 md:w-[280px]">
            <div className="size-16 md:size-20 shrink-0 overflow-hidden silver-border">
              <img
                src={ossema.release.cover}
                alt="Cover Noir Vif"
                className="w-full h-full object-cover"
                loading="lazy"
                width={1024}
                height={1024}
              />
            </div>
            <div className="min-w-0">
              <p className="caption opacity-50 mb-1">Track {ossema.release.track}</p>
              <h3 className="font-serif-display italic text-xl md:text-2xl tracking-tight truncate">
                {ossema.release.title}
              </h3>
              <p className="caption opacity-50 mt-1">{ossema.artist}</p>
            </div>
          </div>

          {/* Middle: progress + play */}
          <div className="flex items-center gap-5 flex-1 min-w-0">
            <button
              onClick={onToggle}
              aria-label={isPlaying ? "Pause" : "Lecture"}
              className="size-14 shrink-0 bg-ink text-vellum flex items-center justify-center hover:scale-105 transition-transform duration-300"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
            </button>

            <div className="flex-1 min-w-0">
              <div
                ref={trackRef}
                onClick={handleTrackClick}
                className="relative h-px bg-border w-full cursor-pointer group py-3"
              >
                <div className="absolute top-1/2 inset-x-0 h-px bg-border -translate-y-1/2" />
                <div
                  className="absolute top-1/2 left-0 h-px bg-ink -translate-y-1/2 transition-[width] duration-150"
                  style={{ width: `${progress}%` }}
                />
                <div
                  className="absolute top-1/2 size-2 bg-ink -translate-y-1/2 -translate-x-1/2 rounded-full transition-[left] duration-150"
                  style={{ left: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="caption tabular-nums">{formatTime(currentTime)}</span>
                <span className="caption tabular-nums opacity-50">
                  -{formatTime(Math.max(0, duration - currentTime))}
                </span>
              </div>
            </div>
          </div>

          {/* Right: equalizer indicator */}
          <div className="hidden md:flex items-end gap-1 h-8 w-16 justify-end">
            {isPlaying ? (
              [0, 1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className="w-0.5 h-full bg-ink eq-bar"
                  style={{ animationDelay: `${i * 0.12}s` }}
                />
              ))
            ) : (
              <span className="caption opacity-40">En pause</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/** Hook: drives a fake audio clock when "playing". */
export const usePlaybackClock = () => {
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const last = useRef<number | null>(null);

  useEffect(() => {
    if (!playing) {
      last.current = null;
      return;
    }
    let raf: number;
    const tick = (ts: number) => {
      if (last.current === null) last.current = ts;
      const dt = (ts - last.current) / 1000;
      last.current = ts;
      setTime((t) => {
        const next = t + dt;
        if (next >= ossema.release.duration) {
          setPlaying(false);
          return 0;
        }
        return next;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  return {
    time,
    playing,
    toggle: () => setPlaying((p) => !p),
    seek: (t: number) => setTime(t),
  };
};

export default Player;
