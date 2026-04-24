import Nav from "@/components/ossema/Nav";
import Hero from "@/components/ossema/Hero";
import Player from "@/components/ossema/Player";
import MiniPlayer from "@/components/ossema/MiniPlayer";
import Lyrics from "@/components/ossema/Lyrics";
import Artist from "@/components/ossema/Artist";
import VideoSection from "@/components/ossema/VideoSection";
import PreSave from "@/components/ossema/PreSave";
import Streaming from "@/components/ossema/Streaming";
import FanList from "@/components/ossema/FanList";
import Footer from "@/components/ossema/Footer";
import PageSeo from "@/components/seo/PageSeo";
import { ossema } from "@/data/ossema";
import { useAudio } from "@/audio/AudioProvider";

const Index = () => {
  const { currentTime } = useAudio();
  const description = `${ossema.artist} presente ${ossema.release.title}, porte d'entree dans ${ossema.release.album}: player, paroles synchronisees, clip officiel et fan list.`;

  return (
    <>
      <PageSeo
        title={`${ossema.artist} | ${ossema.release.title} | ${ossema.label}`}
        description={description}
        image={ossema.site.ogImage}
        url={ossema.site.url || undefined}
      />
      <main className="min-h-screen bg-vellum text-ink">
        <Nav />
        <Hero />
        <Player />
        <Lyrics currentTime={currentTime} />
        <Artist />
        <VideoSection />
        <PreSave />
        <Streaming />
        <FanList />
        <Footer />
        <MiniPlayer />
      </main>
    </>
  );
};

export default Index;
