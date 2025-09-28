import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";
import senetLogo from "@/assets/logosenet.svg";
import reservationPageBg from "@/assets/reservation-page.png";

const ContactSection = () => {
	return (
		<section id="booking" className="py-20 px-6 bg-muted/10">
			<div className="container mx-auto max-w-7xl">
				<div className="text-center mb-16">
					<h2 className="text-5xl font-orbitron font-bold mb-6">
						<span className="text-primary">Contact</span> & Booking
					</h2>
					<p className="text-xl text-muted-foreground font-saira max-w-2xl mx-auto">
						Ready to game? Book your slot and join the Skycrest
						community today.
					</p>
					<div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mt-6"></div>
				</div>
				<div className="grid lg:grid-cols-2 gap-12">
					{/* Contact for Booking */}
					<Card className="glass-card h-full flex flex-col">
						<CardHeader>
							<CardTitle className="text-2xl font-orbitron font-bold text-primary">
								Book Your Gaming Session
							</CardTitle>
						</CardHeader>

						<CardContent className="flex-1 flex flex-col justify-between">
							<p className="text-muted-foreground font-saira mb-6">
								Ready to game? Contact us through any of these channels to book your slot:
							</p>

							<div className="space-y-4">
								{/* WhatsApp */}
								<a
									href="https://wa.me/919625805997?text=Hello%2C%20I%20want%20to%20book%20a%20gaming%20slot"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center space-x-4 p-4 bg-green-600/20 border border-green-600/30 rounded-lg hover:bg-green-600/30 transition-colors group">
									<div className="p-3 bg-green-600/30 rounded-lg">
										<span className="font-orbitron font-bold text-green-400">WA</span>
									</div>
									<div className="flex-1">
										<h4 className="font-rajdhani font-semibold text-foreground">WhatsApp</h4>
										<p className="text-sm text-muted-foreground font-saira">Quick booking via message</p>
									</div>
									<ExternalLink className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform" />
								</a>

								{/* Phone */}
								<a
									href="tel:+919625805997"
									className="flex items-center space-x-4 p-4 bg-primary/20 border border-primary/30 rounded-lg hover:bg-primary/30 transition-colors group">
									<div className="p-3 bg-primary/30 rounded-lg">
										<Phone className="w-6 h-6 text-primary" />
									</div>
									<div className="flex-1">
										<h4 className="font-rajdhani font-semibold text-foreground">Call Us</h4>
										<p className="text-sm text-muted-foreground font-saira">+91 96258 05997</p>
									</div>
								</a>

								{/* Instagram */}
								<a
									href="https://www.instagram.com/skycrest_gaming_cafe"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center space-x-4 p-4 bg-purple-600/20 border border-purple-600/30 rounded-lg hover:bg-purple-600/30 transition-colors group">
									<div className="p-3 bg-purple-600/30 rounded-lg">
										<span className="font-orbitron font-bold text-purple-400">IG</span>
									</div>
									<div className="flex-1">
										<h4 className="font-rajdhani font-semibold text-foreground">Instagram</h4>
										<p className="text-sm text-muted-foreground font-saira">DM us for booking</p>
									</div>
									<ExternalLink className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
								</a>
							</div>
						</CardContent>
					</Card>
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
									<h4 className="font-rajdhani font-semibold text-foreground">
										Address
									</h4>
									<p className="text-muted-foreground font-saira">
										Skycrest Gaming Cafe, SCO 52, First
										Floor
										<br />
										Omaxe World Street, Sector 79
										<br />
										Faridabad, Haryana - 121004
									</p>
								</div>
							</div>

							<div className="flex items-start space-x-4">
								<div className="p-3 bg-secondary/20 rounded-lg">
									<Phone className="w-6 h-6 text-secondary" />
								</div>
								<div>
									<h4 className="font-rajdhani font-semibold text-foreground">
										Phone
									</h4>
									<p className="text-muted-foreground font-saira">
										+91 96258 05997
									</p>
								</div>
							</div>

							<div className="flex items-start space-x-4">
								<div className="p-3 bg-primary/20 rounded-lg">
									<Mail className="w-6 h-6 text-primary" />
								</div>
								<div>
									<h4 className="font-rajdhani font-semibold text-foreground">
										Email
									</h4>
									<p className="text-muted-foreground font-saira">
										contact@skycrestgaming.com
									</p>
								</div>
							</div>

							<div className="flex items-start space-x-4">
								<div className="p-3 bg-secondary/20 rounded-lg">
									<Clock className="w-6 h-6 text-secondary" />
								</div>
								<div>
									<h4 className="font-rajdhani font-semibold text-foreground">
										Hours
									</h4>
									<p className="text-muted-foreground font-saira">
										Opens 11:00 AM - 10:30 PM
										<br />
										<span className="text-xs">
											All Days of the Week
										</span>
									</p>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Map Placeholder spanning two columns on large screens */}
					<div className="lg:col-span-2">
						<Card className="glass-card">
							<CardContent className="p-0">
								<div className="aspect-video rounded-lg overflow-hidden">
									<iframe
										src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3510.049648163305!2d77.35004147549185!3d28.387568375799464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cddd3dbe30b9b%3A0x3a6afee4db245887!2sSkycrest%20Gaming%20Caf%C3%A9!5e0!3m2!1sen!2sin!4v1755686705951!5m2!1sen!2sin"
										className="w-full h-full border-0"
										allowFullScreen={false}
										loading="lazy"
										referrerPolicy="no-referrer-when-downgrade"
									/>
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
