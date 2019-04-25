import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// [뷰저장소(vuex)]
// 5가지가 있는데 쉽게 풀어보면
//
// 상태: 전역 변수
// Getter: 변수 조합용
// 변이: 변수 변경
// 액션: 비동기 변수 변경
// 모듈: 여러개 사용할 때

export default new Vuex.Store({
  // 상태: 전역 변수
  state: {
    // state에 전역으로 사용할 변수를 선언합니다. 초기값을 로컬스토리지값을 넣습니다.
    // (새로고침해도 토큰값을 유지하기 위함)
    token: localStorage.getItem('token'),
     sb: {
       act: false,
       msg: '',
       color: 'error'
     }
  },
  // 변이: 변수 변경
  mutations: {
    // mutations에 전역변수가 변이할 때 할 일들을 정의 해둡니다.
    getToken (state) {
      state.token = localStorage.getItem('token');
    },
    delToken (state) {
      localStorage.removeItem('token');
      state.token = null
    },
     pop (state, d) {
       state.sb.msg = d.msg
       state.sb.color = d.color
       state.sb.act = false
       if (d.act === undefined) state.sb.act = true
     }
  },
  // 액션: 비동기 변수 변경
  actions: {

  }
})
