import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://api.gustradev.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
