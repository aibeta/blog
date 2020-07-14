# Go Lib Notes

- http.Server 里面的 IdleTimeout 是什么意思？在keep-alives 状态下，等待下一个请求的最大时间。
- http.dir("")  是一个文件系统.

## logrus

- logrus.Warnf() 用于打印日志
- 有几个登等级 Info/Warn/Error/Panic/Fatal 如果是 WarnF("%s,$d", "string", 1) 的话就是前面是format，后面是args

## net/url

- url.QueryEscape("url") 内部的escape 方法确保讲一个字符串转化为安全的 url query

## context

- context 是一个内置的库, 用于控制并发的内置lib，可以用于在线程之间传递数据
- `ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)`
- context.WithTimeout(parent, timeout) 接收一个父context创造出一个新的context，而且在timeout时间之后自动取消这个context
- `context.Background()` 返回非nil的空context，用于主函数初始化，测试，或者传入请求的顶层上下文。
- WithTimeout 会返回一个取消函数，这个函数会去取消创建的context，以及这个context 的所有子节点
