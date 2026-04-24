import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { supabase, isSupabaseConfigured } from "@/integrations/supabase/client";
import { ossema } from "@/data/ossema";
import { getVisitorContext } from "@/lib/session";
import { trackEvent } from "@/lib/analytics";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().trim().email({ message: "Adresse email invalide" }).max(254, { message: "Email trop long" }),
  consent: z.literal(true, { errorMap: () => ({ message: "Vous devez accepter pour recevoir nos emails" }) }),
});

const FanList = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [preferredPlatform, setPreferredPlatform] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSuccess = async (cleanEmail: string) => {
    sessionStorage.setItem(ossema.newsletter.storageKey, cleanEmail);
    await trackEvent("fanlist_submit", { preferredPlatform: preferredPlatform || null });
    navigate("/merci");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = formSchema.safeParse({ email, consent });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }

    const cleanEmail = parsed.data.email.toLowerCase();

    if (honeypot.trim()) {
      handleSuccess(cleanEmail);
      return;
    }

    if (!isSupabaseConfigured || !supabase) {
      toast.error("Supabase n'est pas encore configure. Branche les variables d'environnement avant la mise en ligne.");
      return;
    }

    const visitor = getVisitorContext();
    setLoading(true);
    const { error } = await supabase.from(ossema.newsletter.table).insert({
      email: cleanEmail,
      artist: ossema.newsletter.artistSlug,
      source: ossema.newsletter.source,
      consent_given: true,
      consent_at: new Date().toISOString(),
      preferred_platform: preferredPlatform || null,
      city: visitor.city ?? null,
      country: visitor.country ?? null,
      referrer: typeof document !== "undefined" ? document.referrer || null : null,
    });
    setLoading(false);

    if (error && error.code !== "23505") {
      toast.error("Une erreur est survenue. Reessayez.");
      return;
    }

    handleSuccess(cleanEmail);
  };

  return (
    <section id="cercle" data-animate="fade-up" className="py-32 md:py-48 px-6 md:px-10">
      <div className="max-w-2xl mx-auto text-center">
        <p className="caption opacity-50 mb-6">Liste privee</p>
        <h2 className="font-serif-display text-5xl md:text-6xl italic tracking-tighter mb-6">Rejoindre le cercle</h2>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-md mx-auto mb-12">
          Sorties en avant-premiere, demos non publiees, dates de tournee confidentielles et editions limitees. Aucun spam, jamais.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
          <div className="hidden" aria-hidden="true">
            <label htmlFor="company">Entreprise</label>
            <input id="company" name="company" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
          </div>

          <div className="flex flex-col md:flex-row gap-3 md:gap-4">
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} maxLength={254} placeholder="votre adresse email" className="flex-1 bg-transparent border-b border-border py-4 px-1 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-ink transition-colors" />
            <button type="submit" disabled={loading} className="silver-border bg-ink text-vellum px-10 py-4 caption font-bold hover:bg-foreground/90 transition-colors disabled:opacity-50">
              {loading ? "Envoi..." : "S'inscrire"}
            </button>
          </div>

          <select value={preferredPlatform} onChange={(e) => setPreferredPlatform(e.target.value)} className="w-full border border-border bg-transparent px-4 py-3 text-sm">
            <option value="">Plateforme preferee (optionnel)</option>
            {ossema.streaming.map((platform) => <option key={platform.name} value={platform.name}>{platform.name}</option>)}
          </select>

          <label className="flex items-start gap-3 text-left cursor-pointer group">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} required className="mt-1 size-4 shrink-0 accent-ink cursor-pointer" aria-describedby="consent-text" />
            <span id="consent-text" className="text-xs text-muted-foreground leading-relaxed">
              J'accepte que {ossema.label} traite mon adresse email pour m'envoyer des actualites sur {ossema.artist}. Je peux me desinscrire a tout moment via le lien present dans chaque email. Voir la{" "}
              <Link to={ossema.newsletter.privacyPath} className="underline hover:text-ink transition-colors">politique de confidentialite</Link>.
            </span>
          </label>
        </form>
      </div>
    </section>
  );
};

export default FanList;
