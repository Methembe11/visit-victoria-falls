import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#F5F1E8",
        tan: "#D4C3A9",
        forest: "#263F32",
        pure: "#FFFFFF",
        ink: "#000000",
      },
      fontFamily: {
        serif: ["'Instrument Serif'", "Georgia", "serif"],
        sans: ["'Manrope'", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
