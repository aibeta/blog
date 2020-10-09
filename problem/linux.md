# linux

### 怎么 unzip 一个文件夹里的内容到当前文件夹?

unzip -d ./ ocrDeliveryFunctionDeclaration.zip

### 阿里云一些基础命令

1. /dev/xvda等设备路径并不是真实的硬盘文件，而是系统为了方便管理，而映射出来的一个路径，这个文件并不能读和写操作，只能提供给一些硬盘管理命令使用，比如分区，挂载，格式化，等等
2. df -h  查看磁盘占用、利用率
3. du -h 查看文件占用
4. 免密码登录不成功，就是 authorized_keys 不对
5. cp -r /a/ ./ 把 a 文件夹拷贝到当前目录
6. cp -r /a/. ./  把 a 文件夹下内容拷贝到当前目录


### Cookie 和 Session 的区别

Cookie是http协议的一部分，它的处理分为几步：

1. 服务端向客户端发送cookie
2. 浏览器保存cookie
3. 每次请求浏览器都将cookie发送给服务器

Session

1. 服务端随机产生一个 1024 比特长的字符串，
2. 存在你 cookie 中的connect.sid字段中
3. 当你下次访问时，cookie 会带有这个字符串，服务器知道你是谁

换句话说浏览器和服务端通过 cookie 来传递 session 从而确定用户的身份