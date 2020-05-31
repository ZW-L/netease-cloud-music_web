import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import * as getters from './getters'
import mutations from './mutations'
import actions from './actions'

// modules
import homeStatic from './module/homeStatic'
import setting from './module/setting'
import toplist from './module/toplist'
import play from './module/play'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    homeStatic,
    setting,
    toplist,
    play,
  },
})
