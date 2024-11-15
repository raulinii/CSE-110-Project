export interface Meditations {
    id?: string; // Optional if Firestore auto-generates it
    title: string; // Title of the meditation
    link: string; // Video URL
    category: "Sleep" | "Focus" | "Relax"; // Specific categories
    familiarity: "Well-versed" | "Moderate" | "Introductory"; // Familiarity level
    duration: "Short" | "Median" | "Long"; // Duration classification
}
