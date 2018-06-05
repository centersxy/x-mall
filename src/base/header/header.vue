<template>
  <div class="header-box">
    <header class="w">
      <div class="h-box">
        <div class="logo"></div>
        <div class="nav-aside" :class="{fixed: (addClass && showNav)}">
          <div class="s-user pr">人</div>
          <div class="s-car pr">车</div>
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
  export default{
    data() {
      return {
        showNav: true,
        scrollTop: 100,
        addClass: false
      }
    },
    mounted() {
      //这个是钩子函数
      //如果cartView函数要执行，必须先执行钩子函数
      //这个钩子函数完成了对cratView函数的调用
      //应该注意的是，使用mounted 并不能保证钩子函数中的 this.$el 在 document 中。为此还应该引入 Vue.nextTick/vm.$nextTick
      this.$nextTick(() => {
        this.navAddFixed()
      })
      window.addEventListener('scroll', this.navAddFixed)
    },
    destroyed() {
      window.removeEventListener('scroll', this.navAddFixed)
    },
    methods: {
      navAddFixed() {
        if (this.showNav) {
          var top = document.documentElement.scrollTop || document.body.scrollTop
          top >= this.scrollTop ? this.addClass = true : this.addClass = false
        }
      }
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
            margin-left: 451px;
            margin-top: 0;
            transform: translate3d(0, 59px, 0);
            transition: transform .3s cubic-bezier(.165, .84, .44, 1);
          .pr
            width: 36px
            margin-left: 40px
            i
              position: relative
              width: 36px
              height: 20px
              display: block
              text-indent: -9999px
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
</style>
