import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Gallery from "@/components/Gallery";
import AboutSection from "@/components/AboutSection";
import ArenaZones from "@/components/ArenaZones";

import CommunitySection from "@/components/CommunitySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <HeroSection />
      <Gallery />
      <AboutSection />
      <ArenaZones />
      
      <CommunitySection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;