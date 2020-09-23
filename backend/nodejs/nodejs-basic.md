# Nodejs Basic

可以通过 process.argv 这个数组，来获取传入 nodejs 的命令行的参数

```
node process-2.js one two=three four
0: node
1: /Users/mjr/work/node/process-2.js
2: one
3: two=three
4: four
```

可以通过 `>` 来设置 node 文件的日志的路径 `node my_app.js > my_app_log.log 2> my_app_err.log`
