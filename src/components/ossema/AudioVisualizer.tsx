import { useEffect, useRef } from "react";
import { useAudio } from "@/audio/AudioProvider";

/**
 * Waveform/bars visualizer alimenté par Web Audio API.
 * Affiche des barres statiques en pulse "fake" si pas de source audio
 * (pour garder l'esthétique avant la sortie).
 */
const AudioVisualizer = ({ height = 64 }: { height?: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { getFrequencyData, isPlaying, hasSource } = useAudio();
  const rafRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      const data = getFrequencyData();
      const bars = 48;
      const gap = 2;
      const barWidth = (w - gap * (bars - 1)) / bars;

      for (let i = 0; i < bars; i++) {
        let v: number;
        if (data && isPlaying) {
          // Échantillon réparti sur le spectre
          const idx = Math.floor((i / bars) * data.length * 0.7);
          v = data[idx] / 255;
        } else {
          // Pulse subtil quand pas de source
          const t = Date.now() / 600;
          v = 0.08 + Math.abs(Math.sin(t + i * 0.35)) * 0.18;
        }
        const barH = Math.max(2, v * h);
        const x = i * (barWidth + gap);
        const y = (h - barH) / 2;

        // Gradient rouge signature → bleu nuit
        const grad = ctx.createLinearGradient(x, y, x, y + barH);
        grad.addColorStop(0, "hsl(0, 82%, 55%)");
        grad.addColorStop(1, "hsl(220, 45%, 12%)");
        ctx.fillStyle = grad;
        ctx.fillRect(x, y, barWidth, barH);
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [getFrequencyData, isPlaying, hasSource]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: `${height}px` }}
      aria-hidden="true"
    />
  );
};

export default AudioVisualizer;
