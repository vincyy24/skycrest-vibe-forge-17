export interface SocialLinksType { url: string, label: string; };

export const socialLinks: { [x: string]: SocialLinksType; } = {
    google: { url: "https://www.google.com/search?q=Skycrest+Gaming+Cafe", label: "G" },
    instagram: { url: "https://www.instagram.com/skycrest_gaming_cafe", label: "IG" },
    whatsapp: { url: "https://wa.me/919625805997?text=Hello%2C%20I%20am%20interested%20to%20know%20about%20your%20cafe", label: "WA" },
};
