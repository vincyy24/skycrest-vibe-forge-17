import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-gaming-cafe.jpg";
import gamingCafeLogo from "@/assets/gaming-cafe-logo.svg"; // Importing the logo

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/80"></div>
        <div className="absolute inset-0 grid-lines opacity-20"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center space-y-8 px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-8xl font-orbitron font-black tracking-tight">
          <span className="block neon-text">WELCOME TO</span>
          <div className="relative grid place-items-center">
            <img
              src={gamingCafeLogo}
              alt="Skycrest Gaming Cafe Logo"
              className="block mx-auto w-80 md:w-[30rem] col-start-1 row-start-1"
              style={{ filter: 'drop-shadow(0 0 8px #f59e0b ) drop-shadow(0 0 15px #f59e0b )' }}
            />
          </div>
        </h1>

        <p className="text-xl md:text-2xl font-titillium text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Where vibes meet victory. Plug in, power up, and play on.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
          <Button
            onClick={() => scrollToSection("arena")}
            className="btn-gaming text-lg px-10 py-6"
          >
            Explore Arena
          </Button>
          <Button asChild className="btn-outline-gaming text-lg px-10 py-6">
            <a href="https://skycrest.booking.enes.tech/authentication" target="_blank" rel="noopener noreferrer">
              Book Your Slot
            </a>
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button
          onClick={() => scrollToSection("about")}
          className="p-2 rounded-full glass-card hover:bg-primary/20 transition-colors"
        >
          <ChevronDown className="w-6 h-6 text-primary" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;