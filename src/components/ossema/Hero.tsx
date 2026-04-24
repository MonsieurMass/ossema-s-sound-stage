import { ossema } from "@/data/ossema";
import { Play, Bookmark } from "lucide-react";
import { useAudio } from "@/audio/AudioProvider";
import Countdown from "./Countdown";

const Hero = () => {
  const { play, hasSource } = useAudio();

  const handleListenNow = () => {
    if (hasSource) play();
    document
      .getElementById("sons")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="top"
      className="relative min-h-dvh flex flex-col justify-center pt-24 pb-20 px-6 md:px-10 overflow-hidden"
    >
      <div className="w-full max-w-6xl mx-auto grid grid-cols-12 gap-6 md:gap-10 items-center animate-fade-up">
        {/* Texte */}
        <div className="col-span-12 lg:col-span-7 order-2 lg:order-1">
          <p className="caption opacity-60 mb-5">
            Kymia Music · <span className="text-signature">Signature 001</span>
          </p>

          {/* Titre artiste : tailles raisonnables, sans débordement */}
          <h1 className="font-serif-display text-[18vw] sm:text-[14vw] lg:text-[10rem] xl:text-[12rem] leading-[0.85] tracking-tighter mb-6 break-words">
            {ossema.artist}
          </h1>

          <div className="flex items-baseline gap-3 flex-wrap mb-8">
            <span className="caption opacity-60">Nouveau Single</span>
            <span className="font-serif-display italic text-xl sm:text-2xl md:text-3xl">
              {ossema.release.title}
            </span>
            <span className="caption opacity-40">— {ossema.release.album}</span>
          </div>

          {/* CTAs : action principale = signature rouge */}
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
              Écouter maintenant
            </button>
            <a
              href={ossema.release.presaveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="silver-border bg-transparent text-ink px-8 py-4 caption font-bold flex items-center justify-center gap-3 hover:bg-ink hover:text-vellum transition-colors group"
            >
              <Bookmark
                size={14}
                className="transition-transform group-hover:scale-110"
              />
              Pré-save
            </a>
          </div>
          <p className="caption opacity-40 mt-5">
            <span className="inline-block size-1.5 bg-signature rounded-full mr-2 align-middle animate-pulse" />
            {ossema.release.releaseDate}
          </p>
        </div>

        {/* Portrait */}
        <div className="col-span-12 lg:col-span-5 order-1 lg:order-2">
          <div className="aspect-[3/4] overflow-hidden silver-border bg-muted relative">
            <img
              src={ossema.release.portrait}
              alt={`${ossema.artist}, portrait éditorial`}
              className="w-full h-full object-cover grayscale contrast-110"
              width={1024}
              height={1408}
            />
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-ink/80 to-transparent">
              <p className="caption text-vellum opacity-80">
                Ossema · Paris · 2026
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 caption opacity-40 animate-drift">
        Faire défiler ↓
      </div>
    </section>
  );
};

export default Hero;
