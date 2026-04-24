import portrait from "@/assets/ossema-portrait.jpg";
import cover from "@/assets/ossema-cover.jpg";
import videoStill from "@/assets/ossema-video-still.jpg";

export type LyricLine = { time: number; text: string };

export const ossema = {
  artist: "OSSEMA",
  label: "Kymia Music",
  release: {
    title: "La Nuit",
    track: "01",
    album: "Noir Vif",
    duration: 222, // seconds (3:42)
    cover,
    portrait,
    videoStill,
    youtubeId: "", // placeholder — paste real ID later
    audioUrl: "", // placeholder — paste real mp3 URL (Lovable Cloud Storage) later
    presaveUrl: "#", // placeholder — paste Linkfire / Feature.fm pre-save link
    releaseDate: "Sortie le 8 mai 2026",
    releaseDateISO: "2026-05-08",
  },
  lyrics: [
    // Couplet 1
    { time: 0,   text: "Au scalpel ils ont décortiqué chacun d'mes rêves de gloire" },
    { time: 8,   text: "Mes cicatrices sous du Versace en soie" },
    { time: 14,  text: "Mon cœur ne veut plus voir la couleur de mes sentiments" },
    { time: 22,  text: "Dans l'théâtre de mes cauchemars" },
    { time: 28,  text: "J'suis l'acteur d'un film triste que j'n'ai plus envie de revoir" },
    { time: 36,  text: "Mais bébé remue tes fesses et danse" },
    { time: 42,  text: "Quand bouge ton corps j'ressens la trique" },
    { time: 48,  text: "L'envie d'louer Dieu comme le frère Patrice" },
    { time: 54,  text: "J'pense à mon père devant un verre d'Henny" },
    { time: 60,  text: "Nés dans l'paradis des damnés mais on m'dit que j'suis béni" },
    { time: 68,  text: "Sortis du ventre déjà condamné" },
    { time: 74,  text: "Faut qu'les billets pleuvent sur ma vie" },
    { time: 80,  text: "Un parasite d'base sympathique, dévisagé par Mélanie" },
    { time: 88,  text: "Donc on s'réfugie auprès la rue, elle nous choisit pour écrire ses crimes" },
    { time: 96,  text: "On dessine nos vies dans l'obscurité" },
    { time: 102, text: "On trouvera pas la lumière dans c'monde déjà un peu trop fissuré" },
    { time: 110, text: "Où la foi s'enterre à nos côtés" },

    // Refrain
    { time: 118, text: "Dans un monde fissuré j'avance sans lumière" },
    { time: 124, text: "Béni maudit j'sais plus trop c'que j'suis censé faire" },
    { time: 130, text: "La nuit me saigne, la nuit m'appelle" },
    { time: 136, text: "La nuit m'enseigne comment mettre l'doigt sur l'revolver" },

    // Pont — la rue
    { time: 148, text: "Et la rue m'appelle, me dit que j'dois tomber pour elle" },
    { time: 156, text: "Elle veut m'faire croire qu'elle sera une pute fidèle" },
    { time: 164, text: "Mais pas sûr qu'elle se mouille quand mon sang coulera sous l'ciel" },
    { time: 172, text: "Elle m'donne les chaînes pour pouvoir m'ken" },

    // Couplet 2
    { time: 180, text: "J'ai vu mes anges prier l'argent comme une idole" },
    { time: 188, text: "J'entends ma mère pleurer, comprenez que j'rap la rage qui me dévore" },
    { time: 196, text: "J'ai accepté qu'la vie n'm'aime pas quand j'ai vu mon père sur le sol" },
    { time: 204, text: "Non papa n'reviendra pas, il est parti comme lil bro Yas" },
    { time: 212, text: "Il n'me reste qu'des images, des souvenirs" },
    { time: 218, text: "Donc Marie stp prie moi" },
    { time: 224, text: "J'ai mis mes mano dans la merde, mon majeur en l'air au ciel" },
    { time: 232, text: "Car mes prières sont en sourdine" },
    { time: 238, text: "Au paradis les murs n'ont sûrement pas d'oreilles" },

    // Refrain final
    { time: 248, text: "Dans un monde fissuré j'avance sans lumière" },
    { time: 254, text: "Béni maudit j'sais plus trop c'que j'suis censé faire" },
    { time: 260, text: "La nuit me saigne, la nuit m'appelle" },
    { time: 266, text: "La nuit m'enseigne comment mettre l'doigt sur l'revolver" },
  ] as LyricLine[],
  streaming: [
    { name: "Spotify",     url: "#", code: "01" },
    { name: "Apple Music", url: "#", code: "02" },
    { name: "Deezer",      url: "#", code: "03" },
    { name: "YouTube",     url: "#", code: "04" },
  ],
  social: [
    { name: "Instagram", url: "#" },
    { name: "TikTok",    url: "#" },
    { name: "Twitter",   url: "#" },
  ],
};

export const formatTime = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
};
