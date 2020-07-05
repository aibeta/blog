# Performance

### 常见优化

1. HTTP2
2. HTTP2 Server Push
3. TLS v1.3 0-RT
4. Brotli static
5. webp，用于压缩图片
6. preload/dns-prefetch/prefetch

### 渲染页面耗费时间解析

### 解析和编译脚本会占用v8 50%的时间

- parse 时间取决与代码尺寸
- 使用的框架会拖慢parse
- 避免使用css 动画库，[https://csstriggers.com](https://csstriggers.com/)
- 如果必需使用css transition，那么去使用 requestAnimationFrame

### 剩下的50%的一部分时间

1. DNS lookup  100ms
2. TCP connection 100ms
3. TLS handshake 200ms
4.  HTTP request 100 ms

### RAIL 原则

## 优化策略

### 缩减 script 大小

- 不要随意引入npm 的包和库
- 合适的时候用preact

### 开启 http2

### 利用 CDN

CDN 使用很多台边缘存储服务器

- cdn 主要是存储静态内容 html css js
- 现代cdn 可以自动处理图片，生成特定尺寸
- cdn 可以通过数据清洗防止ddos
- 可以缓存很多内容减轻 origin 服务器的压力

### 图片优化（懒加载）

```jsx
// #1 使用 data-src
// 有点：简单高效，但是会加载所有图
<img data-src="image.jpg" alt="test image">

img { opacity: 1; transition: opacity 0.3s; }
img[data-src] { opacity: 0;
}

.forEach.call(document.querySelectorAll('img[data-src]'),
function(img) {
    img.setAttribute('src',
    img.getAttribute('data-src'));
    img.onload = function() {
    img.removeAttribute('data-src');
    };
});
```

```jsx
// #2
```

[codepen](https://codepen.io/rposbo/pen/ONmgVG?__cf_chl_jschl_tk__=62dfd22a6a263ddd212f51d204bcd72729e28844-1585595406-0-AQhOPmdZNfw-RN6E-G6KkL2lq1RqkCvRuCtpy9SRofM7pV23nR79yld2aIbiVU3uNHCFx6PZKAoNJoBIf7WqD39Pzr7LSCZe7bCca_I2aShyvAqaQ1okeQhtrYXgCq66yW_iljppNMZeEfRjtay_jyguwTEnE0gdPUKD_u4U_L42FJ8BG1VMeGBxueTbt-KehpHSAc16_QntcZ5HEOY9_m-wixTL2DD12pNUA5veDNenpARsdyYejf-mie7R1xmWXkIyBmRFzZDuTMzn3TzXVNc6GWrxtmenisWa-lnfB1RJaNF4bUes0IV_L5_q3t8wEszCD-8qfv_UMykyg4FKCDfDNcHv9vsYKT8ftNRY1pYZ)

```jsx
#3 bLazy.js
```

```jsx
#4 使用毛玻璃特效

https://github.com/craigbuckler/progressive-image.js
```

### Prefetch

1. DNS-prefetching
    - DNS 域名解析，把domain解析成ip
    - 如果我们要向第三方的网站发起一个请求，那么加入

    ```jsx
    <link rel="dns-prefetch"
    	href="//somewidget.example.com">
    ```

2. Link prefetching
    - 如果直到用户要进入某个页面，去 prefetch 页面图片
    - 比如一个下单流程，搜索结果，下一页

    ```jsx
    <link rel="prefetch"
    	href="//example.com/future-image.jpg">
    ```

3. Page prefetching/prerendering

    ```jsx
    <link rel="prerender"
    	href="//example.com/future-page.html">
    ```

## 什么是web缓存？

用 cache key 存储后取出响应的body，catch key 就是 http 方法和请求的 URI

## 设置缓存

```
请求头

GET /assets/app.js HTTP/1.1
Host: []
Connection: keep-alive
Cache-Control: max-age=0
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4)
AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84
Safari/537.36
Accept: */*
Accept-Encoding: gzip, deflate, sdch
Accept-Language: en-US,en;q=0.8
If-Modified-Since: Thu, 09 Jun 2016 02:49:35 GMT

```

```
响应
HTTP/1.1 200 OK
Date: Sat, 11 Jun 2016 02:08:40 GMT
Server: Apache
Cache-Control: max-age=10800, public, must-revalidate
Connection: Keep-Aliv
Keep-Alive: timeout=15, max=98
ETag: "c7c-2268d-534cf78e98dc0"
```

注意响应的第一行

1. 200 OK，未找到cache
2. 304 Not modified，返回的body 为空，命中缓存
3. 200 (from cache)，浏览器缓存命中

## 下面说明一些请求头

### Cache-control

这是最重要的属性 header，接收逗号分割的一串指令

1. public 可安全缓存，在不同请求之间共享，可以设置 css，js libraries，images
2. private 说明只能被client 缓存，不能被proxy缓存，不应该是shared cache 的一部分，可以设置个人化的内容，比如一个 API call 返回用户购物车
3. no-cache 说明响应不应该被缓存
4. no-store 说明从法律上不应该存在任何机器上，比如个人的财政信息
5. no-transform 因为一些cdn 会去转换图片，设置这个任何一层都不处理该资源
6. must-revalidate 如果失效了后必需重新让内容有效
7. proxy-revalidate 和上面一样，不过应用的代理的缓存，浏览器忽略这个
8. max-age 指定响应最大有效时间(second)
9. s-maxage 用于 shared caches 会重写 max-age 属性

### ETAG

全称是 entity tag，服务器响应如果有 etag，则会被客户端存储。

1. 再次发起请求时会使用If-None-Math Http 请求头，如果 etag 匹配，
2. 那么 server 会响应一个 304 Not modified 而不是 200 OK，client 就会使用缓存

## VARY

### Expires

指定一个 date 值，是http 1.0 的指令，在http1.1 里面使用 max-age 就好了

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/08cd06e6-30c5-45fa-aec7-2d7776a1e975/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/08cd06e6-30c5-45fa-aec7-2d7776a1e975/Untitled.png)

## 浏览器缓存

它很有用，但是我们无法控制，输入 about: cache

## 代理缓存

使用中间层来存储，请求内容会命中这一层，直接返回而不是去请求源服务器，比如使用cdn。

## 应用缓存

自己实现的缓存层，如 memcached，从而可以存储 API 和数据库查询，而不是每一次都去查。

## 静态内容

包括 fonts, images, css, 不常更新的 js files

## 可能存在的问题

如果返回了一个包裹在 http 200  里面的错误信息，那么就能会被放回

Problem: Storing Private Content in Shared Cache

font-face放在css 文件里面，这不好，默认情况下浏览器会延迟字体的加载到css解析完成，除了声明 fontface 还需要几个条件

1. 一个html 节点使用 font-face 定义的 font-family
2. webkit/blink 下，node 节点必需不空
3. 浏览器支持 unicode range descriptor

注意 浏览器在下载字体的时候，所有 text 都是不可见的，所以会造成短暂的空白

1. blank/firefox 会下载字体，3s内失败，则使用fallback 方案
2. safari/android 默认会一直去下载...
3. IE/Edge  不隐藏，直接显示fallback

## 几个优化字体的方案

1. 减少项目里的typefaces数量
2. 提供浏览器支持的格式
    1. TTF(since late 80s)
    2. WOFF
    3. WOFF2 更好的压缩版
    4. EOT 微软提出的

```css
// 提供的第一个格式是 woff2
// woff 是fallback 方案
@font-face {
    font-family: 'Open Sans';
    src: local('Open Sans'),
    local('OpenSans'),
    url('fonts/open-sans.woff2')
    format('woff2'),
    url('fonts/open-sans.woff') format('woff');
}
```

3. 只加载需要的字体样式(斜体，粗体啥)
4. 缩减字体的大小
5. 可以使用 web font loader 加载字体
    1. [https://github.com/typekit/webfontloader](https://github.com/typekit/webfontloader)
6. 可以使用 font-display 属性
    1. 可以让你选择用fallback显示文本或者隐藏它，直到字体加载
    2. 可以控制在字体加载完成后，继续使用当前字体(如果加载用了很久吗
    3. 可以为每个字体或者每个元素设置加载的超时时间
    4. [https://meowni.ca/font-style-matcher/](https://meowni.ca/font-style-matcher/)

```css
@font-face { font-family: Lato; src:
    url('/web/css/fonts/lato/lato-regular-webfont.woff2') format('woff2'),
    url('/web/css/fonts/lato/lato-regular-webfont.woff') format('woff');
    font-weight: 400;
    font-style: normal; /* This value replaces fallback when font has loaded */
    font-display: swap;
}
body {
    font-family: Lato, sans-serif;
    font-weight: 400;
    font-style: normal;
}

// 看起来是这样
auto：使用默认行为
block：隐藏文本直至加载完成
swap：替换文本
fallback: 和swap类似，但是如果用时太久，就会使用fallback
optional: 这个属性可以让浏览器使用缓存里的字体，否则就fallback
```

### 什么是 service worker, 它的应用场景是什么?

Service Worker 是浏览器在后台独立于网页运行的脚本，会对整个域下的所有页面实施控制。可以通过它来推送通知和后台同步等功能。
它无法直接访问 DOM,但是可以和页面通信让页面去操作dom。它支持离线体验，也就是说只需要监听 fetch 事件，你就可以任意的操纵请求，可以返回从 CacheStorage 中读的数据，也可以通过 Fetch API 发起新的请求，甚至可以 new 一个 Response，返回给页面。我们可以通过它配置一些缓存策略，减小加载时间。

### 浏览器加载资源的顺序是怎样的？

1. 优先级总共分为五级：very-high、high、medium、low、very-low。
2. 默认的优先级如下
    1. very-hight: MainResource, css, font
    2. high: raw, script,
    3. medium: manifest, mock
    4. low: image, media, svg
    5. very-low: prefetch
3. 这些优先级会在给资源设置属性，或者设置 cache 等动态的改变

### CSS 的阻塞渲染指的是什么？

css 的阻塞渲染是指浏览器是否需要暂停网页的首次渲染，直至该资源准备就绪，HTML 和 CSS 都是阻塞渲染的资源，需要将它尽早、尽快地下载到客户端，以便缩短首次渲染的时间。如果我们有一些 CSS 样式只在特定条件下使用，我们可以通过 CSS“媒体类型”和“媒体查询”来解决这类用例的阻塞渲染。需要注意的是，无论哪一种情况，浏览器仍会下载这些 CSS 文件。

### 描述 HTTP/2 相比 HTTP/1.1 做的优化。

1. HTTP/1.1 相比，HTTP/2 的主要变化在于性能提升
2. 每次 HTTP 的数据传输都包含了大量头部以描述请求的目的和传送的资源的属性，这些 header 通过普通字符串的形式发送，带上 cookie 时其大小可达几 Kb 。HTTP/2 中使用 HPACK 格式来对这些头信息进行压缩优化。
3. HTTP/2 提供的这种分帧数据传输带来了一系列建立在其之上的优化，并行发起多个请求和发送多个响应，互不阻塞。多个请求与响应并行地在一个 TCP 连接中完成。

### 扩展阅读

[https://davidwalsh.name/cache](https://davidwalsh.name/cache)