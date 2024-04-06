import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://email-gemini-l-2-backend.vercel.app",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
  plugins: [react()],
});
//Eklen
