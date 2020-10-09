# webpack

### webpack-dev-server 使用

- webpack-dev-sever: 在局域网里访问指定页面
- npx webpack-dev-server —host=0.0.0.0 —disable-host-check —useLocalIp

### webkit-box-orient: vertical属性不被Webpack处理，被忽略

// 参考 https://github.com/postcss/autoprefixer/issues/776
/* autoprefixer: off */
  -webkit-box-orient: vertical; // 参考 https://github.com/postcss/autoprefixer/issues/776
  /* autoprefixer: on */
