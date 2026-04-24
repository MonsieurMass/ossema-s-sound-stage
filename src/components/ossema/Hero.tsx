import { ossema, isReleaseOut, isUrlReady } from "@/data/ossema";
import { Play, Bookmark, ArrowRight } from "lucide-react";
import { useAudio } from "@/audio/AudioProvider";
import { trackEvent } from "@/lib/analytics";
import Countdown from "./Countdown";

const Hero = () => {
  const { play, hasSource } = useAudio();
  const released = isReleaseOut();
  const hasPreSave = isUrlReady(ossema.release.presaveUrl);
  const hasVideo = Boolean(ossema.release.youtubeId);
  const titleLetters = ossema.artist.split("");

  const handleListenNow = () => {
    if (hasSource) play();
    document.getElementById("sons")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const secondaryHref = released ? (hasVideo ? "#visuels" : "#plateformes") : hasPreSave ? ossema.release.presaveUrl : "#cercle";
  const secondaryLabel = released ? (hasVideo ? "Voir le clip" : "Trouver une plateforme") : hasPreSave ? "Pre-save" : "Rejoindre le cercle";

  return (
    <section id="top" className="hero-diagonal relative min-h-dvh flex flex-col justify-center pt-24 pb-28 px-6 md:px-10 overflow-hidden bg-vellum">
      <div data-animate="fade-up" className="w-full max-w-6xl mx-auto grid grid-cols-12 gap-8 md:gap-10 items-center">
        <div className="col-span-12 lg:col-span-7 order-2 lg:order-1">
          <p className="caption opacity-60 mb-5">
            {ossema.label} · <span className="text-signature">{ossema.editorial.signature}</span>
          </p>

          <p className="text-sm md:text-base text-muted-foreground max-w-xl leading-relaxed mb-4">
            {ossema.editorial.eyebrow}
          </p>

          <h1 className="font-serif-display text-[18vw] sm:text-[14vw] lg:text-[10rem] xl:text-[12rem] leading-[0.85] tracking-tighter mb-6 break-words">
            {titleLetters.map((letter, index) => (
              <span key={`${letter}-${index}`} className="title-letter" style={{ animationDelay: `${index * 0.06}s` }}>
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </h1>

          <div className="flex items-baseline gap-3 flex-wrap mb-4">
            <span className="caption opacity-60">{released ? "Disponible maintenant" : "Nouveau single"}</span>
            <span className="font-serif-display italic text-xl sm:text-2xl md:text-3xl">{ossema.release.title}</span>
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
              <Play size={14} fill="currentColor" className="transition-transform group-hover:scale-110" />
              {hasSource ? "Ecouter maintenant" : "Decouvrir le titre"}
            </button>
            <a
              href={secondaryHref}
              target={secondaryHref.startsWith("http") ? "_blank" : undefined}
              rel={secondaryHref.startsWith("http") ? "noopener noreferrer" : undefined}
              onClick={() => {
                if (secondaryHref.startsWith("http")) {
                  trackEvent("presave_click", { destination: secondaryHref });
                }
              }}
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
          <div className="relative aspect-[3/4]">
            <div className="ambient-glow absolute inset-8 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(188,33,33,0.45) 0%, rgba(188,33,33,0) 65%)" }} />
            <div className="absolute inset-x-10 bottom-2 h-28 blur-3xl" style={{ background: "radial-gradient(circle, rgba(22,34,65,0.8) 0%, rgba(22,34,65,0) 70%)" }} />
            <div className="aspect-[3/4] overflow-hidden silver-border bg-muted relative">
              <img
                src={ossema.release.portrait}
                alt={`${ossema.artist}, portrait editorial`}
                className="w-full h-full object-cover grayscale contrast-110"
                width={1024}
                height={1408}
              />
              <div className="absolute top-5 right-5 opacity-0 animate-fade-up" style={{ animationDelay: "1.2s", animationFillMode: "forwards" }}>
                <div className="silver-border bg-vellum/85 backdrop-blur-sm px-4 py-3">
                  <p className="caption text-signature flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-signature animate-pulse" /> Single · 8 Mai · 2026
                  </p>
                </div>
              </div>
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-ink/80 to-transparent">
                <p className="caption text-vellum opacity-80">{ossema.artist} · {ossema.city} · 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 caption opacity-40 animate-drift">Faire defiler ↓</div>
    </section>
  );
};

export default Hero;
