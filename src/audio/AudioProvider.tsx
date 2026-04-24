import { createContext, useCallback, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { ossema } from "@/data/ossema";

interface AudioCtx {
  audioRef: React.RefObject<HTMLAudioElement>;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  toggle: () => void;
  play: () => void;
  pause: () => void;
  seek: (t: number) => void;
  hasSource: boolean;
}

const Ctx = createContext<AudioCtx | null>(null);

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(ossema.release.duration);

  const hasSource = Boolean(ossema.release.audioUrl);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onTime = () => setCurrentTime(el.currentTime);
    const onMeta = () => setDuration(el.duration || ossema.release.duration);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnd = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("loadedmetadata", onMeta);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("ended", onEnd);
    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("loadedmetadata", onMeta);
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("ended", onEnd);
    };
  }, []);

  const play = useCallback(() => {
    audioRef.current?.play().catch(() => {
      /* user gesture required or no source — silent */
    });
  }, []);
  const pause = useCallback(() => audioRef.current?.pause(), []);
  const toggle = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    el.paused ? el.play().catch(() => {}) : el.pause();
  }, []);
  const seek = useCallback((t: number) => {
    if (audioRef.current) audioRef.current.currentTime = t;
    setCurrentTime(t);
  }, []);

  return (
    <Ctx.Provider
      value={{ audioRef, isPlaying, currentTime, duration, toggle, play, pause, seek, hasSource }}
    >
      {/* Hidden global audio element */}
      <audio
        ref={audioRef}
        src={ossema.release.audioUrl || undefined}
        preload="metadata"
        playsInline
      />
      {children}
    </Ctx.Provider>
  );
};

export const useAudio = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAudio must be used inside AudioProvider");
  return ctx;
};
