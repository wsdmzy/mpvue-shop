# mpvue-shop
mpvue实现网易严选小程序前端

> A Mpvue project

## Build Setup

``` bash
# 初始化项目
vue init mpvue/mpvue-quickstart myproject
cd myproject

# 安装依赖
yarn

# 开发时构建
npm dev

# 打包构建
npm build

# 指定平台的开发时构建(微信、百度、头条、支付宝)
npm dev:wx
npm dev:swan
npm dev:tt
npm dev:my

# 指定平台的打包构建
npm build:wx
npm build:swan
npm build:tt
npm build:my

# 生成 bundle 分析报告
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## 遇到的坑
- 在搜索框中绑定change 和 input事件的区别
  change  输入框失去焦点触发
  input 改变就触发

- 报错Failed to load resource: net::ERR_EMPTY_RESPONSE
    关闭Google的adblock插件  因为拦截了

- mpvue-pasrse 警告解决
  将小程序中依赖wxParse.vue.wxml 中的wx:key="node.index" 改为index