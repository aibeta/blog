# Mysql Notes

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
