import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        loading: {
          "0%": { left: "0%", width: "15%" },
          "25%": { width: "70%" },
          "50%": { left: "85%", width: "15%" },
          "75%": { width: "70%" },
          "100%": { left: "0%", width: "15%" },
        },
      },
      animation: {
        loading: "loading 1.3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
export default config;
