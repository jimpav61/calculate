import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/calculate/", // ✅ Keep this for GitHub Pages deployment
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: false, // ❌ Disable sourcemaps in production to reduce size
    minify: "esbuild", // ✅ Use esbuild for faster and smaller builds
    cssCodeSplit: true, // ✅ Split CSS into separate files
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom")) {
              return "vendor-react"; // ✅ Separate React into its own chunk
            }
            return "vendor"; // ✅ Other third-party libraries
          }
        },
      },
    },
    chunkSizeWarningLimit: 1024, // ✅ Prevents warnings (optional)
  },
}));
