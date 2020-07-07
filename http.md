# Http

# 图解 HTTP

在 http 1.1 里面，短连接是是设置协议头 connecttion 为close 的连接，意味着每一次请求都需要 http 握手。

长链接是 connection 不是close 的连接，握手后状态保持一段用于持续发送请求，避免握手。

### 常用状态码

- 200 OK
    - 此时响应头会有 Cache-Control, Content-Location, Date, ETag, Expires，和 Vary
- 301 永久重定向
- 304 说明可以使用缓存
    - 例如GET 或HEAD 或在请求中附带了头部信息： If-None-Match 或If-Modified-Since
- 400 语法无效
- 401 未授权
- 403 禁止访问
- 405 方法不允许
- 500 内部服务器错误
- 502 网关错误
- 503 服务不可用

### Content-type

用于注释资源的MIME 类型

1. text/html; charset=utf-8
2. multipart/form-data; boundary=sth 对于多部分实体 boundary是必需的

HTTP缓存

浏览器会缓存那么通过 http 下载的资源

- 一个陈旧的资源（缓存副本）是不会直接被清除或忽略的，当客户端发起一个请求时，缓存检索到已有一个对应的陈旧资源（缓存副本），则缓存会先将此请求附加一个If-None-Match头，然后发给目标服务器，以此来检查该资源副本是否是依然还是算新鲜的，若服务器返回了 304 (Not Modified)（该响应不会有带有实体信息），则表示此资源副本是新鲜的，这样一来，可以节省一些带宽

1. HTTP (HyperText transfer Protocol), 超文本传输协议，HTML 超文本标记语言，URL 统一资源定位符
2. 作为文本文档传输协议，HTTP/1.1 自1997 发布后版本几乎没有更新
3. 网络是在TCP/IP 协议族的基础上运作的，HTTP 是它们的一个子集
4. FTP/DNS/HTTP 应用层，TCP/UDP 传输层，IP/MAC 网络层，硬件/OS/驱动 链路层
5. 为什么使用 TCP 传输 HTTP 报文？
6. TCP 使用字节流服务(Byte stream Service)，将大块数据起切割成报文
7. TCP 三次握手，使用标志 SYN(synchronize)，ACK(acknowledgement)，首先发送带有 SYN 标志的数据包，接收端回传 SYN/ACK，然后再发送 ACK。
8. URI 统一资源标识符，用字符串标识某一互联网资源，如：tel: +123 。URL 是 URI 的子集
9. [a.com/b/c/index.html?a=1#id](http://a.com/b/c/index.html?a=1#id) 这一串是个 URL，[a.com](http://a.com/) 地址，b/c 层次文件路径 ，a=1 查询字符串，

# 二

1. GET a/b/index.html HTTP/1.1 中间的叫做请求 URI
2. 首部字段是全部都在 header 里吗，结构是怎样的
3. HTTP keep-alive 只要任意一端没有明确提出断开连接，则保持TCP连接状态，那么什么时候才会断开链接呢
4. Cookie会根据从服务器端发送的响应报文内的一个叫做Set-Cookie的首部字段信息，通知客户端保存Cookie

### reference

- [https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching_FAQ](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching_FAQ)