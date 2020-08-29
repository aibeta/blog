# Shell

## linux 下的日志查看

- linux 下的 cat, tail，less，grep , awk 查看日志
- 可以使用 cat grep 筛选几次，然后用 vim，如果文件大，不能cat
- tail -f 查看的日正在产生的日志文件
  - Ctrl + c 终止 tail 命令
  - Ctrl + s 暂停 tail 命令
  - Ctrl + q 继续 tail 命令
- shift + f(即 F) less 查看滚动的命令，实现效果类似 tail -f 效果
- grep 'key word' log.txt -A 20 列出包括匹配行之后 20 的行
