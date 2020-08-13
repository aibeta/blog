# Vim

- 在函数内部跳转到花括号处 
- 多行光标删除 `这个用宏最好了`
- 对多行用宏 `150@n`
- 前一个光标所在 `g-`
- delete 3 charactor `3x`
- replace current word with yanked `ve p`
- replace a word with other word `%s/book/chapter` .如果有 `/g` 则是全局替换，如果想重复上一次替换，使用 `:+️`
- 选中一个单词，给他加上引号 
- 赋值到寄存器2 `"2yw, "2p`
- 赋值一个word，删除一个word，粘贴第一个work `yw, dw, "0p`  `"0 ` 表示上一次 yank， `"1` 表示上一次的 delete/change

## 频繁操作

- vi" || va" 选取"之内的内容
- vit( || vit{ 选取{之内的内容}}

## vim

- 选取一个区域 `di{`
- 删除括号里面的内容 `dib`
- 录制一个宏替换所有的逗号 , `qw %s/, /, /g q`
- 移动语句 `()`
- 移动段落 `{}`
- 做一个标记 `mx`
- 回到这个标记 ``x' ''x`
- 删除选中内容并且进入编辑 `c`
- 跳转到当前函数的第一行 `[{`
- 选中多行操作之后，重选这些行，也可作为重选上一次的选取 `gv`
- 复制指定行到当前行 `:21t.`
- 选中当前位置，到上一次的标记a位置 v`a
- 把当前行代码，存入寄存器，录制成宏

## 说明

- iw/aw: inner word/ a word：
- iW/aW: WORD
- is/as: sentence，sentence 是以 . ! ? 为分割
- ip/ap: paragraph，两个空格之间是一个段落
- it/at: tag，一个 html tag，会
- i(/a(：括号之间，类似的还有 []/{}
- vim 有26个 mark，还有26个寄存器

以下内容来自自我实践加多次记录

# $ Vim 快捷键

- [x]  从某行选到某行 `V35G`
- [ ]  删除指定的一行，同时光标不变
- [ ]  移动到一行到冒号以前
- [ ]  使用自定义图标
- [ ]  替换时有换行
- [ ]  替换删除一行
- 让下一个方法变成当前屏幕的顶部
- 每行加1 : `%s/^/\\=line('.').','/`
- 加1 `ctr + a`
- 使用寄存器存储多个 `"ayy "ap "byy "bp`
- 下一个空行：`}`
- 删除当前到页面底部 dG
- 移动一个单词 w
- 删除全部 ggdG
- 移动到行尾并编辑 shift＋A
- 删除本行 dd
- 复制本行 yy
- 粘贴 p
- 跳转到第n行 nG
- 在该行下面另起一行 o
- 在该行上面另起一行 O
- html5初始化 ! + Tab
- 打开路径 F2
- 打开插件管理 :BundleList
- 标签自动补全 Tab / Ctr&Z + ,
- 切换窗口 Ctr&w + w
- 切换桌面 Ctr&w + ⬆️/⬇️

## 基础

- 第一个非空白字符 ^
- 匹配括号移动 %
- 移动到某行 :n
- 重复上次动作 .
- 删除括号之间 d%
- 选取字符之间 va"||vi"
- 选取多行缩进 3gg && v13gg && $ && =

## VIM 快捷键

## 操作快捷键

- 删除到行首行尾 d0 || d$
- 剪切两个单词 v3wd
- 清除所有^M :%s/^M//g
- 某行某个单词 7gg && 3w
- 注释5行代码 Control V && jjjjj && I && //
- 反向撤销 Control + R

## 基础快捷键

- 光标前后插入 i || a
- 行首行为插入 I || A
- 行首行尾 0 || $
- 文件首尾 gg|| G
- 添加一行空行 o || O
- 删除单个字符 x || X
- 删除当前五行 5dd
- 拷贝一行粘贴 yy&& p
- 合并两行 J
- 拷贝到系统 ""+yy

## 跳转快捷键

- 前后一页 ^b||^f
- 上下半页 ^u||^d
- 像下翻一行 ^e
- 当前行放屏中 zz||zt||zb
- 当前区块开头 [{||}]
- 上个光标单词 # || *
- 向后查找单词 / || ?

## 插件快捷键

- 文件目录 F2
- 怎么切换tab文件 alt + 2
- 怎么关闭当前文件 ctrl + F4
- 三个重要命令
    1. % 匹配当前光标所在的括号
    2. */# 匹配当前光标所在的单词

## 技巧

- 注意 vi} a" i> it at a]

# VIM

- Command `⌘` Shift `⇧` Option `⌥` Control `⌃` Caps Lock `⇪`
- 该行的第一个字符 `f t`
- 该行的第一个字符（从后往前） `F T`
- 当前光标的上一个单词 `#`
- 选择所有查找到的单词 ``
- 查找替换 ``
- 移动到行首/尾编辑 `⇧ i/a`
- 选中引号之间 `vi'`
- 复制引号之间 `yi'` `di'` `ci'`
- 删除 > < 之间 `dt<`
- 删除花括号之间 `v%d`
- 把单引号改为双引号 `ri``
- 删除但不复制 `"_d`
- 退出 record 录制 `q(letter)`
- 拷贝指定行 `:4y p`(not work in vscode)
- 类似 dt，但是包含最后一个 `dW`
- 到达上一个空格的位置 `f <space> ;,`
- 删除括号里面的内容 `dib di(`
- 在括号中间编辑 ``
- 删除行到行 `:a,bd :.,bd`

## 基础

- 第一个非空白字符 `^`
- 匹配括号移动 `%`
- 移动到某行 `:n`
- 重复上次动作 `.`
- 删除括号之间 `d%`
- 选取字符之间 `va"` || `vi"`
- 选取多行缩进 `3gg` && `v13gg` && `$` && `=`

## 操作快捷键

- 删除到行首行尾 `d0` || `d$`
- 剪切两个单词 `v3wd`
- 清除所有^M `:%s/^M//g`
- 某行某个单词 `7gg` && `3w`
- 注释5行代码 `^ V` && `jjjjj` && `I` && `//`
- 反向撤销 `^ R`

## 基础快捷键

- 光标前后插入 `i` || `a`
- 行首行为插入 `I` || `A`
- 行首行尾 `0` || `$`
- 文件首尾 `gg` || `G`
- 添加一行空行 `o` || `O`
- 删除单个字符 `x` || `X`
- 删除当前五行 `5dd`
- 拷贝一行粘贴 `yy` && `p`
- 合并两行 `J`
- 拷贝到系统 `""+yy`

## 跳转快捷键

- 上一个光标位置 `''`
- 前后一页 `^b` || `^f`
- 上下半页 `^u` || `^d`
- 像下翻一行 `^e` || `^y`
- 当前行放屏中 `zz` || `zt` || `zb`
- 当前区块开头 `[{` || `}]`
- 上个光标单词 `#` || `*`
- 向后查找单词 `/` || `?`

## 插件快捷键

- 文件目录 F2
- 怎么切换tab文件 alt + 2
- 怎么关闭当前文件 ctrl + F4
- 三个重要命令
    1. % 匹配当前光标所在的括号
    2. */# 匹配当前光标所在的单词

- accifentally (F f r d A)
- you accidentally typed ( ESc 2 b c w A)
- mouse (control w)
- 移动 (15h 4j ll)
- 删除{ 里面的内容 di{ dib di(
- 上一次编辑的行/地点 ('. g;)
- 增减数字( ctrl + A/X)
- w/W b/e B/E

cW = change till end of word
3cW = change 3 words
BcW = to begin of full word, change full word
ciW = change inner word.
ci" = change inner between ".."
ci( = change text between ( .. )
ci< = change text between < .. > (needs set matchpairs+=<:> in vimrc)
4dd = delete 4 lines
3x = delete 3 characters.
3s = substitute 3 characters.

== fix line indent
dat : "delete around tag"
dit : "delete inside tag"

- " + p didn't paste from my system clipboard.

useSystemClipboard

# 以下内容来自 vim 书籍

# 配置

- set nrformats= 这会让 Vim 把所有数字都当成十进制,不管它们是不是以 0 开头的(用于计算啥的)
- .模式：移动，修改，重复
- Command ⌘ ; Shift ⇧ ; Option ⌥ ; Control ⌃ ; Caps Lock ⇪
- 一个操作符命令被重复两次，则被作用于当前行(c,d,y,g~,gu,gU,>,<,=)
- 上一个光标位置 <C-o><C-i>
- 删除 :14,22d
- 上下分屏打开目录 :E || :He
- 左右分屏打开目录 :Ve || :Ve!
- 在分屏之间移动 <C-w> hjkl
- 让分屏宽度相等 <C-w> =
- 上一个空行 { || }
- 复制到系统剪切板 ggvG && !tee >(pbcopy)

# 第一章

- 初始设置启动vim $ vim -u NONE -N
- 删除当前字符进入insert s
- 删除整个段落 dap
- 删除到单词结尾或整个单词 dw || daw
- 功能同上然后进入insert cw || caw
- 选中标签里的内容 vit
- 增加当前行到末尾的缩进 >G
- 查找当前光标下的单词 * 重复(n) 回退（N）
- 在行内查找下一指定字符 f{char}/t{char} 重复(;) 回退（,）
- 在文档中查找下一处匹配项 /pattern<CR> 重复(n) 回退（N）
- 执行替换 :s/target/replacement 重复(&) 回退（u）

# 第二章 普通模式

- 使用ESC-a代替回车来划分粒度
- 对一个数字进行加减 <C-a><C-x>
- 对本行第一个数字加20 20<C-a>
- 当前行缩进 >>
- 注释当前行||段落 \\\ || \\ap
- 切换大小写 g~
- 将字母转化为大写||小写 gU || gu
- 整行转化 gUgU || gugu

# 第三章 插入模式

- 删除一个字母 <C-h>
- 删除一个单词 <C-w>
- 删除到行首 <C-u> // 上面三个命令可用于 bash，vim 的命令模式
- 切换到普通模式 <C-[>
- 切换到插入-普通模式 <C-o> //太有用了！执行一个命令，然后自动切到插入模式
- 拷贝逗号前的内容 yt,
- 粘贴0号寄存器里的内容 <C-r>0
- 进入替换模式 R
- 单次替换然后返回insert r
- 使用表达式寄存器进行计算 <C-r>=2*2<Enter> //system('ls')
- 显示字符的编码 ga //10进制，16进制，8进制，
- 插入 Unicode 字符 <C-v>u2318 ⌘ //⌘ (u2318);⇧ (u21e7);⌥ (u2325);⌃(u2303);⇪ (u2318)

# 第四章 可视模式

- 修改某个单词 viw && c
- 面向字符的可视模式 v
- 面向行的可视模式 V
- 面向列块的可视模式 <C-v>
- 重选上次的高亮选区 gv
- 移动选区的起始光标 o
- 标签里的内容设置为大写 guit
- 把一行字符全部替换为- Vr-gg