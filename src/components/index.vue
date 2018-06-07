<template>
  <div>
    <v-header></v-header>
    <router-view class="main"></router-view>
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
</style>
