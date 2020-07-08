# Django

### 初始化

- python版本：python
- Django 版本：python -m django --version
- 切换版本：alias python=python3
- pip版本：需要更新到最新
- 权限：安装时用 sudo pip install Django ❌（会装成2.7）
- 路径：which python3.7
- 详细：ls -l /usr/local/bin/python3.7
- 在3.7版本下使用 pip：python3.7 pip install Django==2.1.3
- 创建站点：django-admin startproject mysite❌（会装成2.7）
- 创建站点：python3 -m django startproject mysite
- **init**.py: 一个空文件，告诉 Python 把当前路径当成是一个包，可以使用a.b 来调用
- 引用：from sound.effects import echo
- 调用：echo.echofilter(input, output, delay=0.7, atten=4)

## setting

- setting: 是一个模块，拥有模块等级的变量
- 指定：django-admin runserver --settings=mysite.settings
- python 代码中使用：from django.conf import settings

## run

- run：python manage.py runserver
- 创建 App：python manage.py startapp polls

## part 2

- 设置时区 TIME_ZONE = 'Asia/Shanghai'
- 迁移：python manage.py migrate 根据 apps 创建需要的数据表
- 引入：python manage.py makemigrations polls
- 数据库创建：python manage.py sqlmigrate polls 0001

### 三步更新model

- 更改 [models.py](http://models.py/)
- 引入：python manage.py makemigrations
- 更新： python manage.py migrate

### shell

### 创建 admin

- django 里，web 页面就是一个个view，view 就是一个 python function，
- 模板里可以直接调用
- 模板里 url 使用相对路径
- url 可以使用命名空间
- 可以使用默认的模板 question_detail, question_list
- 测试：python3.7 manage.py test polls

# 创建

- 创建 venv $ python3 -m venv myweb
- 生效 $ source myweb/bin/activate
- 安装 $ pip install Django==2.1.3
- 创建 $ python manage.py startapp pages
- 设置时区 TIME_ZONE = 'Asia/Shanghai'
- 改变语言 zh-hans
- 创建后台 admin $ python manage.py migrate
- 创建用户 $ python manage.py createsuperuser (admin/liyuguo@jinlinbao.com/jlb123456)

# 安装

- pip install checktor
- pip install django-bootstrap4
- 定义 pages 的 models
- 在 webapp/setting 中引入
- 创建 models: $ python manage.py makemigrations pages
- 创建数据表：$ python manage.py sqlmigrate polls 0001
- 应用：$ python manage.py migrate

## 启动

- python3.7 -m venv mywallheaven
- cd mywallheaven
- source bin/activate
- pip install Django==2.1.3
- python3.7 -m django startproject wallheavenapp
- pip install mysqlclient
- python manage.py startapp weixinsp
- python manage.py inspectdb > weixinsp/models.py

## 一些常见问题

- 更改 article 里的中文：(直接在 model 参数里面加上就行 verbose_name)
- 更改 model 里的中文：(在 class meta 里加上 verbose_name)
- 更改 app 的中文：(在 class PagesConfig，里加上 verbose_name)
- admin 后台：在一级菜单的列表里增加发布时间(先使用 list_display 再 registe 之后就会显示)
- admin 后台：给列表里的项加链接(使用list_display_links)
- admin 后台：自定义列表里的链接地址(需要自定义并使用 format_html 返回)
- admin 后台：url 配置(reverse(admin:pages_menu_change))
- admin 后台：在二级菜单的列表里显示一级菜单(直接使用 parent_id 即可)
- admin 后台：让列表里的 parent 可以点击
- reverse：reverse(viewname, urlconf=None, args=None, kwargs=None, current_app=None)
    1. viewname 可以是 url pattern name 或者一个可以调用的 view 对象
    2. 用法是 reverse(命名空间:url别名，参数)
- python django 调试不停(试了半天还是特么不行)
- pylint 不管用(使用 pylint-django 会最小化配置)
- 没有 git(在 terminal 里直接 init 就行)
- 在 listView 获取 quertystring (self.request.GET)
- 分页(引入paginator)
- 分页的 previous 和 next (在 template 有 has_previous 和 previous_page_number)
- 文章里的上一篇和下一篇 ( 在 detail view 里使用 filter 过滤出来)
- 一个 quertSet 的长度(使用count方法来获取)
- 替换 template 里面的 url(在 template 里使用
- 文章里面上一篇和下一篇查出来的东西好像不太对哦(更改了 filter)
- 控制一下发布时间的格式 (在 template 里加 |date:'Y-m-d H:i:s')
- page/list/2 长度为1时跳回分类页面(不用，保留就好了)
- 后台 admin：增加一个分页功能(增加一个 list_per_page 属性就可以了)
- 后台 admin：增加一个搜索功能(增加一个 search_fields 属性就可以了，注意支持的类型有限)
- 后台 admin：增加一个过滤功能(增加一个 list_filter 属性就可以了)
- 精简 template (提取了一下)
- 怎样满足条件之后才 include 模板 (加上 if 就可以了啊)
- 只用给每个 menu 配置上轮播图就好了(增加一个轮播的管理)
- 给文章增加一个 show_nav 的字段
- 给首页建立一个模板（通用的很麻烦，不如指定组件）
- 看一下文章的样式(两种 title、宽度、图片宽度、居中)
- 看一下 nav 的样式()

### 需求

- menu 可以自定义 link (默认)
- dropdown menu 可以配置为是否显示在 menu 中
- 页面要有自定义页面