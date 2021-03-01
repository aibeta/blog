# Go Redis
## Redis

## 实用命令

- `redis-cli -h 192.168.1.202 -n 5`
- 删除很多的key `redis-cli -h redis.inner.yueyou.com -n 13 KEYS "act.cashraf*" | xargs redis-cli -h redis.inner.yueyou.com -n 13 DEL`

## basic
- 连接 `redis-cli -h redis.inner.yueyou.com`
- 查看配置 `config get *`aiain
- 查看info `info`
- 使用db12 `select 12`
- `DEL/DUMP/EXISTS/SET/GET key`
- 使过期 `EXPIRE key seconds/timestamps`
- 获取多个值`MGET`
- pattern查找key `Keys pattern` pattern 可以是 `*/nuubs*`
- 对多个key取值 `MGET a b c`
- 对多个key赋值 `MSET key1 "Hello" key2 "World"`
- 同理有对 hashmap 的多个key取值和赋值

## rare

- 设置新值，返回旧值 `GETSET`
- 指定key及key的过期时间, `SETEX`
