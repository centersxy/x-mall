import Vue from 'vue'
import Router from 'vue-router'
const Index = (resolve) => {import('components/index').then((module) => resolve(module))}
const Login =(resolve) => {import('components/login/login').then((module) => resolve(module))}
const Home =(resolve) => {import('components/home/home').then((module) => resolve(module))}
const Goods =(resolve) => {import('components/goods/goods').then((module) => resolve(module))}
const Cart =(resolve) => {import('components/shop-cart/shop-cart').then((module) => resolve(module))}
const User =(resolve) => {import('components/user/user').then((module) => resolve(module))}
const userInfo =(resolve) => {import('components/user/child/userInfo').then((module) => resolve(module))}
const checkOut =(resolve) => {import('components/checkOut/checkOut').then((module) => resolve(module))}
const Order =(resolve) => {import('components/order/order').then((module) => resolve(module))}
const orderConfirm =(resolve) => {import('components/order/orderConfirm').then((module) => resolve(module))}
const orderSuccess =(resolve) => {import('components/order/orderSuccess').then((module) => resolve(module))}

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
      path: '/checkOut',
      component: checkOut,
    },
    {
      path: '/order',
      component: Order,
      children: [
        {
          path: 'orderConfirm',
          component: orderConfirm
        },
        {
          path: 'orderSuccess',
          component: orderSuccess
        }
      ]
    },
    {
      path: '/user',
      component: User,
      redirect: '/user/userInfo',
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
