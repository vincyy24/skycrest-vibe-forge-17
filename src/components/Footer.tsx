import { MapPin, Phone, Mail, MapPinIcon } from "lucide-react";
import skycrestLogo from "@/assets/gaming-cafe-logo.svg";

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-background border-t border-border py-12 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="grid place-items-start">
              <img
                src={skycrestLogo}
                alt="Skycrest Gaming Cafe Logo"
                className="w-44 h-auto grow max-h-32 col-start-1 row-start-1"
                style={{ filter: 'drop-shadow(0 0 4px #87CEEB) drop-shadow(0 0 15px #B0E0E6)' }}
              />
            </div>
            <p className="text-muted-foreground font-saira leading-relaxed">
              Where vibes meet victory. The ultimate gaming destination in
              Faridabad.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center cursor-pointer hover:bg-primary/30 transition-colors">
                <span className="font-orbitron font-bold text-primary text-sm">
                  IG
                </span>
              </div>
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center cursor-pointer hover:bg-primary/30 transition-colors">
                <span className="font-orbitron font-bold text-primary text-sm">
                  DC
                </span>
              </div>
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center cursor-pointer hover:bg-primary/30 transition-colors">
                <span className="font-orbitron font-bold text-primary text-sm">
                  YT
                </span>
              </div>
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center cursor-pointer hover:bg-primary/30 transition-colors">
                <span className="font-orbitron font-bold text-primary text-sm">
                  WA
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-rajdhani font-semibold text-primary">
              Quick Links
            </h4>
            <div className="space-y-2">
              <button
                onClick={() => scrollToSection("arena")}
                className="block text-muted-foreground hover:text-primary transition-colors font-saira"
              >
                Gaming Zones
              </button>
              <button
                onClick={() => scrollToSection("community")}
                className="block text-muted-foreground hover:text-primary transition-colors font-saira"
              >
                Tournaments
              </button>
              <a
                href="https://skycrest.booking.enes.tech/authentication"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-primary transition-colors font-saira"
              >
                Book Now
              </a>
            </div>
          </div>

          {/* Gaming Zones */}
          <div className="space-y-4">
            <h4 className="text-lg font-rajdhani font-semibold text-primary">
              Gaming Zones
            </h4>
            <div className="space-y-2 text-muted-foreground font-saira">
              <div>PC Standard</div>
              <div>PC Plus</div>
              <div>Console Lounge</div>
              <div>Racing Simulator</div>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-rajdhani font-semibold text-primary">
              Contact Info
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm text-muted-foreground font-saira">
                  Skycrest Gaming Cafe, SCO 52, First Floor, Omaxe World Street,
                  Sector 79, Faridabad, Haryana - 121004
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground font-saira">
                  +91 96258 05997
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground font-saira">
                  hello@skycrestgaming.com
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-muted-foreground font-saira">
            &copy; 2025 Skycrest Gaming Café. All rights reserved. Built for
            gamers, by gamers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;