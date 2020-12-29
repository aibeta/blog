# linux

## problems

- TODO: 0755 和 0766 的权限有什么区别?

### 抓包

- wireshark 过滤: (http.request or tls.handshake.type eq 1) and !(ssdp) 

### 基础命令

- 压缩: `tar --exclude='./node_modules' -zcvf ~/Desktop/oper.zip .` tar folder, exclude node_modules
- 解压: `unzip -d ./ ocrDeliveryFunctionDeclaration.zip` unzip 一个文件夹里的内容到当前文件夹

- 定时任务: `crontab -e` edit your task
- 定时任务: `crontab -l` list your task

- 查看: `df -h`  查看磁盘占用、利用率
- 查看进程 ps -ef | grep mysql 
- 查看: `du -h` 查看文件占用
- 查看挂载的磁盘 `fdisk -l`
- 查询磁盘文件系统 blkid
- 挂载磁盘 mkfs.ext4 /dev/vda1 (vi /etc/fstab。(UUID=xxx /data/ ext4  defaults  1 2)
- `grep 'key word' log.txt -A` 20 列出包括匹配行之后 20 的行
- `grep -nri "ie8" .` 递归查看当前目录下文件，找出含有 ie8 关键词的
- 查看: `ls -laShR` 递归查看所有文件，按尺寸order，并显示尺寸

- 拷贝: `cp -r /a/ ./` 把 a 文件夹拷贝到当前目录
- 拷贝: `cp -r /a/. ./` 把 a 文件夹下内容拷贝到当前目录


### 阿里云一些基础命令

1. /dev/xvda等设备路径并不是真实的硬盘文件，而是系统为了方便管理，而映射出来的一个路径，这个文件并不能读和写操作，只能提供给一些硬盘管理命令使用，比如分区，挂载，格式化，等等

### rose
```
// 创建文件
mkdir -p /data/
/bin/mkdir -p /data/{install,logs,scripts,server,www,backups,tmp};
// 添加重启脚本
echo 'su - web -c "/bin/sh /data/scripts/start_service_after_system_boot.sh"' >> /etc/rc.local

// redis
data/server/redis/bin/redis-cli -h 127.0.0.1 -p 6389

// 设置权限
/bin/egrep  -q '^web' /etc/passwd;
if [ $? != '0' ]; then echo -e "$red"; echo 'User web does not exists in /etc/passwd. We will add it manually.'; /usr/sbin/useradd web; fi
vim /etc/rc.local

// 安装 boost
cd /data/install/
wget http://sourceforge.net/projects/boost/files/boost/1.59.0/boost_1_59_0.tar.gz
tar -zvxf boost_1_59_0.tar.gz
cd boost_1_59_0
vim bootstrap.sh
mkdir -p /data/server/boost
./bootstrap.sh
./b2 install

// 装python, 已经试验过
wget https://www.python.org/ftp/python/3.5.6/Python-3.5.6.tgz
cd /data/install/
tar -zvxf Python-3.5.6.tgz
cd Python-3.5.6
./configure --prefix=/data/server/python3
make install
/data/server/python3/bin/python3

// 装 supervisor 
pip install supervisor
echo_supervisord_conf > /data/www/etc/supervisord.conf
mkdir -p /data/www/etc
echo_supervisord_conf > /data/www/etc/supervisord.conf
vim /data/www/etc/supervisord.conf
supervisord -c /data/www/etc/supervisord.conf

// 装 redis, 已经试验过
cd /data/install
wget http://download.redis.io/releases/redis-4.0.9.tar.gz
tar -zvxf redis-4.0.9.tar.gz
cd redis-4.0.9/src
make install PREFIX=/data/server/redis
mv /data/install/redis-4.0.9/redis.conf /data/server/redis
cd /data/server/redis/
/data/server/redis/bin/redis-server  /data/server/redis/redis.conf

// 装 mysql
cd /data/install/
wget http://dev.mysql.com/get/Downloads/MySQL-5.6/mysql-5.6.22.tar.gz
tar -zvxf mysql-5.6.22.tar.gz ; cd mysql-5.6.22
yum -y install gcc-c++ ncurses-devel cmake make perl gcc autoconf automake zlib libxml libgcrypt libtool bison
cmake -DCMAKE_INSTALL_PREFIX=/data/server/mysql      -DMYSQL_DATADIR=/data/mysql/data      -DDEFAULT_CHARSET=utf8      -DMYSQL_TCP_PORT=3316      -DMYSQL_USER=mysql      -DDEFAULT_COLLATION=utf8_general_ci       -DEXTRA_CHARSETS=all       -DENABLED_LOCAL_INFILE=1  
make && make install
mkdir -p /data/mysql/3316/; mkdir -p /data/mysql/data;
useradd mysql
cp /data/server/mysql/my.cnf  /data/mysql/3316/etc/
/data/server/mysql/scripts/mysql_install_db --user=mysql --datadir=/data/mysql/3316 --basedir=/data/server/mysql
/data/server/mysql/bin/mysqld_safe --defaults-file=/data/mysql/3306/etc/my.cnf &

// 设置权限
chmod +x /etc/rc.d/rc.local
chown -R web:web /data/
chmod +x start_service_after_system_boot.sh
chmod +x nginx_log.sh
// 查看重启日志
vi /data/logs/reboot.log
// 系统自行启动脚本
vim /data/scripts/start_service_after_system_boot.sh
// 查看定时任务
crontab -l; crontab -e
 
// 安装 tengine
- wget http://tengine.taobao.org/download/tengine-2.2.2.tar.gz; tar -zvxf tengine-2.2.2.tar.gz ;cd tengine-2.2.2
- ./configure --prefix=/data/server/nginx
- make && make install

// 启动
/data/server/mysql/bin/mysql -S /data/mysql/3316/mysql.sock
/data/server/redis/bin/redis-cli -h 127.0.0.1 -p 6389
chmod 777 /data/server/supervisord/supervisor.sock

// 一个脚本
tar -zvcf aa.tar.gz /data/scripts/nginx_log.sh /data/scripts/start_service_after_system_boot.sh
vim /data/scripts/nginx_log.sh
/data/scripts/nginx_log.sh
```