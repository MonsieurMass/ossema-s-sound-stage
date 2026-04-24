import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const formSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Adresse email invalide" })
    .max(254, { message: "Email trop long" }),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Vous devez accepter pour recevoir nos emails" }),
  }),
});

const FanList = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = formSchema.safeParse({ email, consent });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }

    setLoading(true);
    const cleanEmail = parsed.data.email.toLowerCase();
    const { error } = await supabase.from("fan_subscribers").insert({
      email: cleanEmail,
      artist: "ossema",
      source: "landing",
      consent_given: true,
      consent_at: new Date().toISOString(),
    });
    setLoading(false);

    if (error && error.code !== "23505") {
      // 23505 = unique violation = already subscribed (treat as success)
      toast.error("Une erreur est survenue. Réessayez.");
      return;
    }

    // Persist email for the thank-you page (non-sensitive: just for display)
    sessionStorage.setItem("ossema:subscribed", cleanEmail);
    navigate("/merci");
  };

  return (
    <section id="cercle" className="py-32 md:py-48 px-6 md:px-10">
      <div className="max-w-2xl mx-auto text-center">
        <p className="caption opacity-50 mb-6">Liste privée</p>
        <h2 className="font-serif-display text-5xl md:text-6xl italic tracking-tighter mb-6">
          Rejoindre le cercle
        </h2>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-md mx-auto mb-12">
          Sorties en avant-première, demos non publiées, dates de tournée
          confidentielles et éditions limitées. Aucun spam, jamais.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
          <div className="flex flex-col md:flex-row gap-3 md:gap-4">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={254}
              placeholder="VOTRE ADRESSE EMAIL"
              className="flex-1 bg-transparent border-b border-border py-4 px-1 text-xs tracking-[0.25em] uppercase placeholder:text-muted-foreground focus:outline-none focus:border-ink transition-colors"
            />
            <button
              type="submit"
              disabled={loading}
              className="silver-border bg-ink text-vellum px-10 py-4 caption font-bold hover:bg-foreground/90 transition-colors disabled:opacity-50"
            >
              {loading ? "Envoi…" : "S'inscrire"}
            </button>
          </div>

          {/* RGPD consent */}
          <label className="flex items-start gap-3 text-left cursor-pointer group">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              required
              className="mt-1 size-4 shrink-0 accent-ink cursor-pointer"
              aria-describedby="consent-text"
            />
            <span id="consent-text" className="text-xs text-muted-foreground leading-relaxed">
              J'accepte que {`${ossemaLabel}`} traite mon adresse email pour
              m'envoyer des actualités sur Ossema (sorties, dates de tournée,
              éditions limitées). Je peux me désinscrire à tout moment via le
              lien présent dans chaque email. Voir notre{" "}
              <a href="#" className="underline hover:text-ink transition-colors">
                politique de confidentialité
              </a>
              .
            </span>
          </label>
        </form>
      </div>
    </section>
  );
};

const ossemaLabel = "Kymia Music";

export default FanList;
