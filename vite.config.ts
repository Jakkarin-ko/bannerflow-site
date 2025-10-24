import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // ******************************************************
  // ✅ เพิ่ม 'base' Property เพื่อให้ GitHub Actions แก้ไขได้
  // ******************************************************
  base: "/", // ค่าเริ่มต้นนี้จะถูกแทนที่ด้วย '/bannerflow-site/' โดย GitHub Actions
  
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
