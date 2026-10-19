import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Entrade and CafeF send no CORS headers, so price history and CafeF RSS go through same-origin proxies
    // (vercel.json does the same in production)
    proxy: {
      "/api/entrade": {
        target: "https://services.entrade.com.vn",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/entrade/, ""),
      },
      "/api/cafef": {
        target: "https://cafef.vn",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/cafef/, ""),
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
