import { createContext, useCallback, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { ossema } from "@/data/ossema";
import { trackEvent } from "@/lib/analytics";

export type RepeatMode = "off" | "all" | "one";

interface AudioCtx {
  audioRef: React.RefObject<HTMLAudioElement>;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  repeatMode: RepeatMode;
  toggle: () => void;
  play: () => void;
  pause: () => void;
  seek: (t: number) => void;
  setVolume: (v: number) => void;
  cycleRepeatMode: () => void;
  hasSource: boolean;
  getFrequencyData: () => Uint8Array | null;
}

const Ctx = createContext<AudioCtx | null>(null);

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(ossema.release.duration);
  const [volume, setVolumeState] = useState(0.78);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>("off");
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const lastTrackedSegmentRef = useRef(-1);

  const hasSource = Boolean(ossema.release.audioUrl);

  const initAudioGraph = useCallback(() => {
    if (audioCtxRef.current || !audioRef.current) return;
    try {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AC();
      const source = ctx.createMediaElementSource(audioRef.current);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 128;
      source.connect(analyser);
      analyser.connect(ctx.destination);
      audioCtxRef.current = ctx;
      analyserRef.current = analyser;
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
    } catch {
      // MediaElementSource can only be connected once.
    }
  }, []);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.volume = volume;
  }, [volume]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    const onTime = () => {
      setCurrentTime(el.currentTime);
      const segment = Math.floor(el.currentTime / 30);
      if (segment > 0 && segment !== lastTrackedSegmentRef.current) {
        lastTrackedSegmentRef.current = segment;
        trackEvent("audio_duration", { seconds: segment * 30, title: ossema.release.title });
      }
    };

    const onMeta = () => setDuration(el.duration || ossema.release.duration);
    const onPlay = () => {
      setIsPlaying(true);
      initAudioGraph();
      audioCtxRef.current?.resume();
      trackEvent("audio_play", { title: ossema.release.title });
    };
    const onPause = () => setIsPlaying(false);
    const onEnd = () => {
      if (repeatMode === "one" || repeatMode === "all") {
        el.currentTime = 0;
        el.play().catch(() => {});
        return;
      }
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
  }, [initAudioGraph, repeatMode]);

  const play = useCallback(() => {
    audioRef.current?.play().catch(() => {});
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const toggle = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    el.paused ? el.play().catch(() => {}) : el.pause();
  }, []);

  const seek = useCallback((t: number) => {
    if (audioRef.current) audioRef.current.currentTime = t;
    setCurrentTime(t);
  }, []);

  const setVolume = useCallback((next: number) => {
    const safe = Math.max(0, Math.min(1, next));
    setVolumeState(safe);
  }, []);

  const cycleRepeatMode = useCallback(() => {
    setRepeatMode((current) => (current === "off" ? "all" : current === "all" ? "one" : "off"));
  }, []);

  const getFrequencyData = useCallback(() => {
    const analyser = analyserRef.current;
    const data = dataArrayRef.current;
    if (!analyser || !data) return null;
    analyser.getByteFrequencyData(data as Uint8Array<ArrayBuffer>);
    return data;
  }, []);

  return (
    <Ctx.Provider
      value={{
        audioRef,
        isPlaying,
        currentTime,
        duration,
        volume,
        repeatMode,
        toggle,
        play,
        pause,
        seek,
        setVolume,
        cycleRepeatMode,
        hasSource,
        getFrequencyData,
      }}
    >
      <audio
        ref={audioRef}
        src={ossema.release.audioUrl || undefined}
        preload="metadata"
        playsInline
        crossOrigin="anonymous"
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
