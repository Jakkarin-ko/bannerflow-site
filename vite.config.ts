import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // ******************************************************
  // ✅ ต้องเพิ่ม 'base' property ไว้ตรงนี้
  // ******************************************************
  base: "/", // **ห้ามลืมเพิ่มบรรทัดนี้**
  
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
