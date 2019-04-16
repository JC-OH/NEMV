import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import User from './views/User.vue'
import Test from './views/Test.vue'
import Pages from './views/Pages.vue'
//simport TestUser from './views/test/User.vue'

const pageCheck = (to, from, next) => {
    //Vue.prototype.$axios.post(`${Vue.prototype.$apiRootPath}page`, { name: to.path.replace('/', '') }, { headers: { Authorization: localStorage.getItem('token') } })
    Vue.prototype.$axios.post(`${Vue.prototype.$apiRootPath}page`, { name: to.path.replace('/', '') })
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg)
        next()
      })
      .catch((err) => {
        next(`/block/${err.message}`)
      });
}

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // [지연된 로딩]
      // 번들러를 이용하여 앱을 제작할 때 JavaScript 번들이 상당히 커져 페이지로드 시간에 영향을 줄 수 있습니다. 각 라우트의 컴포넌트를 별도의 단위로 분할하고 경로를 방문할 때 로드하는 것이 효율적일 것입니다.

      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/user',
      name: 'user',
      //component: () => import(/* webpackChunkName: "user" */ './views/User.vue')
      component: User
    },
    {
      path: '/users',
      name: 'users',
      component: () => import(/* webpackChunkName: "about" */ './views/Users.vue')
    },
    {
      path: '/page',
      name: 'page',
      component: () => import(/* webpackChunkName: "about" */ './views/Page.vue')
    },
    {
      path: '/site',
      name: 'site',
      component: () => import(/* webpackChunkName: "about" */ './views/Site.vue')
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import(/* webpackChunkName: "signin" */ './views/Signin.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "signin" */ './views/Register.vue')
    },


    {
      path: '/block/:msg',
      name: 'block',
      component: () => import(/* webpackChunkName: "block" */ './views/Block.vue')
    },
    {
      path: '/pages',
      //component: import(/* webpackChunkName: "page" */ './views/Page.vue'),
      component: Pages,
      children: [
                  {
                    path: 'lv0',
                    name: 'lv0',
                    component: () => import('./views/page/lv0'),
                    beforeEnter: pageCheck
                  },
                  {
                    path: 'lv1',
                    name: 'lv1',
                    component: () => import('./views/page/lv1'),
                    beforeEnter: pageCheck
                  },
                  {
                    path: 'lv2',
                    name: 'lv2',
                    component: () => import('./views/page/lv2'),
                    beforeEnter: pageCheck
                  },
                  {
                    path: 'lv3',
                    name: 'lv3',
                    component: () => import('./views/page/lv3'),
                    beforeEnter: pageCheck
                  }
                ]
    },
    {
      path: '/test',
      component: Test,
      children: [
                  {
                    path: '',
                    name: 'test-crud',
                    component: () => import(/* webpackChunkName: "test-crud" */ './views/test/CRUD.vue'),
                  },
                  {
                    path: 'user',
                    name: 'test-user',
                    component: () => import(/* webpackChunkName: "test-user" */ './views/test/User.vue'),
                  },
                  {
                    path: 'header',
                    name: 'test-header',
                    component: () => import(/* webpackChunkName: "test-header" */ './views/test/Header.vue'),
                    // beforeEnter: authCheck
                    beforeEnter: (to, from, next) => {
                      // /header에만 beforeEnter를 주고 to, from을 찍어보면 path을 찍어 볼 수 있습니다.
                      console.log(to);
                      console.log(from);
                      // next()가 없으면 진입이 안되니 주의하셔야 합니다.
                      // next(false) : 페이지로 진입이 안됩니다. (next() 없는 것과 동일 효과인듯 합니다.)
                      // next(‘/e404’) : /header로 안가고 다른페이지로 넘길 수 있습니다.
                      //next(false)

                      // 이제 토큰이 없으면 차단페이지가 열리게 됩니다.
                      // []토큰 유무만 가지고 보안이 될까?]
                      //  => 절대 안됩니다. 크롬 개발자모드에서 Application중 LocalStorage 부분의 값을 추가하면 끝입니다.
                      //  => 페이지 이동시 서버와 교신후에 beforeEnter로 들어가도록 해야합니다.
                      if (!localStorage.getItem('token')) return next('block');
                      next()
                    }
                  }

                ]
    },
    {
      path: '*',
      name: 'error404',
      component: () => import('./views/Error404.vue')
    }
  ]
})
