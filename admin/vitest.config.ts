import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: path.resolve('./setupTests.ts'), // 使用绝对路径
  },
  resolve: {
    alias: {
      '@': path.resolve('src'),
      '@cypress': path.resolve('cypress'),
      '@shared': path.resolve('shared'),
    },
  },
});
