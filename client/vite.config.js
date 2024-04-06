import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://email-gemini-vercell-1.onrender.com",
        secure: false,
      },
    },
  },
  plugins: [react()],
});
