# Git

## Git 命令

### Git 基础命令

- 拉取所有的分支 git fetch --all
- 切换到一个远程到分支上面 `git checkout --track -b hotfix/2019-09-03-1140/fix-font origin/hotfix/2019-09-03-1140/fix-font`
- git 修剪，移除远程已经没有的分支：`git fetch origin --prune`
- 增加一个标签 `git tag v1.0`
- 将标签推送到远程 `git push origin v1.0`
- 删除一个本地分支 `git branch -D feature/~`
- 将本地的分支和远程的对应 `git branch --set-upstream-to=origin/develop`
- 放弃尚未 add 的更改 `git checkout .` （checkout：切换分支 | 移除尚未 add 的修改）
- 切换分支的时候，将当前分支修改的内容一起打包带走，同步到切换的分支下。 `git checkout --merge <branch>`
- 删除远程分支 `git remote rm origin`
- 删除本地的remote 分支 `git branch -dr origin/hotfix/2019-05-31-fix`
- 设置远程分支 `git remote add origin git@gitlab.com:rainbowin/frontend/leona.git`
- 基于远程仓库创建新分支并且切换到新分支 `git checkout -b branch_name remote_name/branch`
- 删除一个远程分支 `git push origin --delete feature/2019-06-10/ui-refactor`
- 删除远程tag `git push --delete origin v2.8.3`
- 删除本地tag `git tag --d v2.8.3`
- 重命名一个分支、并且提交到远程
    - git branch -m feature/2019-07-16-1540/toy-activity
    - git push origin :feature/2019-07-16-1400/remove-mlink feature/2019-07-16-1540/toy-activity
    - git push origin -u feature/2019-07-16-1540/toy-activity

### Git 历史

- $ git config --global [user.name](http://user.name/) "Your Name”
- $ git config --global user.email ["email@example.com](mailto:%22email@example.com)”//全局的名称和邮箱设置
- $ git diff [test.md](http://test.md/) //查看两次文件之间的差异
- 在git 中使用<HEAD>来表示当前版本，上一个版本则是HEAD^,上上个HEAD^^,上100个HEAD~100
- $ git reset —-hard HEAD^ //将版本回退到上一个版本，此时index指向该版本，该版本之后的版本不会再log里面显示，但是可以通过commit id进行恢复
- $ git reset —hard 21e20ce //id没有必要写完全，但要避免重复
- $ git reflog //reflog纪录每一次的命令
- $ git checkout -b iss53 创建branch 并进入
- $git remote add origin [https://github.com/～io.git](https://github.com/liyuguo/liyuguo.github.io.git) /*连接到远程仓库
- $ssh -T [git@github.com](mailto:git@github.com)	/*连接已经存在的ssh keys至github

### Git 问题

- [x]  rm了文件，同时也想在 git 中不再追踪该文件
    - `git rm “abc”`
    - `git commit -am "abc"`
- [x]  忽略已追踪的文件
    - 如果你已經對一個文件進行追蹤了很多个版本，此時在 ignore 里面忽略是没用的
    - .gitignore只能忽略那些原来没有被track的文件
    - 正确的做法应该是：git rm --cached logs/xx.log，然后更新 .gitignore 忽略掉目标文件，最后 git commit -m "We really don't want Git to track this anymore!"
- [x]  本地对某些公共文件做了修改，希望可以 pull 和 Merge，但是不要提交修改
  - 使用 git stash
- [x]  git push -u 是什么
  - 把本地分支推送到远程，并设置为origin host，之后就可以直接 git push了

## 参考文献

- [gitflow](https://www.git-tower.com/learn/git/ebook/cn/command-line/advanced-topics/git-flow)
- [gitflow](https://danielkummer.github.io/git-flow-cheatsheet/index.zh_CN.html)