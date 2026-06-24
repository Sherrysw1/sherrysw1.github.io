#!/usr/bin/env bash
set -euo pipefail

echo "🚀 开始构建部署流程..."

echo "🔨 构建静态站点..."
pnpm build

# ── 4. 推送源代码到远端 ────────────────────────────────────
echo "⬆️  推送源代码到 origin/$BRANCH..."
git push origin "$BRANCH"

# ── 5. 部署 dist 到 gh-pages 分支 ──────────────────────────
DIST_DIR="docs/.vuepress/dist"

if [[ -d "$DIST_DIR" ]]; then
  echo "📤 准备部署到 gh-pages..."

  # 切到 gh-pages 分支（不存在则创建）
  if git show-ref --verify --quiet refs/heads/gh-pages; then
    git checkout gh-pages
  else
    git checkout --orphan gh-pages
    git rm -rf --quiet . 2>/dev/null || true
    git commit --allow-empty -m "init gh-pages"
  fi

  # 清空 gh-pages 内容，放入 dist
  git rm -rf --quiet . 2>/dev/null || true
  cp -r "$DIST_DIR"/. .
  rm -rf "$DIST_DIR"

  # 确保 GitHub Pages 能识别
  touch .nojekyll

  git add -A
  git commit -m "deploy: $(date '+%Y-%m-%d %H:%M:%S')" || true
  git push origin gh-pages --force

  # 切回原分支
  git checkout "$BRANCH"
  echo "✅ 部署完成！请确保 GitHub Pages 已配置为 gh-pages 分支。"
else
  echo "❌ 构建产物不存在: $DIST_DIR"
  exit 1
fi

echo "🎉 全部完成！"