# Go Practice Notes

- string(b) 这个string 函数从哪里来？
- main file's config file didn't import? 是从包导入的。
- go.mod 和 go.sum 的用途? mod and sum are all generated from go ru main.go
- 怎么让vscode 正确的提示呢？正确地安装所有地包
- go 怎么通过 git 安装包？1.zsh配置 goprivate=git.yueyouxs.com 2. go get -u git.yueyouxs.com/lib/golib
- 在项目里go get 的包的实际路径在哪？在 $GOPATH/pkg/mod 里面
- signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM, syscall.SIGQUIT) 这一句的意思是什么？这几个动作都是程序中止的信号，发生的时候会往 quit 里面写数据
- `err := server.Shutdown(ctx)` 这个函数实在什么时候调用的？在代码里是因为接收到里用户的退出指令，所以去shutdown
- 为什么要用 go 另启动一个线程来跑http服务，在主线程里跑有什么问题吗？主线程主要用于监听用户的退出。
- RuleDao = &ruleDao{} 有的取的是指针，有的取的不是，为什么这样?
- dao 层做什么东西? dao 层只是做数据库的查询等操作
- dmo 层做什么东西? 又称dml data-manager-layer 数据包装层，可以在这一层调用其他层的服务。
- 怎么启动 gofmt 来自动化格式代码？
- go 怎么安装本地的包？
- 声明了 err := server.ListenAndServe() 那么在什么时候会启动失败呢？
- 为什么 server 取的是 &http.Server{} 这样一个地址？

## reference

- [context](https://www.flysnow.org/2017/05/12/go-in-action-go-context.html)
