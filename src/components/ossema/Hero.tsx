import { ossema, isReleaseOut, isUrlReady } from "@/data/ossema";
import { Play, Bookmark, ArrowRight } from "lucide-react";
import { useAudio } from "@/audio/AudioProvider";
import Countdown from "./Countdown";

const Hero = () => {
  const { play, hasSource } = useAudio();
  const released = isReleaseOut();
  const hasPreSave = isUrlReady(ossema.release.presaveUrl);
  const hasVideo = Boolean(ossema.release.youtubeId);

  const handleListenNow = () => {
    if (hasSource) play();
    document
      .getElementById("sons")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const secondaryHref = released
    ? hasVideo
      ? "#visuels"
      : "#plateformes"
    : hasPreSave
      ? ossema.release.presaveUrl
      : "#cercle";

  const secondaryLabel = released
    ? hasVideo
      ? "Voir le clip"
      : "Trouver une plateforme"
    : hasPreSave
      ? "Pre-save"
      : "Rejoindre le cercle";

  return (
    <section
      id="top"
      className="relative min-h-dvh flex flex-col justify-center pt-24 pb-20 px-6 md:px-10 overflow-hidden"
    >
      <div className="w-full max-w-6xl mx-auto grid grid-cols-12 gap-6 md:gap-10 items-center animate-fade-up">
        <div className="col-span-12 lg:col-span-7 order-2 lg:order-1">
          <p className="caption opacity-60 mb-5">
            {ossema.label} · <span className="text-signature">{ossema.editorial.signature}</span>
          </p>

          <h1 className="font-serif-display text-[18vw] sm:text-[14vw] lg:text-[10rem] xl:text-[12rem] leading-[0.85] tracking-tighter mb-6 break-words">
            {ossema.artist}
          </h1>

          <div className="flex items-baseline gap-3 flex-wrap mb-4">
            <span className="caption opacity-60">{released ? "Disponible maintenant" : "Nouveau single"}</span>
            <span className="font-serif-display italic text-xl sm:text-2xl md:text-3xl">
              {ossema.release.title}
            </span>
            <span className="caption opacity-40">— {ossema.release.album}</span>
          </div>

          <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl mb-8">
            {ossema.release.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={handleListenNow}
              className="bg-signature text-vellum px-8 py-4 caption font-bold flex items-center justify-center gap-3 hover:bg-signature-glow transition-colors group"
            >
              <Play
                size={14}
                fill="currentColor"
                className="transition-transform group-hover:scale-110"
              />
              {hasSource ? "Écouter maintenant" : "Découvrir le titre"}
            </button>
            <a
              href={secondaryHref}
              target={secondaryHref.startsWith("http") ? "_blank" : undefined}
              rel={secondaryHref.startsWith("http") ? "noopener noreferrer" : undefined}
              className="silver-border bg-transparent text-ink px-8 py-4 caption font-bold flex items-center justify-center gap-3 hover:bg-ink hover:text-vellum transition-colors group"
            >
              {released ? <ArrowRight size={14} /> : <Bookmark size={14} />}
              {secondaryLabel}
            </a>
          </div>
          <div className="mt-8">
            <p className="caption opacity-50 mb-3">
              <span className="inline-block size-1.5 bg-signature rounded-full mr-2 align-middle animate-pulse" />
              {ossema.release.releaseDate}
            </p>
            <Countdown />
          </div>
        </div>

        <div className="col-span-12 lg:col-span-5 order-1 lg:order-2">
          <div className="aspect-[3/4] overflow-hidden silver-border bg-muted relative">
            <img
              src={ossema.release.portrait}
              alt={`${ossema.artist}, portrait editorial`}
              className="w-full h-full object-cover grayscale contrast-110"
              width={1024}
              height={1408}
            />
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-ink/80 to-transparent">
              <p className="caption text-vellum opacity-80">
                {ossema.artist} · {ossema.city} · 2026
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 caption opacity-40 animate-drift">
        Faire defiler ↓
      </div>
    </section>
  );
};

export default Hero;
