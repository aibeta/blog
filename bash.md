# Bash

### 终端的区别

### Shell Bash Zsh Terminal iTerm

- Shell是Linux/Unix的一个外壳，你理解成衣服也行。它负责外界与Linux内核的交互，接收用户或其他应用程序的命令，然后把这些命令转化成内核能理解的语言，传给内核，内核是真正干活的，干完之后再把结果返回用户或应用程序
- Bash Zsh 都是一种 Shell，通过 cat /etc/shells 来查看系统有几种 Shell
- Terminal 是一个 App，内置了多种 Shell

类比

- Shell 是一些底层命令的合集，让你更加效率地操作 DOM，
- Bash，Zsh 是一种库，像 jQuery Zepto 一样，是一种 Shell 的实现
- Terminal 或者 iTerm 是一个应用，集成了这些库，你可以开启多个窗口，使用不同的库

# Bash 快捷键

## 快捷键

- 删除前面一个单词 `^W`
- 光标向左移动一个单词 `ESC+B`
- 光标向右移动一个单词 `ESC+F`
- 查找并自动匹配之前使用过的指令	`^R`
- 清屏，相当于指令“clear”	`^L`

## 已知常用

- 移动光标至行首	`^A`
- 移动光标至行尾	`^E`
- 补齐指令 `Tab`
- 删除该行 `⌃U`
- 中断操作	`^C`

## 未统计

- 第一次按时，移动光标至行首；再次按时，回到原有位置	CTRL+X
- 删除光标前一个字符，即退格（Backspace）	CTRL+H
- 删除光标后一个字符，（相当于Delete）无任何字符时相当于exit	CTRL+D
- 删除光标后所有字符；纵向制表符，在脚本中下移一行，用/x0b表示	CTRL+K
- 粘贴之前（CTRL+U/K/W）删除的内容	CTRL+Y
- 跳到新行，等同于回车	CTRL+O
- 新起一行，命令行下等同于回车	CTRL+J
- 横行制表符，在命令行中补齐指令，效果和Tab键相同	CTRL+I
- 上一条指令，等同于向上箭	CTRL+P
- 下一条指令，等同于向下箭	CTRL+N
- 使下一个特殊字符可以插入在当前位置,如CTRL-V 可以在当前位置插入一个字符,其ASCII是9, 否则一般情况下按结果是命令补齐	CTRL+V
- 冻结终端操作（暂停脚本）	CTRL+S
- 恢复冻结（继续执行脚本）	CTRL+Q
- 使下一个单词首字母大写, 同时光标前进一个单词,如光标停留在单词的某个字母上,如word中的o字母上, 则o字母变大写. 而不是w	ESC+C
- 使下一个单词所有字母变大写, 同时光标前进一个单词；如光标在o字母上, 则ord变大写, w不变.	ESC+U
- 使下一个单词所有字母变小写, 同时光标前进一个单词；如光标在o字母上, 则ord变小写, w不变.	ESC+I
- 将光标处的字符和光标前一个字符替换位置	CTRL+T
- 重复运行最近一条以“word”开头的指令，如!ls 或 !l	!word
- 调用上一条指令的最后一个参数作为当前指令对象,如，假设上一条指令为： ls abc.txt bbc.txt 那么， vi !$ 相当于： vi bbc.txt	!$
- 调用执行指定编号的历史记录指令,如!2, !11	!number

<!-- Basic moves
Move back one character. Ctrl + b
Move forward one character. Ctrl + f
Delete current character. Ctrl + d
Delete previous character. Backspace
Undo. Ctrl + -
Moving faster
Move to the start of line. Ctrl + a
Move to the end of line. Ctrl + e
Move forward a word. Meta + f (a word contains alphabets and digits, no symbols)
Move backward a word. Meta + b
Clear the screen. Ctrl + l
What is Meta? Meta is your Alt key, normally. For Mac OSX user, you need to enable it yourself. Open Terminal > Preferences > Settings > Keyboard, and enable Use option as meta key. Meta key, by convention, is used for operations on word.

Cut and paste (‘Kill and yank’ for old schoolers)
Cut from cursor to the end of line. Ctrl + k
Cut from cursor to the end of word. Meta + d
Cut from cursor to the start of word. Meta + Backspace
Cut from cursor to previous whitespace. Ctrl + w
Paste the last cut text. Ctrl + y
Loop through and paste previously cut text. Meta + y (use it after Ctrl + y)
Loop through and paste the last argument of previous commands. Meta + .
Search the command history
Search as you type. Ctrl + r and type the search term; Repeat Ctrl + r to loop through results.
Search the last remembered search term. Ctrl + r twice.
End the search at current history entry. Ctrl + j
Cancel the search and restore original line. Ctrl + g -->