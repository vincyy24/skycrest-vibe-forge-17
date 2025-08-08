import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    package: "",
    date: "",
    time: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Booking Request Sent!",
      description: "We'll contact you shortly to confirm your gaming session.",
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      package: "",
      date: "",
      time: "",
      message: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
          {/* Booking Form */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-2xl font-orbitron font-bold text-primary">
                Book Your Gaming Session
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-rajdhani font-semibold">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter your name"
                      required
                      className="bg-background/50 border-border focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-rajdhani font-semibold">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="bg-background/50 border-border focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-rajdhani font-semibold">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+91 9876543210"
                    required
                    className="bg-background/50 border-border focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="font-rajdhani font-semibold">Gaming Package</Label>
                  <Select value={formData.package} onValueChange={(value) => handleInputChange("package", value)}>
                    <SelectTrigger className="bg-background/50 border-border focus:border-primary">
                      <SelectValue placeholder="Select gaming package" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pc-standard-3">PC Standard - 3 Hours</SelectItem>
                      <SelectItem value="pc-standard-5">PC Standard - 5 Hours</SelectItem>
                      <SelectItem value="pc-standard-10">PC Standard - 10 Hours</SelectItem>
                      <SelectItem value="pc-plus-3">PC Plus - 3 Hours</SelectItem>
                      <SelectItem value="pc-plus-5">PC Plus - 5 Hours</SelectItem>
                      <SelectItem value="pc-plus-10">PC Plus - 10 Hours</SelectItem>
                      <SelectItem value="console-3">Console - 3 Hours</SelectItem>
                      <SelectItem value="console-5">Console - 5 Hours</SelectItem>
                      <SelectItem value="console-10">Console - 10 Hours</SelectItem>
                      <SelectItem value="racing-sim">Racing Simulator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="font-rajdhani font-semibold">
                      Preferred Date
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange("date", e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      required
                      className="bg-background/50 border-border focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time" className="font-rajdhani font-semibold">
                      Preferred Time
                    </Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => handleInputChange("time", e.target.value)}
                      required
                      className="bg-background/50 border-border focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="font-rajdhani font-semibold">
                    Special Requests (Optional)
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="Any special requirements or requests..."
                    className="bg-background/50 border-border focus:border-primary min-h-[100px]"
                  />
                </div>

                <Button type="submit" className="w-full btn-gaming text-lg py-6">
                  Book Your Session
                </Button>
              </form>
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