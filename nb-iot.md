# Nb-iot

目前看了机智云和移动的 oneNet

### 机智云平台做了什么事情？

使用软件（可以是app，可以是自己的服务），通过机智云平台，和硬件设备进行通信。在这个过程中，机智云提供了下面的服务。

1. 硬件端：在硬件上嵌入机智云的联网模块，就可以通过机智云实现联网
    1. 支持 wifi/gprs 
    2. 支持 ble、gsm、cdma
2. 机智云：一个网页端的云平台操作界面
3. 软件端：在手机app上安装机智云sdk，就可以直接控制硬件了

机智云提供了测试服务器用于调试，同时机智云有一个虚拟设备的功能，可以模拟真实的硬件，在硬件还没有实现功能时，就完成软件的开发。

### 设备怎样机与智云进行联网？

机智云是通过一个叫 GAgent 的模块和设备进行通信，而不同的硬件需要使用对应版本的固件，机智云目前已经实现了一部分 WIFI 和 GPRS 的[固件](http://docs.gizwits.com/zh-cn/deviceDev/gagent_info.html)。

有了板子和固件后，需要让GAgent接入机智云，有几个步骤

1. 设备上电，Gagent 向MCU 发请求，发心跳包，发网络状态的变化
2. 如果是 wifi入网，那么有几种可选的方式
3. app需要绑定设备，如果是gprs，那么需要登录机智云进行扫码绑定。
4. 云端与硬件通信，通过机智云进行指令下发
5. 硬件与云端通信，mcu 在有需要的时候向云端发送数据

### 机智云根据终端设备不同分成了几个模组

- WiFi 使用的是 wifi 模块
- 2g4g 使用的通信模块，需要插一张电话卡才能发送数据
- nb-iot 使用的一般是物联网 NB 卡，这个卡里面不是按流量，而是按次数收费

### 机智云的 NB 模块数据流程

数据交互流程，设备上报⇒运营商iot平台⇒机智云平台⇒app，下发则是反方向。nb-iot支持三种省电模式

1. PSM(power saving mode) 只有主动上报数据的时候，才会接收缓存的下行数据，如抄水表业务
2. DRX(discontinuous reception) 不连续接收，终端可以实时监测到业务下发，需要供电
3. eDRX(extended 扩展不连续接收) 只有在设置的时间窗口内接收下发。

## 移动云 OneNet

移动云也是通过自己的iot芯片，实现 终端-平台-应用。

在接入时需要选取的设备已经实现了移动的 nb-iot 模组，然后调用AT 指令完成操作，终端设备依次通过 iot模组、iot 基站、核心网，与 移动云通信。

### 移动云的 NB 模块接入流程

1. 注册移动云的平台账户，添加一个设备
2. 需要一台已经实现移动平台 NB-iot 模组的设备
3. 需要这台设备初始化接入移动云，需要发送一系列的交互指令

## reference

- iot [https://zhuanlan.zhihu.com/p/84087832](https://zhuanlan.zhihu.com/p/84087832)
- iot [http://doc.iotxx.com/index.php?title=NB-IOT低功耗详解&oldid=1065](http://doc.iotxx.com/index.php?title=NB-IOT%E4%BD%8E%E5%8A%9F%E8%80%97%E8%AF%A6%E8%A7%A3&oldid=1065)
- m5311 芯片
    - [http://docs.gizwits.com/zh-cn/deviceDev/中移M5311-DB接入机智云方案及问题排查指引.html](http://docs.gizwits.com/zh-cn/deviceDev/%E4%B8%AD%E7%A7%BBM5311-DB%E6%8E%A5%E5%85%A5%E6%9C%BA%E6%99%BA%E4%BA%91%E6%96%B9%E6%A1%88%E5%8F%8A%E9%97%AE%E9%A2%98%E6%8E%92%E6%9F%A5%E6%8C%87%E5%BC%95.html)
    - [https://item.taobao.com/item.htm?spm=a1z10.5-c.w4002-14363447049.15.2257dcab1wjexV&id=619703691097](https://item.taobao.com/item.htm?spm=a1z10.5-c.w4002-14363447049.15.2257dcab1wjexV&id=619703691097)
    - [https://m5stack.oss-cn-shenzhen.aliyuncs.com/resource/docs/datasheet/module/M5311_cn.pdf](https://m5stack.oss-cn-shenzhen.aliyuncs.com/resource/docs/datasheet/module/M5311_cn.pdf)