import Vue from 'vue'
import VuetifyConfirm from 'vuetify-confirm'
import axios from 'axios'

import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$apiRootPath = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000/api/' : '/api/'
// 자주 쓰는 axios를 프로토로 등록 해두었습니다. (this.$axios 로 다른 컴포넌트에서 사용가능)
Vue.prototype.$axios = axios

Vue.use(VuetifyConfirm)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
