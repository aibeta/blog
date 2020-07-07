# Cookie Session

### Cookie

首先产生了Cookie这门技术。Cookie是http协议的一部分，它的处理分为几步：

1. 服务端向客户端发送cookie
2. 浏览器保存cookie
3. 每次请求浏览器都将cookie发送给服务器

### Session

1. 服务端随机产生一个 1024 比特长的字符串，
2. 存在你 cookie 中的connect.sid字段中
3. 当你下次访问时，cookie 会带有这个字符串，服务器知道你是谁
- cookie 目前的作用是什么
    - 身份认证，
    - 登录状态
    - XSRF-TOKEN
    - 个性化设置

### 为什么很多网站需要用户同意允许使用 cookie，他们用 cookie 做什么？

- 根据欧盟 (EU) 法律，您必须告知来自欧盟国家的访问者有关您在博客中所使用 Cookie 的信息。
- 如果访问的网站有 AdSense， Google Analytics ，或者 youtube 视频，浏览器会把一些信息发给 google，包括设置和读取 cookie
- session 怎么传递？通过 url 的 seesionid 来保持，可以存储复杂类型的数据
- 缓存分为哪些？
    - 浏览器缓存
    - 代理服务器缓存
- 怎么设置缓存
    - 通过 Cache-Control 字段
- ETag 首部字段的含义
    - 资源的唯一标识，[google.com](http://google.com/) 根据不同语言是不同的页面，但是 ETag 是不同的
- get 和 post 区别
- get 用户查询，是幂等的，不修改资源，而 post 可以用于修改资源
- https 的原理
    - 非对称加密：加密用公钥，解密用密钥。对称加密：加解密使用同一密钥
    - https 首先使用非对称加密来保证两遍获得统一密钥，然后数据通信过程使用这一密钥
    - 客户端请求服务端，握手时获得一个证书，客户端去验证证书有效，然后用证书中的公钥加密数据进行非对称加密的通信
- CA 和证书
    - 证书是CA签发的对于用户的公钥的认证
    - 浏览器内置了根证书的公钥，然后去解密这个证书链
    - 证书认证在 https 的过程中是明文传输的，其实也是加密的
    - 服务端传给客户端的证书包含：签名值、签名算法、待签证书(公钥算法、公钥值、有效时间等等)
    - CA下发给网站的证书都是一个证书链，也就是一层一层的证书，从根证书开始，到下级CA，一层一层，最后一层就是网站证书。
- SSL 和 TLS 是什么？
    - https，也称作 http over tls
    - TLS Transport Layer Security 传输层安全协议的前身 SSL secure socket layer ，安全套阶层
    - SSL2，SSL3，都已经被发现有漏洞所以不再使用，
    - TLS 1.1 是 SSL 的增强版，所以在服务端配置应该保留 TLS 协议
    - 但是由于历史原因，在说明或者写的时候，还是 SSL/TLS，其实现在是使用的 TLS
    - 心脏滴血漏洞是 openSSL 的一个漏洞，它是 TLS 的一个实现，TLS 协议本身和其他的实现是没有这个问题的