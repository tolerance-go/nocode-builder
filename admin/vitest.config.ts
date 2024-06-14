import { defineConfig } from "vitest/config";
import path from "path";
import { fileURLToPath } from "url";

// 获取当前文件的路径
const __filename = fileURLToPath(import.meta.url);
// 获取当前文件所在的目录
const __dirname = path.dirname(__filename);

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: path.resolve(__dirname, "./setupTests.ts"), // 使用绝对路径
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
