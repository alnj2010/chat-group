import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "520px",
      // => @media (min-width: 375px) { ... }
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-noto-sans)"],
      },
      backgroundImage: {
        camera: "url('/camera.svg')",
      },
    },
  },
  plugins: [],
};
export default config;
