# What Happend When

### url 解析

1. 输入时chrome 会列出访问过的站点
2. 浏览器去判断 它是一个 url 还是一个search

### DNS 查询

- 浏览器去判断协议 HTLS，知道了协议，就知道了端口
- 然后需要一个 ip，chrome 缓存里是否有个域名的缓存然后去查看 hosts 文件，还有操作系统本身也有缓存，有DNS缓存、路由器缓存、ISP的缓存
- 浏览器 向DNS服务器发送一个数据包，经过 router，到达本地DNS 服务器

### TCP 连接

- 应用层http-传输层tcp-网络层ip-链路层以太网
- 发送数据时，每层都会添加头部

[TCP](https://www.notion.so/TCP-635125715d084ce0bb185498057e9982)

### TLS 握手

- 客户端发送一个 TLS 版本的 hello 的消息，同时提供可用的加密和压缩算法
- 服务端回复一个 TLS 版本的 hi 消息，带着指定的加密和压缩算法，同时有一个由CA签署的公钥证书，证书包含一个公钥
- 客户端需要确认这个证书是被CA所信任的，然后用加密一串伪随机的数据 bytes，这个伪随机的数据可以被用于确认对称(symmetric)密钥
- 客服端用私钥解密这个随机数据，然后用这个数据生成自己的 symmetric master key
- 客户端发送一个 finished 消息，用对称密钥加密传输的哈希值发给服务端
- 服务端生成自己的哈希值，然后解密服务端发送来的进行匹配，匹配成功，那么服务端用对称密钥进行加密，然后发送给客户端。
- 客户端接收到后，之后数据http传输都会使用这个对称密钥进行加密a

### 服务器处理请求

- 通常会到达 nginx，在 location 里面匹配，返回静态资源
- 如果在cdn 上，那么就会去 cdn 拉取
- 如果是动态的，那么到达指定端口

### 浏览器高级结构

用户接口 interface：除了页面，其他的都是

浏览器引擎：用于安排(marshal) UI 和渲染引擎工作

渲染引擎：解析 html 和 css，显示到屏幕上

网络：用于发送网络请求

UI backend: 用于绘制基本组件，底层是操作系统的 user interface

js 引擎：用于解析和执行 js 代码

数据存储：storage，indexedDB，webSQL，FIleSystem

### html 解析

- 渲染引擎从网络层获取到内容，使用 html parser 去将html 标记解析为一个解析树(parse tree)
    1. 解码：首先把字节流根据格式解析为字符串
    2. 预解析：先去请求一些html 的图片什么的
    3. 符号化和构建树：词法分析，构建一个解析树
- 解析树是一颗DOM 元素和元素属性节点的树，树的根部是 document 对象
- 解析完成后会去请求页面的连接的资源，r然后会去解析 defered 模式的脚本：应该在 document 解析后被执行的脚本，然后 document 触发 load 事件

### css 解析

- 解析 style 标签，css 文件，style 属性
- 每个css 文件会被解析为一个 stylesheet object
- css paser 可以是 regular top-down or bottom-up parsers

### 渲染路径

1. DOM 解析完成
2. CSS OM树解析完成
3. 创建渲染树
4. 布局 layout
5. 绘制 paint

### 页面渲染

- 通过遍历 DOM 节点，计算每个节点的CSS属性，创建一个 渲染树
- 计算渲染树中每个节点的首选 prefered 宽度，通过由底向上的加起来每个孩子节点的首选width/水平margin/border/padding
- 从顶向下的计算每个节点的实际宽度，分配每个节点有点有效宽度给他的子孙
- 自底向上的计算节点的高度，通过 text wrapping/height/margin/border/padding
- 用上面计算出的东西确定每个节点
- 计算 float 以及定位元素的位置
- 创建 layers 描述页面的哪个部分可以作为一个group 进行animate 而不用重新栅格化，每个 render 对象会分配给一个 layer
- 为每个layer 分配纹理 textures
- 通过 CPU/GPU 使用 D2D/SkiaGL 去绘制这些 render object
- 上面的步骤的计算值在一些情况下可以重用
- 页面的 layers 会被发送给 compositing process，在这里去把一些 layers 结合起来，像是 iframe，addon panels
- 通过 Direct3D/OpenGL 最终的 layer 位置被计算出来，GPU 指令buffer 会被 flush 给GPU，异步地渲染， frame被发送给 window 窗口

### 渲染阻塞

所谓阻塞渲染，就是说渲染路径停止了

- 构建css OM 树在渲染路径的前端，所以在加载 css 时后面的东西都不会执行。

阻塞渲染优化

- css 可以把 css 分成多个文件，把不会立刻使用的样式放入media 里面，这样减少渲染被阻塞的时间

```jsx
<link rel="stylesheet" href="styles.css"> <!-- blocking -->
<link rel="stylesheet" href="print.css" media="print"> <!-- not blocking --> 
<link rel="stylesheet" href="mobile.css" media="screen and (max-width: 480px)">  <!-- not blocking on large screens -->
```

- 在遇到 script 标签时，DOM 解析和构建会暂停直至脚本完成，所以脚本放在最后

### async 和 defer

- 两者都会异步地请求脚本
- defer 的脚本会在 DOMContenLoaded 前依次执行，这个时候DOM已经解析完成了
- aysnc 会下载完立即执行，和顺序无关，用于统计脚本
    - 执行时会阻塞 dom 解析，普通的 js 脚本也会阻塞

## 浏览器渲染机制

<!-- ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3db6b844-74ed-4f8a-9bf0-d0af31990efc/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3db6b844-74ed-4f8a-9bf0-d0af31990efc/Untitled.png) -->

- 浏览器的 html parser 解析 html 文件构建一个 DOM tree
- 浏览器的 css parser 解析 css 文件，把css 代码转化为 html tags 的style 属性
- 然后构建一个 Render tree， 它和 DOM tree 不一样的地方在于它有样式，每一个node 都有自己的css box property
- Render tree 一旦构建完成，浏览器就会把它绘制在屏幕上
- 一旦render tree 发生了改变，就会触发 reflow 或者 repaint，改变 layout 会触发 reflow

## reflow 回流

- reflow  是指浏览器为了重新渲染局部或全部文档，计算元素的position 和 geometries，
- reflow 会发生 user-block 阻止用户的操作
- 会触发reflow的操作：resizeWindow，DOM 中增删元素，更改一个元素的类等

## repaint 重绘

- 如果只是影响到了 node 的 visibility
- 如：background、outline、visibility

### reflow 和 repaint

- 出现位置变化的都会触发 reflow，重新渲染 render tree
- 颜色，之类的变化就只有 repaint

### js 编译执行

脚本加载完成后，会进行

- 词法分析
- 解析，将词法转换为 AST
- 代码生成，将AST 转化为机器码

浏览器的 JS 有 4 个线程

- js 引擎线程：执行 js 脚本
- 事件触发线程：控制事件，触发时推入队列
- 定时器线程：控制计时器
- http 异步请求线程，用于发送 ajax

### reference

- [https://github.com/alex/what-happens-when#dns-lookup](https://github.com/alex/what-happens-when#dns-lookup)
- [https://4ark.me/post/b6c7c0a2.html](https://4ark.me/post/b6c7c0a2.html)
- [https://github.com/biaochenxuying/blog/issues/3](https://github.com/biaochenxuying/blog/issues/3)