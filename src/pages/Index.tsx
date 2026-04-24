import Nav from "@/components/ossema/Nav";
import Hero from "@/components/ossema/Hero";
import Player, { usePlaybackClock } from "@/components/ossema/Player";
import Lyrics from "@/components/ossema/Lyrics";
import VideoSection from "@/components/ossema/VideoSection";
import Streaming from "@/components/ossema/Streaming";
import FanList from "@/components/ossema/FanList";
import Footer from "@/components/ossema/Footer";
import { ossema } from "@/data/ossema";
import { useEffect } from "react";

const Index = () => {
  const { time, playing, toggle, seek } = usePlaybackClock();

  // SEO
  useEffect(() => {
    document.title = `${ossema.artist} — ${ossema.release.title} | ${ossema.label}`;
    const desc = `Nouveau single d'${ossema.artist} : ${ossema.release.title}. Écoute, paroles synchronisées et clip officiel. Rejoignez le cercle.`;
    let m = document.querySelector('meta[name="description"]');
    if (!m) {
      m = document.createElement("meta");
      m.setAttribute("name", "description");
      document.head.appendChild(m);
    }
    m.setAttribute("content", desc);
  }, []);

  return (
    <main className="min-h-screen bg-vellum text-ink">
      <Nav />
      <Hero />
      <Player
        currentTime={time}
        isPlaying={playing}
        onToggle={toggle}
        onSeek={seek}
      />
      <Lyrics currentTime={time} />
      <VideoSection />
      <Streaming />
      <FanList />
      <Footer />
    </main>
  );
};

export default Index;
