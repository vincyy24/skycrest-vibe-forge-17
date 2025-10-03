import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Monitor, Cpu, Headphones, Wifi, Gauge } from "lucide-react";
import pcStandardImage from "@/assets/pc-standard-row.jpg";
import pcPlusImage from "@/assets/pc-plus-white.jpg";
import consoleLoungeImage from "@/assets/console-lounge.jpg";
import racingSimImage from "@/assets/racing-sim.jpg";

const ArenaZones = () => {
  const zones = [
    {
      id: 1,
      title: "PC Standard",
      subtitle: "240 Hz rigs, Green Soul chairs",
      image: pcStandardImage,
      specs: [
        { icon: Cpu, label: "RTX 3070 Ti", detail: "AMD Ryzen 7 7700x" },
        { icon: Monitor, label: "240Hz 99% sRGB Dell Alienware", detail: "25\" FHD Gaming Monitor" },
        { icon: Headphones, label: "Logitech G PRO X", detail: "Gaming Headset" },
        { icon: Wifi, label: "1 Gbps", detail: "Fiber Internet" }
      ],
      align: "left"
    },
    {
      id: 2,
      title: "PC Plus",
      subtitle: "Liquid-cooled beasts, RGB unleashed",
      image: pcPlusImage,
      specs: [
        { icon: Cpu, label: "RTX 4080", detail: "AMD Ryzen 9 7950x3D" },
        { icon: Monitor, label: "240Hz 99% sRGB Dell Alienware", detail: "25\" FHD Gaming Monitor" },
        { icon: Headphones, label: "Logitech G PRO X", detail: "Gaming Headset" },
        { icon: Wifi, label: "1 Gbps", detail: "Ultra-Low Latency" }
      ],
      align: "right"
    },
    {
      id: 3,
      title: "Console Lounge",
      subtitle: "4K HDR on 50\" OLEDs, couch-ready",
      image: consoleLoungeImage,
      specs: [
        { icon: Monitor, label: "50\" FULL HD", detail: "4K 60Hz HDR" },
        { icon: Cpu, label: "PS5 & Xbox X", detail: "Series X Available" },
        { icon: Headphones, label: "Premium Audio", detail: "Dolby Audio" },
        { icon: Wifi, label: "Wireless", detail: "DualSense & Elite" }
      ],
      align: "left"
    },
    {
      id: 4,
      title: "Racing Sim",
      subtitle: "True-force wheels, pedal-to-metal",
      image: racingSimImage,
      specs: [
        { icon: Monitor, label: "49\" LED", detail: "Full HD Experience" },
        { icon: Cpu, label: "Direct Drive", detail: "Force Feedback" },
        { icon: Headphones, label: "3-Pedal", detail: "Clutch, Brake, Gas" },
        { icon: Gauge, label: "Racing Sim", detail: "Wheel + Shifter Setup" }
      ],
      align: "right"
    }
  ];

  return (
    <section id="arena" className="py-20 px-6 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-orbitron font-bold mb-6">
            <span className="text-primary">Gaming</span> Zones
          </h2>
          <p className="text-xl text-muted-foreground font-saira max-w-2xl mx-auto">
            Choose your battlefield. Each zone crafted for the ultimate gaming experience.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mt-6"></div>
        </div>

        <div className="space-y-20">
          {zones.map((zone, index) => (
            <div
              key={zone.id}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                zone.align === "right" ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image Side */}
              <div className={`relative ${zone.align === "right" ? "lg:order-2" : ""}`}>
                <div className="relative overflow-hidden rounded-2xl group">
                  <img
                    src={zone.image}
                    alt={zone.title}
                    className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
                  
                  {/* Floating Badge */}
                  <Badge className="absolute top-4 left-4 bg-primary/90 text-primary-foreground font-orbitron">
                    Zone {zone.id}
                  </Badge>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 border-2 border-primary/30 rounded-lg"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 border-2 border-secondary/30 rounded-lg"></div>
              </div>

              {/* Content Side */}
              <div className={`space-y-8 ${zone.align === "right" ? "lg:order-1" : ""}`}>
                <div>
                  <h3 className="text-4xl font-orbitron font-bold text-foreground mb-4">
                    {zone.title}
                  </h3>
                  <p className="text-xl text-secondary font-rajdhani font-medium mb-6">
                    {zone.subtitle}
                  </p>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {zone.specs.map((spec, specIndex) => (
                    <Card key={specIndex} className="glass-card hover:bg-primary/5 transition-colors">
                      <CardContent className="p-4 flex items-center space-x-3">
                        <div className="p-2 bg-primary/20 rounded-lg">
                          <spec.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-rajdhani font-semibold text-foreground">
                            {spec.label}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {spec.detail}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="pt-4">
                  <div className="inline-flex items-center space-x-2 text-primary font-rajdhani font-medium">
                    <span>Experience the difference</span>
                    <div className="w-2 h-2 bg-primary rounded-full glow-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArenaZones;
