// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'common/stylus/index.styl'
import {userInfo} from 'api/user'
import {ERR_OK} from 'api/config'

Vue.config.productionTip = false

// 定义未登录可访问
const look = ['/home', '/goods', '/login']
router.beforeEach((to, from, next) => {
  userInfo().then((res) => {
    if (res.code === ERR_OK) {
      next()
      store.commit('SET_USER_INFO', res.result.userInfo)
    } else {
      if (look.indexOf(to.path) !== -1) {
        next()
      } else {
        next('/login')
      }
    }
  })
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
