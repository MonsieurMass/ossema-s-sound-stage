import { useEffect, useState } from "react";
import { getReleaseTimestamp } from "@/data/ossema";

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

  const cells = [
    { value: days, label: "Jours" },
    { value: hours, label: "Heures" },
    { value: minutes, label: "Min" },
    { value: seconds, label: "Sec" },
  ];

  return (
    <div className="inline-flex items-stretch gap-2">
      {cells.map(({ value, label }, index) => (
        <div
          key={label}
          className="silver-border bg-vellum/60 backdrop-blur-sm px-3 py-2 min-w-[58px] text-center"
        >
          <div className="font-serif-display text-2xl md:text-3xl leading-none tabular-nums">
            {value.toString().padStart(2, "0")}
          </div>
          <div className="caption opacity-50 mt-1">{label}</div>
          {index === 0 && <span className="sr-only">avant la sortie</span>}
        </div>
      ))}
    </div>
  );
};

export default Countdown;
