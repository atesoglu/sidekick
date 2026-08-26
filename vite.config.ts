import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// @ts-expect-error type error without @types/node package
import process from "node:process";
const host = process.env.TAURI_DEV_HOST;

// https://vite.dev/config/
export default defineConfig(() => ({
  plugins: [react(), tailwindcss()],

  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        // Carbon's Sass still triggers Dart Sass's deprecation warnings for
        // its own @import usage; silence those, not our own code's warnings.
        silenceDeprecations: ["import", "global-builtin"],
      },
    },
  },

  build: {
    // Carbon's DatePicker CSS uses `@position-try` (CSS anchor positioning),
    // which the lightningcss version Vite 8 defaults to for CSS minification
    // can't parse yet. esbuild's minifier handles it fine.
    cssMinify: "esbuild",
  },

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent Vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. tell Vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
}));
