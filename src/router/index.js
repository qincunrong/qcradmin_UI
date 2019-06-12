import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/Login'
import MainTabs from '@/views/main/MainTabs'
import Corporate from '@/views/personnel/Corporate'
import Role from '@/views/personnel/Role'
import User from '@/views/personnel/User'
import NotFound from '@/views/404'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/404',
      name: '404',
      component:NotFound
    },
    {
      path: '/',
      name: 'mainTabs',
      component: MainTabs,
      children:[
        { path:"/role", component: Role, name: "role"},
        { path:"/user", component: User, name: "user"},
        { path:"/corporate", component: Corporate, name: "corporate"},
        { path:"/", component: User, name: "user"},
        { path:"/*", component: NotFound, name: "404"}
      ]
    }
  ]
})
