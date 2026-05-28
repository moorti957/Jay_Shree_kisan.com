import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      "/api": {
        target: "https://jay-shree-kisan-com.onrender.com",
        changeOrigin: true,
      },
    },
  },
});