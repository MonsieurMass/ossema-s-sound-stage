import { lazy, Suspense, useEffect } from "react";
import Nav from "@/components/ossema/Nav";
import Hero from "@/components/ossema/Hero";
import Player from "@/components/ossema/Player";
import Meta from "@/components/seo/Meta";
import { ossema } from "@/data/ossema";
import { useAudio } from "@/audio/AudioProvider";
import { trackEvent } from "@/lib/analytics";

const MiniPlayer = lazy(() => import("@/components/ossema/MiniPlayer"));
const Lyrics = lazy(() => import("@/components/ossema/Lyrics"));
const Artist = lazy(() => import("@/components/ossema/Artist"));
const VideoSection = lazy(() => import("@/components/ossema/VideoSection"));
const StudioSection = lazy(() => import("@/components/ossema/StudioSection"));
const MerchSection = lazy(() => import("@/components/ossema/MerchSection"));
const PreSave = lazy(() => import("@/components/ossema/PreSave"));
const Streaming = lazy(() => import("@/components/ossema/Streaming"));
const CommunityPresence = lazy(() => import("@/components/ossema/CommunityPresence"));
const FanList = lazy(() => import("@/components/ossema/FanList"));
const Footer = lazy(() => import("@/components/ossema/Footer"));

const SectionFallback = () => <div className="h-16" aria-hidden="true" />;

const Index = () => {
  const { currentTime } = useAudio();
  const description = `${ossema.artist} presente ${ossema.release.title}, porte d'entree dans ${ossema.release.album}: player, paroles synchronisees, clip officiel et fan list.`;

  useEffect(() => {
    trackEvent("page_view", { page: "index" });
  }, []);

  return (
    <>
      <Meta
        title={`${ossema.artist} | ${ossema.release.title} | ${ossema.label}`}
        description={description}
        image={ossema.site.ogImage}
        url={ossema.site.url || undefined}
        type="music.song"
      />
      <main className="min-h-screen bg-vellum text-ink overflow-x-hidden">
        <Nav />
        <Hero />
        <Player />
        <Suspense fallback={<SectionFallback />}>
          <Lyrics currentTime={currentTime} />
          <Artist />
          <VideoSection />
          <StudioSection />
          <MerchSection />
          <PreSave />
          <Streaming />
          <CommunityPresence />
          <FanList />
          <Footer />
          <MiniPlayer />
        </Suspense>
      </main>
    </>
  );
};

export default Index;
