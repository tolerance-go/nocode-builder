import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'unocodex-doc',
  description: 'unocodex-doc',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
      { text: '用户行为手册', link: '/user-bdd' },
    ],

    sidebar: {
      // '/user-bdd': [
      //   {
      //     text: '用户行为手册',
      //     items: [
      //       { text: '简介', link: '/user-bdd/intro' },
      //       { text: '指南', link: '/user-bdd/guide' },
      //       // 添加更多用户行为手册的条目
      //     ],
      //   },
      // ],
      '/markdown-examples': [
        {
          text: 'Examples',
          items: [
            { text: 'Markdown Examples', link: '/markdown-examples' },
            { text: 'Runtime API Examples', link: '/api-examples' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
});
