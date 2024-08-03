import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'UNOCODEX',
  description: 'unocodex-doc',
  head: [['link', { rel: 'stylesheet', href: '/styles.css' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '在线案例', link: '/cases' },
      { text: '文档', link: '/docs', activeMatch: '^/docs/' },
      { text: '博客', link: '/blogs' },
      { text: '模板', link: '/templates' },
      { text: '企业版', link: '/enterprise' },
    ],

    sidebar: {
      '/docs': [
        {
          text: '快速上手',
          items: [],
        },
        {
          text: '构建你的应用',
          items: [],
        },
        {
          text: 'API 参考',
          items: [],
        },
        {
          text: '用户行为手册',
          items: [{ text: '概览', link: '/docs/user-bdd/' }],
        },
      ],
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present Evan You',
    },
  },
});
