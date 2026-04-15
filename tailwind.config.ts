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
        terminal: {
          bg: "#0a0a0f",
          card: "#12121a",
          border: "#1e293b",
        },
        fin: {
          green: "#22c55e",
          red: "#ef4444",
          amber: "#f59e0b",
          blue: "#3b82f6",
        }
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Consolas", "Monaco", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
