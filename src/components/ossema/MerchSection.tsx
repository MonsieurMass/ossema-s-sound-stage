import { useEffect, useMemo, useState } from "react";
import { ossema } from "@/data/ossema";
import { supabase, isSupabaseConfigured } from "@/integrations/supabase/client";
import { trackEvent } from "@/lib/analytics";
import { toast } from "sonner";

const getCountdown = (target?: string) => {
  if (!target) return null;
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return null;
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  return `${days}j ${hours}h`;
};

const MerchSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const products = ossema.products;
  const activeProduct = products[activeIndex];

  useEffect(() => {
    setSelectedSize(activeProduct?.sizes.find((size) => size.available)?.label ?? null);
  }, [activeIndex, activeProduct]);

  const countdown = useMemo(() => getCountdown(activeProduct?.dropDateTime), [activeProduct]);

  if (!products.length) return null;

  const handleSizeSelect = async (size: string) => {
    setSelectedSize(size);
    await trackEvent("merch_size_select", { product: activeProduct.slug, size });
  };

  const handleWaitlist = async () => {
    if (!email.trim()) {
      toast.error("Entre une adresse email pour rejoindre la liste d'attente.");
      return;
    }
    if (!isSupabaseConfigured || !supabase) {
      toast.error("Supabase n'est pas configure pour la waitlist merch.");
      return;
    }

    const { error } = await supabase.from("merch_waitlist").upsert({
      email: email.trim().toLowerCase(),
      product_slug: activeProduct.slug,
      size: selectedSize,
      consent_given: true,
    });

    if (error) {
      toast.error("Impossible d'enregistrer la demande pour le moment.");
      return;
    }

    toast.success("Tu es dans la liste d'attente merch.");
    setEmail("");
  };

  return (
    <section id="merch" data-animate="fade-up" className="py-24 md:py-32 px-6 md:px-10 border-t border-border bg-vellum">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-12">
          <div>
            <p className="caption text-signature mb-3">Kymia · Edition limitee</p>
            <h2 className="font-serif-display text-4xl md:text-6xl italic tracking-tighter">Objets de campagne</h2>
          </div>
          <div className="flex gap-2">
            {products.map((product, index) => (
              <button
                key={product.slug}
                onClick={() => setActiveIndex(index)}
                className={`size-2 rounded-full transition-all ${index === activeIndex ? "bg-signature w-8" : "bg-border"}`}
                aria-label={`Aller au produit ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 md:gap-12 items-stretch">
          <div className="relative overflow-hidden silver-border bg-ink min-h-[420px] group">
            <img
              src={activeProduct.image}
              alt={activeProduct.name}
              className="w-full h-full object-cover grayscale transition-all duration-[800ms] group-hover:grayscale-0"
            />
          </div>

          <div className="flex flex-col justify-between gap-8">
            <div>
              {countdown ? <p className="caption text-signature mb-4">Disponible dans {countdown}</p> : null}
              <p className="caption opacity-40 mb-3">Piece {activeProduct.edition}</p>
              <h3 className="font-serif-display text-4xl md:text-5xl italic tracking-tight mb-4">{activeProduct.name}</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">{activeProduct.description}</p>
              <p className="font-serif-display text-3xl italic text-signature">{activeProduct.price}</p>
            </div>

            <div className="space-y-6">
              <div className="flex flex-wrap gap-3">
                {activeProduct.sizes.map((size) => (
                  <button
                    key={size.label}
                    onClick={() => size.available && handleSizeSelect(size.label)}
                    disabled={!size.available}
                    className={`relative size-12 border border-border caption flex items-center justify-center transition-colors ${
                      selectedSize === size.label ? "bg-ink text-vellum" : "bg-transparent"
                    } ${!size.available ? "opacity-40 line-through" : "hover:bg-ink hover:text-vellum"}`}
                  >
                    {size.label}
                  </button>
                ))}
              </div>

              {activeProduct.available ? (
                <button className="w-full bg-signature text-vellum px-6 py-4 caption font-bold hover:bg-signature-glow transition-colors">
                  Acquerir la piece
                </button>
              ) : (
                <div className="space-y-3">
                  <p className="caption text-signature">Epuise — Rejoindre la liste d'attente</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre adresse email"
                      className="flex-1 border border-border bg-transparent px-4 py-3"
                    />
                    <button onClick={handleWaitlist} className="bg-ink text-vellum px-6 py-3 caption font-bold hover:bg-midnight transition-colors">
                      Rejoindre
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MerchSection;
