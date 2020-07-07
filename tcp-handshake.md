# Tcp Handshake

### TCP 建立连接，三次握手

syn 是 synchronize， ack 是 acknowledge

1. client 发送一个 SYN(J) 的包给server，等待 server 的 ack 回复，进入SYN-SENT 状态
2. server 接收到 SYN(seq=J) 返回 ACK(J+1)，以及自己的 SYN(K) 宝，进入 SYN-RECEIVED 状态
3. client 收到 ACK(J+1) 的包，进入 ESTABLISHED 状态，返回一个 ACK(K+1) 的包
4. server 收到了这个 ACK 回复，进入 ESTABLISHED 状态，握手完成。
- 包是什么样的？
    1. [SYN] syn = 0
    2. [SYN,ACK] ack = 1, syn = 0
    3. [ACK] ack = 1
- 握手阶段为什么一定需要 3 次？
- 第二次握手验证了 client 的发送能力，接收能力和 server 的接收能力
- 第三次握手验证了 server 的发送能力
- isn 和 SEQ
    - initial sequence number

### TCP 建立连接后，怎么发送数据

- 一端发送 N bytes 的数据，增加 SEQ 的number
- 另一段接收到了数据，那么就发送一个 ACK 包，带着上面的收到的 seq 序列号表明成功

### TCP 关闭连接，四次挥手或者 RST 断开

1. client 发送 FIN(M) 包，胶乳 FIN-WAIT-1 状态
2. server 收到后，向 client 发送 ACK(M+1)，进入 CLOSE-WAIT 状态，client 收到后，进入FIN-WAIT-2状态
3. server 向client 发送FIN(N) 包，请求关闭连接，同时 server 进入 LAST-ACK 状态
4. client 收到后，进入 TIME-WAIT 状态，发送 ACK(N+1) 包，server 收到后进入close，client 等待一段时间判断server 关闭后，进入close

### 扩展问题

- 这个状态标记在哪里？
- TIME_WAIT 是什么？
- SYN 攻击是什么？
    - 三次握手的过程中，server 端会维护一个队列，保留所有 syn-RECEIVED 状态的请求，如果此时客户端恶意不发送ack、而是不停发送 syn，就会导致队列被占满。
- 能不能简化一点？快速打开有没有了解过？
- 断开阶段第二次和第三次能不能合并？有没有听过延迟确认？

### reference

- [https://www.v2ex.com/t/374778](https://www.v2ex.com/t/374778)