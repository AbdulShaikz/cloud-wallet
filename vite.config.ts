import react from "@vitejs/plugin-react";
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import path from "path";
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  define: {
    'process.env': {},
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      buffer: 'buffer',
    },
  },
})