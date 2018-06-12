<template>
  <div>
    <banner></banner>
    
    <section class="w mt30 clearfix">
      <y-shelf title="热门商品 ">
        <div slot="content" class="floors">
          <div class="imgbanner">
            <img src="/static/images/acillouceng1220856.jpg">
          </div>
          <goods-list  v-for="(item, index) in hotGoods" :key="index" :goods="item"></goods-list>
        </div>
      </y-shelf>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  import Banner from 'base/banner/banner'
  import YShelf from 'base/shelf/shelf'
  import GoodsList from 'base/goods-list/goods-list'
  import {getGoods} from 'api/goods'
  export default{
    data() {
      return {
        hotGoods: []
      }
    },
    created() {
      this._getGoods()
    },
    methods: {
      _getGoods() {
        getGoods().then((res) => {
          this.hotGoods = res.result.list
        })
      }
    },
    components: {
      Banner,
      YShelf,
      GoodsList
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" type="text/stylus">
  .w
    width: 1220px
    margin: 0 auto
  .mt30
    margin-top: 30px
  .floors
    width: 100%
    display: flex
    flex-wrap: wrap
    align-items: center
    .imgbanner
      width: 50%
      height: 430px
    img
      display: block
      width: 100%
      height: 100%

</style>
