# Git

## Git 命令

### Git 基础命令

- stash untracked 的文件 `git stash --all` (还包括了 ignore 的文件)
- 拉取所有的分支 git fetch --all
- 切换到一个远程到分支上面 `git checkout --track -b hotfix/2019-09-03-1140/fix-font origin/hotfix/2019-09-03-1140/fix-font`
- git 修剪，移除远程已经没有的分支：`git fetch origin --prune`
- 增加一个标签 `git tag v1.0`
- 将标签推送到远程 `git push origin v1.0`
- 删除一个本地分支 `git branch -D feature/~`
- 将本地的分支和远程的对应 `git branch --set-upstream-to=origin/develop`
- 放弃尚未 add 的更改 `git checkout .` （checkout：切换分支,移除尚未 add 的修改）
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

## GitHub Flow

### 创建分支 create branch

- GitHub Flow 是一个轻量级的，基于 branch 的工作流程，适用于那些需要持续性发布的团队和项目
- 我们从 master 开出自己的分支来进行开发，可以进行任意的开发和实验，提交自己的更改
- 自己的分支等到有人 review 之后才会被合并到 master 分支
- GitHub Flow 中核心的概念就是 master 中的代码一定可以发布的（测试呢？）。
- 分支名称应该是记叙性的 refactor-authentication

### 进行 commit

- 任何时候增加、编辑、删除了一个文件，都要进行 commit
- 连续的 commit 可以向别人展示出你工作的进程
- 粒度小的 commit 的优势在于定位 bug 后可以方便的回滚
- commit 的描述信息非常的重要，清晰的描述可以让他人更容易进行反馈

### 开启一个 pull request

- PR 会开启一个针对你 commmits 的讨论
- 可以在开发的任何阶段开启 pr
- 比如：当前还没写代码但是想分享一些截图或者想法、当你遇到了困难需要一些帮助、或者当你准备好别人 review 你的代码
- 对于 Fork & Pull model，pr 提供一个方式通知项目的维护者你的更改
- 对于 Shared Repository Model，pr 会发起 code review 和讨论

### 讨论和 code review 

- pr 开始后团队会评审代码，指出存在的问题
- 例如：变成风格不匹配项目规范、做出的更改没有经过单元测试、或者一切正常，pr 被设计为鼓励和获取这些类型的讨论
- 也可以对自己的 commit 进行评论
- 如果有人指出了你的 bug，那么你可以进行修复，然后提交
- pr 评论基于 markdown，所以可以使用图片、emoji、格式化的文本

### 部署 deploy

- 一旦这个 pr 通过了代码评审和测试，那么就可以部署到生产环境
- 如果这个分支的代码出现了问题，那么就需要回滚，只需要把 master 分支的代码部署到生产环境就可以了

### Merge

- 发布到生产环境并测试通过后，再把代码合并到 master 分支
- 一旦合并，pr 会提供了针对你代码修改历程的一份记录，支持搜索，可以让别人进行回顾和还原当时的情景
- 通过在 pr 中包含特定的关键字，可以把 code 和 issues 关联起来


### 问题

- 怎么测试？
 - 就在你创建的这个自己的分支上进行测试，上线，验证通过后才进行合并

- 提出了 pr，修复了代码，然后再提交一个 pr 吗？

- 不同人之间的代码怎么保持一致？
 - 每个人都是独立的，在提 pr 的时候会去拉取 master 的代码，在此时会保持一致

- 有多个测试环境，测试通过后才能发布到正式环境。

## 参考文献

- [gitflow](https://www.git-tower.com/learn/git/ebook/cn/command-line/advanced-topics/git-flow)
- [gitflow](https://danielkummer.github.io/git-flow-cheatsheet/index.zh_CN.html)