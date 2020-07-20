# Go Practice Notes

## Week1

## 读代码

- [x] `err := server.Shutdown(ctx)` 这个函数实在什么时候调用的？在代码里是因为接收到里用户的退出指令，所以去shutdown
- [x] 为什么要用 go 另启动一个线程来跑http服务，在主线程里跑有什么问题吗？主线程主要用于监听用户的退出，和线程崩溃后的恢复
- [x] dao 层做什么东西? dao 层只是做数据库的查询等操作
- [x] dml 层 又称dml data-manager-layer 数据包装层，可以在这一层调用其他层的服务。
- [x] 声明了 err := server.ListenAndServe() 那么在什么时候会启动失败呢？某个进来的请求导致整个 server 挂掉了，或者启动失败了，返回是一个 *非空的错误*
- dmo 层做什么东西?

- 为什么 server 取的是 &http.Server{} 这样一个地址？
- RuleDao = &ruleDao{} 有的取的是指针，有的取的不是，为什么这样?

- [ ] gin.BasicAuth() 可以作为类似装饰器来使用吗？
- [ ] redis.NewClient() 和 redis.NewStore() 有什么区别?

- [x] 怎么判断一个元素的类型？reflect.TypeOf(x)
- [x] 怎么设置一个redis，使用 `resp, _ := comps.RedisCache.Get(key).Result()`
- [x] 判断登录状态不能用装饰器，可以使用什么？中间件
- [x] 我们在 gin.context 设置的变量，只会在当前一次请求里有效
- [x] xorm里mysql的表结构是在哪定义的? 在 model 里定义，使用 xorm 的 Sync2 方法进行检测和创建表

## reference

- [context](https://www.flysnow.org/2017/05/12/go-in-action-go-context.html)
