# Mysql Notes

## 常用命令

- 更新表 `UPDATE t_v2_raffle_act SET  plat_id=2, version="1.2.0", end_date=DATE_ADD(end_date, INTERVAL 86399 SECOND);`
- 复制表和数据 `CREATE TABLE tbl_new AS SELECT * FROM tbl_old;`
- 连接 `mysql -u username -puserpwd -h xxx.mysql.rds.aliyuncs.com`
- 创建表 `create database project_test;`
- 修改列名 `alter table customer change customercity customer_city VARCHAR(225);`
- 显示数据库的大小 `SELECT table_schema "DB Name", ROUND(SUM(data_length + index_length) / 1024 / 1024, 1) "DB Size in MB"  FROM information_schema.tables GROUP BY table_schema; `
- 数据库连接 `/data/server/mysql/bin/mysql -urose -proseRKFR123$ -h127.0.0.1 -P 3316 rose`

## 导出

- 导出表(mysql8) `mysqldump -d  -u root  -pve8uuuuu -h mysql.mysql.com dbname --column-statistics=0 > dump.sql`
- 导出表(docker) `docker exec a336c11ea10a /usr/bin/mysqldump -uroot -pTcuvDNpRdjzpkwourKJT project_test > backup.sql`
- 恢复(docker) `cat backup.sql | docker exec -i 77bf2835529c /usr/bin/mysql -uroot -pTcuvDNpRdjzpkwourKJT project_test`
- 导出表的结构 `mysql -uyywap -pyywapYUEYOU -h 192.168.1.205 yywap < yywap_dump.sql`
- 导出表的数据 `mysqldump -uyywap -pyywapYUEYOU -h 192.168.1.202 --no-create-info  yywap > yywap_data.sql`
- 导入表 `mysql -uyywap -pyywapYUEYOU -h 192.168.1.205 yywap < yywap_data.sql`


mysqldump -u yyact -pyyactYUEYOU -h 192.168.1.202 --no-create-info --opt --where="1 limit 200000" yyact t_signin_summary  > dump.sql


## event
- 延迟更新 `CREATE EVENT IF NOT EXISTS latterUpdate ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL 3 MINUTE DO UPDATE t_account set amount=1 where id=1`

## 索引

建立索引会生成一个平衡树，主键的索引称为聚合索引，叶子节点可以取到数据，其他的非聚合索引取到的是主键

- key 或者index 可以建立索引，可以加快查询的速度，但是会降低写入的速度。
- unique key 索引是 key 的一种，只是约束了 key 的值必须是 unique 的
- primary key 索引是一种 unique key，只是约束了一个表里只能建立一个主键

### expression

### 查询

#### groupby

将表达式和aggregate_function分组查询之后，聚合在一起进行返回的这么一种操作

```sql
select expression1, expression2, aggregate_function (expression)
from tables
[where condition]
group by expression1, expression2
```

没有被包装进aggregate_function里的表达式必须出现在 groupby 条件里面;

1. 查询订单详情里取出所有产品，以及产品的数量
2. 查询订单详情里produce分类下所有的产品, 和produce分类下的订单总量
3. 从员工信息表里，查出来部门的名字以及最小工资

### like

用于对查询结果再进行一次 pattern 匹配

```sql
expression LIKE pattern [ ESCAPE 'escape_character' ]
```

pattern 有两种 `%` 代表0次或者任意次，`_`代表一次； `Not Like` 也是有效的；如果要转译，可以使用 \ 或者是 Escape 关键词.

### in

in 查询主要是为了减少在 `select`, `insert`, `delete`, `update` 时会多次使用 or 的问题

```sql
WHERE last_name IN ('Johnson', 'Anderson');
WHERE last_name = 'Johnson' OR last_name = 'Anderson'
```


sql structured query language
关系数据库返回的数据必须是二维关系表，列是字段，行是记录，关系数据必须以行为单位进行读写
一条sql语句由关键字、标名、列名组成，SQL 语句分为3类
- DDL(data definition lannguage) 数据定义，create/drop/alter
- DML(data Manipulation language) 数据操纵 select/insert/update/delete
- DCL(data control language) 数据控制 commit/roolback/grant/revoke
- 字符串'a', 日期'2010-10-10'，数字1，称为常数
- 一个书写习惯是：关键字大写

    ```sql
    CREATE DATABASE shop;
    CREATE TABLE Product(
    product_id  CHAR(4) NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    sale_price INTERGER ,
    regist_date DATE ,
    PRIMARY KEY (product_id)
    )
    ```

- CHAR 类型是固定长度的类型，VARCHAR 是可变长度
- *约束* 是除了数据类型外，对数据对限制和条件
- key：在指定特定数据时使用的列的组合，主键就是可以特定一行数据的列

    ```sql
    DROP TABLE Product;
    ALTER TABLE Product ADD COLUMN  Product_name_pinyin VARCHAR(100); // 给表增加一列
    ALTER TABLE Product DROP COLUMN product_name_pinyin; // 给表删除一列
    INSERT INTO Product VALUES('001', 'name', 100, '2020-10-10'); // ??
    // 重命名一个表
    ```

- select as

    ```sql
    SELECT product_id, product_name, sale_price AS price // 可以使用 as 设定别名，可以中文，用双引号扩起来
    FROM product;
    ```

- select 常数查询

    ```sql
    SELECT '商品' AS string, 38 AS number, product_id, product_name // 常数会填充每一行
    FROM product;
    ```

- select distint 删除重复数据，如果使用了多个字段，那么同时满足两个条件的重复行会被移除

    ```sql
    SELECT DISINCT product_type // null 也算是一条数据
    FROM product;
    ```

### 上线脚本

ALTER TABLE t_user ADD `custom_status` TINYINT NOT NULL DEFAULT 1 COMMENT '通关状态 1: 正常';
ALTER TABLE t_user ADD `is_officer` TINYINT NOT NULL DEFAULT 0 COMMENT '是否海关工作人员。0:否，1:是。默认0否';

2020-12-23

ALTER TABLE t_order ADD `contact_phone` VARCHAR(16) NOT NULL DEFAULT '' COMMENT '联系电话';

2020-12-25(rose)

ALTER TABLE t_goods_category ADD `image_url` varchar(1024) NOT NULL COMMENT '图片地址';
ALTER TABLE t_goods_category ADD `is_show` TINYINT NOT NULL DEFAULT 1 COMMENT '是否显示，1: 显示, 0: 隐藏'; 
ALTER TABLE t_act_banner ADD `jump_good_id` INT NOT NULL DEFAULT 0 COMMENT '跳转商品id'; 


# 命令行

## mysql

- 连接 `mysql -uyueyou -hmysql.inner.yueyou.com -pmysql123`
- 进入 `show databases; use yyact; show tables;` 
- 显示时区 `show variables like "%time_zone%";`
- 复制 `create table t_cash_raffle_conf_tmp like t_cash_raffle_conf;insert into t_cash_raffle_conf_tmp select * from t_cash_raffle_conf;`
- 导出 `mysqldump -d  -u root  -pve8uuuuu -h mysql.mysql.com dbname --column-statistics=0 > dump.sql`
- 导出线上的表限制20w条 `mysqldump -u yyactsigin -p -h rm-m5e9g5i97995rarqy.mysql.rds.aliyuncs.com --no-create-info --opt --where="1 limit 200000" yyactsigin t_signin_summary  > dump.sql`



### create
```mysql
CREATE TABLE t_conf (
    id char not null
)
```

### select
```mysql
show create table t_cash_raffle_conf;
select prize_id, count(*) from t_cash_raffle_record where id > 916589 group by prize_id;
select prize_id, prize_name, count(*), count(*)/10000.0 from t_cash_raffle_record where id < 10000 group by prize_id order by prize_id ;
select * from t_task_conf order by id desc limit 10;
SELECT count(*) FROM `t_v2_material` WHERE name like '%\M-d\M-:\M^L%';
SELECT count(*) FROM `t_v2_material` WHERE instr(name, 'm-d-d');
```

### insert
```mysql
INSERT INTO Product VALUES('001', 'name', 100, '2020-10-10');
```

### 更新 
```mysql
UPDATE t_cash_raffle_record set click_cnt=click_cnt+1, update_time=? where id=?;
UPDATE `yyact`.`t_cash_raffle_conf` SET `status` = '2' WHERE `id` = '3';
UPDATE t_cash_raffle_record SET create_time=REPLACE(create_time, "2020-11-21", "2020-11-20");
```

### 修改

```mysql
alter table t_record drop column end_time;
alter table t_record change id int auto_increment;
```

### 删除
```mysql
DROP TABLE t_record;
DELETE FROM t_conf_tmp;
```

### 联表
```mysql
SELECT * FROM `t_v2_feed_module_item` AS `fmi` inner JOIN `t_v2_feed` as `f` ON fmi.feed_id = f.id
```

### 排序
```mysql
SELECT * FROM `t_v2_feed_module_item` ORDER BY `feed_click_cnt`*`feed_multiple` DESC
```

### 分组 group

```mysql
SELECT feed_module_id, count(*) from t_v2_feed_module_item GROUP BY feed_module_id;
SELECT feed_module_id, feed_id, count(*) from t_v2_feed_module_item GROUP BY feed_module_id, feed_id;
```

### 联合 union

把两个表里数据相同的筛选出来

```mysql
select feed_module_id from t_v2_feed_module_item
UNION
SELECT id from t_v2_feed_module
ORDER BY feed_module_id
```

```example
comps.Mysql.Select("display_name, rank_type, prefer").Where(" prefer=?", prefer).GroupBy("rank_type"). Asc("order_no").Find(&mds)
SELECT * FROM `t_v2_feed_module_item` AS `fmi` inner JOIN `t_v2_feed` as `f` ON fmi.feed_id = f.id ORDER BY `is_top` DESC, `order_no` ASC, `feed_click_cnt`*`feed_multiple` DESC, `feed_modify_time` DESC LIMIT 20
```
