# Go Enviroment

- go 怎么进行断点调试?
    1. 安装vscode 的go插件，
    2. 创建一个 debug 配置，
    3. 在 main 里面运行debug
- 怎么启动 gofmt 来自动化格式代码？ 使用 ⇧⌥F 命令，可能会提示你安装 goimport 的包，装好了就会保存会自动 format
- 怎么让 vscode 正确的提示呢？正确地安装所有地包 go run main.go
- go.mod 和 go.sum 的用途? mod and sum are all generated from go run main.go
- 在项目里go get 的包的实际路径在哪？在 $GOPATH/pkg/mod 里面
- go 怎么通过 git 安装包？
  1. zsh配置 goprivate=git.yueyouxs.com
  2. go get -u git.yueyouxs.com/lib/golib
- go 怎么安装本地的包？
- go 的错误提示比较难以看清？
- vscode初始化时下载包失败
   1. 复制surge的http代理，配置到vscode里面，打开命令 install tools 下载
- 还是提示gocode 安装失败
   1. 在终端里直接安装后 go get -u -v github.com/nsf/gocode，再 install tools）
