import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        exportType: "named",
        ref: true,
        svgo: false,
        titleProp: true,
      },
      include: "**/*.svg",
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://116.193.190.138:9000', // Your backend server with protocol
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Optional: remove '/api' prefix
      },
    },
  },
});
