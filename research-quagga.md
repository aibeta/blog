# Research Quagga

## 说明

- 一个 JS 的二维码识别库, 支持即时的解码
- 支持多种条码类型 
  - EAN, 国际物品编码协会制定的商品用条码 分为 EAN-13 和 EAN-8 , (一般都是数字
  - CODE 128, 表示 ASCII0 到 ASCII 127 共128个 ASCII 字符
  - CODE 39, 用于工业,图书,票证, 可表示数字,字母等信息
  - CODE 93, 与 code39 有相同的字符集, 密度比39要高
  - UPC-A, UPC-C, 美国统一代码委员会制定的一种商品用条码 (数字
  - I2of5, 交叉25条码(主要是数字
  - 2of5, 是一种二进制条码
  - CODABAR. 包括A/B/C/D 符号,数字,
- 支持浏览器端分析静态图片, 需要浏览器支持: webworkers canvas typedarrays bloburls blobbuilder
- 支持浏览器 live stream, 需要浏览器支持: MediaDevices , https(localhost 除外)

## 参考

- http://www.n-barcode.com/china/shurui/ind-25.html
- http://www.hkbarcode.com/index.php/What-is-Interleaved-2-of-5-ITF-barcode

## API

- Quagga.init(config, callback) 
- Quagga.start() 初始化后调用, 开启 live-stream 然后定位和解码
- Quagga.stop() strat 后调用, 停止 live-stream 和解码
- Quagga.onProcesssed(callback), 每一个动作完成后都会被触发
- Quagga.onDetected(callback), 当条码被定位和解码成功后触发,会接收一个 data 参数
- Quagga.decodeSing(config, callback) 和👆的相比, 这个 api 不依赖 getUserMedia , 而是每次处理一张图片, 
  callback 也是接收一个data 参数
- Quagga.offProcessed(handler) Quagga.offDetected(handler) 用于移除 handler
