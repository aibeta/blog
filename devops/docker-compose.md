# docker-compose 

## 问题

- 多个容器怎么访问彼此的网络和测试环境的网络
- 多个微服务怎么写日志

## solved

- 多个微服务的内存占用是什么样的 `docker stats`
- 启动多个实例 `docker-compose up --scale web=3` (ports: - "3000-3003: 3000") 
- docker-compose 底层跑的也是 docker run 命令, 只是你可以把很多的参数写成配置，易于启动, 而且可以启动多个服务，可以设置一个共享网络，让不同的服务共享
