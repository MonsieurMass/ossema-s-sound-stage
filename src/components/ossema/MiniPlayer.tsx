import { useEffect, useState } from "react";
import { ossema, formatTime } from "@/data/ossema";
import { Play, Pause } from "lucide-react";
import { useAudio } from "@/audio/AudioProvider";

/**
 * Mini-player sticky en bas d'écran : apparaît dès que l'utilisateur scrolle
 * sous le player principal. Garde l'écoute active pendant toute la visite.
 */
const MiniPlayer = () => {
  const { isPlaying, currentTime, duration, toggle, hasSource } = useAudio();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const player = document.getElementById("sons");
      if (!player) return;
      const rect = player.getBoundingClientRect();
      // Visible quand le player principal est sorti par le haut
      setVisible(rect.bottom < 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const progress = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <div
      className={`fixed bottom-0 inset-x-0 z-40 transition-transform duration-500 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      {/* barre de progression au-dessus */}
      <div className="h-px bg-border relative">
        <div
          className="absolute top-0 left-0 h-px bg-signature transition-[width] duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="bg-ink text-vellum">
        <div className="max-w-6xl mx-auto px-4 md:px-10 py-3 flex items-center gap-4">
          <img
            src={ossema.release.cover}
            alt=""
            className="size-10 object-cover shrink-0"
            width={64}
            height={64}
          />
          <div className="flex-1 min-w-0">
            <p className="font-serif-display italic text-base truncate leading-tight">
              {ossema.release.title}
            </p>
            <p className="caption opacity-50 truncate">
              {ossema.artist} · {formatTime(currentTime)} / {formatTime(duration)}
            </p>
          </div>
          <button
            onClick={toggle}
            disabled={!hasSource}
            aria-label={isPlaying ? "Pause" : "Lecture"}
            className="size-10 shrink-0 bg-signature text-vellum flex items-center justify-center hover:bg-signature-glow transition-colors disabled:opacity-40"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" fill="currentColor" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MiniPlayer;
