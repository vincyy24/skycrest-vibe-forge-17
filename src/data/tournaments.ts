export type Tournament = {
  title: string;
  date: string; // Display string, e.g., "Dec 15, 2024"
  prize: string;
  participants: string;
  status: string; // e.g., "Registration Open" | "Early Bird" | "Coming Soon"
};

// Update this list to control what's shown under "Upcoming Tournaments".
// Leave it empty to show the friendly empty state in the UI.
export const tournaments: Tournament[] = [
  // Example:
  // { title: "VALORANT Championship", date: "Dec 15, 2024", prize: "₹50,000", participants: "64 Teams", status: "Registration Open" },
  // { title: "FIFA Tournament", date: "Dec 22, 2024", prize: "₹25,000", participants: "32 Players", status: "Coming Soon" },
];
