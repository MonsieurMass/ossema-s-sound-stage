import { useEffect, useRef } from "react";
import { useAudio } from "@/audio/AudioProvider";

const AudioVisualizer = ({ height = 64 }: { height?: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { getFrequencyData, isPlaying } = useAudio();
  const rafRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const roundRect = (x: number, y: number, width: number, barHeight: number, radius: number) => {
      const r = Math.min(radius, width / 2, barHeight / 2);
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + width, y, x + width, y + barHeight, r);
      ctx.arcTo(x + width, y + barHeight, x, y + barHeight, r);
      ctx.arcTo(x, y + barHeight, x, y, r);
      ctx.arcTo(x, y, x + width, y, r);
      ctx.closePath();
      ctx.fill();
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const totalHeight = rect.height;
      const mid = totalHeight / 2;
      ctx.clearRect(0, 0, width, totalHeight);

      const data = getFrequencyData();
      const bars = 42;
      const gap = 4;
      const barWidth = (width - gap * (bars - 1)) / bars;
      const idleTime = Date.now() / 550;

      for (let index = 0; index < bars; index++) {
        const sampleIndex = data ? Math.floor((index / bars) * data.length * 0.75) : 0;
        const value = data && isPlaying
          ? Math.max(0.08, data[sampleIndex] / 255)
          : 0.12 + Math.abs(Math.sin(idleTime + index * 0.28)) * 0.22;
        const mirroredHeight = Math.max(4, value * (totalHeight * 0.46));
        const x = index * (barWidth + gap);
        const grad = ctx.createLinearGradient(x, mid - mirroredHeight, x, mid + mirroredHeight);
        grad.addColorStop(0, "hsla(0, 82%, 55%, 0.92)");
        grad.addColorStop(0.5, "hsla(220, 45%, 18%, 0.9)");
        grad.addColorStop(1, "hsla(0, 82%, 55%, 0.92)");
        ctx.fillStyle = grad;
        roundRect(x, mid - mirroredHeight, barWidth, mirroredHeight * 2, 2);
      }

      ctx.strokeStyle = "hsla(220, 13%, 82%, 0.18)";
      ctx.beginPath();
      ctx.moveTo(0, mid);
      ctx.lineTo(width, mid);
      ctx.stroke();

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [getFrequencyData, isPlaying]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: `${height}px` }} aria-hidden="true" />;
};

export default AudioVisualizer;
