import portrait from "@/assets/ossema-portrait.jpg";
import cover from "@/assets/ossema-cover.jpg";
import videoStill from "@/assets/ossema-video-still.jpg";

export type LyricLine = { time: number; text: string };
export type PlatformLink = { name: string; url: string; code: string };
export type SocialLink = { name: string; url: string };
export type Credit = { label: string; value: string };

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
