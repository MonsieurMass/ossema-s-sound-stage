import { useEffect, useState } from "react";

const TARGET = new Date("2026-05-08T00:00:00+02:00").getTime();

const Countdown = () => {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, TARGET - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const released = diff === 0;

  if (released) {
    return (
      <div className="inline-flex items-center gap-2 caption">
        <span className="size-1.5 bg-signature rounded-full animate-pulse" />
        <span className="text-signature">Disponible maintenant</span>
      </div>
    );
  }

  const cells: { value: number; label: string }[] = [
    { value: days,    label: "Jours" },
    { value: hours,   label: "Heures" },
    { value: minutes, label: "Min" },
    { value: seconds, label: "Sec" },
  ];

  return (
    <div className="inline-flex items-stretch gap-2">
      {cells.map(({ value, label }, i) => (
        <div
          key={label}
          className="silver-border bg-vellum/60 backdrop-blur-sm px-3 py-2 min-w-[58px] text-center"
        >
          <div className="font-serif-display text-2xl md:text-3xl leading-none tabular-nums">
            {value.toString().padStart(2, "0")}
          </div>
          <div className="caption opacity-50 mt-1">{label}</div>
          {i === 0 && (
            <span className="sr-only">avant la sortie de La Nuit</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Countdown;
