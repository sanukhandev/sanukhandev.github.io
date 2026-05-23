import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

const palette = {
  "jet-black": {
    50: "#f0f1f4",
    100: "#e2e3e9",
    200: "#c4c8d4",
    300: "#a7acbe",
    400: "#8a90a8",
    500: "#6c7593",
    600: "#575d75",
    700: "#414658",
    800: "#2b2f3b",
    900: "#16171d",
    950: "#0f1015",
  },
  "magenta-bloom": {
    50: "#fce8ee",
    100: "#f9d2dc",
    200: "#f4a4b9",
    300: "#ee7797",
    400: "#e94974",
    500: "#e31c51",
    600: "#b61641",
    700: "#881131",
    800: "#5b0b20",
    900: "#2d0610",
    950: "#20040b",
  },
  "vibrant-coral": {
    50: "#ffe7e6",
    100: "#ffd0cc",
    200: "#fea09a",
    300: "#fe7167",
    400: "#fe4134",
    500: "#fe1201",
    600: "#cb0e01",
    700: "#980b01",
    800: "#650701",
    900: "#330400",
    950: "#240300",
  },
  "tea-green": {
    50: "#ebf9ee",
    100: "#d7f4dd",
    200: "#afe9bb",
    300: "#88dd99",
    400: "#60d277",
    500: "#38c755",
    600: "#2d9f44",
    700: "#227733",
    800: "#165022",
    900: "#0b2811",
    950: "#081c0c",
  },
  beige: {
    50: "#f6faeb",
    100: "#ecf4d7",
    200: "#dae9af",
    300: "#c7de87",
    400: "#b4d35f",
    500: "#a1c837",
    600: "#81a02c",
    700: "#617821",
    800: "#415016",
    900: "#20280b",
    950: "#171c08",
  },
};

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Plus Jakarta Sans", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        ...palette,
        border: "hsl(var(--border-hsl))",
        input: "hsl(var(--input-hsl))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent-hsl))",
          foreground: "hsl(var(--accent-foreground-hsl))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.5s ease-out both",
      },
    },
  },
  plugins: [tailwindcssAnimate, typography],
} satisfies Config;
