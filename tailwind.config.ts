import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0B0E14",
        surface: "#12151C",
        surface2: "#171B24",
        border: "#232833",
        ink: "#F3F1EA",
        muted: "#8B909C",
        accent: "#E8A33D",
        accent2: "#3FB88F",
        danger: "#E5564A",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      borderRadius: {
        sm: "4px",
        md: "6px",
        lg: "10px",
      },
    },
  },
  plugins: [],
};

export default config;
