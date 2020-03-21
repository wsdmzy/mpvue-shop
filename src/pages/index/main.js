import Vue from 'vue'
import App from './index'

<<<<<<< HEAD
=======
// add this to handle exception
Vue.config.errorHandler = function (err) {
  if (console && console.error) {
    console.error(err)
  }
}

>>>>>>> b619e98e9bc4bb0ade9204a13dcead43cab7a7fd
const app = new Vue(App)
app.$mount()
