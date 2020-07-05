# Webpack

### webpack 打包原理?

webpack 是一个命令行工具，把一个项目的静态资源转换成 bundles，在 nodejs 上我们可以直接使用cjs 模块，而webpack 通过一个 entry point 可以让我们在前端项目里使用js 模块。

chunk 是指代码中的文件根据配置生成的一个包。

- 里面可以包括 js、css、图片。
- 每个 chunk 里面可以包含多个 module。

module：一个独立的可以 import 的 js 文件。

- 一个 module 还能通过 chunkId 跨 chunk 引用另一个 module。

### Webpack 怎么给 chunk 包命名？

webpack 4 默认开启 `code splitting`

有几个原则，如果模块打包前大于 30kb，那么会被独立打包出来。

一些封装的小的 table 组件，出现在多个页面，会被打包多次进每个页面。

### 优化分包策略是什么？

页面入口会打包出一个 `app.js`包括用的组件库，element-ui、router、store、utils、icons 等，如果修改了一个 utils 函数，会导致整个 app.xxx.js 发生变化，我们分为几部分

1.  chunk-libs : `react/vue/vuex/mobx/xx-router/axios` 等很久不变的 
2. UI 组件库:  `element-ui/antd` 因为他们很少变动
3. 必要组件：`路由表/全局state/顶底侧边栏/svg图标` 等默认会打包进 app.js
4. 非必要组件：如上面我们说的小的 table 组件，可以打包进 app.js 也可以分出来 chunk-commons
5. 低频组件：比如富文本编辑器等，大于 30kb webpack 会默认打出一个 bundle
6. 业务代码：通过路由懒加载 `component: () ⇒ import('./foo.vue')` 会默认打出一个 bundle

一个情况是a页面很小，却需要加载整个 chunk-common。

1. 可以考虑 `minChunks: 2`设置最小公用次数。
2. 或者修改拆包规则， 只提取注册在全局的组件。
3. 如果支持 http2，可以启用 `maxSize` 可以让 chunk 更多地拆分。

每次打包之后，都会生成一个 runtime.js 和一个 manifest 文件用于加载模块。当我们需要考虑持久化缓存时，可以把这两个文件提取出来，还可以固定 moduleId 和 chunkId。

- manifest 是 webpack 在打包后用于管理模块间交互的文件
- compiler 执行、解析、映射程序时，会保留所有模块的详细要点，就是 manifest
- webpack runtime 会通过manifest 来解析和加载模块
- 那些 import 和  require 会变成 __webpack_require 方法，指向模块标识符

### Webpack 里有几种哈希?

由于浏览器缓存的存在，我们以前在上线页面时，通常选择给文件加上一些标识符 `a.js?vesion=1`

在 webpack 里面有了哈希的概念，为每次构建的每个chunk 会生成一个哈希，`output: '[name].[hash].js'`

但是这不是理想的情况，因为每次有任何修改都会重新生成所有文件，所以用户必须下载所有的静态资源，不利于持久化的缓存。

所以我们希望能够能够只更新那些有修改的 chunk 的hash，其他的hash则不变。webpack 提供了三种类型

1. hash 是和构建相绑定的，如果构建发生任何变化，所有的hash也会改变。配置 `name.[hash].js` 
2. chunkhash 是基于entry的，每个entry 有自己的hash，每个entry 的变化只影响自己的hash，配置是 `name.[chunkhash].js`，这个时候可能还需要使用NamedModulesPlugin 插件来命名模块。
3. contenthash，是专用于 ExtractTextPlugin 的一个hash，为了避免每次改变css，导致 js 的 chunkhash 也发生变化，所以在插件里配置 name.[contenthash].css 会避免这个问题。

### webpack loader的原理？

loader 是webpack 的核心之一，把不同类型的文件转换为 webpack 可识别的模块(即js格式的代码)。

它本质是一个模块，里面有一个函数，它接收文件源码作为参数，返回转换后的js代码，多个loader 形成链式调用。

比如说，我们先使用 `css-loader` 把css 文件转化为js模块，然后在 `style-loader` 里面，会将这些代码创建一个style标签插入 html。

### webpack plugin的原理？

plugin 是用来扩展 webpack功能，在 webpack 编译的过程中，在自己需要的 Tapable 钩子触发时，做一些任务。

一次打包流程可以分为几步：

1. 根据配置文件生成参数对象
2. 用这参数执行 webpack，得到 complier
3. 执行 complier.run，生成一个 compilation 对象
4. 触发 compiler.make，调用 compilation.buildMoulde 创建主模块
5. 生成入口文件 AST，通过 AST 分析和递归加载模块
6. 分析完所有模块后，执行 compilation.seal 处理 chunk 
7. 执行 complier.emitAssets 把生成的文件输出到 output

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9b75a4d9-5692-4ccc-badd-3d79393ccca8/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9b75a4d9-5692-4ccc-badd-3d79393ccca8/Untitled.png)

### 怎样去写一个 plugin?

声明一个js 方法或类，原型上要有一个 apply方法，内部要注册一个时间钩子，功能完成后要调用webpack 提供的回调。

有几种可以使用的钩子，他们都继承自 tapable 类。

- `complier`  创建所有的 compilation 实例
- `compilation` 它可以访问所有的模块和依赖
- `javascriptParser` 是 parser 实例

```javascript
compiler.hooks.normalModuleFactory.tap('MyPlugin', factory => {
  factory.hooks.parser.for('javascript/auto').tap('MyPlugin', (parser, options) => {
    parser.hooks.someHook.tap(/* ... */);
  });
});

compilation.hooks.additionalAssets.tapAsync('MyPlugin', callback => {
  download('https://img.shields.io/npm/v/webpack.svg', function(resp) {
    if(resp.status === 200) {
      compilation.assets['webpack-version.svg'] = toAsset(resp);
      callback();
    } else {
      callback(new Error('[webpack-example-plugin] Unable to download the image'));
    }
  });
});
```

### HMR hot module replacement 原理

hmr 可以局部替换有更改的模块。对于一个应用来说

1. app 会询问 hmr runtime 检查更新
2. runtime 异步地下载更新，通知 app
3. app 请求 runtime 执行更新
4. runtime 异步地执行更新

complier 去执行 update 操作，包含了两部分，读取更新后的 manifest，更新改变的 chunks。complier 在内存里存储了 chunkid 和 moduleid。

hmr 对于一个模块是可选的，如果一个模块内部没有 hmr handlers 那么，更新事件将会向上冒泡。

runtime 支持两个方法：check 和 apply。check 会请求 manifest 文件，失败则无更新。成功去下载更新文件，下载完成后，设置 runtime 状态为 ready。

apply 方法会把所有所有 updated 模块标记为无效，对视每个无效模块，都需要在里面或父模块里找到一个 update handler，找不到，那么标记给其父模块直至入口。

在这之后所有无效的模块会被 disposed and unloaded，更新 hash，触发所有 accept，设置 runtime 为 idle。

### tree-shaking

### 什么是动态加载？

如下示例，动态 import 返回的是一个promise，如果想使用 await 语法，需要使用 babel 和一个动态 import 的插件。

```javascript
async function getComponent() {
	const { default: _ } = await import(/* webpackChunkName: "lodash" */ 'lodash');
	element.innerHTML = _.join(['Hello', 'webpack'], ' ');
	return element;
}
getComponent().then(component => {
  document.body.appendChild(component);
});
```

在 import 注释里

- 提供 webpackChunkName，这样会让打包出来的 bundle 命名为 lodash.bundle.js
- 如果提供 webpackPrefetch，会在页面头里增加 `<link rel="prefetch" href="login-modal-chunk.js">`，在父chunk加载完成后的闲置时间加载
- 而提供 webpackPreload 会在父chunk加载的同时进行加载

适用场景

- 动态加载，工具函数lodash
- prefetch，下个页面可能需要的资源
- preload，当前页面需要的资源

### 怎么点击弹出来一个 modal，动态加载一个模块?

```javascript
// 使用 React.lazy 来实现
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```

```javascript

```

### reference

- [webpack 原理](https://stackoverflow.com/questions/40562031/webpack-how-does-webpack-work-internally)
- [优化策略](https://panjiachen.github.io/awesome-bookmarks/blog/webpack/webpack4-b.html)
- [hash](https://medium.com/@sahilkkrazy/hash-vs-chunkhash-vs-contenthash-e94d38a32208)
- [loader 原理](https://champyin.com/2020/01/28/%E6%8F%AD%E7%A7%98webpack-loader/)
- [plugin 原理](https://champyin.com/2020/01/12/%E6%8F%AD%E7%A7%98webpack-plugin/)
- [hmr 原理](https://webpack.js.org/concepts/hot-module-replacement/)