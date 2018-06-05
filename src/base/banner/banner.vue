<template>
  <div class="banner">
    <div class="bg">
      <span class="img"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data() {
      return {}
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" type="text/stylus">
  .banner
    position: relative
    .bg
      width: 1220px
      height: 550px
      margin: 20px auto
      background-image: url("./../../common/images/banner-3d-item.png")
      background-size: 100% 100%;
      border-radius: 10px;
      .img
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        bottom: 5px;
        left: 0;
        background: url("./../../common/images/banner-3d.png") center no-repeat;
        background-size: 95% 100%;
</style>
