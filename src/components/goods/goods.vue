<template>
  <div>
    <nav>
      <div class="w">
        <a href="javascript:;" :class="{active: sortType===0}" @click="resetGoods">综合排序</a>
        <a href="javascript:;" :class="{active: sortType===1}" @click="sortGoods(1)">从低到高</a>
        <a href="javascript:;" :class="{active: sortType===2}" @click="sortGoods(-1)">从高到低</a>
        <div class="price-range">
          <input type="text" placeholder="价格" v-model.number="params.minPrice">
          <span> - </span>
          <input type="text" placeholder="价格" v-model.number="params.maxPrice">
          <input type="button" class="btn" value="确定" @click="resetGoods">
        </div>
      </div>
    </nav>
    
    <div class="goods-list">
      <goods-list v-for="(item, index) in GoodsList" :key="index" :goods="item"></goods-list>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import GoodsList from 'base/goods-list/goods-list'
  import {getGoods} from 'api/goods'
  
  export default {
    data() {
      return {
        params: {
          page: 1,
          sort: '',  // 1 升序
          minPrice: '',
          maxPrice: ''
        },
        sortType: 0,
        GoodsList: []
      }
    },
    created() {
      this._getGoodsList()
    },
    methods: {
      resetGoods() {
        this.sortType = 0
        this.params.page = 1
        this.params.sort = ''
        this._getGoodsList()
      },
      sortGoods(sort) {
        sort === 1 ? this.sortType = 1 : this.sortType = 2
        this.params.sort = sort
        this.params.pag = 1
        this._getGoodsList()
      },
      // 获取goods
      _getGoodsList() {
        const {page, sort, minPrice, maxPrice} = this.params
        let params = {
          page,
          sort,
          priceGt: minPrice,
          priceLt: maxPrice
        }
        getGoods(params).then((res) => {
          this.GoodsList = res.result.list
        })
      }
    },
    components: {
      GoodsList
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" type="text/stylus">
  @import "~common/stylus/variable"
  nav
    height: 60px
    line-height: 60px
    .w
      width: 1220px
      margin: 0 auto
      display: flex
      a
        padding: 0 15px
        font-size: 12px
        &.active
          color: #5683ea
      div
        padding: 0 15px
        display: flex
        align-items: center
        span
          display: block
          margin: 0 5px
        input
          width: 80px
          height: 30px
          border: 1px solid #ccc
          display: block
          border-radius: 4px
          text-align: center
          font-size: 12px
        .btn
          margin-left: 15px
          font-size: 12px;
          color: #fff
          border: none
          background-color: #678ee7;
          background-image: linear-gradient(180deg, #678ee7, #5078df);
  
  .goods-list
    width: 1220px
    margin: 0 auto
</style>
