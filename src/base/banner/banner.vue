<template>
  <div class="banner">
    <div class="bg" ref="bg"
         @mouseover="bgOver($refs.bg)"
         @mousemove="bgMove($refs.bg,$event)"
         @mouseout="bgOut($refs.bg)">
      <!--<span class="img a"></span>-->
      <!--<span class="text b">以傲慢与偏执<br/>回敬傲慢与偏见</span>-->
      <!--<span class="copyright c">code by qingjin.me | picture from t.tt</span>-->
      <transition name="fade">
        <div class="img-box"
             v-for="(item, index) in banner"
             :key="index"
             v-if="index === currentIndex"
             @mouseover="stopTimer"
             @mouseout="startTimer">
          <span class="img" :style="item"></span>
        </div>
      </transition>
      <div class="dots">
        <span class="dot" v-for="(item, index) in dots" :key="item" :class="{active: currentIndex===index}" @click="change(index)"></span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data() {
      return {
        banner: [
//          'background: url("/static/images/banner-3d.png") center no-repeat',
          'background: url("/static/images/bg1.jpg") center no-repeat',
          'background: url("/static/images/bg2.jpg") center no-repeat',
//          'background: url("/static/images/bg3.jpg") center no-repeat'
        ],
        bgOpt: {
          offsetLeft: 0,
          offsetTop: 0,
          offsetWidth: 0,
          offsetHeight: 0
        },
        currentIndex: 0
      }
    },
    created () {
      this.play()
      this._initDots()
    },
    methods: {
      autoPlay () {
        this.currentIndex++;
        if (this.currentIndex > this.banner.length -1) { //当遍历到最后一张图片置零
          this.currentIndex = 0
        }
      },
      play () {
        this.timer = setInterval(this.autoPlay, 2500)
      },
      _initDots() {
        this.dots = new Array(this.banner.length)
      },
      change (i) {
        this.currentIndex = i
      },
      startTimer () {
        this.timer = setInterval(this.autoPlay, 5500)
      },
      stopTimer () {
        clearInterval(this.timer)
      },
      // 鼠标移入
      bgOver (event) {
        // 获取移入时的位置
        const {offsetLeft, offsetTop, offsetWidth, offsetHeight} = event
        this.bgOpt.offsetLeft = offsetLeft
        this.bgOpt.offsetTop = offsetTop
        this.bgOpt.offsetWidth = offsetWidth
        this.bgOpt.offsetHeight = offsetHeight
      },
      // 鼠标移动
      bgMove (dom, eve) {
        const {offsetLeft, offsetTop, offsetWidth, offsetHeight} = this.bgOpt
        let X, Y
        let mouseX = eve.pageX - offsetLeft
        let mouseY = eve.pageY - offsetTop
        if (mouseX > offsetWidth / 2) {
          X = mouseX - (offsetWidth / 2)
        } else {
          X = mouseX - (offsetWidth / 2)
        }
        if (mouseY > offsetHeight / 2) {
          Y = offsetHeight / 2 - mouseY
        } else {
          Y = offsetHeight / 2 - mouseY
        }
        dom.style['-webkit-transform'] = `rotateY(${X / 50}deg) rotateX(${Y / 50}deg)`
        dom.style.transform = `rotateY(${X / 50}deg) rotateX(${Y / 50}deg)`
      },
      // 鼠标移除
      bgOut (dom) {
        dom.style.transform = 'rotateY(0deg) rotateX(0deg)'
        dom.style['-webkit-transform'] = 'rotateY(0deg) rotateX(0deg)'
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" type="text/stylus">
  .banner, .banner span, .banner div {
    font-family: "Microsoft YaHei"
    transition: all .3s
    -webkit-transition: all .3s
    transition-timing-function: linear
    -webkit-transition-timing-function: linear
  }
  
  .banner {
    perspective: 3000px
    position: relative
    z-index: 19
  }
  
  .bg {
    position: relative
    width: 1220px
    height: 500px
    margin: 20px auto
    background-size: 100% 100%
    border-radius: 10px
    transform-style: preserve-3d
    -webkit-transform-origin: 50% 50%
    -webkit-transform: rotateY(0deg) rotateX(0deg)
  }
  .img-box{
    position: absolute
    width: 100%
    height: 100%
  }
  .img {
    display: block
    width: 100%
    height: 100%
    background-size: cover
  }
  
  .text {
    position: absolute
    top: 20%
    right: 10%
    font-size: 30px
    color: #fff
    text-align: right
    font-weight: lighter
  }
  
  .copyright {
    position: absolute
    bottom: 10%
    right: 10%
    font-size: 10px
    color: #fff
    text-align: right
    font-weight: lighter
  }
  
  .a {
    -webkit-transform: translateZ(40px)
  }
  
  .b {
    -webkit-transform: translateZ(20px)
  }
  
  .c {
    -webkit-transform: translateZ(0px)
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .dots
    position: absolute
    right: 0
    left: 0
    bottom: 12px
    text-align: center
    font-size: 0
    z-index: 30
    .dot
      display: inline-block
      margin: 0 4px
      width: 16px
      height: 16px
      border-radius: 50%
      background: #ccc
      cursor: pointer
      &.active
        width: 20px
        border-radius: 5px
        background: #007fd5
</style>
