import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cityName: '定位中...'
  },
  mutations
})

export default store