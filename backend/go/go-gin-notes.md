# Go Gin Notes

- gin.Default() Default 会默认绑定logger和recoverry 中间件, gin.new() 不会
- `ctx.Get("templatePath")` 做了什么？从ctx 上下文中取数据，数据来自中间件，中间件来自传入的url
- ctx.HTML() 的用法是什么? 状态码，模板以及数据, 模板 name 是`"template/login.html"`，但是使用之前，一定要先调用 router.LoadHTMLGlod('template/*')
- gin.SetMode(gin.TestMode) testMode

## 获取参数

- c.Params("id")  获取到路由里面的参数
- c.Query(), 取不到设置为空值
- c.DetaultQuery(), 取不到可以设置为第二参数defualt
- c.GetQuery()，取不到会返回一个 ok

## H

- gin.H 是一种type，格式是 `map[string]interface{}`
- gin.H 是一个什么用法？给模版传递数据
- var h = gin.H{} 声明了一个gin.H 类型的空 map，然后就可以赋值 `h["a"] = "st"`

## context

- c.DefaultQuery(key, "") 可以从url 里query一个key，如果拿不到设置为default
- c.DefaultPostForm() 也一样。
- ctx.Redirect(http.StatusFound, "/login.html") 前面的 StatusFound 代表302

## group

- m := group("/", handler) 接收一个相对路径，可选handler，返回一个 routerGroup
- group 可以在声明的时候传入中间件，也可以在在声明后使用 `m.use()` 来加入中间件
- group  {} 里面定义一系列以 group 声明的路由前缀为前缀的路由
- group 内部也可以建group，叫做nested group

## router

- router.Use 可以直接 use 一个中间件函数
- router.SetFuncMap() 里面我们可以定义一些函数，用于在模版里直接使用
- router.LoadHTMLGlob() 加载 glob pattern 指定的html文件，用于模板render，没有load 的话 ctx.html 会报空指针的.
- router.StaticFS() 接收一个相对路径和一个http文件系统如 http.dir, 静态服务器的功能

## session

- 已登录的用户请求，通过session中间件时，会把从存储在session里的cookie取出来，设置到ctx 里，供后续的请求使用
- wap 站点的cookie是怎么写进去的？在 handler.Login 里面的 sessions.save()
- session 生成之后，写到前端的cookie里面，代码在哪，session 生成之后，使用 save方法，就会保存

## context

- context.set("key", v) 因为 v是一个空的interface 类型，所以它可以设置各种类型的值
