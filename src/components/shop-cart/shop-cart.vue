<template>
  <div class="cart-wrap">
    <v-header :showNav="false"></v-header>
    <div class="shop-cart">
      <div class="cart-box">
        <div class="title">购物清单</div>
        <div class="cart" v-if="cartList.length">
          <div class="cart-title">
            <ul>
              <li class="head-name">商品信息</li>
              <li>商品金额</li>
              <li>数量</li>
              <li>小计</li>
              <li>操作</li>
            </ul>
          </div>
          <div class="cart-body" v-for="item in cartList">
            <div class="choose">
              <span :class="{'checked': item.checked == 1}" @click="editCartNum('checked', item)"></span>
            </div>
            <div class="name">
              <div class="img">
                <img :src="'/static/images/'+item.productImgBig" width="80">
              </div>
              <div class="goods-desc">{{item.productName}}</div>
            </div>
            <div class="price">¥{{item.productPrice}}</div>
            <div class="num">
              <span class="reduce-num" @click="editCartNum('reduce', item)">-</span>
              <span class="goods-num">
                <input type="text" :value="item.productNum">
              </span>
              <span class="add-num" @click="editCartNum('add', item)">+</span>
            </div>
            <div class="subtotal">¥{{item.productNum * item.productPrice}}</div>
            <div class="operation" @click="delGoods(item._id)">删除</div>
          </div>
          <div class="cart-foot">
            <div class="choose">
              <input type="checkbox" name="" id="">
            </div>
            <div class="choose-btn">
              <span class="select-all">全选</span>
            </div>
            <div class="all-info">
              <div class="all-goods-info">
                <span class="total-num">总计<span>{{checkCount}}</span>件
                </span>
                <span class="total-price">总额
                    <span>¥{{priceAll}}</span>
                </span>
              </div>
              <input type="button" value="去结算">
            </div>
          </div>
        </div>
        <div class="cart-null" v-else>
          <div class="cart-null-img"></div>
          <p style="text-align: center; padding: 20px; color: rgb(141, 141, 141);">你的购物车空空如也</p>
          <div class="go-shopBtn">
            <router-link to="/goods">
              <input type="button" value="现在选购">
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getCartList, delGoods, editCart} from 'api/user'
  import VHeader from 'base/header/header'
  
  export default {
    data() {
      return {
        cartList: []
      }
    },
    created() {
      this._getCartList()
    },
    computed: {
      priceAll() {
        let m = 0;
        this.cartList.forEach((item) => {
          if (item.checked == '1') {
            m += item.productNum * item.productPrice
          }
        })
        return m
      },
      // 选中的数量
      checkCount() {
        return this.cartList.filter((item) => item.checked == '1').length
      }
    },
    methods: {
      delGoods(id) {
        delGoods({id}).then((res) => {
          this._getCartList()
        })
      },
      editCartNum(flag, item) {
        if (flag == 'add') {
          item.productNum++
        } else if (flag == 'reduce') {
          if (item.productNum <= 1) {
            return
          }
          item.productNum--
        } else {
          item.checked = item.checked == 1 ? '0' : '1'
        }
        editCart({
          productId: item._id,
          productNum: item.productNum,
          checked: item.checked
        }).then((res) => {
          console.log(res)
        })
      },
      _getCartList() {
        getCartList().then((res) => {
          this.cartList = res.result.list
        })
      }
    },
    components: {
      VHeader
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" type="text/stylus">
  .shop-cart
    width: 1220px
    margin: 0 auto
    min-height: 600px
    padding-top: 40px
    .cart-box
      position: relative
      margin-bottom: 30px
      overflow: hidden
      background: #fff
      border-radius: 8px
      border: 1px solid #dcdcdc
      border-color: rgba(0, 0, 0, .14)
      box-shadow: 0 3px 8px -6px rgba(0, 0, 0, .1)
      .title
        position: relative
        z-index: 10
        height: 60px
        padding: 0 10px 0 24px
        border-bottom: 1px solid #d4d4d4
        border-radius: 8px 8px 0 0
        box-shadow: 0 1px 7px rgba(0, 0, 0, .06)
        background: #f3f3f3
        background: linear-gradient(#fbfbfb, #ececec)
        line-height: 60px
        font-size: 18px
        color: #333
  
  .cart-null
    padding: 50px
    .cart-null-img
      margin: 0 auto
      background: url('/static/images/cart-empty.png') no-repeat
      width: 275px
      height: 300px
      color: #8d8d8d
    .go-shopBtn
      text-align: center
      input
        width: 150px
        height: 40px
        line-height: 38px
        color: rgb(141, 141, 141)
        border: 1px solid #e1e1e1
        border-radius: 4px
        font-size: 12px
        color: #646464
        background-color: #f9f9f9
        background-image: linear-gradient(180deg, #fff, #f9f9f9)
  
  .cart
    .cart-title
      height: 40px
      line-height: 40px
      background: #eee;
      border-bottom: 1px solid #dbdbdb;
      border-bottom-color: rgba(0, 0, 0, .08);
      ul
        width: 100%
        display: flex
        li
          width: 137px
          text-align: center
          &.head-name
            flex: 1
            text-align: left
            padding-left: 40px
    .cart-body
      display: flex
      height: 140px
      position: relative
      div
        width: 137px
        text-align: center
        line-height: 140px
        &.name
          flex: 1
          display: flex
          margin-left: 74px
          text-align: left
          align-items: center
          .img
            width: 82px
            height: 82px
            margin-right: 15px
            border: 1px solid hsla(0, 0%, 100%, .1)
            box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .06)
            text-align: center
            padding-top: 1px
          .goods-desc
            flex: 1
            text-align: left
        &.choose
          position: absolute
          width: 74px
          height: 140px
          top: 0
          left: 0
          span
            width: 20px
            height: 20px
            font-size: 18px
            display: inline-block
            background: url("/static/images/no-checked.png") no-repeat
            background-size: 100%
            &.checked
              background: url("/static/images/checked.png") no-repeat
              background-size: 100%
        &.num
          display: flex
          justify-content: center
          span
            display: block
            width: 35px
            cursor: pointer
            input
              width: 100%
              text-align: center
              height: 36px
              border: 1px solid #ccc
        &.price
          color: #666
        &.subtotal
          color: #666
          font-weight: 700
    .cart-foot
      height: 90px
      display: flex
      position: relative
      line-height: 90px
      background: linear-gradient(#fdfdfd, #f9f9f9);
      border-top: 1px solid #e9e9e9;
      box-shadow: 0 -3px 8px rgba(0, 0, 0, .04)
      .choose
        position: absolute
        width: 74px
        height: 90px
        top: 0
        left: 0
        text-align: center
      .choose-btn
        width: 150px
        height: 90px
        margin-left: 74px
        text-align: left
        position: relative
      .all-info
        flex: 1
        display: flex
        justify-content: flex-end
        align-items: center
        padding: 0 30px
        input
          margin: 0px
          width: 130px
          height: 50px
          line-height: 50px
          font-size: 16px
          border: 1px solid #5c81e3
          border-radius: 4px
          color: #fff
          background-color: #678ee7
          background-image: linear-gradient(180deg, #678ee7, #5078df)
        .all-goods-info
          span
            font-size: 16px
            padding: 5px 20px
            span
              color: #d44d44
              font-weight: 700
            &.total-price
              border-left: 1px solid #ccc
</style>
