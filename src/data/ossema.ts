import portrait from "@/assets/ossema-portrait.jpg";
import cover from "@/assets/ossema-cover.jpg";
import videoStill from "@/assets/ossema-video-still.jpg";

export type LyricLine = { time: number; text: string };

export const ossema = {
  artist: "OSSEMA",
  label: "Kymia Music",
  release: {
    title: "L'Hiver en Mai",
    track: "01",
    album: "Noir Vif",
    duration: 222, // seconds (3:42)
    cover,
    portrait,
    videoStill,
    youtubeId: "", // placeholder — paste real ID later
    audioUrl: "", // placeholder — paste real mp3 URL (Lovable Cloud Storage) later
    presaveUrl: "#", // placeholder — paste Linkfire / Feature.fm pre-save link
    releaseDate: "Disponible maintenant", // ou "Sortie le 14.06"
  },
  lyrics: [
    { time: 0,   text: "J'ai troqué mes rêves contre une montre en argent" },
    { time: 14,  text: "Le ciel est de plomb, le bitume est trop grand" },
    { time: 28,  text: "On marche sur l'eau quand le fleuve est de sang" },
    { time: 42,  text: "Noir vif est l'éclat de nos cœurs impatients" },
    { time: 58,  text: "Paris dort sous une pluie de néon blanc" },
    { time: 74,  text: "J'écris au stylo bille sur la paume du temps" },
    { time: 90,  text: "Maman m'a dit fils, fais doux mais fais grand" },
    { time: 106, text: "Le silence est l'arme des plus patients" },
    { time: 124, text: "On vient de loin, on n'y retourne pas vraiment" },
    { time: 140, text: "Kymia dans les veines, le sang devient diamant" },
    { time: 158, text: "Les phares balaient mes doutes en passant" },
    { time: 176, text: "Je laisse mes regrets au coin d'un boulevard absent" },
    { time: 196, text: "Hiver en mai, c'est la saison qu'on invente" },
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
