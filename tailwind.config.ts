import { type Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#9b5de5",
        accent: "#00f5d4",
        background: "#ffffff",
        foreground: "#121212",
      }
    },
  },
  plugins: [],
}
export default config
