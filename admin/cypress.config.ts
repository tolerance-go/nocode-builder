import { defineConfig } from 'cypress';
import customViteConfig from './vite.config';

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
      // optionally pass in vite config
      viteConfig: customViteConfig,
      // or a function - the result is merged with
      // any `vite.config` file that is detected
      //   viteConfig: async () => {
      //     // ... do things ...
      //     const modifiedConfig = await injectCustomConfig(baseConfig)
      //     return modifiedConfig
      //   },
    },
  },
  e2e: {
    baseUrl: 'http://192.168.0.107:5173',
    // 指定 E2E 测试文件的路径
    specPattern: 'stories/**/*.cy.{js,jsx,ts,tsx}',
    setupNodeEvents() {
      // implement node event listeners here
    },
  },
});
