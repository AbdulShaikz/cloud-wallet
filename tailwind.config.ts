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
        "background-dark": "#181825",
        foreground: "#121212",
        highlight: "#f15bb5"
      }
    },
  },
  plugins: [],
}
export default config
