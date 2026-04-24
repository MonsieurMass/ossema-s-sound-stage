import { useEffect, useRef, useState } from "react";
import { getReleaseTimestamp } from "@/data/ossema";

const FlipDigit = ({ value, animate = true, compact = false }: { value: number; animate?: boolean; compact?: boolean }) => {
  const [display, setDisplay] = useState(value.toString().padStart(2, "0"));
  const [previous, setPrevious] = useState(display);
  const [flipping, setFlipping] = useState(false);
  const timeoutRef = useRef<number>();

  useEffect(() => {
    const next = value.toString().padStart(2, "0");
    if (next === display) return;
    if (!animate) {
      setDisplay(next);
      return;
    }
    setPrevious(display);
    setDisplay(next);
    setFlipping(true);
    timeoutRef.current = window.setTimeout(() => setFlipping(false), compact ? 200 : 250);
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [animate, compact, display, value]);

  return (
    <div className="flip-shell silver-border bg-vellum/60 backdrop-blur-sm px-4 py-3 min-w-[76px] text-center">
      <div className={`flip-card relative h-10 md:h-12 ${flipping ? "is-flipping" : ""}`}>
        <span className="flip-top font-serif-display text-3xl md:text-4xl leading-none tabular-nums">{display}</span>
        {animate ? (
          <>
            <span className="flip-old font-serif-display text-3xl md:text-4xl leading-none tabular-nums">{previous}</span>
            <span className="flip-new font-serif-display text-3xl md:text-4xl leading-none tabular-nums">{display}</span>
          </>
        ) : null}
      </div>
    </div>
  );
};

const Countdown = () => {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const diff = Math.max(0, getReleaseTimestamp() - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  if (diff === 0) {
    return (
      <div className="inline-flex items-center gap-2 caption">
        <span className="size-1.5 bg-signature rounded-full animate-pulse" />
        <span className="text-signature">Disponible maintenant</span>
      </div>
    );
  }

  return (
    <div className="inline-flex flex-wrap items-stretch gap-2 md:gap-3">
      <div className="silver-border bg-vellum/60 backdrop-blur-sm px-4 py-3 min-w-[90px] text-center">
        <div className="font-serif-display text-3xl md:text-5xl leading-none tabular-nums">{days.toString().padStart(2, "0")}</div>
        <div className="caption opacity-50 mt-2">Jours</div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <FlipDigit value={hours} animate={false} />
        <span className="caption opacity-50">Heures</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <FlipDigit value={minutes} />
        <span className="caption opacity-50">Min</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <FlipDigit value={seconds} compact />
        <span className="caption opacity-50">Sec</span>
      </div>
    </div>
  );
};

export default Countdown;
