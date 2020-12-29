# Nginx Doc

- server_name 支持通配符,正则,ip,"", 配置之后，会过滤请求不是 server_name 的情况
- server_name 如果不配，则是 "", 配置多个, 则符合条件的都会通过