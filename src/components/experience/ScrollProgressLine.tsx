import { useEffect, useState } from "react";

const ScrollProgressLine = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const height = document.body.scrollHeight - window.innerHeight;
      const next = height > 0 ? window.scrollY / height : 0;
      setProgress(Math.min(1, Math.max(0, next)));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="scroll-progress-shell" aria-hidden="true">
      <div className="scroll-progress-fill" style={{ height: `${progress * 100}%` }} />
    </div>
  );
};

export default ScrollProgressLine;
