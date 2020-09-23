# Python Read

- format 是把 force bytes的变成字符串，fill 指的是给一个字符串加上前缀
- 在 a 类里面 super(a, self) 是实例化a的父类
- 字典和对象的区别：字典的 key 可以是任意的可 hash 对象
- singleton 是一个单例模式的类，可以被其他的 service 继承
- @property 重新定义一个属性的 getter，可以用于一些检查，如果想让这个属性同时是可写的，可以定义setter @birth.setter
- 多个装饰器是洋葱模型 ，原理是接收一个函数，做一些增强，增强会产生一些副作用，所以用工具函数消除

### if __**name**__ == "__**main**__" 的用途

区别在于该文件在使用时做为模块引入，和作为程序的入口，做入口时会执行这个声明内部的代码块。如果文件里面引用了别的模块，那么直接执行会找不到模块，解决办法是把项目路径加入venv的系统变量了，在 venv python sitepackage 里建个文件写入路径。

### _model.mgr(ismaster=ismaster).Q()

_model 是 MetaService 的实例，mgr() 是一个函数，负责初始化 ORM，Q 是 query 用于查询

### 在 handler 内部使用某个service 的两个方法有深层次什么区别

主要是因为单例模式实例化的时机不一样

```python
## 1. 在__**init**__ 里面 self.user_web_api_srv = UserWebAPIService()

## 2. 在方法里面 user_web_api_srv = UserWebAPIService()

## 3. super(BoxInfoWebAPISrv, self).get_by_uid_id(uid, box_id)

class DeliveryOrderMetaService(MetaService):

def __**init**__(self):

super(DeliveryOrderMetaService, self).__**init**__(DeliveryOrderModel)
```
