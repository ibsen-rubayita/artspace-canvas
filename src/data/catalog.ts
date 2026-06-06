// Global search index. Frontend-side search across pages, artworks, artists, jobs.
import artFigure from "@/assets/gallery-figure.jpg";
import artCollage from "@/assets/gallery-collage.jpg";
import artBronze from "@/assets/gallery-bronze.jpg";
import artDoorway from "@/assets/gallery-doorway.jpg";
import artMonolith from "@/assets/work-monolith.jpg";
import artPlains from "@/assets/work-plains.jpg";
import artQuietude from "@/assets/work-quietude.jpg";
import artHero from "@/assets/hero-artwork.jpg";
import art1 from "@/assets/art-1.jpg";
import art2 from "@/assets/art-2.jpg";
import art5 from "@/assets/art-5.jpg";
import art7 from "@/assets/art-7.jpg";
import art8 from "@/assets/art-8.jpg";
import art9 from "@/assets/art-9.jpg";
import art10 from "@/assets/art-10.jpg";
import art11 from "@/assets/art-11.jpg";
import art12 from "@/assets/art-12.jpg";
import art13 from "@/assets/art-13.jpg";
import art14 from "@/assets/art-14.jpg";
import art15 from "@/assets/art-15.jpg";
import art16 from "@/assets/art-16.jpg";
import art17 from "@/assets/art-17.jpg";
import art18 from "@/assets/art-18.jpg";

export type Category =
  | "Painting"
  | "Drawing"
  | "Photography"
  | "Anime"
  | "Motion Picture"
  | "3D"
  | "2D"
  | "Sculpture"
  | "Digital";

export type Artwork = {
  id: string;
  title: string;
  artist: string;
  category: Category;
  city: string;
  year: string;
  price: string;
  image: string;
};

export const ARTWORKS: Artwork[] = [
  { id: "a1", title: "Figure in Ochre", artist: "L. Marin", category: "Painting", city: "Paris", year: "2025", price: "€ 4,200", image: artFigure },
  { id: "a2", title: "Paper Memory", artist: "K. Aoki", category: "2D", city: "Tokyo", year: "2024", price: "€ 2,950", image: artCollage },
  { id: "a3", title: "Bronze 04", artist: "R. Okafor", category: "Sculpture", city: "Lagos", year: "2025", price: "€ 8,100", image: artBronze },
  { id: "a4", title: "Doorway, Lisbon", artist: "M. Costa", category: "Photography", city: "Lisbon", year: "2024", price: "€ 1,500", image: artDoorway },
  { id: "a5", title: "Monolith", artist: "S. Vance", category: "Painting", city: "Berlin", year: "2025", price: "€ 6,500", image: artMonolith },
  { id: "a6", title: "Plains at Dusk", artist: "E. Lindqvist", category: "Painting", city: "Reykjavik", year: "2024", price: "€ 3,400", image: artPlains },
  { id: "a7", title: "Quietude", artist: "J. Disingana", category: "Digital", city: "Kinshasa", year: "2025", price: "€ 2,100", image: artQuietude },
  { id: "a8", title: "Inner Light", artist: "A. Petrov", category: "Painting", city: "Prague", year: "2026", price: "€ 5,100", image: artHero },
  { id: "a9", title: "Atlantic Blue", artist: "S. Vance", category: "Painting", city: "Porto", year: "2025", price: "€ 3,800", image: art1 },
  { id: "a10", title: "Floating Quiet", artist: "S. Vance", category: "Digital", city: "Berlin", year: "2025", price: "€ 2,400", image: art2 },
  { id: "a11", title: "Mech 07", artist: "K. Mori", category: "3D", city: "Osaka", year: "2025", price: "€ 1,900", image: art5 },
  { id: "a12", title: "Halftone Bloom", artist: "J. Disingana", category: "2D", city: "Kinshasa", year: "2025", price: "€ 1,700", image: art7 },
  { id: "a13", title: "The Fisherman", artist: "A. Petrov", category: "Painting", city: "Prague", year: "2025", price: "€ 4,300", image: art8 },
  { id: "a14", title: "Crimson Field", artist: "M. Okafor", category: "Painting", city: "Lagos", year: "2026", price: "€ 5,400", image: art9 },
  { id: "a15", title: "Study in Graphite", artist: "L. Marin", category: "Drawing", city: "Paris", year: "2025", price: "€ 900", image: art10 },
  { id: "a16", title: "Blossom Reverie", artist: "Y. Tanaka", category: "Anime", city: "Tokyo", year: "2026", price: "€ 1,200", image: art11 },
  { id: "a17", title: "Sentinel Mk. III", artist: "K. Mori", category: "3D", city: "Osaka", year: "2026", price: "€ 2,800", image: art12 },
  { id: "a18", title: "Sierra Silence", artist: "H. Adams", category: "Photography", city: "Denver", year: "2025", price: "€ 1,400", image: art13 },
  { id: "a19", title: "The Thinker", artist: "R. Okafor", category: "Sculpture", city: "Lagos", year: "2025", price: "€ 9,200", image: art14 },
  { id: "a20", title: "Chapel at Dawn", artist: "F. Reichardt", category: "Motion Picture", city: "Munich", year: "2024", price: "€ 1,800", image: art15 },
  { id: "a21", title: "Skyline 02", artist: "J. Reyes", category: "2D", city: "Mexico City", year: "2025", price: "€ 1,100", image: art16 },
  { id: "a22", title: "Elven Queen", artist: "S. Petrova", category: "Digital", city: "Prague", year: "2026", price: "€ 2,200", image: art17 },
  { id: "a23", title: "Wildflower Study", artist: "I. Halden", category: "Drawing", city: "Antwerp", year: "2025", price: "€ 750", image: art18 },
];

export const CATEGORIES: Category[] = [
  "Painting", "Drawing", "Photography", "Anime", "Motion Picture", "3D", "2D", "Sculpture", "Digital",
];

// Pages that the global search can navigate to
export const PAGES = [
  { title: "Home", to: "/", desc: "ArtSpace landing page" },
  { title: "Explore", to: "/explore", desc: "Gallery, blogs and magazine" },
  { title: "Gallery", to: "/gallery", desc: "Browse all artworks" },
  { title: "Blogs & Magazine", to: "/blogs", desc: "Stories, essays and magazine features from artists" },
  { title: "Learning", to: "/learning", desc: "Online courses and in-person schools" },
  { title: "Online Courses", to: "/learn", desc: "Self-paced digital art courses" },
  { title: "Schools & Training", to: "/schools", desc: "In-person ateliers and training centres" },
  { title: "Shop · Tools", to: "/tools", desc: "Cameras, brushes, paints, boards, tablets and more" },
  { title: "Shop · Arts Sales", to: "/arts", desc: "Original paintings, drawings, photographs and sculptures" },
  { title: "Network", to: "/network", desc: "Jobs and hiring in one place" },
  { title: "Jobs", to: "/jobs", desc: "Open roles at studios" },
  { title: "Hiring", to: "/hire", desc: "Post a brief and find artists" },
];
