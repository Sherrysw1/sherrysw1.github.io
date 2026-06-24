#!/usr/bin/env bash
set -euo pipefail

echo "🚀 开始构建部署流程..."
BRANCH=$(git branch --show-current)

# ── 1. 安装依赖 & 构建 ────────────────────────────────────
echo "📦 安装依赖..."
pnpm install --frozen-lockfile

echo "🔨 构建静态站点..."
pnpm build

# ── 2. 构建失败则不继续 ────────────────────────────────────
DIST_DIR="docs/.vuepress/dist"
if [[ ! -d "$DIST_DIR" ]]; then
  echo "❌ 构建失败，产物不存在: $DIST_DIR"
  exit 1
fi

# ── 3. 提交源码变更 & 推送 ─────────────────────────────────
if [[ -n $(git status --porcelain) ]]; then
  echo "📦 提交本地变更..."
  git add -A
  git commit -m "chore: auto commit before deploy" || true
fi

echo "🔁 拉取远端 $BRANCH..."
git pull origin "$BRANCH" --rebase || echo "⚠️  拉取失败，继续..."

echo "⬆️  推送源码到 origin/$BRANCH..."
git push origin "$BRANCH"

# ── 4. 用 git worktree 部署到 gh-pages（不影响工作区）─────
echo "📤 部署到 gh-pages..."

WORKTREE="/tmp/gh-pages-deploy-$$"
trap 'rm -rf "$WORKTREE"' EXIT

if git show-ref --verify --quiet refs/heads/gh-pages; then
  git worktree add "$WORKTREE" gh-pages
else
  git worktree add --orphan "$WORKTREE"
fi

# 清空 worktree 并放入构建产物
cd "$WORKTREE"
rm -rf ./*
cp -r "$OLDPWD/$DIST_DIR"/. .
touch .nojekyll

git add -A
git commit -m "deploy: $(date '+%Y-%m-%d %H:%M:%S')" || true
git push origin gh-pages --force

# 清理 worktree
cd "$OLDPWD"
git worktree remove "$WORKTREE"

echo "🎉 全部完成！请确保 GitHub Pages 已配置为 gh-pages 分支。"