import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ossema } from "@/data/ossema";
import { Play, ArrowLeft } from "lucide-react";
import PageSeo from "@/components/seo/PageSeo";

const Merci = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    setEmail(sessionStorage.getItem(ossema.newsletter.storageKey));
  }, []);

  return (
    <>
      <PageSeo
        title={`Merci | ${ossema.artist} | ${ossema.label}`}
        description={`Page de confirmation de la fan list de ${ossema.artist}.`}
        image={ossema.site.ogImage}
        url={ossema.site.url ? `${ossema.site.url}/merci` : undefined}
        noIndex
      />
      <main className="min-h-screen bg-vellum text-ink">
        <header className="px-6 md:px-10 py-6 flex justify-between items-center border-b border-border">
          <Link to="/" className="font-serif-display italic text-xl tracking-tighter hover:opacity-60 transition-opacity">
            {ossema.label}
          </Link>
          <Link to="/" className="caption opacity-60 hover:opacity-100 transition-opacity flex items-center gap-2">
            <ArrowLeft size={12} /> Retour
          </Link>
        </header>

        <section className="px-6 md:px-10 py-24 md:py-32 text-center animate-fade-up">
          <p className="caption opacity-50 mb-6">Inscription confirmee</p>
          <h1 className="font-serif-display text-6xl md:text-8xl italic tracking-tighter mb-8 leading-[0.9]">
            Bienvenue<br />dans le cercle.
          </h1>
          {email && (
            <p className="text-sm text-muted-foreground mb-4">
              Ton inscription est enregistree pour <span className="text-ink font-medium">{email}</span>.
            </p>
          )}
          <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            Tu recevras en priorite les prochaines activations autour de {ossema.release.title}, puis les futures sorties du cycle {ossema.release.album}.
          </p>
        </section>

        <section className="px-6 md:px-10 pb-24 md:pb-32">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-end mb-8">
              <div>
                <p className="caption opacity-50 mb-3">Debloque — 01</p>
                <h2 className="font-serif-display text-3xl md:text-4xl italic tracking-tight">
                  Clip officiel
                </h2>
              </div>
            </div>

            <div className="aspect-video silver-border relative overflow-hidden bg-ink group">
              {videoOpen && ossema.release.youtubeId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${ossema.release.youtubeId}?autoplay=1`}
                  title="Clip officiel"
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <button
                  onClick={() => ossema.release.youtubeId && setVideoOpen(true)}
                  className="absolute inset-0 w-full h-full"
                  aria-label="Lire le clip officiel"
                >
                  <img
                    src={ossema.release.videoStill}
                    alt="Apercu du clip officiel"
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 transition-all duration-700"
                    loading="lazy"
                    width={1600}
                    height={896}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="size-20 md:size-24 rounded-full border border-vellum/40 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <Play size={22} className="text-vellum ml-1" fill="currentColor" />
                    </div>
                  </div>
                  {!ossema.release.youtubeId && (
                    <div className="absolute bottom-4 left-4 caption text-vellum/70 bg-ink/40 backdrop-blur-sm px-3 py-2">
                      Le clip sera debloque ici des qu'il sera branche
                    </div>
                  )}
                </button>
              )}
            </div>
          </div>
        </section>

        <section className="bg-ink text-vellum py-24 md:py-32 px-6 md:px-10">
          <div className="max-w-4xl mx-auto">
            <p className="caption opacity-50 mb-3">Debloque — 02</p>
            <h2 className="font-serif-display text-3xl md:text-4xl italic tracking-tight mb-12 border-b border-vellum/10 pb-6">
              Paroles completes — {ossema.release.title}
            </h2>

            <div className="space-y-6 md:space-y-8">
              {ossema.lyrics.map((line, index) => (
                <p
                  key={index}
                  className="font-serif-display text-2xl md:text-3xl leading-snug tracking-tight text-vellum/90"
                >
                  {line.text}
                </p>
              ))}
            </div>

            <p className="caption opacity-40 mt-16">
              © {new Date().getFullYear()} {ossema.label} — Ecrit par {ossema.artist}
            </p>
          </div>
        </section>

        <section className="py-20 px-6 md:px-10 text-center border-t border-border">
          <Link
            to="/"
            className="silver-border inline-block bg-ink text-vellum px-10 py-4 caption font-bold hover:bg-foreground/90 transition-colors"
          >
            Retour a l'accueil
          </Link>
        </section>
      </main>
    </>
  );
};

export default Merci;
