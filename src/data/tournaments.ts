export type Tournament = {
  title: string;
  date: string; // Display string, e.g., "Dec 15, 2024"
  prize: string;
  participants: string;
  status: "Registration Open" | "Early Bird" | "Coming Soon";
  link?: string; // Optional link to register or learn more
};

export const tournaments: Tournament[] = [
  // {
  //   title: "SUPREMACY UPRISING VALORANT 5V5 & 2V2",
  //   date: "Oct 04-05, 2025",
  //   prize: "₹15,000",
  //   participants: "Open To All",
  //   status: "Registration Open",
  //   link: "https://linktr.ee/supremacyuprising",
  // },
];
