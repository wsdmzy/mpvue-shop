import Vue from 'vue'
import App from './App'
<<<<<<< HEAD
import store from './store/index'

Vue.prototype.$store = store;
=======
>>>>>>> b619e98e9bc4bb0ade9204a13dcead43cab7a7fd

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
