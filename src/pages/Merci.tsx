import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ossema, isUrlReady } from "@/data/ossema";
import { Play, ArrowLeft, Copy, Share2 } from "lucide-react";
import Meta from "@/components/seo/Meta";
import { trackEvent } from "@/lib/analytics";

const Merci = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);
  const [phase, setPhase] = useState(0);
  const [unlockLevel, setUnlockLevel] = useState(0);

  useEffect(() => {
    setEmail(sessionStorage.getItem(ossema.newsletter.storageKey));
    trackEvent("page_view", { page: "merci" });

    const timers = [
      window.setTimeout(() => setPhase(1), 600),
      window.setTimeout(() => setPhase(2), 1200),
      window.setTimeout(() => setUnlockLevel(1), 1500),
      window.setTimeout(() => setUnlockLevel(2), 2000),
      window.setTimeout(() => setUnlockLevel(3), 2500),
      window.setTimeout(() => setUnlockLevel(4), 3000),
    ];

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, []);

  const shareUrl = useMemo(() => {
    if (ossema.site.url) return ossema.site.url;
    if (typeof window !== "undefined") return window.location.origin;
    return "";
  }, []);

  const altVersions = ossema.altVersions.filter((version) => isUrlReady(version.url));
  const shareText = `${ossema.merci.shareMessage} ${shareUrl}`;

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: `${ossema.artist} — ${ossema.release.title}`, text: shareText, url: shareUrl });
      await trackEvent("share_click", { target: "native" });
      return;
    }
    await navigator.clipboard.writeText(shareUrl);
    await trackEvent("share_click", { target: "clipboard" });
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    await trackEvent("share_click", { target: "copy" });
  };

  return (
    <>
      <Meta
        title={`Merci | ${ossema.artist} | ${ossema.label}`}
        description={`Page de confirmation de la fan list de ${ossema.artist}.`}
        image={ossema.site.ogImage}
        url={ossema.site.url ? `${ossema.site.url}/merci` : undefined}
        noIndex
      />

      {phase < 2 ? (
        <div className={`fixed inset-0 z-[95] flex items-center justify-center transition-colors duration-700 ${phase === 0 ? "bg-ink" : "bg-vellum"}`}>
          <p className={`font-serif-display italic text-4xl ${phase === 0 ? "text-vellum animate-pulse" : "text-ink"}`}>Kymia Music</p>
        </div>
      ) : null}

      <main className="min-h-screen bg-vellum text-ink">
        <header className="px-6 md:px-10 py-6 flex justify-between items-center border-b border-border">
          <Link to="/" className="font-serif-display italic text-xl tracking-tighter hover:opacity-60 transition-opacity">{ossema.label}</Link>
          <Link to="/" className="caption opacity-60 hover:opacity-100 transition-opacity flex items-center gap-2"><ArrowLeft size={12} /> Retour</Link>
        </header>

        <section className="px-6 md:px-10 py-24 md:py-32 text-center">
          <p className="caption opacity-50 mb-6">Inscription confirmee</p>
          <h1 className={`font-serif-display text-6xl md:text-8xl italic tracking-tighter mb-8 leading-[0.9] transition-all duration-700 ${phase >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            Bienvenue<br />dans le cercle.
          </h1>
          {email && <p className="text-sm text-muted-foreground mb-4">Ton inscription est enregistree pour <span className="text-ink font-medium">{email}</span>.</p>}
          <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">Tu recevras en priorite les prochaines activations autour de {ossema.release.title}, puis les futures sorties du cycle {ossema.release.album}.</p>
        </section>

        <section className={`px-6 md:px-10 pb-16 md:pb-20 transition-all duration-700 ${unlockLevel >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-end mb-8 gap-6">
              <div>
                <p className="caption text-signature mb-3">Debloque — 01</p>
                <h2 className="font-serif-display text-3xl md:text-4xl italic tracking-tight">Clip officiel</h2>
              </div>
            </div>
            <div className="aspect-video silver-border relative overflow-hidden bg-ink group">
              {videoOpen && ossema.release.youtubeId ? (
                <iframe src={`https://www.youtube.com/embed/${ossema.release.youtubeId}?autoplay=1`} title="Clip officiel" className="absolute inset-0 w-full h-full" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
              ) : (
                <button onClick={() => ossema.release.youtubeId && setVideoOpen(true)} className="absolute inset-0 w-full h-full" aria-label="Lire le clip officiel">
                  <img src={ossema.release.videoStill} alt="Apercu du clip officiel" className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 transition-all duration-700" loading="lazy" width={1600} height={896} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="size-20 md:size-24 rounded-full border border-vellum/40 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <Play size={22} className="text-vellum ml-1" fill="currentColor" />
                    </div>
                  </div>
                </button>
              )}
            </div>
          </div>
        </section>

        <section className={`bg-midnight-deep text-vellum py-24 md:py-32 px-6 md:px-10 transition-all duration-700 ${unlockLevel >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="max-w-4xl mx-auto">
            <p className="caption text-signature-glow mb-3">Debloque — 02</p>
            <h2 className="font-serif-display text-3xl md:text-4xl italic tracking-tight mb-12 border-b border-vellum/10 pb-6">Paroles completes — {ossema.release.title}</h2>
            <div className="space-y-6 md:space-y-8">
              {ossema.lyrics.map((line, index) => (
                <p key={index} className="font-serif-display text-2xl md:text-3xl leading-snug tracking-tight text-vellum/90">{line.text}</p>
              ))}
            </div>
          </div>
        </section>

        <section className={`px-6 md:px-10 py-20 transition-all duration-700 ${unlockLevel >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 md:gap-10">
            <article className="silver-border bg-vellum p-6 md:p-8">
              <p className="caption text-signature mb-3">Debloque — 03</p>
              <h3 className="font-serif-display text-3xl italic mb-5">La genese de La Nuit</h3>
              <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
                {ossema.merci.genesis.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </article>
            <article className="silver-border bg-ink text-vellum p-6 md:p-8">
              <p className="caption text-signature-glow mb-3">Debloque — 04</p>
              <h3 className="font-serif-display text-3xl italic mb-5">Notes de production</h3>
              <div className="space-y-4 text-sm md:text-base text-vellum/75 leading-relaxed">
                {ossema.merci.productionNotes.map((note) => <p key={note}>{note}</p>)}
              </div>
              <p className="caption opacity-50 mt-8">{ossema.merci.exclusiveEvent}</p>
            </article>
          </div>
        </section>

        <section className={`px-6 md:px-10 pb-24 transition-all duration-700 ${unlockLevel >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="max-w-5xl mx-auto silver-border bg-vellum p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div>
                <p className="caption text-signature mb-3">Partage avec tes gens</p>
                <h3 className="font-serif-display text-3xl md:text-4xl italic tracking-tight">Transformer l'acces en propagation</h3>
              </div>
              {altVersions.length > 0 ? <p className="caption opacity-40">Versions bonus disponibles</p> : null}
            </div>

            {altVersions.length > 0 ? (
              <div className="grid sm:grid-cols-3 gap-3 mb-8">
                {altVersions.map((version) => (
                  <a key={version.label} href={version.url} target="_blank" rel="noopener noreferrer" className="silver-border px-5 py-4 caption hover:bg-ink hover:text-vellum transition-colors">
                    {version.label}
                  </a>
                ))}
              </div>
            ) : null}

            <div className="grid md:grid-cols-2 gap-6 items-start">
              <div>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-5">{shareText}</p>
                <div className="flex flex-wrap gap-3">
                  <a href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" className="silver-border px-4 py-3 caption hover:bg-ink hover:text-vellum transition-colors">WhatsApp</a>
                  <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" className="silver-border px-4 py-3 caption hover:bg-ink hover:text-vellum transition-colors">Twitter</a>
                  <button onClick={handleShare} className="bg-signature text-vellum px-4 py-3 caption hover:bg-signature-glow transition-colors flex items-center gap-2"><Share2 size={14} /> Partager</button>
                </div>
              </div>
              <div className="silver-border bg-muted/40 px-5 py-4 flex items-center justify-between gap-4">
                <span className="text-sm truncate">{shareUrl}</span>
                <button onClick={handleCopy} className="caption hover:text-signature transition-colors flex items-center gap-2"><Copy size={14} /> Copier</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Merci;
