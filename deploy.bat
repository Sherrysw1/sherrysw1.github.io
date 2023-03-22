echo deploy...
cd docs/.vuepress/dist
git init
git config user.name Sherrysw1
git config user.email 516773027@qq.com
git add -A
git commit -m 'deploy'
// 强制推送代码到我在github上注册的一个名为hijameszhang的组织下的coding仓库中
git push -f git@github.com:Sherrysw1/sherrysw1.github.io.git master
