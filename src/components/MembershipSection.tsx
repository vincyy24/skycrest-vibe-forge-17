import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Star, Crown, Zap } from "lucide-react";

const MembershipSection = () => {
  const [activeTab, setActiveTab] = useState("hourly");

  const hourlyPackages = [
    {
      category: "PC Standard",
      packages: [
        { hours: 3, price: 699, popular: false },
        { hours: 5, price: 999, popular: true },
        { hours: 10, price: 1799, popular: false }
      ]
    },
    {
      category: "PC Plus", 
      packages: [
        { hours: 3, price: 799, popular: false },
        { hours: 5, price: 1199, popular: true },
        { hours: 10, price: 2199, popular: false }
      ]
    },
    {
      category: "Console",
      packages: [
        { hours: 3, price: 799, popular: false },
        { hours: 5, price: 1199, popular: true },
        { hours: 10, price: 2399, popular: false }
      ]
    }
  ];

  const membershipTiers = [
    {
      name: "Silver Member",
      icon: Star,
      price: "₹2,999/month",
      color: "text-muted-foreground",
      benefits: [
        "20% discount on all packages",
        "Priority booking access",
        "Free 2 hours weekly",
        "Member-only tournaments",
        "Carry-over unused minutes"
      ]
    },
    {
      name: "Gold Member", 
      icon: Crown,
      price: "₹4,999/month",
      color: "text-secondary",
      benefits: [
        "35% discount on all packages",
        "VIP booking priority",
        "Free 5 hours weekly",
        "Exclusive gold tournaments",
        "Unlimited carry-over",
        "Private coaching sessions",
        "Early access to new games"
      ],
      popular: true
    }
  ];

  return (
    <section id="membership" className="py-20 px-6 bg-muted/10">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-orbitron font-bold mb-6">
            <span className="text-primary">Membership</span> & Pricing
          </h2>
          <p className="text-xl text-muted-foreground font-saira max-w-2xl mx-auto">
            Choose your level. Unlock your potential. Game without limits.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mt-6"></div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 glass-card">
            <TabsTrigger 
              value="hourly" 
              className="font-rajdhani font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Hourly Packages
            </TabsTrigger>
            <TabsTrigger 
              value="membership"
              className="font-rajdhani font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Members Only
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hourly" className="space-y-8">
            {hourlyPackages.map((category, categoryIndex) => (
              <div key={categoryIndex} className="space-y-6">
                <h3 className="text-2xl font-orbitron font-bold text-center text-primary">
                  {category.category}
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  {category.packages.map((pkg, pkgIndex) => (
                    <Card 
                      key={pkgIndex} 
                      className={`glass-card relative overflow-hidden transition-all duration-300 hover:scale-105 ${
                        pkg.popular ? "border-primary border-2" : "border-border"
                      }`}
                    >
                      {pkg.popular && (
                        <Badge className="absolute top-4 right-4 bg-secondary text-secondary-foreground font-orbitron">
                          Popular
                        </Badge>
                      )}
                      
                      <CardHeader className="text-center">
                        <CardTitle className="text-3xl font-orbitron font-bold">
                          {pkg.hours} Hours
                        </CardTitle>
                        <div className="text-4xl font-orbitron font-black text-primary">
                          ₹{pkg.price}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          ₹{Math.round(pkg.price / pkg.hours)}/hour
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-primary" />
                          <span className="text-sm">High-speed internet</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-primary" />
                          <span className="text-sm">Premium peripherals</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-primary" />
                          <span className="text-sm">Climate controlled</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="membership" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {membershipTiers.map((tier, tierIndex) => (
                <Card 
                  key={tierIndex} 
                  className={`glass-card relative overflow-hidden transition-all duration-300 hover:scale-105 ${
                    tier.popular ? "border-secondary border-2" : "border-border"
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary to-secondary p-2">
                      <div className="text-center text-sm font-orbitron font-bold text-white">
                        MOST POPULAR
                      </div>
                    </div>
                  )}
                  
                  <CardHeader className={`text-center ${tier.popular ? "pt-12" : ""}`}>
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <tier.icon className={`w-8 h-8 ${tier.color}`} />
                      <CardTitle className={`text-2xl font-orbitron font-bold ${tier.color}`}>
                        {tier.name}
                      </CardTitle>
                    </div>
                    <div className="text-3xl font-orbitron font-black text-primary">
                      {tier.price}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {tier.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center space-x-3">
                        <div className={`p-1 rounded-full ${tier.popular ? "bg-secondary/20" : "bg-primary/20"}`}>
                          <Check className={`w-3 h-3 ${tier.popular ? "text-secondary" : "text-primary"}`} />
                        </div>
                        <span className="text-sm font-saira">{benefit}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default MembershipSection;