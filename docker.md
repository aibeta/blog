# Docker

## 常用命令

### 查看命令

- `docker info`
- 列出所有images：docker images
- 运行1个 image: docker run
- 列出所有volume：docker volume ls
- 列出volume的信息：docker inspect volumn-name
- 查看日志：docker logs container --tail	20 --follow
- 查看网络：docker network inspect bridge

### contanier

- 列出所有运行中的container：docker ps 
- 退出一个 container: ctrl+d
- 向一个container 内部拷贝一个文件 `docker cp file.sql <CONTAINER ID>:/file.sql`
- 进入项目container： docker exec -it container /bin/sh
- 进入mysql的container： docker exec -it container bash

### 压缩和恢复

- 压缩container：docker save -o project_name.tar container_name
- 从压缩包中恢复container：docker load -i /tmp/project_name.tar

## 构建和启动

- 构建一个镜像：docker pull redis:latest
- build一个container：docker build -t container_name .
- 创建container并运行: docker run -d -p 6379:6379 redis
- 运行container： docker start redis
- 停止container: docker stop redis

### 停止和移除

- 移除未被使用的image：docker image prune
- 移除所有container： docker rm -vf $(docker ps -a -q)
- 移除所有image： docker rmi -f $(docker images -a -q)
- 移除所有volume：docker volume rm $(docker volume ls -q)

### compose

- 启动容器，volume：docker-compose up
- 停止compose，移除所有容器和volume： docker-compose down

### 数据库

- 启动一个mysql 容器：docker run -d --restart=always --name db-name -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password mysql
- 备份数据库：docker exec container /usr/bin/mysqldump -u root --password=password project_test > backup.sql
- 恢复数据库：cat backup.sql | docker exec -i container /usr/bin/mysql -u root --password=password project_test

### 代理

- 可以为 docker 设置http代理
- 更为方便的方式是在 dockerfile 里面装包的时候设置源 `RUN pip install -r requirements.txt -i https://pypi.douban.com/simple`

## docker-compose 示例

```
version: '3'
services:
    web:
        # image: project
        container_name: compose-project
        build: ./
        volumes: ['./:/app']
        ports:
            - "7005:7005"
        links:
            - redis
            - mysql
    redis:
        image: redis
        container_name: compose-redis
        command: redis-server 
        ports:
            - "6379:6379"
        volumes:
            - redis_volume:/redis_data
    mysql:
        image: mysql
        container_name: compose-mysql
        environment:
            TZ: Asia/Shanghai
            MYSQL_ROOT_PASSWORD: password
        ports:
            - "3306:3306"
        volumes:
            - mysql_volume:/db_data

volumes:
    redis_volume:
        external: false
    mysql_volume:
        external: false
```

### 将测试环境的包发布到prod 环境

1. `docker build -t docker.io/_docker_hub_id_/_project_name`
2. `docker login` 
3. `docker push docker.io/_docker_hub_id_/_project_name`