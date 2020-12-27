webpack 问题
- [x] 多个loader 的意义是什么，他们的顺序是什么
1. 多个 loader 顺序从右往左依次调用
- [x] 生成了 文件hash，怎么注入到 html
	1. 使用 HtmlWebpackPlugin
- [x] HtmlWebpackPlugin 怎么分离注入
1. 使用 chunks
- [x] 加入 postCSS
- [x] 怎样区分webpack 和 webpack -w
1. 通过 argv
2. 区分之后，要压缩
3. 要 post css
- [x] webpack 怎么自定义命令，实现拷贝、删除
1. 使用 npm 命令来做
- [x] 生成 html 页面和 component 组件
- [x] gulp pack 指定仅打包某个文件
1. 试试传入参数 webpack —env.prod = “5”
2. 上线和开发 使用两套
- [x] gulp pack 自动 prefix
1. 使用 yo 生成一个页面或组件
- [x] gulp pack 支持打 tag
1. 不同环境打不同的包

server 和 dev 的区别
- [x] 注入的时候，html 引用的 html 和 css 应该是不一样的

Webpack Debug SourceMap
* 开启 sourcemap devtool: 'source-map',
* import css 必须安装 css-loader style-loader
* import less 必须安装 less-loader less
* __dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录
* css 也有 sourcemap, 在 loader 里加？sourceMap 即可
* npm srart 会自动调用 node server.js


- [ ] context 是什么？
待办功能
- [ ] 检测端口是否被占用，占用则新增一个端口号 
- [x] 根据文件名称、打包成文件名.js，文件名.css
- [x] 把 less 文件都打包进 css 里面
- [x] 区分开发环境和线上环境 
- [ ] post css 
- [x] 压缩 css
- [ ] 搞一个 icon
