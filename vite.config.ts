import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react()],
    base: '/LaRosa-Pizzeria/', // Exact match for https://Jimmyu2foru18.github.io/LaRosa-Pizzeria
    define: {
      // Polyfill process.env for the codebase usage
      'process.env.API_KEY': JSON.stringify(env.API_KEY || '')
    }
  };
});