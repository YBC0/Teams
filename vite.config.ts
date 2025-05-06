import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { generateSecurityHeaders } from "./src/lib/security-utils";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    headers: mode === 'development' ? generateSecurityHeaders() : {},
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.webp')) {
            return 'assets/images/[name][extname]';
          }
          return 'assets/[name][extname]';
        },
      },
    },
  },
  optimizeDeps: {
    include: ['sharp'],
  },
}));
