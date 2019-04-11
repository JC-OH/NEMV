import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import User from './views/User.vue'
import Test from './views/Test.vue'
//simport TestUser from './views/test/User.vue'

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
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/user',
      name: 'user',
      //component: () => import(/* webpackChunkName: "about" */ './views/User.vue')
      component: User
    },
    {
      path: '/test/',
      name: 'test',
      component: Test,
      children: [
                  {
                    path: '',
                    name: 'crud',
                    component: () => import(/* webpackChunkName: "about" */ './views/test/CRUD.vue'),
                  },
                  {
                    path: 'user',
                    name: 'user',
                    component: () => import(/* webpackChunkName: "about" */ './views/test/User.vue'),
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
