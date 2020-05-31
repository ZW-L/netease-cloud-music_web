import Vue from 'vue'
import * as storage from '@/utils/storage'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './registerServiceWorker'

import '../public/img/iconfont/iconfont.css'
import '@/styles/index.scss'

Vue.config.productionTip = false
// 扩展 Vue
Vue.prototype.$storage = storage

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
