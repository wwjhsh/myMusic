import Vue from 'vue'
import Router from 'vue-router'
/*引入页面*/
// import Login from '@/views/login/login.vue'
// import Home from '@/views/home/home.vue'
// import Index from '@/views/index/index.vue'
import Discover from './discover'

Vue.use(Router)

/*配置路由*/
export default new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'Index',
    //   component: Index
    // },
    // {
    //   path: '/home',
    //   name: 'Home',
    //   component: Home
    // }
    Discover,
    {
      path:"*",
      redirect: '/discover'
    }
  ]
})
