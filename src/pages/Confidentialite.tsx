import { Link } from "react-router-dom";
import PageSeo from "@/components/seo/PageSeo";
import { ossema } from "@/data/ossema";

const Confidentialite = () => (
  <main className="min-h-screen bg-vellum text-ink">
    <PageSeo
      title={`Politique de confidentialite | ${ossema.artist}`}
      description={`Politique de confidentialite de ${ossema.label} pour la fan list et les activations autour de ${ossema.artist}.`}
      image="/og-image.svg"
      url={ossema.site.url ? `${ossema.site.url}/confidentialite` : undefined}
    />

    <section className="px-6 md:px-10 py-16 border-b border-border">
      <div className="max-w-4xl mx-auto flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="caption opacity-50 mb-3">Cadre legal</p>
          <h1 className="font-serif-display text-4xl md:text-6xl italic tracking-tighter">
            Politique de confidentialite
          </h1>
        </div>
        <Link to="/" className="caption hover:text-signature transition-colors">
          Retour a l'accueil
        </Link>
      </div>
    </section>

    <section className="px-6 md:px-10 py-16 md:py-20">
      <div className="max-w-4xl mx-auto space-y-10 text-sm md:text-base leading-relaxed">
        <div>
          <h2 className="font-serif-display text-2xl italic mb-4">1. Responsable du traitement</h2>
          <p>
            Les donnees collectees via ce site sont traitees par {ossema.label}. Les informations d'identification
            complete du responsable de traitement doivent etre confirmees avant mise en production finale.
          </p>
          <p className="mt-3 text-muted-foreground">
            Coordonnees a completer: {ossema.legal.postalAddress}
          </p>
        </div>

        <div>
          <h2 className="font-serif-display text-2xl italic mb-4">2. Donnees collecteес</h2>
          <p>
            Lorsque vous rejoignez le cercle, nous collectons votre adresse email, la preuve de votre consentement,
            la date de souscription et la source de l'inscription.
          </p>
        </div>

        <div>
          <h2 className="font-serif-display text-2xl italic mb-4">3. Finalites</h2>
          <p>
            Ces donnees servent a vous envoyer des actualites autour de {ossema.artist}: sorties, clips, dates,
            editions limitees et contenus reserves a la fan list.
          </p>
        </div>

        <div>
          <h2 className="font-serif-display text-2xl italic mb-4">4. Base legale</h2>
          <p>
            Le traitement repose sur votre consentement explicite, donne au moment de l'inscription via le formulaire.
          </p>
        </div>

        <div>
          <h2 className="font-serif-display text-2xl italic mb-4">5. Conservation</h2>
          <p>
            Vos donnees sont conservees jusqu'au retrait de votre consentement ou jusqu'a nettoyage editorial de la base,
            selon la premiere echeance applicable.
          </p>
        </div>

        <div>
          <h2 className="font-serif-display text-2xl italic mb-4">6. Sous-traitance</h2>
          <p>
            Le formulaire de fan list utilise actuellement Supabase comme infrastructure technique de stockage.
            D'autres prestataires d'emailing peuvent etre connectes ensuite pour l'envoi des campagnes.
          </p>
        </div>

        <div>
          <h2 className="font-serif-display text-2xl italic mb-4">7. Vos droits</h2>
          <p>
            Vous pouvez demander l'acces, la rectification, l'effacement ou la limitation du traitement de vos donnees,
            ainsi que retirer votre consentement a tout moment.
          </p>
        </div>

        <div>
          <h2 className="font-serif-display text-2xl italic mb-4">8. Contact</h2>
          <p>
            Pour toute demande relative a vos donnees, utilisez les coordonnees officielles de {ossema.label} des que
            celles-ci auront ete publiees dans les mentions legales definitives.
          </p>
        </div>
      </div>
    </section>
  </main>
);

export default Confidentialite;
