<template>
  <div class="layout-container">
    <v-header></v-header>
    <div class="w">
      <div class="content">
        <div class="account-sidebar">
          <div class="avatar gray-box ">
            <div>
              <img :src="userInfo.avatar"> <h5>
              </h5></div>
            <div class="box-inner">
              <ul class="account-nav">
                <li v-for="(item,i) in nav" :key='i' :class="{current:item.name===title}"
                    @click="tab(item)">
                  <a href="javascript:;">{{item.name}}</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="account-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import VHeader from 'base/header/header'
  import {mapGetters} from 'vuex'
  export default{
    computed: {
      ...mapGetters(['userInfo'])
    },
    data() {
      return {
        title: '账户资料',
        nav: [
          {name: '账户资料', path: 'userInfo'},
          {name: '我的订单', path: 'orderList'},
          {name: '收货地址', path: 'addressList'},
          {name: '我的优惠', path: 'coupon'},
          {name: '售后服务', path: 'support'},
          {name: '以旧换新', path: 'aihuishou'}
        ],
      }
    },
    methods: {
      tab (e) {
        this.$router.push({path: '/user/' + e.path})
      },
    },
    watch: {
      $route (to) {
        let path = to.path.split('/')[2]
        console.log(path)
        this.nav.forEach(item => {
          if (item.path === path) {
            this.title = item.name
          }
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
  .w {
    padding-top: 40px;
    width: 1220px
    margin: 0 auto
  }
  
  .content {
    display: flex;
    height: 100%;
  }
  
  .account-sidebar {
    width: 210px;
    border-radius: 6px;
    .avatar {
      padding-top: 20px;
      border-radius: 10px;
      text-align: center;
      img {
        width: 168px;
        height: 168px;
      }
      h5 {
        font-size: 18px;
        line-height: 48px;
        font-weight: 700;
      }
    }
    .account-nav {
      padding-top: 15px;
      li {
        position: relative;
        height: 48px;
        /*border-top: 1px solid #EBEBEB;*/
        line-height: 48px;
        &:hover {
          a {
            position: relative;
            z-index: 1;
            height: 50px;
            background-color: #98AFEE;
            line-height: 50px;
            color: #FFF;
          }
          
        }
        a {
          display: block;
        }
        &.current {
          a {
            position: relative;
            z-index: 1;
            height: 50px;
            background-color: #98AFEE;
            line-height: 50px;
            color: #FFF;
          }
        }
        
      }
    }
  }
  
  .account-content {
    margin-left: 20px;
    flex: 1;
  }

</style>
