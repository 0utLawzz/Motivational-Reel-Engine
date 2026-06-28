import { z } from "zod";

export const REEL_CONFIG = {
  // Brand Configuration
  brand: {
    name: "DAILY WISDOM",
    tagline: "Follow for more.",
    logoText: "DW", // Instead of an image, using text logo for the template
  },
  
  // Visuals
  style: {
    accentColor: "#D4AF37", // Gold
    backgroundColor: "#050505", // Deep Black
    fontFamily: "var(--font-display)",
  },
  
  // Quote Content
  quote: {
    hook: "The hardest battle...",
    main: "...is the one inside your own mind.",
    ending: "Win that battle...",
    author: "— Marcus Aurelius",
  },
  
  // Timings (in ms)
  timing: {
    hook: 3500,
    main: 4500,
    ending: 3500,
    author: 3500,
    endCard: 4000,
  }
};
