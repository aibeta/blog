# Tech Noun

- CI/CD 持续集成持续部署 continuous intergrationor deployment
- cellular-network 蜂窝网络，指的是一种硬件架构，构成网络的基站构成一个蜂窝
- nb-iot 表示 narrow-band 窄带 internet of things 物联网，基于蜂窝网络
- OTA over-the-air 空中更新，常见的就是固件升级
- MCU 嵌入式里面的单片机
- gateway 网关
- devops 
- REST Representational State Transfer 客户端分离、无状态、易缓存、唯一 GET/POST/DELETE/PUGT
- SOAP Simple Object Access Protocol
- rpc 是一个怎么样的协议？ remote-procedure-call 远程方法调用，是一种进程间通信的模式，可以用于跨平台远程调用。
- Base64是一种基于64个可打印字符来表示二进制数据的表示方法
  - 可打印字符包括字母A-Z、a-z、数字0-9，这样共有62个字符，此外两个可打印符号在不同的系统中而不同
  - Base64常用于在通常处理文本数据的场合，表示、传输、存储一些二进制数据。
  - Base64每6个 bit 为一个单元，所以三个字节的 ASCII 码需要四个 Base64 字符表示
  - Base64图片就相当于把一张 jpg、png、gif等图片进行了编码，从而省去了一次 http 请求
- Byte, 1 Byte === 8 bit, 一个ASCII码就是一个字节，一个中文占据两个字节, 在 UTF-8 编码中，英文是一个字节，中文是三个字节
- 读写竟态

## 工具

- supervisor 是一个linux上的进程管理工具，类似的有pm2, systemd
- yaml 是一个语言，以.yml 结尾，通常用于写配置文件

## 数据库

- 什么是脏读？读到了脏数据 x=0, A事务进行一些操作，修改了x=1，然后又回滚了，那么如果这时读到了 x=1，就产生了脏读
