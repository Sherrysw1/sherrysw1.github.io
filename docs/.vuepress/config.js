import { viteBundler } from '@vuepress/bundler-vite';
import { defaultTheme } from '@vuepress/theme-default';
import { defineUserConfig } from 'vuepress';

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'sherrysw',
  description: 'Sherry 的个人博客，记录个人经历、前端、AI 与研发思考。',
  head: [
    ['meta', { name: 'theme-color', content: '#101010' }],
    ['meta', { name: 'keywords', content: 'frontend, ai, rd, blog, vuepress' }]
  ],
  bundler: viteBundler(),
  theme: defaultTheme({
    logo: null,
    navbar: [
      { text: '个人经历', link: '/personal/' },
      { text: 'FE', link: '/fe/' },
      { text: 'AI', link: '/ai/' },
      { text: 'RD', link: '/rd/' }
    ],
    sidebar: {
      '/personal/': [
        {
          text: '个人经历',
          children: ['/personal/']
        }
      ],
      '/fe/': [
        {
          text: 'FE',
          children: ['/fe/', '/posts/frontend-map.md']
        }
      ],
      '/ai/': [
        {
          text: 'AI',
          children: ['/ai/', '/posts/ai-workflow-notes.md']
        }
      ],
      '/rd/': [
        {
          text: 'RD',
          children: ['/rd/', '/posts/rd-review-template.md']
        }
      ],
      '/posts/': [
        {
          text: '文章',
          children: [
            '/posts/restart-blog.md',
            '/posts/frontend-map.md',
            '/posts/ai-workflow-notes.md',
            '/posts/rd-review-template.md'
          ]
        }
      ]
    },
    repo: 'Sherrysw1/sherrysw1.github.io',
    docsDir: 'docs',
    lastUpdated: true,
    contributors: false,
    editLink: false
  })
});
