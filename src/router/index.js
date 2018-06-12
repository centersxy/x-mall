import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import Index from 'components/index'
import Home from 'components/home/home'
import Goods from 'components/goods/goods'
import Cart from 'components/shop-cart/shop-cart'
import User from 'components/user/user'
import userInfo from 'components/user/child/userInfo'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Index,
      redirect: '/home',
      children: [
        {
          path: 'home',
          component: Home
        },
        {
          path: 'goods',
          component: Goods
        }
      ]
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/user',
      component: User,
      children: [
        {
          path: 'userInfo',
          component: userInfo
        }
      ]
    },
    {path: '*', redirect: '/home'}
  ]
})
