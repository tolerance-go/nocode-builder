import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/admin/' : '/',
  resolve: {
    alias: {
      '@': path.resolve('src'),
    },
  },
  server: {
    host: '0.0.0.0', // Change this to a valid IP address if needed
    port: 5173, // Optional otherwise your app will start on default port
  },
});
