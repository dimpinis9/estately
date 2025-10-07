import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)",
      },
      colors: {
        primary: {
          DEFAULT: "#7f13ec",
          foreground: "#ffffff",
        },
        "background-light": "#f7f6f8",
        "background-dark": "#191022",
        "foreground-light": "#191022",
        "foreground-dark": "#f7f6f8",
        "card-light": "#ffffff",
        "card-dark": "#21162d",
        "card-border-light": "#e5e0ea",
        "card-border-dark": "#2d203f",
        "muted-light": "#8a8195",
        "muted-dark": "#8a8195",
        "subtle-light": "#f0eef3",
        "subtle-dark": "#2d203f",
        "subtle-border-light": "#e5e0ea",
        "subtle-border-dark": "#2d203f",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
    },
  },
  plugins: [animate],
};
export default config;
