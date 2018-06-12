<template>
<div class="user">
  <v-header :showNav="false"></v-header>
  <div class="w">
    <div class="content">
      <div class="left">
        <div class="ul-list">
          asda
        </div>
      </div>
      <div class="right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
  import VHeader from 'base/header/header'
  export default{
    data() {
      return {}
    },
    components: {
      VHeader
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" type="text/stylus">
  .w
    width: 1220px
    overflow: hidden;
    margin: 0 auto
    padding-top: 40px
    .content
      display: flex
      .left
        width: 210px
        border-radius: 6px
        .ul-list
          padding-top: 20px
          border-radius: 10px
          text-align: center
          background: #fff
      .right
        margin-left: 15px
        flex: 1
</style>
