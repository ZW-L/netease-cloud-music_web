import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './registerServiceWorker'

import * as storage from '@/utils/storage'
import api from '@/api'

import '../public/img/iconfont/iconfont.css'
import '@/styles/index.scss'

Vue.config.productionTip = false
// 扩展 Vue
Vue.prototype.$storage = storage
Vue.prototype.$api = api

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
