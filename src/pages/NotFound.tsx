import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import PageSeo from "@/components/seo/PageSeo";
import { ossema } from "@/data/ossema";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="min-h-screen bg-vellum text-ink flex items-center justify-center px-6">
      <PageSeo
        title={`Page introuvable | ${ossema.artist}`}
        description="La page demandee n'existe pas ou n'est plus disponible."
        image={ossema.site.ogImage}
        noIndex
      />
      <div className="max-w-xl text-center">
        <p className="caption opacity-50 mb-4">Erreur 404</p>
        <h1 className="font-serif-display text-5xl md:text-7xl italic tracking-tighter mb-6">
          Cette page s'est perdue dans la nuit.
        </h1>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-8">
          L'URL <span className="text-ink">{location.pathname}</span> n'est pas disponible. Reviens au point d'entree principal pour relancer l'experience.
        </p>
        <Link
          to="/"
          className="silver-border inline-block bg-ink text-vellum px-8 py-4 caption font-bold hover:bg-foreground/90 transition-colors"
        >
          Retour a l'accueil
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
