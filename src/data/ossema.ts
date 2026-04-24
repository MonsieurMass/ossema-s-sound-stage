import portrait from "@/assets/ossema-portrait.jpg";
import cover from "@/assets/ossema-cover.jpg";
import videoStill from "@/assets/ossema-video-still.jpg";

export type LyricLine = { time: number; text: string };
export type PlatformLink = { name: string; url: string; code: string };
export type SocialLink = { name: string; url: string };
export type Credit = { label: string; value: string };
export type TimelineEntry = {
  date: string;
  title: string;
  description: string;
  type: "release" | "event" | "upcoming";
};
export type StudioPhoto = { image: string; caption: string; meta: string };
export type MerchSize = { label: string; available: boolean };
export type MerchProduct = {
  slug: string;
  name: string;
  price: string;
  edition: string;
  description: string;
  image: string;
  available: boolean;
  dropDateTime?: string;
  sizes: MerchSize[];
};

export const ossema = {
  artist: "OSSEMA",
  label: "Kymia Music",
  city: "Paris",
  site: {
    url: "",
    ogImage: "/og-image.svg",
    locale: "fr_FR",
  },
  legal: {
    postalAddress: "[adresse postale a completer]",
    hostName: "[hebergeur a completer]",
    hostAddress: "[adresse de l'hebergeur a completer]",
  },
  newsletter: {
    artistSlug: "ossema",
    source: "landing",
    table: "fan_subscribers",
    storageKey: "ossema:subscribed",
    privacyPath: "/confidentialite",
  },
  release: {
    title: "La Nuit",
    track: "01",
    album: "Noir Vif",
    duration: 222,
    cover,
    portrait,
    videoStill,
    youtubeId: "",
    audioUrl: "",
    presaveUrl: "",
    releaseDate: "Sortie le 8 mai 2026",
    releaseDateISO: "2026-05-08",
    releaseDateTime: "2026-05-08T00:00:00+02:00",
    description:
      "Single de lancement d'Ossema: une piece nocturne, frontale et cinematographique, pensee comme porte d'entree dans l'univers Noir Vif.",
  },
  editorial: {
    signature: "Signature 001",
    eyebrow: "Rap francais contemporain · nuit · foi · tension",
    story: [
      "Ossema ecrit la nuit, la ou la rue rencontre le sacre. Voix grave, plume au scalpel, il assemble la foi, la perte, le desir et la survie dans un meme souffle.",
      "La Nuit ouvre le cycle Noir Vif avec une esthetique de campagne qui doit pouvoir servir a chaque sortie: un morceau central, un visuel fort, un point de conversion et des preuves de monde autour du projet.",
    ],
  },
  credits: [
    { label: "Ecrit par", value: "Ossema" },
    { label: "Production", value: "Kymia Lab" },
    { label: "Mix / Master", value: "Studio Onyx" },
    { label: "Label", value: "Kymia Music" },
  ] as Credit[],
  timeline: [
    {
      date: "2024",
      title: "Soleil Triste",
      description: "Premier projet publie. Le moment ou la documentation musicale commence vraiment.",
      type: "release",
    },
    {
      date: "2025",
      title: "MWSA — Man Who Saw Angels",
      description: "L'EP en cours. Acronyme fondateur de l'identite OSSEMA, entre vision mystique et rage urbaine.",
      type: "event",
    },
    {
      date: "8 Mai 2026",
      title: "La Nuit",
      description: "Premier single de Noir Vif, pense comme un portail: clip, parole, fan list et objets de campagne.",
      type: "release",
    },
    {
      date: "A venir",
      title: "Noir Vif",
      description: "L'album complet. Le point de convergence de la direction sonore, visuelle et narrative d'OSSEMA.",
      type: "upcoming",
    },
  ] as TimelineEntry[],
  studioPhotos: [
    { image: portrait, caption: "Prise de voix a 3h17, les lumieres coupees sauf le rouge.", meta: "Paris · Nuit 01" },
    { image: videoStill, caption: "Storyboards, reperages et intentions de cadre pour Kymia Films.", meta: "Clip · Atelier" },
    { image: cover, caption: "La cover comme boussole: vellum, noir, blessure et froideur noble.", meta: "Artwork · Noir Vif" },
    { image: portrait, caption: "Le regard doit rester frontal, jamais decoratif. Tout part de la posture.", meta: "Portrait · Session" },
  ] as StudioPhoto[],
  products: [
    {
      slug: "hoodie-noir-vif-001",
      name: "Hoodie Noir Vif",
      price: "95 €",
      edition: "001 / 47",
      description: "Piece lourde, coupe droite, noir charbon, marquage bordeaux ton-sur-ton. Pensee comme extension textile du single.",
      image: portrait,
      available: true,
      dropDateTime: "2026-05-08T18:00:00+02:00",
      sizes: [
        { label: "XS", available: false },
        { label: "S", available: true },
        { label: "M", available: true },
        { label: "L", available: true },
        { label: "XL", available: false },
      ],
    },
    {
      slug: "tee-la-nuit-002",
      name: "Tee La Nuit",
      price: "48 €",
      edition: "002 / 90",
      description: "T-shirt noir dense, impression frontale minimale, dos typographique inspire des credits de fin et des affiches de cinema noir.",
      image: cover,
      available: false,
      sizes: [
        { label: "XS", available: false },
        { label: "S", available: false },
        { label: "M", available: false },
        { label: "L", available: false },
        { label: "XL", available: false },
      ],
    },
  ] as MerchProduct[],
  merci: {
    genesis: [
      "La Nuit est nee d'un besoin de donner une forme digne a ce qui d'habitude reste enfoui: les visions, la foi fendue, la rue qui appelle et le silence apres les coups.",
      "Le morceau a ete construit comme un tunnel. Peu d'air, peu de lumiere, mais une avancee nette. Chaque phrase devait porter du poids.",
      "La landing, le clip et les objets ne servent qu'a une chose: amplifier cette premiere entree dans Noir Vif sans en trahir la gravite.",
    ],
    productionNotes: [
      "BPM: 142 — respiration lente sur batterie coupee nette.",
      "Texture voulue: chaud sur la voix, froid dans l'espace, impression d'etre seul au milieu d'une ville encore allumee.",
      "Arrangement pense pour le casque et les phares, pas pour le bruit de fond.",
    ],
    exclusiveEvent: "Listening session privee Kymia Music — Paris — invitations communiquees en priorite a la fan list.",
    shareMessage:
      "Je viens d'entrer dans l'univers de La Nuit d'OSSEMA. Single, paroles, clip et fan access sur:",
  },
  altVersions: [
    { label: "Master", url: "" },
    { label: "Instrumental", url: "" },
    { label: "Acapella", url: "" },
  ],
  lyrics: [
    { time: 0, text: "Au scalpel ils ont decortique chacun d'mes reves de gloire" },
    { time: 8, text: "Mes cicatrices sous du Versace en soie" },
    { time: 14, text: "Mon coeur ne veut plus voir la couleur de mes sentiments" },
    { time: 22, text: "Dans l'theatre de mes cauchemars" },
    { time: 28, text: "J'suis l'acteur d'un film triste que j'n'ai plus envie de revoir" },
    { time: 36, text: "Mais bebe remue tes fesses et danse" },
    { time: 42, text: "Quand bouge ton corps j'ressens la trique" },
    { time: 48, text: "L'envie d'louer Dieu comme le frere Patrice" },
    { time: 54, text: "J'pense a mon pere devant un verre d'Henny" },
    { time: 60, text: "Nes dans l'paradis des damnes mais on m'dit que j'suis beni" },
    { time: 68, text: "Sortis du ventre deja condamne" },
    { time: 74, text: "Faut qu'les billets pleuvent sur ma vie" },
    { time: 80, text: "Un parasite d'base sympathique, devisage par Melanie" },
    { time: 88, text: "Donc on s'refugie aupres la rue, elle nous choisit pour ecrire ses crimes" },
    { time: 96, text: "On dessine nos vies dans l'obscurite" },
    { time: 102, text: "On trouvera pas la lumiere dans c'monde deja un peu trop fissure" },
    { time: 110, text: "Ou la foi s'enterre a nos cotes" },
    { time: 118, text: "Dans un monde fissure j'avance sans lumiere" },
    { time: 124, text: "Beni maudit j'sais plus trop c'que j'suis cense faire" },
    { time: 130, text: "La nuit me saigne, la nuit m'appelle" },
    { time: 136, text: "La nuit m'enseigne comment mettre l'doigt sur l'revolver" },
    { time: 148, text: "Et la rue m'appelle, me dit que j'dois tomber pour elle" },
    { time: 156, text: "Elle veut m'faire croire qu'elle sera une pute fidele" },
    { time: 164, text: "Mais pas sur qu'elle se mouille quand mon sang coulera sous l'ciel" },
    { time: 172, text: "Elle m'donne les chaines pour pouvoir m'ken" },
    { time: 180, text: "J'ai vu mes anges prier l'argent comme une idole" },
    { time: 188, text: "J'entends ma mere pleurer, comprenez que j'rap la rage qui me devore" },
    { time: 196, text: "J'ai accepte qu'la vie n'm'aime pas quand j'ai vu mon pere sur le sol" },
    { time: 204, text: "Non papa n'reviendra pas, il est parti comme lil bro Yas" },
    { time: 212, text: "Il n'me reste qu'des images, des souvenirs" },
    { time: 218, text: "Donc Marie stp prie moi" },
    { time: 224, text: "J'ai mis mes mano dans la merde, mon majeur en l'air au ciel" },
    { time: 232, text: "Car mes prieres sont en sourdine" },
    { time: 238, text: "Au paradis les murs n'ont surement pas d'oreilles" },
    { time: 248, text: "Dans un monde fissure j'avance sans lumiere" },
    { time: 254, text: "Beni maudit j'sais plus trop c'que j'suis cense faire" },
    { time: 260, text: "La nuit me saigne, la nuit m'appelle" },
    { time: 266, text: "La nuit m'enseigne comment mettre l'doigt sur l'revolver" },
  ] as LyricLine[],
  streaming: [
    { name: "Spotify", url: "", code: "01" },
    { name: "Apple Music", url: "", code: "02" },
    { name: "Deezer", url: "", code: "03" },
    { name: "YouTube", url: "", code: "04" },
  ] as PlatformLink[],
  social: [
    { name: "Instagram", url: "" },
    { name: "TikTok", url: "" },
    { name: "YouTube", url: "" },
  ] as SocialLink[],
};

export const isUrlReady = (url?: string) => Boolean(url && url.trim() && url !== "#");

export const getReleaseTimestamp = () => new Date(ossema.release.releaseDateTime).getTime();

export const isReleaseOut = (now = Date.now()) => now >= getReleaseTimestamp();

export const getAvailableStreamingLinks = () =>
  ossema.streaming.filter((platform) => isUrlReady(platform.url));

export const getAvailableSocialLinks = () =>
  ossema.social.filter((social) => isUrlReady(social.url));

export const formatTime = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
};
