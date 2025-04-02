import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    include: ["tests/**/*.{test,spec}.{ts}"],
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
  server: {
    port: 3000,
    origin: "/documents",
  },
  base: "/documents",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
