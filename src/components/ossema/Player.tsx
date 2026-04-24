import { useMemo, useRef } from "react";
import { ossema, formatTime } from "@/data/ossema";
import { Play, Pause, Rewind, FastForward, Volume2, Repeat, Repeat1 } from "lucide-react";
import { useAudio } from "@/audio/AudioProvider";
import AudioVisualizer from "./AudioVisualizer";

const buildWaveform = (count: number, seed: number) =>
  Array.from({ length: count }, (_, index) => {
    const base = Math.abs(Math.sin(seed * 0.01 + index * 0.43));
    const detail = Math.abs(Math.cos(seed * 0.017 + index * 0.21)) * 0.55;
    return Math.max(0.12, Math.min(1, base * 0.55 + detail * 0.45));
  });

const Player = () => {
  const { isPlaying, currentTime, duration, toggle, seek, hasSource, volume, setVolume, repeatMode, cycleRepeatMode } = useAudio();
  const trackRef = useRef<HTMLDivElement>(null);
  const progress = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;
  const waveform = useMemo(() => buildWaveform(200, ossema.release.duration), []);

  const handleTrackClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current || !hasSource) return;
    const rect = trackRef.current.getBoundingClientRect();
    const ratio = (event.clientX - rect.left) / rect.width;
    seek(Math.max(0, Math.min(1, ratio)) * duration);
  };

  const skip = (delta: number) => {
    if (!hasSource) return;
    seek(Math.max(0, Math.min(duration, currentTime + delta)));
  };

  const repeatIcon = repeatMode === "one" ? <Repeat1 size={18} /> : <Repeat size={18} />;

  return (
    <section id="sons" data-animate="fade-up" className="w-full max-w-6xl mx-auto px-6 md:px-10 -mt-8 md:-mt-16 relative z-10 scroll-mt-24">
      <div className="silver-border bg-vellum/95 backdrop-blur-md p-6 md:p-8 shadow-[0_24px_80px_rgba(0,0,0,0.08)]">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          <div className="flex items-center gap-5 md:w-[300px] shrink-0">
            <div className="size-20 md:size-24 shrink-0 overflow-hidden silver-border relative group">
              <img src={ossema.release.cover} alt="Pochette de Noir Vif" className="w-full h-full object-cover" loading="lazy" width={1024} height={1024} />
              {isPlaying && (
                <div className="absolute inset-0 bg-ink/30 flex items-center justify-center">
                  <div className="flex items-end gap-0.5 h-5">
                    {[0, 1, 2, 3].map((i) => (
                      <span key={i} className="w-0.5 h-full bg-vellum eq-bar" style={{ animationDelay: `${i * 0.12}s` }} />
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="caption opacity-50 mb-1">Track {ossema.release.track} · {ossema.release.album}</p>
              <h3 className="font-serif-display italic text-xl md:text-2xl tracking-tight truncate">{ossema.release.title}</h3>
              <p className="caption opacity-50 mt-1">{ossema.artist}</p>
            </div>
          </div>

          <div className="flex-1 min-w-0 flex flex-col gap-4">
            <div className="flex items-center justify-center md:justify-start gap-3 flex-wrap">
              <button onClick={() => skip(-15)} disabled={!hasSource} aria-label="Reculer 15 secondes" className="p-2 text-ink/70 hover:text-signature transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
                <Rewind size={18} />
              </button>
              <button onClick={toggle} disabled={!hasSource} aria-label={isPlaying ? "Pause" : "Lecture"} className="size-14 shrink-0 bg-signature text-vellum flex items-center justify-center hover:bg-signature-glow transition-colors disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed">
                {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" fill="currentColor" />}
              </button>
              <button onClick={() => skip(15)} disabled={!hasSource} aria-label="Avancer 15 secondes" className="p-2 text-ink/70 hover:text-signature transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
                <FastForward size={18} />
              </button>

              <div className="relative group ml-auto flex items-center gap-2">
                <button type="button" className="p-2 text-ink/70 hover:text-signature transition-colors" aria-label="Volume">
                  <Volume2 size={18} />
                </button>
                <div className="absolute left-1/2 bottom-full mb-4 -translate-x-1/2 bg-vellum border border-border px-3 py-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 shadow-lg">
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={(event) => setVolume(Number(event.target.value))}
                    className="h-24 accent-[hsl(var(--signature))] [writing-mode:vertical-lr] [direction:rtl]"
                    aria-label="Regler le volume"
                  />
                </div>
                <button onClick={cycleRepeatMode} className={`p-2 transition-colors ${repeatMode === "off" ? "text-ink/50 hover:text-signature" : "text-signature"}`} aria-label="Changer le mode de repetition">
                  {repeatIcon}
                </button>
                <span className="caption opacity-30 hidden md:flex items-center gap-1.5">Casque conseille</span>
              </div>
            </div>

            <div>
              <div ref={trackRef} onClick={handleTrackClick} className={`relative w-full ${hasSource ? "cursor-pointer" : "cursor-not-allowed"} group`}>
                <svg viewBox="0 0 1000 88" className="w-full h-16 md:h-20 block overflow-visible" preserveAspectRatio="none" aria-hidden="true">
                  {waveform.map((bar, index) => {
                    const x = index * 5;
                    const barHeight = 10 + bar * 48;
                    const y = 44 - barHeight / 2;
                    const active = index <= (progress / 100) * waveform.length;
                    return (
                      <rect
                        key={index}
                        x={x}
                        y={y}
                        width={3}
                        height={barHeight}
                        rx={1.5}
                        fill={active ? "hsl(var(--signature))" : "hsl(var(--midnight) / 0.18)"}
                      />
                    );
                  })}
                </svg>
                <div className="absolute inset-x-0 top-1/2 h-px bg-border/60 -translate-y-1/2" />
                <div className="absolute top-1/2 size-3 bg-signature -translate-y-1/2 -translate-x-1/2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ left: `${progress}%` }} />
              </div>
              <div className="flex justify-between mt-1">
                <span className="caption tabular-nums">{formatTime(currentTime)}</span>
                <span className="caption tabular-nums opacity-50">{hasSource ? formatTime(duration) : "Audio bientot en ligne"}</span>
              </div>
            </div>

            <div className="mt-1 opacity-90 rounded-none overflow-hidden bg-midnight/10 px-2 py-1">
              <AudioVisualizer height={58} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Player;
