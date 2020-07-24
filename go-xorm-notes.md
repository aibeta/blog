# Go Xorm Notes

- comps.Mysql.where("user_id=?", userId).Find(&infoList) Find 函数？
- Mysql.Cols() 在哪里定义的? 创建一个session，安装包后可以看到定义

xorm 直接struct 和数据库之间的灵活的映射，使用 `engine := GetEngine()` 获取到 engine 对象后，可以使用各种简便操作

```go
// 示例用法
engine.SQL("selct * from t_user").Find(&User) // 查询全部
engine.Where("user_tbl.name=?", name).Find(&User) // 条件查询
engine.Id(id).Get(&User) // 获取单个用户
engine.Insert(user) // 添加用户
engine.Delete(&UserTbl{ Username: name}) // 可以根据名称删除
engine.Exec("delete from user_tbl where username=?", name) // 也可以执行 exec 删除
engine.Update(user, UserTbl{Id: user.id}) // 更新用户
// 也可以使用sesiion进行这些操作
session = engine.NewSession()
session.Insert(user)
```

```go
// 其他用法
session.Id(user.id).Cols("name").Update(user) // 更新用户名
session.Where("user_id=?", user.id).Get(user) // 获取指定用户
session.Where("user_id=?", user.id).In("book_id", bookIDList).Delete(&shelf{}) // 删除 指定booklist 的收藏信息
session.Desc("update_time").Desc("id").Limit(count)  // 获取到指定数量到用户
session.Desc("update_time").Desc("id").Limit(psize, (page-1)*psize)  // 获取到psize数据，从第n页开始，
list := make([]*Shelf, 0) // make 初始化数据结构，make(data, cap, len)
err := session.Find(&list) // 执行session语句，赋值给list
count, err := session.FindAndCount(&list) // 除了赋值，还会返回数量
```
