import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import SkycrestLogo from "@/assets/skycrest-logo.svg";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center relative">
            {/* Blurred glow effect behind */}
            <img 
              src={SkycrestLogo} 
              alt="" 
              className="absolute h-12 w-auto blur-md opacity-60"
              style={{ filter: 'invert(1) drop-shadow(0 0 15px #87CEEB) drop-shadow(0 0 25px #B0E0E6)' }}
            />
            {/* Main logo */}
            <img 
              src={SkycrestLogo} 
              alt="Skycrest Logo" 
              className="relative h-12 w-auto"
              style={{ filter: 'invert(1) drop-shadow(0 0 8px #87CEEB) drop-shadow(0 0 15px #B0E0E6)' }}
            />
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("arena")}
              className="text-foreground hover:text-primary transition-colors font-rajdhani font-medium"
            >
              Arena
            </button>
            <button
              onClick={() => scrollToSection("community")}
              className="text-foreground hover:text-primary transition-colors font-rajdhani font-medium"
            >
              Community
            </button>
            <button
              onClick={() => scrollToSection("booking")}
              className="text-foreground hover:text-primary transition-colors font-rajdhani font-medium"
            >
              Contact
            </button>
          </nav>

          <Button asChild className="btn-gaming hidden md:block">
            <a href="https://skycrest.booking.enes.tech/authentication" target="_blank" rel="noopener noreferrer">
              Book Now
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;