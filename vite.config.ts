import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Entrade sends no CORS headers, so price history goes through a same-origin proxy (vercel.json does the same in production)
    proxy: {
      "/api/entrade": {
        target: "https://services.entrade.com.vn",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/entrade/, ""),
      },
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
