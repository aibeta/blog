# linux

### 抓包

- wireshark 过滤: (http.request or tls.handshake.type eq 1) and !(ssdp) 
- `scp `

### 基础命令

- 压缩: `tar --exclude='./node_modules' -zcvf ~/Desktop/oper.zip .` tar folder, exclude node_modules
- 解压: `unzip -d ./ ocrDeliveryFunctionDeclaration.zip` unzip 一个文件夹里的内容到当前文件夹

- 定时任务: `crontab -e` edit your task
- 定时任务: `crontab -l` list your task

- 查看: `df -h`  查看磁盘占用、利用率
- 查看: `du -h` 查看文件占用
- `grep 'key word' log.txt -A` 20 列出包括匹配行之后 20 的行
- `grep -nri "ie8" .` 递归查看当前目录下文件，找出含有 ie8 关键词的
- 查看: `ls -laShR` 递归查看所有文件，按尺寸order，并显示尺寸

- 拷贝: `cp -r /a/ ./` 把 a 文件夹拷贝到当前目录
- 拷贝: `cp -r /a/. ./` 把 a 文件夹下内容拷贝到当前目录


### 阿里云一些基础命令

1. /dev/xvda等设备路径并不是真实的硬盘文件，而是系统为了方便管理，而映射出来的一个路径，这个文件并不能读和写操作，只能提供给一些硬盘管理命令使用，比如分区，挂载，格式化，等等
