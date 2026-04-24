import { ossema } from "@/data/ossema";

const Hero = () => (
  <section id="top" className="relative min-h-dvh flex flex-col items-center justify-center pt-28 pb-16 px-6 md:px-10">
    <div className="w-full max-w-6xl grid grid-cols-12 gap-6 md:gap-10 items-end animate-fade-up">
      <div className="col-span-12 lg:col-span-7 order-2 lg:order-1">
        <p className="caption opacity-60 mb-6">Kymia Music — Signature 001</p>
        <h1 className="font-serif-display text-[22vw] sm:text-[18vw] lg:text-[12vw] leading-[0.82] tracking-tighter mb-6">
          {ossema.artist}
        </h1>
        <div className="flex items-baseline gap-4 flex-wrap">
          <span className="caption opacity-60">Nouveau Single</span>
          <span className="font-serif-display italic text-2xl md:text-3xl">
            {ossema.release.title}
          </span>
          <span className="caption opacity-40">— {ossema.release.album}</span>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-5 order-1 lg:order-2">
        <div className="aspect-[3/4] overflow-hidden silver-border bg-muted">
          <img
            src={ossema.release.portrait}
            alt={`${ossema.artist}, portrait éditorial`}
            className="w-full h-full object-cover grayscale contrast-110"
            width={1024}
            height={1408}
          />
        </div>
      </div>
    </div>

    {/* Scroll cue */}
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 caption opacity-40 animate-drift">
      Faire défiler ↓
    </div>
  </section>
);

export default Hero;
