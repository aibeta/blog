# Security

## XSS
Cross-site-scripting 跨站脚本攻击，它利用的是 web 应用在用户的浏览器执行脚本这一现象，如果应用可以动态生成脚本并且被用户利用

### 存储型

代码被存储在数据库里然后执行

1. 在用户浏览器运行不是web application owner 提供的脚本
2. 原因是没有对用户提交的数据进行 sanitized
3. 可以用于盗取session tokens
4. 可以在当前的页面上画UI，误导用户

解决方案：

1. 扫描数据库去找
2. 写入时用正则验证 sciprt 标签

### 反射型

代码不在数据库，但是会被服务器反射，服务器存储，通常是一个URL 里面带了`<script>`，然后诱导用户点击这个 url 然后服务器会返回这个url，完成脚本执行

解决方案：

1. 当接收到一个url请求时，对其中的参数做转义处理后返回

### DOM型

代码的存储和执行都在用户端，可为存储可为反射，DOM 型不需要与服务器交互，但是需要一个 source 和一个 sink，通常是构造一个带恶意脚本的URL 欺骗其他用户点击，比如浏览器从 href 里面拿参数用 document.write 写一个 dom 节点这样就会被利用

解决方案：

1. 在 vue/react 中尽量不要使用 v-html 和dangerouslySetInnerHTML ，另外不要拼接不可信的代码到a链接等地方
2. DOMPurify/XSS filtration

## CORS

### 同源策略

- 浏览器限制同一个协议、域名、端口下，获取到资源
- 资源包括 html、css、JS
- 可以跨源的资源 script link img video
- 有限制的资源 font-face frame

跨域资源共享 CORS（Cross-Origin Resource Sharing），

- 跨域资源共享，指的是一种机制，由一系列 HTTP headers 组成，来决定是满足还是拒绝其他不同源的 web 页面发起的对于对受限制的资源的请求
- 所谓同源策略，指的是一个浏览器的安全策略，一个页面只能获取到同一个协议、域名、端口下的受限资源
- script link img video audio font-face frame
- 有些浏览器不允许从 HTTPS 的域跨域访问 HTTP，比如 Chrome 和 Firefox，这些浏览器在请求还未发出的时候就会拦截请求

### 问题

对于一个非公开的 API，开启Access-Control-Allow-Origin 有什么问题

1. 拿不到 cookie/session
2. 攻击者 B 请求了 A 站个人信息，本来浏览器阻止了 B 获得你的信息，开启之后 B 就拿到了你的信息

如果浏览器允许获取收到的 ajax 数据，会发生什么

1. 攻击者不仅能攻击，还能拿到返回的信息

### JSONP 是怎么解决跨域的

- script 标签可以请求跨域资源
- 用JSONP抓到的数据并不是JSON，而是任意的JavaScript，用 JavaScript解释器运行而不是用JSON解析器解析
- 服务器返回的是JS脚本，会去调用传入的回调，parseResponse({"Name": "小明", "Id" : 1823, "Rank": 7})

### 服务器代理是怎么解决跨域问题的

- 服务端不存在同源策略
- 可以使用nginx 反向代理来实现
- 也可以通过起一个 node 服务来实现

### preflight

- `Authorization` 会触发preflight
- `Content-Type: application/json` 会触发preflight
- preflight: 浏览器在发送 `POST` 请求时，首先向服务器发送一个`OPTIONS` 请求，来确定是否服务器可以接收一个跨域的请求头包含 `Authorization` 和`Content-Type: application/json` 的 `POST` 请求，
- 如果这个`OPTIONS`请求的返回头不包含请求头的方法或状态不是2xx，那么就浏览器会停止向服务器发送`POST`请求。
- 可以通过两种方式避免触发 preflight

### 问题：Credentialed requests and wildcards

- 请求的 credentials mode：`Access-Control-Allow-Credentials': true`
- 如果请求时是 credential mode，同时 response-header 有`Access-Control-Allow-Origin: *`，那么该请求会因为跨域被浏览器阻止
- 可以在 nginx上 配置来解决 `add_header Access-Control-Allow-Origin $http_origin`
- 有一个 chrome 插件，可以在所有请求的响应头上加上 `Access-Control-Allow-Origin: *`，所以其实跨域只是浏览器的组织

### 问题

- application/x-www-form-urlencoded 和 application/json 的区别
- 都哪些东西可以出发 prelight？
- preflight 的目的是什么？
- 服务端有没有必要处理 preflight？

[1]. (很有价值的问题解释)[https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe](https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe)

[2]. (Chrome 跨域插件)[https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi/support](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi/support)

[3]. (关于跨域) [http://50linesofco.de/post/2017-03-06-cors-a-guided-tour](http://50linesofco.de/post/2017-03-06-cors-a-guided-tour)

### CSRF

跨域资源伪造 CSRF Cross-Site Request Forgery

- 是一种攻击，欺骗用户在已授权的网站上执行用户不需要的操作
- 比如通过邮件欺骗你点击链接 [http://a.com/delete](http://a.com/delete) ，如果此时已授权，那么攻击就会被执行
- 如果你有 A 网站的 cookie/session 授权信息，然后进入了钓鱼网站 B，发起了一个针对 A 的请求，而 A 验证通过，则攻击成功
- 如果 A 网站涉及到更改的操作不验证身份信息，那么 A 网站的用户就会被随意攻击
- 如果 A 网站通过 cookie/session 来验证，那么可以通过页面跳转来攻击
- 如果 A 网站由用户交流的地方，那么攻击者可以发个链接骗你点击，或者 img 请求
- 浏览器的同源策略仅仅可以让攻击者拿不到请求返回的信息，但并不会阻止请求的发出，即攻击还是存在的
- 无效的防止方法：加密 cookie/ 仅接受 post 请求/ URL 重定向/ https
- 解决方案
    - CSRF自动防御策略：同源检测（Origin 和 Referer 验证）。
    - CSRF主动防御措施：Token验证 或者 双重Cookie验证 以及配合 Samesite Cookie。
    - 保证页面的幂等性，后端接口不要在GET页面中做用户操作。
- 开启 Access-Control-Allow-Origin: *
    - 你可以跨域拿到资源了
    - 但是由于 CORS 的安全策略，服务端也拿不到你的 cookie/session
    - 攻击者也可以拿到你请求的返回值了
    - 这会造成安全问题：比如说攻击者 B 请求了 A 站个人信息，本来浏览器阻止了 B 获得你的信息，开启之后 B 就拿到了你的信息
- 把 cookie 变成 sid 带在参数里传的问题
    - 一旦泄露，可以模拟用户的任何操作
- 同源策略是浏览器安全的基石
    - 如果不跨域，ajax 请求会默认带上 cookie，如果跨域，则默认不带
    - 如果设置了 Access-Control-Allow-Credentials:true，那么请求跨域资源也会带上 cookie，此时不能同时设置 Access-Control-Allow-Origin: *