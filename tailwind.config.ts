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
        primary: {
          text: "#f0ede6",
          secondary: "#6b6d7e",
          accent: "#c9a84c",
        },
        surface: {
          base: "#06070d",
          muted: "#0e0f1a",
          raised: "#1a1b2e",
        },
        border: {
          default: "#1a1b2e",
          muted: "#2a2b3e",
        },
      },
      fontFamily: {
        heading: ["Syne", "sans-serif"],
        body: ["Inter", "sans-serif"],
        code: ["JetBrains Mono", "monospace"],
      },
      spacing: {
        "1": "1px",
        "2": "4px",
        "3": "6px",
        "4": "8px",
        "5": "10px",
        "6": "12px",
        "7": "16px",
        "8": "20px",
      },
      borderRadius: {
        "xs": "6px",
        "sm": "8px",
        "md": "10px",
        "lg": "20px",
        "xl": "999px",
      },
      boxShadow: {
        "1": "0px 4px 6px -1px rgba(0, 0, 0, 0.3), 0px 2px 4px -1px rgba(0, 0, 0, 0.2)",
      },
      transitionDuration: {
        instant: "50ms",
        fast: "150ms",
        normal: "200ms",
      },
    },
  },
  plugins: [],
};

export default config;
