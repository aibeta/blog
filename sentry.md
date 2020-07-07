# Sentry

## sentry 是什么？

1. 它是一个开源的错误上报系统
2. 可以在程序出错时及时上报错误信息

## sentry 上报信息包括？

1. 页面 xhr 请求，console 内容，用户执行的操作

<!--more-->

## 怎么配置，http 还是 https？

1. 在后端搭建 sentry 服务
2. 在前端页面引入 sentry.js 然后 install 之后即可使用
3. 由于页面会上传敏感数据，所以最好使用 https

## API

### Raven.captureException(e)

1. e 类型必须是 error，object 的话无法识别

### Raven.context(()=>{})，立即执行

### setTimeout(Raven.wrap(doIt), 1000)，wrap 返回一个 callback

### Raven.captureMessage('Broken!’)

### 全局附带在该用户的每一个report

1. Raven.setExtraContext({ foo: "bar" })，记录额外信息
2. Raven.setUserContext({id: '123’})，记录用户信息
3. Raven.setTagsContext({ key: "value" })，记录 tag

### 部分支持传入额外信息，level、logger、tags、extra

1. Raven.captureMessage('Something happened', {level: 'info'})
2. Raven.context({extra: {planet: {name: 'Earth'}}}, ()=>{})
3. 注意：wrap 和 context 的第一个参数是 options

### Raven.isSetup()，看是否已经配置成功

### 按需记录面包屑 Raven.captureBreadcrumb({msg: ’sth’,})

1. 功能主要是记录一些页面操作，比 console 灵活

### 用户反馈 Raven.showReportDialog()

1. 需要跟在Raven.captureException || Raven.captureMessage 后面

### 自定义Raven.captureException(ex, {fingerprint: ['{{ default }}', '[http://my-url/](http://my-url/)']})

1. SourceMap

## 问题

### try catch 到的错误还会被 window.onerror 捕获到吗

1. 不会，但是测试环境有时会报两次错误

### raven 为什么接收到的 url 和 error 为空

1. 引用的 js 资源不同源时出现错误

### 在 raven 调用之前 script 出现错误为什么还能爆出错误

### raven 接受的是一个什么类型的对象

1. 需要看具体调用的 API

### 总是监听到两个错误，一个是空的

1. 在 Raven.install() 后他会自动捕捉你页面的错误??
2. 所以 onerror 会再捕捉一次，如果是跨域的脚本，则捕捉到的是空的错误

<!-- ### 这样的话，为什么线上有些值捕获到了一个? -->

### 记录方式：console、extra、captureBreadcrumb

## 什么是 sourceMap

1. 就是一个信息文件，里面储存着位置信息
2. 开发时可以让报错和断点打在源文件上

<!--more-->

## 怎样在 webpack 中生成sourceMap

1. webpack 的 devtool 设置为 'source-map'或其他几个值

## 在开发环境中启用 sourceMap

1. 确保生成了正确的 sourceMap 文件
2. 确保 chrome 没有 blackboxed script
3. 启用之后，打包速度会变慢很多，热更新很慢

## 在生产环境启用 sourceMap

1. 如果使用了UglifyJsPlugin， 需要在插件内启用 soucreMap
2. 同时需要设置 webpack 的 devtool
3. 生成的 js 加 sourceMappingURL，把 js 和 map 上传

## 在 sentry 中使用 sourceMap

1. 生成 js 和 js.map
2. 在编译好的 js 文件最后一行加 //# sourceMappingURL= test.min.js.map
3. 上传到测试服务器