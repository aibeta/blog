# Koa2

### 选择 koa2 框架的原因

1. 使用 async/await 来处理异步
2. 更好的错误处理
3. 更小、更健壮、更富有表现力
4. koa 核心不包括任何中间件
5. Koa 的关键设计是把底层中间件封装成高级语法糖

## koa2 都做了哪些事情

1. 一个 koa 应用就是一个对象，包含了一个中间件函数组成的队列
2. 这个队列的中间件像栈一样传递执行
3. 当一个中间件执行 next()，该函数会挂起然后把控制权传递给下一个已定义的中间件

```jsx

const Koa = require('koa');
const app = new Koa();

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
    next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
  console.log(`2. ${ms}`);
});

// logger

app.use(async (ctx, next) => {
  const start = Date.now();
  next()
  const ms = Date.now() - start;
  console.log(`1. ${ctx.method} ${ctx.url} - ${ms}`);
});

// response

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(4888);

```

## API

### app.callback()

1. http.createServer(app.callback()).listen(3000);
2. 返回一个回调函数给 http.createServer() ，来处理http request

### app.use()

1. 为 app 添加中间件

### app.keys =

1. 设置签名密钥，app.keys = new KeyGrip(['im a newer secret', 'i like turtle'], 'sha256')
2. 可以在设置 cookie 时开启签名，ctx.cookies.set('name', 'tobi', { signed: true })

### app.context

1. app.context 是 ctx 的原型，可以编辑它，直接为整个 app 的 ctx 添加属性和方法
2. 注意一些内置的属性定义方法：getters, setters, and Object.defineProperty()

### 错误处理

1. app.on('error', err => {})
2. 默认输出错误到 stderr
3. ctx.throw(400, 'name required')

### Context

1. 一个 request 创建了一个 ctx 上下文
2. 包含了 node's request （ctx.req）和 node's response (ctx.res)
3. 封装了一个 koa's requset => ctx.request 绑定了 ctx.path ，ctx.method
4. 封装了一个 koa's response => ctx.response 绑定了 ctx.type ，ctx.length

## 跨域

### CORS（Cross-Origin Resource Sharing），

- 跨域资源共享，指的是一种机制，由一系列 HTTP headers 组成，来决定是满足还是拒绝其他不同源的 web 页面发起的对于对受限制的资源的请求
- 所谓同源策略，指的是一个浏览器的安全策略，一个页面只能获取到同一个协议、域名、端口下的受限资源
- script link img video audio font-face frame
- 有些浏览器不允许从 HTTPS 的域跨域访问 HTTP，比如 Chrome 和 Firefox，这些浏览器在请求还未发出的时候就会拦截请求

### CSRF Cross-Site Request Forgery ,跨域资源伪造

- 是一种攻击，欺骗用户在已授权的网站上执行用户不需要的操作
- 比如通过邮件欺骗你点击链接 [http://a.com/delete](http://a.com/delete) ，如果此时已授权，那么攻击就会被执行
- 如果你有 A 网站的 cookie/session 授权信息，然后进入了钓鱼网站 B，发起了一个针对 A 的请求，而 A 验证通过，则攻击成功
- 如果 A 网站涉及到更改的操作不验证身份信息，那么 A 网站的用户就会被随意攻击
- 如果 A 网站通过 cookie/session 来验证，那么可以通过页面跳转来攻击
- 如果 A 网站由用户交流的地方，那么攻击者可以发个链接骗你点击，或者 img 请求
- 浏览器的同源策略仅仅可以让攻击者拿不到请求返回的信息，但并不会阻止请求的发出，即攻击还是存在的
- 无效的防止方法：加密 cookie/ 仅接受 post 请求/ URL 重定向/ https

### 开启 Access-Control-Allow-Origin: *

1. 你可以跨域拿到资源了
2. 但是由于 CORS 的安全策略，服务端也拿不到你的 cookie/session
3. 攻击者也可以拿到你请求的返回值了
4. 这会造成安全问题：比如说攻击者 B 请求了 A 站个人信息，本来浏览器阻止了 B 获得你的信息，开启之后 B 就拿到了你的信息

### 把 cookie 变成 sid 带在参数里传的问题

1. 一旦泄露，可以模拟用户的任何操作

### 同源策略是浏览器安全的基石

1. 如果不跨域，ajax 请求会默认带上 cookie，如果跨域，则默认不带
2. 如果设置了 Access-Control-Allow-Credentials:true，那么请求跨域资源也会带上 cookie，此时不能同时设置 Access-Control-Allow-Origin: *

### 网站所有都用 get 的弊端？

get 应该只是查询，否则url重放就会发生攻击行为。

## 中间件

### kcors

1. 主要用于配置 CORS 的参数

### koa-views

1. 用于 render 模板，支持各种模板

### koa-logger

1. 打印出所有的请求日志

### koa-onerror

1. 在页面上显示程序的报错信息，而不是 Internal Server Error
2. 上线的时候看要考虑关掉

### koa-json

1. 格式化 response 的 json，好看一点

### koa-static

1. 静态文件服务器中间件
2. 可以设置首页，默认为 index.html
3. 可以设置返回头，setHeaders

### koa-router

1. 用于配置路由信息

### koa-body

1. 用于解析 multipart, urlencoded, json 类型的 request bodies

## 其他包

### axios/request-promise

1. axios 服务端不支持 formData 类型的请求

### 一个 hexo 和 koa 的示例

```jsx
const Koa = require('koa')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const {
  exec
} = require('child_process')
const app = new Koa()
app.use(bodyparser())
//router
const Router = require('koa-router')
const router = new Router()
//显示报错信息而不是 Internal Error Server
onerror(app)
//打印请求日志
app.use(logger())

const cmd = `
cd /data/Notes;
git pull;
cp /data/Notes/* /data/hexo/source/_posts;
cd /data/hexo/;
hexo g;
`
router.post('/github', async (ctx, next) => {
  // const body = ctx.request.body
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.log(error)
      console.log("webhook_cmd 执行出错")
    } else {
      console.log("webhook_cmd 执行成功")
    }
    return
  })
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)

```