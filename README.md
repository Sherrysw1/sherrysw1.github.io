# sherrysw blog

这是一个使用 VuePress 搭建的个人博客。内容以 Markdown 为中心，站点配置在 `docs/.vuepress/config.js`，自定义黑白动漫手绘风格在 `docs/.vuepress/styles/index.scss`。

## 目录结构

- `docs/README.md`：博客首页
- `docs/personal/README.md`：个人经历栏目
- `docs/fe/README.md`：FE 栏目
- `docs/ai/README.md`：AI 栏目
- `docs/rd/README.md`：RD 栏目
- `docs/posts/`：文章 Markdown
- `docs/.vuepress/config.js`：VuePress 配置
- `docs/.vuepress/styles/index.scss`：站点主题样式

## 本地使用

```bash
pnpm install
pnpm run dev
```

## 构建

```bash
pnpm run build
```

构建产物会生成在 `docs/.vuepress/dist`。
