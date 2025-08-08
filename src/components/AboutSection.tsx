const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 fade-in-up">
            <div>
              <h2 className="text-5xl font-orbitron font-bold mb-6">
                <span className="text-primary">Our</span> Mission
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
            </div>

            <div className="space-y-6 text-lg text-muted-foreground font-saira leading-relaxed">
              <p>
                At Skycrest, tradition fuses with tomorrow—every frame, every fiber, 
                crafted for the connoisseur of competition.
              </p>
              <p>
                We believe gaming is more than entertainment; it's an art form, a culture, 
                and a community. Our state-of-the-art facility provides the perfect 
                environment where casual players and esports professionals unite.
              </p>
              <p>
                From high-refresh gaming rigs to immersive console experiences, 
                every detail is designed to elevate your gaming journey.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-orbitron font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Gaming Stations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-orbitron font-bold text-secondary">24/7</div>
                <div className="text-sm text-muted-foreground">Open Daily</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-orbitron font-bold text-primary">4K</div>
                <div className="text-sm text-muted-foreground">Ultra HD</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="glass-card p-8 rounded-2xl">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-primary rounded-full glow-pulse"></div>
                  </div>
                  <p className="text-primary font-orbitron font-semibold">
                    Experience the Future of Gaming
                  </p>
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 border-2 border-secondary rounded-lg opacity-30"></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 border-2 border-primary rounded-lg opacity-30"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;