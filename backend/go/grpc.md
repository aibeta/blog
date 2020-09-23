# GRPC

**RPC** remote-procedure-call 远程方法调用，是一种进程间通信的模式，可以用于跨平台远程调用。它是一种 server/client 模式，允许我们从一个微服务里用函数的方式直接调用另一个服务的方法。

它并没有要求底层的通信协议是怎样的，所以可以使用 http，http2，udp 等来进行rpc的实现，udp 的话，较多用在游戏项目里通信。

gRPC 是 google 创立的一个 RPC 框架，在这里面使用了 http2 来进行信息传输，使用`Protocol buffers` 作为接口描述语言，它可以实现只写一套代码，同时提供面向外部用户的 http 接口和内部的 rpc 调用。

## Protocol buffers

**protocol buffers** 是一种序列化数据结构的协议。

### reference
