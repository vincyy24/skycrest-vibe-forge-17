import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Trophy, Users, Quote } from "lucide-react";
import { tournaments as upcomingEvents } from "@/data/tournaments";

const CommunitySection = () => {

  const testimonials = [
    {
      name: "Divyansh Bihani",
      role: "Casual Gamer",
      text: "THE EXPERIENCE OF GAMING IS VERY AMAZING THE STAFF ARE VERY POLITE THE PRIZE ARE ALSO VERY AFFORDABLE.",
      rating: 5
    },
    {
      name: "Eeshan Pandey",
      role: "Pro Gamer",
      text: "Amazing place for Gaming with reasonable prices!! Highly recommend:)",
      rating: 5
    },
    {
      name: "Altaf khan",
      role: "Esports Enthusiast",
      text: "Nice setup and premium environment.",
      rating: 5
    }
  ];

  const achievements = [
    // { number: "100+", label: "Happy Gamers" },
    // { number: "50+", label: "Tournaments Hosted" },
    // { number: "₹5L+", label: "Prizes Distributed" },
    // { number: "24/7", label: "Gaming Support" }
  ];

  return (
    <section id="community" className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-orbitron font-bold mb-6">
            <span className="text-primary">Community</span> & Events
          </h2>
          <p className="text-xl text-muted-foreground font-saira max-w-2xl mx-auto">
            Join the ultimate gaming community. Compete, connect, and conquer together.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mt-6"></div>
        </div>

        {/* Achievements Grid */}
        {achievements.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center glass-card p-6 rounded-xl">
                <div className="text-3xl md:text-4xl font-orbitron font-bold text-primary mb-2">
                  {achievement.number}
                </div>
                <div className="text-sm text-muted-foreground font-rajdhani">
                  {achievement.label}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Upcoming Events */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-8">
              <Trophy className="w-8 h-8 text-secondary" />
              <h3 className="text-3xl font-orbitron font-bold">Upcoming Tournaments</h3>
            </div>

            <div className="space-y-4">
              {upcomingEvents.length === 0 ? (
                <Card className="glass-card p-6 text-center">
                  <CardContent className="p-0">
                    <div className="flex flex-col items-center gap-3">
                      <Trophy className="w-6 h-6 text-secondary" />
                      <p className="font-rajdhani text-lg">No upcoming tournaments yet</p>
                      <p className="text-sm text-muted-foreground font-saira">
                        Follow us for announcements and new event dates.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                upcomingEvents.map((event, index) => (
                  <Card key={index} className="glass-card hover:bg-primary/5 transition-colors">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-xl font-orbitron text-foreground">
                          {event.title}
                        </CardTitle>
                        <Badge
                          className={`font-rajdhani ${event.status === "Registration Open"
                            ? "bg-primary text-primary-foreground"
                            : event.status === "Early Bird"
                              ? "bg-secondary text-secondary-foreground"
                              : "bg-muted text-muted-foreground"
                            }`}
                        >
                          {event.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Trophy className="w-4 h-4 text-secondary" />
                          <span className="font-semibold">{event.prize}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-primary" />
                          <span>{event.participants}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* Testimonials */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-8">
              <Quote className="w-8 h-8 text-primary" />
              <h3 className="text-3xl font-orbitron font-bold">What Gamers Say</h3>
            </div>

            <div className="space-y-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="glass-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center font-orbitron font-bold text-white">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-rajdhani font-semibold text-foreground">
                            {testimonial.name}
                          </h4>
                          <Badge variant="outline" className="text-xs">
                            {testimonial.role}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground font-saira leading-relaxed mb-3">
                          "{testimonial.text}"
                        </p>
                        <div className="flex items-center space-x-1">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <div key={i} className="w-4 h-4 bg-secondary rounded-full"></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="mt-16 text-center glass-card p-8 rounded-2xl">
          <h3 className="text-2xl font-orbitron font-bold mb-4">
            Follow Us for Updates
          </h3>
          <p className="text-muted-foreground mb-6 font-saira">
            Stay connected with the latest tournaments, events, and gaming news.
          </p>
          <div className="flex justify-center space-x-6">
            <a href="https://www.google.com/search?q=Skycrest+Gaming+Cafe" target="_blank"
              rel="noopener noreferrer" className="h-12 p-2 bg-primary/20 rounded-lg flex items-center justify-center cursor-pointer hover:bg-primary/30 transition-colors">
              <span className="font-orbitron font-bold text-primary">Google</span>
            </a>

            <a href="https://www.instagram.com/skycrest_gaming_cafe" target="_blank"
              rel="noopener noreferrer">
              <div className="p-2 h-12 bg-primary/20 rounded-lg flex items-center justify-center cursor-pointer hover:bg-primary/30 transition-colors">
                <span className="font-orbitron font-bold text-primary">Instagram</span>
              </div>
            </a>
            <a href="https://wa.me/919625805997?text=Hello%2C%20I%20am%20interested%20to%20know%20about%20your%20cafe" target="_blank"
              rel="noopener noreferrer">
              <div className="p-2 h-12 bg-primary/20 rounded-lg flex items-center justify-center cursor-pointer hover:bg-primary/30 transition-colors">
                <span className="font-orbitron font-bold text-primary">Whatsapp</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;