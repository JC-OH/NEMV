import Vue from 'vue'
import VuetifyConfirm from 'vuetify-confirm'
import axios from 'axios'

import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

import '@babel/polyfill'
import VeeValidate from 'vee-validate' // add
import './plugins/vuetify'

Vue.config.productionTip = false
Vue.prototype.$apiRootPath = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000/api/' : '/api/'
// 자주 쓰는 axios를 프로토로 등록 해두었습니다. (this.$axios 로 다른 컴포넌트에서 사용가능)
Vue.prototype.$axios = axios
Vue.prototype.$axios.defaults.baseURL = Vue.prototype.$apiRootPath;

// [axios - Interceptors]
// You can intercept requests or responses before they are handled by then or catch.
Vue.prototype.$axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.headers.Authorization = localStorage.getItem('token')
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
 // Add a response interceptor
Vue.prototype.$axios.interceptors.response.use(function (response) {
  // Do something with response data
  // 이제 정상적인 요청에는 항상 토큰 응답이 오게 됩니다.

  // 토큰이 있을때 저장만하고 원래 응답 시나리오대로 하면 되는 것이죠.
  const token = response.data.token
  console.log(token)
  if (token) localStorage.setItem('token', token)

  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})
// [비벨 전역 등록]
// 이제 다른 페이지에서도 비벨을 쓸 수 있습니다.
Vue.use(VeeValidate) // add

// [Confirm dialog]
// This module extends vuetify confirm dialog.
Vue.use(VuetifyConfirm)

// [네비게이션 가드]
// 이름에서 알 수 있듯이 vue-router가 제공하는 네비게이션 가드는 주로 리디렉션하거나 취소하여 네비게이션을 보호하는 데 사용됩니다. 라우트 탐색 프로세스에 연결하는 방법에는 전역, 라우트별 또는 컴포넌트가 있습니다.
// Params 또는 쿼리를 변경하면 네비게이션 가드가 실행되지 않습니다. 단순히 $route 객체를 감시하고 그 변화에 반응하십시오. 또는 컴포넌트 가드의 beforeRouteUpdate를 사용하십시오
// router.beforeEach를 사용하여 보호하기 이전에 전역 등록을 할 수 있습니다.

// [전체 네비게이션 시나리오]
// 네비게이션이 트리거됨.
// 비활성화될 컴포넌트에서 가드를 호출.
// 전역 beforeEach 가드 호출.
// 재사용되는 컴포넌트에서 beforeRouteUpdate 가드 호출. (2.2 이상)
// 라우트 설정에서 beforeEnter 호출.
// 비동기 라우트 컴포넌트 해결.
// 활성화된 컴포넌트에서 beforeRouteEnter 호출.
// 전역 beforeResolve 가드 호출. (2.5이상)
// 네비게이션 완료.
// 전역 afterEach 훅 호출.
// DOM 갱신 트리거 됨.
// 인스턴스화 된 인스턴스들의 beforeRouteEnter가드에서 next에 전달 된 콜백을 호출합니다.

// Header를 자동으로 세팅함.
// router.beforeEach((to, from, next) => {
//   // Vue.prototype.$axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
//   Vue.prototype.$axios.defaults.headers.common['Authorization'] = store.state.token;
//   next();
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
