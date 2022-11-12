import { fileURLToPath, URL } from "node:url";

import { defineConfig } from 'vitest/config'
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  base: './',
  test: {
    coverage: {
      reporter: ['text', 'json', 'html'],
      lines: 40,
      functions: 40,
      branches: 40,
      statements: 40,
    }
  },
});
