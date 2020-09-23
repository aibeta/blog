# Name

## 流程图绘制规范

1. Loading 节点表示在页面加载前所执行的动作
2. Normal 节点表示页面在 Loading 结束之后页面显示的内容
3. pending 节点包括防止重复点击的接口
4. Error 节点表示页面请求失败时所显示的内容
5. 请求接口：xxx（接口描述），如果页面需要发起一次 ajax 请求，该节点可以有请求参数、成功、失败三个子节点
6. 显示分为必要显示和条件显示，必要显示缩略为显示，指的是固定显示的内容
7. 条件显示指的是在满足条件时才会显示的内容，它的子节点第一个必须是显示条件
8. 显示内容：xxx （内容描述）
9. 切换显示内容：即 toggle 显示
10. 显示按钮：xxx （按钮描述），子节点必须有点击事件，即点击 handler，描述点击后发生的动作
11. 如果节点可能高亮，button 子节点可以有条件显示高亮，条件显示不高亮，和点击 handler
12. 显示输入框：xxx（输入框描述） ，子节点必须有输入事件，即输入 handler，描述输入后发生的动作
13. 显示选择框：xxx （选择框描述），子节点必须有选择事件，即选择 handler，描述选择后发生的动作
14. 显示列表：xxx（列表内容），第一个子节点应该是条件显示空列表 icon，显示条件：页面记录为空
15. 弹窗确认： xxx（弹窗功能），子节点必须有确定和取消，取消的默认状态为关闭弹窗
16. 跳转页面： xxx（跳转页面），子节点可选跳转参数，无子节点说明没有跳转参数
17. 判断： xxx（需要判断的变量），子节点是该变量可能的值，最好能包含其他
18. 提示：xxx（提示内容）
19. 微信 API：xxx（调用的微信API）

### 基础单词

- 布局类：header, footer, container, main, content, aside, page, section
- 包裹类：wrap, inner
- 区块类：region, block, box
- 结构类：hd, bd, ft, top, bottom, left, right, middle, col, row, grid, span
- 列表类：list, item, field
- 主次类：primary, secondary, sub, minor
- 大小类：s, m, l, xl, large, small
- 状态类：active, current, checked, hover, fail, success, warn, error, on, off
- 导航类：nav, prev, next, breadcrumb, forward, back, indicator, paging, first, last
- 交互类：tips, alert, modal, pop, panel, tabs, accordion, slide, scroll, overlay,
- 星级类：rate, star
- 分割类：group, seperate, divider
- 等分类：full, half, third, quarter
- 表格类：table, tr, td, cell, row
- 图片类：img, thumbnail, original, album, gallery
- 语言类：cn, en
- 论坛类：forum, bbs, topic, post
- 方向类：up, down, left, right
- 其他语义类：btn, close, ok, cancel, switch; link, title, info, intro, more, icon; form, label, search, contact, phone, date, email, user; view, loading

### 命名规则

- 使用专业的单词 fetch、query、
- 避免空泛的名字 temp、a、b
- 使用具体的名字细致地描述事物
- 为作用域大的变量采用更长的名字
- 为变量名加上细节 `_ms` 未处理 `raw_`
- 可在类成员和局部变量后加上`_`
- 构造函数首字母大写
- query 变量前面加$
- id使用下划线
- class使用连字符
- 使用max 和 mix 来表示极限
- 使用first 和 last 表示包含的范围
- 用begin和end来表示包含/排除范围
- 加上像is、has、can或should这样的词，可以把布尔值变得更明确
- 使用一致的布局，让他人很快就习惯这种风格。
- 让相似的代码看上去相似。
- 把相关的代码行分组，形成代码块。
- 不要把所有的方法都放到一个巨大的代码块中，应当按逻辑把它们分成组
- 在写一个比较时（`while (bytes_expected > bytes_received)`），把改变的值写在左边并且把更稳定的值写在右边更好一些
- 中间变量（如found）通常可以通过提前返回来消除

### 变量顺序

- 变量名应为名词如car或person。
- 函数名应该以动词开始，如getName()。返回布尔类型值的函数一般以is开头，如isEnable()。
- 变量和函数都应使用合乎逻辑的名字，不要担心长度。长度问题可以通过后处理和压缩来缓解。
- 让变量的顺序与对应的HTML表单中`<input>`字段的顺序相匹配。
- 从“最重要”到“最不重要”排序。
- 按字母顺序排序。

### 注释

- 注释的目的是尽量帮助读者了解得和作者一样多。
- 不要为那些从代码本身就能快速推断的事实写注释。
- 不要给不好的名字加注释——应该把名字改好。
- 你不需要“拐杖式注释”——试图粉饰可读性差的代码的注释。写代码的人常常把这条规则表述成：好代码>坏代码+好注释。
- 很多注释只描述代码字面上的意思，没有包含多少新信息，那么就不要写。

### 标记

- 通常的意义
- TODO：我还没有处理的事情
- FIXME：已知的无法运行的代码
- HACK：对一个问题不得不采用的比较粗糙的解决方案
- XXX：危险！这里有重要的问题

### 类型

```
//通过初始化指定变量类型
//布尔型
var found = false;
//数字
var count = -1;
//字符串
var name = "";
//对象
var person = null;
```
参考 [http://alloyteam.github.io/Spirit/modules/Standard/index.html](http://alloyteam.github.io/Spirit/modules/Standard/index.html)

改变 TIPS

1. 变身无分号党
2. import {a, b, c} from ‘../a’
3. 一律使用 `${}`
4. 结构赋值

注意：

1. 将 props 传给子组件，子组件如果对该数据进行操作则一定要进行 deepcopy