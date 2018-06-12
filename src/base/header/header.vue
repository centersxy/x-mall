<template>
  <div class="header-box">
    <header class="w">
      <div class="h-box">
        <div class="logo">
          <router-link to="/">首页</router-link>
        </div>
        <div class="nav-aside" :class="{fixed: (addClass && showNav)}">
          <div class="s-user pr">
            <router-link to="/user">
              <i class="icon icon-user1"></i>
            </router-link>
            <div class="user-wrap" v-if="userInfo.name">
              <div class="user-wrap-list">
                <ul>
                  <div class="avatar">
                    <span :style="{backgroundImage: 'url('+userInfo.avatar+')'}"></span>
                  </div>
                  <p class="name">{{userInfo.name}}</p>
                  <li><router-link to="">我的资料</router-link></li>
                  <li><router-link to="">我的资料</router-link></li>
                  <li><a href="javascript:;" @click="logOut">退出</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="s-car pr">
            <router-link to="cart">
              <i class="icon icon-cart"></i>
              <span class="cart-num" :class="{'no': !checkCount}">{{checkCount}}</span>
            </router-link>
          </div>
        </div>
      </div>
    </header>
    <div class="nav-sub" :class="{fixed: addClass}" v-show="showNav">
      <div class="w">
        <ul class="ul-list">
          <li>
            <router-link to="/">首页</router-link>
          </li>
          <li>
            <router-link to="goods">商品</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getCartList, delGoods, editCart, editCheckAll, logOut} from 'api/user'
  import {ERR_OK} from 'api/config'
  import { mapMutations, mapGetters } from 'vuex'
  export default{
    props: {
      showNav:{
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        scrollTop: 100,
        addClass: false,
        link: '/user/orderList'
      }
    },
    mounted() {
      //这个是钩子函数
      //如果cartView函数要执行，必须先执行钩子函数
      //这个钩子函数完成了对cratView函数的调用
      //应该注意的是，使用mounted 并不能保证钩子函数中的 this.$el 在 document 中。为此还应该引入 Vue.nextTick/vm.$nextTick
      this.$nextTick(() => {
        this._getCartList()
        this.navAddFixed()
      })
      window.addEventListener('scroll', this.navAddFixed)
    },
    destroyed() {
      window.removeEventListener('scroll', this.navAddFixed)
    },
    computed:{
      ...mapGetters(['cartList','userInfo']),
      checkCount() {
        let totalNum =0
          this.cartList.length && this.cartList.forEach(item => {
            totalNum += (item.productNum)
          })
          return totalNum
        }
    },
    methods: {
      logOut() {
        logOut().then((res) => {
          if (ERR_OK === res.code) {
           window.location.href = '/'
          }
        })
      },
      navAddFixed() {
        if (this.showNav) {
          var top = document.documentElement.scrollTop || document.body.scrollTop
          top >= this.scrollTop ? this.addClass = true : this.addClass = false
        }
      },
      //首页获取一次cartList
      _getCartList() {
        getCartList().then((res) => {
          this.set_cart_list(res.result.list)
        })
      },
      ...mapMutations({
        set_cart_list:'SET_CART_LIST'
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" type="text/stylus">
  @import "~common/stylus/variable"
  .header-box
    width: 100%
    background-color: #ddd
    header
      width: 100%
      height: 100px
      .h-box
        height: 100%
        display: flex
        justify-content: space-between
        align-items:center
        .nav-aside
          display: flex
          &.fixed
            position: fixed
            top: -40px
            z-index: 21
            left: 50%;
            margin-left: 458px;
            margin-top: 0;
            transform: translate3d(0, 59px, 0);
            transition: transform .3s cubic-bezier(.165, .84, .44, 1);
          .pr
            width: 36px
            margin-left: 40px
            position: relative
            &.s-user
              &:hover
                i
                  color: #666
                .user-wrap
                  visibility: visible;
                  opacity: 1;
                  -webkit-transition: opacity .15s ease-out;
                  transition: opacity .15s ease-out;
            a
              display: block
              position: relative
              i
                position: relative
                width: 36px
                height: 20px
                text-align: center
                font-size: 20px
                display: block
              .cart-num
                position: absolute
                top: 2px
                left: 30px
                background: #eb746b
                background-image: linear-gradient(#eb746b,#e25147)
                box-shadow: inset 0 0 1px hsla(0,0%,100%,.15), 0 1px 2px hsla(0,0%,100%,.15)
                text-align: center
                font-style: normal
                display: inline-block
                width: 20px
                height: 20px
                line-height: 20px
                border-radius: 10px
                color: #fff
                font-size: 12px
              .no
                background: #969696
                background-image: linear-gradient(#a4a4a4,#909090)
                box-shadow: inset 0 0 1px #838383, 0 1px 2px #838383
    .w
      width: 1220px
      margin: 0 auto
    .nav-sub
      width: 100%
      height: 90px
      line-height: 90px
      background: $color-background
      box-shadow: 0 2px 4px rgba(0,0,0,.04)
      z-index: 20
      &.fixed
        position: fixed
        height: 60px
        line-height: 60px
        top: 0
        left: 0
        right: 0
        border-bottom: 1px solid #dadada
        background-image: linear-gradient(#fff,#f1f1f1)
      .w
        display: flex
        justify-content: space-between
        align-items: center
        .ul-list
          display: flex
          justify-content: space-around
          li
            a
              display: block
              padding: 0 20px
  .user-wrap
    width: 168px
    position: absolute
    z-index: 30
    padding-top: 18px
    left: -65px
    opacity: 0
    visibility: hidden
    .user-wrap-list
      position: relative
      padding-top: 20px
      background: #fff
      border: 1px solid #d6d6d6
      border-color: rgba(0,0,0,.08)
      border-radius: 8px
      box-shadow: 0 20px 40px rgba(0,0,0,.15)
      z-index: 10
      &:before
        position: absolute
        content: " "
        width:0
        height:0
        border-width:0 8px 8px
        border-style:solid
        border-color:transparent transparent #fff
        top: -8px
        left: 50%
        transform: translateX(-50%)
      ul
        display: block
        .avatar
          position: relative
          margin: 0 auto 8px
          width: 46px
          height: 46px
          text-align: center
          span
            border-radius: 50%
            display: block
            width: 100%
            height: 100%
            background-repeat: no-repeat
            background-size: cover
        .name
          margin-bottom: 16px
          font-size: 12px
          line-height: 1.5
          text-align: center
          color: #757575
        li
          text-align: center
          position: relative
          border-top: 1px solid #f5f5f5
          line-height: 44px
          height: 44px
          color: #616161
          font-size: 12px
          &:hover
            background: #f1f1f1
          a
            display: block
            color: #616161
            
</style>
