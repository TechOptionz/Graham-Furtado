import localFont from "next/font/local";

/* Same three woff2 files as the source helmet:
   Inter variable (100–900, preloaded) and Inria Serif italic 300/400 (not preloaded). */
export const inter = localFont({
  src: "../fonts/inter-latin-wght-normal.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-inter",
  fallback: ["Arial", "sans-serif"],
  adjustFontFallback: false,
  preload: true,
});

export const inria = localFont({
  src: [
    { path: "../fonts/inria-serif-latin-400-italic.woff2", weight: "400", style: "italic" },
    { path: "../fonts/inria-serif-latin-300-italic.woff2", weight: "300", style: "italic" },
  ],
  display: "swap",
  variable: "--font-inria",
  fallback: ["serif"],
  adjustFontFallback: false,
  preload: false,
});
