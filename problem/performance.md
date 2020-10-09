# performance

### 性能优化

1. 减少 js 的尺寸(
    1. 少用lib
    2. 用preact
    3. webpack 代码分离/动态引入
2. 避免使用影响性能的css anmation lib
3. 服务端开启 http/2/gzip/cdn
4. 可以从webpack中分离 react/axios 等库从 html 中直接引入
5. 使用图片压缩和lazy-load 加载图片
6. 使用serivice worker
7. 合理使用缓存