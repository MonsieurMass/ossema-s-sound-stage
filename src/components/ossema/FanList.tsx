import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const emailSchema = z
  .string()
  .trim()
  .email({ message: "Adresse email invalide" })
  .max(254, { message: "Email trop long" });

const FanList = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    const { error } = await supabase
      .from("fan_subscribers")
      .insert({
        email: parsed.data.toLowerCase(),
        artist: "ossema",
        source: "landing",
      });
    setLoading(false);

    if (error) {
      if (error.code === "23505") {
        toast.success("Vous êtes déjà dans le cercle.");
        setDone(true);
        return;
      }
      toast.error("Une erreur est survenue. Réessayez.");
      return;
    }
    setDone(true);
    toast.success("Bienvenue dans le cercle.");
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

        {done ? (
          <div className="silver-border py-8 px-6 inline-block">
            <p className="font-serif-display italic text-2xl">
              Bienvenue. Vous êtes du cercle.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 md:gap-4 max-w-xl mx-auto">
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
          </form>
        )}
      </div>
    </section>
  );
};

export default FanList;
