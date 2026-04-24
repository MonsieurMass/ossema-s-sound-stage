import { useEffect, useMemo, useRef, useState } from "react";
import { ossema } from "@/data/ossema";

const StudioSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const next = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      setProgress(next);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isDesktop]);

  const translateX = useMemo(() => {
    const track = trackRef.current;
    if (!track || !isDesktop) return 0;
    return Math.max(0, (track.scrollWidth - window.innerWidth) * progress);
  }, [isDesktop, progress]);

  return (
    <section
      id="studio"
      ref={sectionRef}
      data-animate="fade-up"
      className={`bg-vellum py-20 md:py-0 ${isDesktop ? "h-[220vh]" : ""}`}
    >
      <div className={`${isDesktop ? "sticky top-0 h-screen overflow-hidden" : ""}`}>
        <div className="max-w-6xl mx-auto px-6 md:px-10 pt-16 md:pt-20 mb-10 md:mb-14">
          <p className="caption text-signature mb-3">Behind the scenes</p>
          <h2 className="font-serif-display text-4xl md:text-6xl italic tracking-tighter mb-4">
            Le studio, les coulisses, la tension
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
            Une galerie horizontale qui laisse entrer dans la fabrication du monde OSSEMA: prises de voix, nuits de studio et fragments d'un empire en train de s'ecrire.
          </p>
        </div>

        <div className={`${isDesktop ? "overflow-hidden" : "overflow-x-auto"}`}>
          <div
            ref={trackRef}
            className="flex gap-5 px-6 md:px-10 pb-16 md:pb-20 will-change-transform"
            style={isDesktop ? { transform: `translate3d(-${translateX}px, 0, 0)` } : undefined}
          >
            {ossema.studioPhotos.map((photo, index) => (
              <figure
                key={`${photo.caption}-${index}`}
                className="relative shrink-0 w-[78vw] md:w-[62vh] h-[58vh] md:h-[72vh] overflow-hidden silver-border bg-ink group"
              >
                <img
                  src={photo.image}
                  alt={photo.caption}
                  className="w-full h-full object-cover grayscale contrast-110 transition-all duration-700 group-hover:grayscale-0"
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-ink/90 to-transparent">
                  <p className="caption text-signature-glow mb-2">{photo.meta}</p>
                  <p className="text-sm md:text-base text-vellum/85">{photo.caption}</p>
                </figcaption>
              </figure>
            ))}
            <div className="shrink-0 w-[78vw] md:w-[62vh] h-[58vh] md:h-[72vh] bg-ink text-vellum silver-border flex flex-col justify-end p-8">
              <p className="caption text-signature-glow mb-3">Kymia Music</p>
              <p className="font-serif-display text-4xl italic leading-tight mb-3">D'autres images bientôt</p>
              <p className="text-sm text-vellum/70 leading-relaxed">Chaque session ajoute de nouvelles preuves de monde. La galerie est pensée pour grandir avec la carrière.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudioSection;
