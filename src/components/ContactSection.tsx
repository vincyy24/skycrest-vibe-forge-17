import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const ContactSection = () => {

  return (
    <section id="booking" className="py-20 px-6 bg-muted/10">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-orbitron font-bold mb-6">
            <span className="text-primary">Contact</span> & Booking
          </h2>
          <p className="text-xl text-muted-foreground font-saira max-w-2xl mx-auto">
            Ready to game? Book your slot and join the Skycrest community today.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mt-6"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Booking Portal Link */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-2xl font-orbitron font-bold text-primary">
                Book Your Gaming Session
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground font-saira mb-6">
                We’ve moved bookings to our online portal. Click below to reserve your slot.
              </p>
              <a
                href="https://skycrest.booking.enes.tech/authentication"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn-gaming text-lg py-6 inline-flex items-center justify-center rounded-md"
              >
                Go to Booking Portal
              </a>
            </CardContent>
          </Card>

          {/* Contact Info & Map */}
          <div className="space-y-8">
            {/* Contact Information */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-2xl font-orbitron font-bold text-primary">
                  Visit Our Gaming Arena
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/20 rounded-lg">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-rajdhani font-semibold text-foreground">Address</h4>
                    <p className="text-muted-foreground font-saira">
                      Skycrest Gaming Cafe, SCO 52, First Floor<br />
                      Omaxe World Street, Sector 79<br />
                      Faridabad, Haryana - 121004
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-secondary/20 rounded-lg">
                    <Phone className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-rajdhani font-semibold text-foreground">Phone</h4>
                    <p className="text-muted-foreground font-saira">+91 96258 05997</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/20 rounded-lg">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-rajdhani font-semibold text-foreground">Email</h4>
                    <p className="text-muted-foreground font-saira">hello@skycrestgaming.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-secondary/20 rounded-lg">
                    <Clock className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-rajdhani font-semibold text-foreground">Hours</h4>
                    <p className="text-muted-foreground font-saira">
                      24/7 Open<br />
                      <span className="text-xs">All Days of the Week</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card className="glass-card">
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h4 className="font-orbitron font-semibold text-foreground mb-2">
                      Find Us Here
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Interactive map coming soon
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;