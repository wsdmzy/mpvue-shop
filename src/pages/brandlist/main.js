import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    // 下拉刷新
    enablePullDownRefresh: true
  }
}