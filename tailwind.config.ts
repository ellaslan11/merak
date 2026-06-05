import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#faf8f5",
        "cream-deep": "#f3efe8",
        surface: "#ffffff",
        espresso: "#2c2422",
        "espresso-soft": "#4a403c",
        "warm-gray": "#7a726a",
        "warm-gray-light": "#a39a92",
        "rose-muted": "#c9a99e",
        "rose-soft": "#f0e6e2",
        olive: "#5c6b52",
        "olive-soft": "#e8ede5",
        "faded-blue": "#8a9bab",
        "soft-gold": "#c4a574",
        "gold-soft": "#f5efe3",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "1.25rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        merak: "0 4px 20px rgba(44, 36, 34, 0.06)",
        "merak-lg": "0 12px 40px rgba(44, 36, 34, 0.08)",
        "merak-sm": "0 1px 2px rgba(44, 36, 34, 0.04)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "soft-pulse": "softPulse 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        softPulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
