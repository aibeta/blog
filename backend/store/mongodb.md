MONGODB

1. 端口、密码在哪里配置哦
    1. /usr/local/etc/mongod.conf
2. 怎么启动 shell 哦
    1. 后台启动   brew services start mongodb
    2. shell 启动 mongo
3. centOS 启动
    1. 后台启动 sudo systemctl start mongod
    2. 查看 log sudo tail /var/log/mongodb/mongod.log
    3. 端口密码等的配置 /etc/mongod.conf

1. 显示所有数据库：show dbs
2. 进入某个数据库：use douyu_room
3. 显示所有数据表：show tables
4. 进入某个数据表：use room_1
5. 显示所有行：show collections
6. 显示表中的数据：db.room_1.find() 

1. 更新一条数据：db.host_maps.update({"host_index": 100},{"host_list":[]})
2. 删除一条数据：
3. 删除所有数据 db.host_maps.remove({})


To have launchd start mongodb now and restart at login:
  brew services start mongodb
Or, if you don't want/need a background service you can just run:
  mongod --config /usr/local/etc/mongod.conf


/usr/local/Cellar/mongodb/3.4.10: 19 files, 285.7MB