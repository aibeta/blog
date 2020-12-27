MySQL 
登录
$ mysql -u root -p
$ password: ve8UtZ8oUFpEAw | lyf52125
- 改密码 `
UPDATE mysql.user SET Password=PASSWORD('lyf52125') WHERE User='root';
FLUSH PRIVILEGES;
`

1. 一个关联表，每隔60个，选取一个 select * from Traffic where id % 1440 = 0

操作
1. 查询数据库 $ show databases;
2. 选择数据库 $ use User;  
3. 删除数据库 $ drop database user;
4. 新建数据库 $ create database lux;
5. 查询数据表 $ show tables;
6. 创建数据表 $ create table user
7. 数据表主键 $ describe room;

实际操作
1. 清空数据表 $ delete from Product;
2. 清空加心表 $ UPDATE User SET like_product = '' WHERE openid = 'obb-O4hTDkb7G8N_JmAoLdU-2mlQ';

INSERT INTO douyu (room_id) VALUES (NULL);


创建一个表
CREATE TABLE user(
   id INT NOT NULL AUTO_INCREMENT,
   username VARCHAR(8) NOT NULL,
   password VARCHAR(30) NOT NULL,
   avatar 	VARCHAR(2083),
   realname VARCHAR(30),
   phone VARCHAR(15),
   email VARCHAR(50),
   registe_date TIMESTAMP,
   PRIMARY KEY ( id )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

插入一条数据
INSERT INTO user ( username, password) VALUES ( ‘admin’, ‘123456’);

### 查询

- [ ] 喜欢数量最多的从高到低100条 SELECT * FROM filter ORDER BY favorites DESC

### wallheaven 的操作；

- 创建一个数据库 create database wallheaven;
- 创建一个表 raw
CREATE TABLE raw(
   id INT NOT NULL AUTO_INCREMENT,
   body 	TEXT,
   PRIMARY KEY ( id )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

- 创建一个表 rawtag 
CREATE TABLE rawtag(
   id INT NOT NULL AUTO_INCREMENT,
   body 	TEXT,
   PRIMARY KEY ( id )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

- 创建一个表 filter
CREATE TABLE filter(
  id INT NOT NULL AUTO_INCREMENT,
  resolution VARCHAR(30),
  colors VARCHAR(100),
  tagids VARCHAR(100),
  property VARCHAR(30),
  url VARCHAR(200),
  uploadername VARCHAR(100),
  uploadtime VARCHAR(100),
  category VARCHAR(100),
  size VARCHAR(20),
  views VARCHAR(20),
  favorites VARCHAR(100),
  updatetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ( id )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

- 创建 filtertag
CREATE TABLE filtertag(
  id INT NOT NULL AUTO_INCREMENT,
  tagged VARCHAR(30),
  views VARCHAR(30),
  subscribers VARCHAR(30),
  creator VARCHAR(100),
  createtime VARCHAR(100),
  aliases VARCHAR(500),
  parentids VARCHAR(10),
  updatetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ( id )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

SELECT resolution, COUNT(resolution) AS magnitude 
FROM filter 
GROUP BY resolution 
ORDER BY magnitude DESC
LIMIT 100
