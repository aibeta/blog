# Thread Process

- nodejs 是单线程的事件循环
    - 单线程怎么处理无数的请求呢，因为它有event loop
    - 使用一个 llibuv 的库，处理异步io，它利用OS kernel管理一个线程池
        - 当新请求进来时，它把大部分的工作交给系统workers
        - 当backgroud work 处理完这些后，会触发事件进入队列

        ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/637fde28-e78d-48ed-86ad-6eb76348780c/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/637fde28-e78d-48ed-86ad-6eb76348780c/Untitled.png)

    - 可以利用处理器多核心，需要 spin up 更多进程

## child_process

用该模块的 spawn 函数来创建一个进程，用于执行非 nodejs 的 processes，对于同一个nodejs 程序，需要使用 cluster 去fork 一个相同的服务

## cluster

cluster 是nodejs 内置的模块，它可以利用空闲的CPU

- 每次调用 cluster 的 fork 方法，就会创建一个新的进程跑着相同的服务
- fork 出来的进程称为 workers，可以与主进程通过一些事件进行通信 cluster.on

## libuv

是来处理异步i/o 

## 线程和进程

- 启动一个服务，就是启动一个服务进程，
- 进程是CPU 分配资源的最小单位
- 线程是CPU 调度的最小单位，一个进程可以有多个线程
- 多进程就是进程的复制，进程之间相互独立数据不共享，但是可以通信

## 一个进程是固定在一个核心上吗?

不是，但是可以放在一个核心上面