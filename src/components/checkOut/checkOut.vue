<template>
  <div class="address">
    <v-header></v-header>
    <div class="address-box w">
      <y-shelf title="我的地址">
        <div slot="content">
          <ul class="address-list clearfix">
            
            <li class="address" v-for="item in addressList" :key="item.addressId"
                :class="{'checked':addressId === item.addressId}"
                @click="setDefaultAddress(item.addressId)"
            >
              <span class="pa" v-if="addressId === item.addressId">
               <svg viewBox="0 0 1473 1024" width="17.34375" height="12">
               <path
                 d="M1388.020 57.589c-15.543-15.787-37.146-25.569-61.033-25.569s-45.491 9.782-61.023 25.558l-716.054 723.618-370.578-374.571c-15.551-15.769-37.151-25.537-61.033-25.537s-45.482 9.768-61.024 25.527c-15.661 15.865-25.327 37.661-25.327 61.715 0 24.053 9.667 45.849 25.327 61.715l431.659 436.343c15.523 15.814 37.124 25.615 61.014 25.615s45.491-9.802 61.001-25.602l777.069-785.403c15.624-15.868 25.271-37.66 25.271-61.705s-9.647-45.837-25.282-61.717M1388.020 57.589z"
                 fill="#6A8FE5" p-id="1025">
                 </path>
               </svg>
               </span>
              <p>收货人:{{item.name}}</p>
              <p class="street-name ellipsis">收货地址:{{item.streetName}}</p>
              <p>手机号码: {{item.photo}}</p>
              <div class="operation-section">
                <span class="update-btn" @click="update(item)">修改</span>
                <span class="delete-btn" @click="delAddress(item.addressId)">删除</span>
              </div>
            </li>
            
            <li class="add-address-item" @click="update">
              <img src="../../../static/svg/jia.svg">
              <p>使用新地址</p>
            </li>
          </ul>
        </div>
      </y-shelf>
      <y-shelf title="我的商品">
        <div slot="content">
          <div class="cart">
            <div class="cart-title">
              <ul>
                <li class="head-name">商品信息</li>
                <li>商品金额</li>
                <li>数量</li>
                <li>小计</li>
              </ul>
            </div>
            <div class="cart-body" v-for="item in cartList">
              <div class="name">
                <div class="img">
                  <img :src="'/static/images/'+item.productImgBig" width="80">
                </div>
                <div class="goods-desc">{{item.productName}}</div>
              </div>
              <div class="price">¥{{item.productPrice}}</div>
              <div class="num">
                <span class="goods-num">
                  <input type="text" :value="item.productNum">
                </span>
              </div>
              <div class="subtotal">¥{{item.productNum * item.productPrice}}</div>
            </div>
            <div class="cart-foot">
              <div class="all-info">
                <div class="all-goods-info">
                <span class="total-num">总计<span>{{checkCount}}</span>件
                </span>
                  <span class="total-price">总额
                    <span>¥{{priceAll}}</span>
                </span>
                </div>
                <input type="button" value="提交订单"
                       @click="goPay">
              </div>
            </div>
          </div>
        </div>
      </y-shelf>
    </div>
    
    <!-- 地址  -->
    <Modal v-model="showConfirm" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>地址信息</span>
      </p>
      <div style="text-align:center">
        <Form :model="formItem" :label-width="60">
          <FormItem label="姓名">
            <Input v-model="formItem.name" placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="手机号">
            <Input v-model="formItem.photo" placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="收货地址">
            <Input v-model="formItem.streetName" placeholder="Enter something..."></Input>
          </FormItem>
          <div style="text-align: left;padding-left: 60px">
            <Checkbox v-model="formItem.isDefault">设为默认</Checkbox>
          </div>
        </Form>
      </div>
      <div slot="footer">
        <I-Button type="error" size="large" long :loading="modal_loading" :data-name="formItem.addressId"
                  @click="confirm(formItem.addressId)">确定
        </I-Button>
      </div>
    </Modal>
  
  </div>
</template>

<script type="text/ecmascript-6">
  import VHeader from 'base/header/header'
  import YShelf from 'base/shelf/shelf'
  import {addressAdd, getAddress, editAddress, delAddress, getCartList, editCart} from 'api/user'
  import {ERR_OK} from 'api/config'
  
  export default {
    data() {
      return {
        showConfirm: false,
        modal_loading: false,
        formItem: {
          addressId: '',
          name: '',
          photo: '',
          streetName: '',
          isDefault: false,
        },
        isId: '',
        addressId: '',
        addressList: [],
        cartList: []
      }
    },
    created() {
      this._getAddress()
      this._getCartList()
    },
    computed: {
      checkCount() {
        const ret = this.cartList.filter((item) => item.checked === '1')
        return ret.length
      },
      priceAll() {
        const  ret = this.cartList.reduce((m, item) => item.checked=== '1' ? m + (item.productNum * item.productPrice) : m, 0)
        return ret
      }
    },
    methods: {
      goPay(){
        this.$router.push({
          path:'/order/orderConfirm',
          query: {
            'addressId': this.addressId
          }
        })
      },
      setDefaultAddress(id){
        this.addressId = id
      },
      delAddress(addressId) {
        delAddress({addressId}).then((res) => {
          if (res.code === ERR_OK) {
            this.$Message.success('成功删除')
            this._getAddress()
          }
        })
      },
      confirm(name) {
//        alert(e.target.dataset.name)
//        alert(name)
        if (name && this.isId) {
          this._addressEdit()
          this._getAddress()
        } else {
          this._addressAdd()
          this._getAddress()
        }
      },
      update(thing) {
        this.showConfirm = true
        if (thing) {
          this.formItem.addressId = thing.addressId
          this.formItem.name = thing.name
          this.formItem.photo = thing.photo
          this.formItem.streetName = thing.streetName
          this.formItem.isDefault = thing.isDefault
          this.isId = thing.addressId
        } else {
          this.formItem.addressId = ''
          this.formItem.name = ''
          this.formItem.photo = ''
          this.formItem.streetName = ''
          this.formItem.isDefault = false
          this.isId = ''
        }
      },
      _addressAdd() {
        addressAdd(this.formItem).then((res) => {
          if (res.code === ERR_OK) {
            this.$Message.success('添加成功')
            this._getAddress()
            this.showConfirm = false
          }
        })
      },
      _addressEdit() {
        editAddress(this.formItem).then(res => {
          if (res.code === ERR_OK) {
            this.$Message.success('修改成功')
            this._getAddress()
            this.showConfirm = false
          }
        })
      },
      _getAddress() {
        getAddress().then(res => {
          let data = res.result.addressList
          this.addressList = data
          // 获取地址中默认选中的id
          data.forEach((item,index) =>{
            if(item.isDefault) {
              this.addressId = item.addressId
            } else {
              this.addressId = item.addressId
            }
          })
        })
      },
      _getCartList() {
        getCartList().then((res) => {
          let list = res.result.list
          const result = list.filter((item) => {
            if (item.checked === '1') {
              return item
            }
          })
          this.cartList = result
        })
      }
    },
    components: {
      VHeader, YShelf
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" type="text/stylus">
  .address-box
    width: 1220px
    margin: 0 auto
    min-height: 600px
    padding-top: 40px
  
  .address-list
    padding: 30px 13px 0px
    .address
      padding: 19px 14px 0 19px
      p
        line-height: 26px
    li.checked
      border-color: #6A8FE5
      position: relative
      background: #fff
      .pa
        position: absolute
        right: 15px
        top: 18px
      &:hover
        background: #fff
    li
      position: relative
      overflow: hidden
      float: left
      width: 276px
      height: 158px
      margin: 0 0 30px 16px
      border: 1px solid #E5E5E5
      border-radius: 3px
      background: #FAFAFA
      line-height: 14px
      text-align: left
      word-wrap: break-word
      word-break: normal
      color: #626262
      cursor: pointer
      -moz-user-select: -moz-none
      -webkit-user-select: none
      -o-user-select: none
      user-select: none
      &:hover
        background: #F2F2F2
        .operation-section
          visibility: visible
          transform: translate(0, 0)
      &.add-address-item
        text-align: center
        display: flex
        justify-content: center
        align-items: center
        flex-direction: column
        p
          margin-top: 5px
      .operation-section
        visibility: hidden
        position: absolute
        left: 0
        bottom: 0
        width: 100%
        height: 28px
        background: #E1E1E1
        border-top: 1px solid #E1E1E1
        transition: all .2s ease
        transform: translate(0, 29px)
        border-top: 1px solid #E1E1E1
        display: flex
        align-items: center
        justify-content: center
        z-index: 11
        span
          background: #fff
          display: flex
          align-items: center
          justify-content: center
          flex: 1
          height: 100%
          &:hover
            background: #F2F2F2
            span + span
              border-left: 1px solid #E1E1E1
  
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
              border: none
        &.price
          color: #666
        &.subtotal
          color: #666
          font-weight: 700
        &.operation
          span
            width: 20px
            height: 20px
            font-size: 18px
            display: inline-block
            background: url("/static/images/delete.png") no-repeat
            background-size: 100%
            vertical-align: middle
    .cart-foot
      height: 90px
      display: flex
      position: relative
      line-height: 90px
      background: linear-gradient(#fdfdfd, #f9f9f9);
      border-top: 1px solid #e9e9e9;
      box-shadow: 0 -3px 8px rgba(0, 0, 0, .04)
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
          &.disabled
            color: #fff;
            background-color: #a9a9a9;
            border: 1px solid #afafaf;
            background-image: linear-gradient(180deg, #b8b8b8, #a9a9a9);
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
