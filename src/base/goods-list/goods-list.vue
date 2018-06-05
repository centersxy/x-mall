<template>
  <div class="goods-item">
    <div class="goods-img">
      <a href="">
        <img :src="'/static/images/'+ goods.productImgBig">
      </a>
    </div>
    <h3 class="goods-title">
      {{goods.productName}}
    </h3>
    <h6 class="sub-title">
      {{goods.productSubTitle}}
    </h6>
    <div class="goods-price">
      <div class="btn">
        <a href="">
          <input type="button" value="查看详情">
        </a>
        <input type="button" value="加入购物车">
      </div>
      <p><span>￥</span>{{goods.productPrice}}</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    props: {
      goods: {type: [Object, Array]}
    },
    mounted() {
      console.log(this.goods)
    },
    data() {
      return {
        imgSrc: require('./../../common/images/69f3542181c3710a0ec80f66b664eef6.jpg')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" type="text/stylus">
  .goods-item
    width: 25%
    float: left
    border: 1px solid #efefef
    height: 430px
    background: #fff
    transition: all 0.3s
    box-sizing: border-box;
    &:hover
      transform: translateY(-3px)
      box-shadow: 1px 1px 20px #999
      .goods-price .btn
        display: flex
    .goods-img
      img
        width: 206px
        height: 206px
        display:block
        margin: 50px auto 10px
    .goods-title
      text-align: center
      color: #424242
      font-size: 16px
    .sub-title
      font-size: 12px
      color: #d0d0d0
      padding: 10px
      text-align: center
    .goods-price
      margin: 15px 0
      height: 30px
      position: relative
      text-align: center
      line-height: 30px
      color: #e4393c
      font-size: 20px
      .btn
        display: none
        justify-content: center
        align-items: center
        position: absolute
        width: 100%
        span
          font-size: 16px
        a
          input
            border: 1px solid #e1e1e1;
            border-radius: 4px;
            font-size: 12px;
            color: #646464;
            background-color: #f9f9f9;
            background-image: linear-gradient(180deg,#fff,#f9f9f9);
        input
          width: 100px;
          height: 30px;
          line-height: 28px;
          vertical-align: middle;
          margin: 0 5px
          border: 1px solid #5c81e3;
          border-radius: 4px;
          font-size: 12px;
          color: #fff;
          background-color: #678ee7;
          background-image: linear-gradient(180deg,#678ee7,#5078df);
</style>
