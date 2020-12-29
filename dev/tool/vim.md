# Vim

- Command `⌘`  Shift `⇧`  Option `⌥`  Control `⌃`  Caps Lock `⇪`

## 高阶内容
- 在 normal 模式下增加一个空格
	- 可以绑定 `nnoremap ss i<space><esc>`
- 对vw的内容加上引号 `ciw"" Esc p`
- 目前 vscode 还不支持 把当前行代码，存入寄存器，录制成宏 `:let @a='x'`
- 每行加1 : `%s/^/\\=line('.').','/`
- 加1 `ctr + a`
- 拷贝指定行到当前行 `:899t.` 
- 从1~100： `:put =range(1,100)`
## 标记 mark 和 寄存器 register

- 做一个标记 `mX`
- 回到这个标记 `'X`
- 选中当前位置，到上一次的标记a位置 v'a
- vim 有26个 mark，还有26个寄存器
## problem

- TODO 选择所有查找到的单词 ``
- 查找替换 `` 移动
- 到达上一个空格的位置 `f <space> ;,`
- 赋值一个word，删除一个word，粘贴第一个work `yw, dw, "0p`  `"0 ` 表示上一次 yank， `"1` 表示上一次的 delete/change

## 选取 select

- 选取字符之间 `va"` || `vi"`
- 选取花括号之间 `v%`
- 选取当前单词 `ve`
- vi" || va" 选取"之内的内容
- vit( || vit{ 选取{之内的内容}}
- 选取多行后，重选这些行，也可作为重选上一次的选取 `gv`
- 选取当前行到指定行 `V35G`
- 选取多行缩进 `3gg` && `v13gg` && `$` && `=`

## 删除 delete 替换 replace

- 替换当前的词 `%s/book/chapter` .如果有 `/g` 则是全局替换，如果想重复上一次替换，使用 `:+️`
- 删除行到行 `:a,bd :.,bd`
- 删除指定的一行，同时光标不变 `:50d`
- 类似 dt，但是包含最后一个 `dW`
- 删除3个字母 `3x`
- 删除括号里面的内容 `dib di( di{`
- 替换删除一行 (shift) + C
- 删除选中内容并且进入编辑 `c`
- 删除行到行 `:a,bd :.,bd`
- 选中引号之间 `vi'`
- 删除 > < 之间 `dt<`
- 删除但不复制 `"_d`
- 删除单个字符 x || X
- 删除括号之间 `d%`
- 替换每行第一个空格为：:%s/ /': '/g 还是有问题
- 每个行首添加字符 :%s/^/'/g
- 每个行尾添加字符 :%s/$/',/g
- 如果第一个冒号之前有冒号，则替换为空格 :%s/:\(.*':\)'/-\1/g
- 删除所有带:;字符的行 :%s/.*:;.*//g
- 删除所有空行 :g/^$/d
- 删除所有带 + 的行 :%s/.*+.*//g
- 删除所有带 $ 的行 :%s/.*+.*//g

## 复制 copy

- 拷贝指定行 `:4y p`(not work in vscode)
- 删除当前行，替换成 yanked 的行 `Vp`
- 复制到寄存器2 `"2yw, "2p`
- 复制到多个寄存器 `"ayy "ap "byy "bp`
- 复制到系统 ""+yy
- 复制引号之间 `yi'` `di'` `ci'`
- 复制指定行到当前行 `:21t.`
- 复制指定行 `:4y p`(not work in vscode)

## 编辑 edit

- 行首行为插入 `I || A`
- 光标前后插入 i || a
- 添加一行空行 o || O

## 切换屏幕 screen

- 前后一页 `^b||^f`
- 上下半页 `^u||^d`
- 像下翻一行 `^e`
- 上一个光标位置 `''`
- 当前行放屏中 `zz||zt||zb`
- TODO: 让下一个方法变成当前屏幕的顶部

## 移动 move

- 上一次编辑的行/地点 ('. g;)
- 前一个光标所在 `g-`
- 前一个光标所在 `''`
- 行首行尾 0 || $
- 文件首尾 gg|| G
- 在函数内部跳转到花括号处 `[{`
- 移动到第一个非空白字符 `^`
- 移动到一行到冒号以前 
- 匹配括号移动 `%`
- 移动到某行 `:n`
- 移动语句 `()`
- 移动段落 `{}`
- 当前函数的第一行 `[{`

## 查找 find

- 到达上一个空格的位置 `f <space> ;,`
- 上个光标单词 # || *
- 向后查找单词 / || ?
- 行内正反向查询字母， `f t` `F T`
- 匹配当前光标所在的括号对应的括号 % 
## 宏 macro 

- 录制一个宏替换所有的逗号 , `qw %s/, /, /g q`, 退出录制 `q`
- 把当前行代码，存入寄存器，录制成宏

### 单词、句子、段落、标签
- iw/aw: 单词 next wowd/inner word/all word：
- iW/aW: WORD
- cW: change till end of word
- ciW: change inner word.
- 3cW: change 3 words
- is/as: 句子 sentence，sentence 是以 . ! ? 为分割
- ip/ap: 段落 paragraph，两个空格之间是一个段落
- it/at: 标签 tag，一个 html tag，会
- dit/dat : "delete inside/around tag"

## other

- i(/a(：括号之间，类似的还有 []/{}
- vi} a" i> it at a]
- ci" = change inner between ".."
- ci( = change text between ( .. )
- ci< = change text between < .. > (needs set matchpairs+=<:> in vimrc)
- cW = change till end of word
- 3cW = change 3 words
- BcW = to begin of full word, change full word
- ciW = change inner word.
- ci" = change inner between ".."
- ci( = change text between ( .. )
- ci< = change text between < .. > (needs set matchpairs+=<:> in vimrc)
- 3x = delete 3 characters.
- 3s = substitute 3 characters.

