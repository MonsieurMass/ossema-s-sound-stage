# OSSEMA Sound Stage

Landing de sortie construite pour accompagner le lancement de `La Nuit`, premier point d'entree du cycle `Noir Vif`.

## Ce que contient le projet

- hero editorial avec CTA intelligents avant et apres la sortie
- player audio et paroles synchronisees
- bloc clip officiel
- pre-save / plateformes de streaming selon l'etat de campagne
- capture email vers Supabase
- pages de confidentialite et mentions legales
- base de contenu reutilisable pour les prochaines sorties

## Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase

## Lancer le projet

```bash
npm install
npm run dev
```

## Variables d'environnement

Creer un fichier `.env.local` avec:

```bash
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
```

Sans ces variables, la fan list n'enverra rien et l'interface affichera un message explicite au lieu de planter.

## Contenu a brancher avant mise en ligne

- `src/data/ossema.ts`
  - `release.audioUrl`
  - `release.youtubeId`
  - `release.presaveUrl`
  - `streaming[*].url`
  - `social[*].url`
  - `site.url`
  - `legal.*`
- `public/og-image.svg` si une direction social media plus specifique est disponible

## Logique de campagne

Le site fait maintenant la difference entre:

- pre-release: countdown, pre-save, capture fan list
- post-release: plateformes d'ecoute, clip, retention fan list

## Suite recommandee

- connecter les vrais liens audio / clip / plateformes
- brancher analytics et pixel media si besoin
- finaliser les coordonnees legales
- dupliquer la structure pour les prochaines sorties plutot que recreer une landing depuis zero
