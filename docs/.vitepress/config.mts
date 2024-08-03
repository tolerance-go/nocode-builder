import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'UNOCODEX',
  description: 'unocodex-doc',
  head: [['link', { rel: 'stylesheet', href: '/styles.css' }]],

  markdown: {
    toc: {
      level: [1, 2, 3, 4, 5, 6], // 设置目录生成的层级范围
    },
  },

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
          text: '用户故事集',
          items: [
            { text: '用户', link: '/docs/user-stories/user' },
            { text: '开发者', link: '/docs/user-stories/developer' },
          ],
        },
        {
          text: '用户行为手册',
          items: [{ text: '用户', link: '/docs/user-bdd/user' }],
        },
      ],
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present Evan You',
    },
  },
});
