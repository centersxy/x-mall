<template>
  <div class="login-body">
    <div class="guns sky" style="display: block;">
      <div class="clouds_one"></div>
      <div class="clouds_two"></div>
      <div class="clouds_three"></div>
    </div>
    <div class="wrapper">
      <div class="content" v-if="showForm">
        <h4 class="title">欢迎登陆</h4>
        <div class="form-group">
          <input type="text" v-model="formLogin.userName">
        </div>
        <div class="form-group">
          <input type="password" v-model="formLogin.userPwd">
        </div>
        <p class="info-msg" @click="showForm = false">
          没有账号？ 注册一个吧
        </p>
        <button type="button" @click="login">登录</button>
      </div>
      
      <div class="content" v-else>
        <h4 class="title">欢迎注册</h4>
        <div class="form-group">
          <input type="text" v-model="formReg.userName">
        </div>
        <div class="form-group">
          <input type="password" v-model="formReg.userPwd">
        </div>
        <p class="info-msg" @click="showForm = true">
          已有账号,去登陆
        </p>
        <button type="button" @click="submit">注册</button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {register,Login} from 'api/user'
  import {ERR_OK} from 'api/config'
  export default{
    data() {
      return {
        showForm: true,
        formReg: {
          userName: '',
          userPwd: ''
        },
        formLogin: {
          userName: '',
          userPwd: ''
        }
      }
    },
    methods: {
      submit() {
        const {userName, userPwd} = this.formReg
        register({userName, userPwd}).then((res) => {
        
        })
      },
      login() {
        const {userName, userPwd} = this.formLogin
        if (!userName || !userPwd) {
          this.$Message.warning('用户名或密码错误')
        } else {
          let params = {userName, userPwd}
          Login(params).then((res) => {
            if (res.code === ERR_OK) {
              this.$Message.success('正在登录...')
              setTimeout(() => {
                this.$router.push('/')
              },2000)
            } else {
              this.$Message.error('用户名或密码错误')
            }
          })
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" type="text/stylus">
  .wrapper
    width: 450px
    border: 1px solid #dadada
    border-radius: 10px
    top: 50%
    left: 50%
    position: absolute
    transform: translate(-50%, -50%)
    .title
      height: 80px
      line-height: 80px
      font-size: 20px
      color: aqua
      text-align: center
    .content
      padding: 0 40px 22px
      height: auto
      .form-group
        margin-bottom: 15px
        height: 50px
        display:flex
        align-items: center
        box-sizing:border-box
        input
          font-size: 16px
          width: 100%
          height: 100%
          padding: 10px 15px
          box-sizing: border-box
          border: 1px solid #ccc
          border-radius: 6px
      .info-msg
        margin-bottom: 15px
        line-height: 18px
        text-align: right
        color: deeppink
        cursor: pointer
      button
        margin: 0;
        width: 100%;
        height: 48px;
        font-size: 18px;
        line-height: 48px;
        border: 1px solid #5c81e3;
        border-radius: 4px;
        color: #fff;
        background-color: #678ee7;
        background-image: linear-gradient(180deg,#678ee7,#5078df);
  .login-body{
    height: 100%
    width: 100%
  }
  .sky {
    height: 480px;
    background: #007fd5;
    position: fixed;
    overflow: hidden;
    z-index: -1;
    -webkit-animation: sky_background 50s ease-out infinite;
    -moz-animation: sky_background 50s ease-out infinite;
    -o-animation: sky_background 50s ease-out infinite;
    animation: sky_background 50s ease-out infinite;
    -webkit-transform: translate3d(0, 0, 0);
    -ms-transform: translate3d(0, 0, 0);
    -o-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  
  .clouds_one {
    background: url("/static/images/cloud_one.png");
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 300%;
    -webkit-animation: cloud_one 50s linear infinite;
    -moz-animation: cloud_one 50s linear infinite;
    -o-animation: cloud_one 50s linear infinite;
    animation: cloud_one 50s linear infinite;
    -webkit-transform: translate3d(0, 0, 0);
    -ms-transform: translate3d(0, 0, 0);
    -o-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  
  .clouds_two {
    background: url("/static/images/cloud_two.png");
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 300%;
    -webkit-animation: cloud_two 75s linear infinite;
    -moz-animation: cloud_two 75s linear infinite;
    -o-animation: cloud_two 75s linear infinite;
    animation: cloud_two 75s linear infinite;
    -webkit-transform: translate3d(0, 0, 0);
    -ms-transform: translate3d(0, 0, 0);
    -o-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  
  .clouds_three {
    background: url("/static/images/cloud_three.png");
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 300%;
    -webkit-animation: cloud_three 100s linear infinite;
    -moz-animation: cloud_three 100s linear infinite;
    -o-animation: cloud_three 100s linear infinite;
    animation: cloud_three 100s linear infinite;
    -webkit-transform: translate3d(0, 0, 0);
    -ms-transform: translate3d(0, 0, 0);
    -o-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  
  @-webkit-keyframes sky_background {
    0% {
      background: #007fd5;
      color: #007fd5
    }
    50% {
      background: #63B1E5;
      color: #a3d9ff
    }
    100% {
      background: #007fd5;
      color: #007fd5
    }
  }
  
  @-moz-keyframes sky_background {
    0% {
      background: #007fd5;
      color: #007fd5
    }
    50% {
      background: #63B1E5;
      color: #a3d9ff
    }
    100% {
      background: #007fd5;
      color: #007fd5
    }
  }
  
  @keyframes sky_background {
    0% {
      background: #007fd5;
      color: #007fd5
    }
    50% {
      background: #63B1E5;
      color: #a3d9ff
    }
    100% {
      background: #007fd5;
      color: #007fd5
    }
  }
  
  @-webkit-keyframes cloud_one {
    0% {
      left: 0
    }
    100% {
      left: -200%
    }
  }
  
  @-moz-keyframes cloud_one {
    0% {
      left: 0
    }
    100% {
      left: -200%
    }
  }
  
  @keyframes cloud_one {
    0% {
      left: 0
    }
    100% {
      left: -200%
    }
  }
  
  @-webkit-keyframes cloud_two {
    0% {
      left: 0
    }
    100% {
      left: -200%
    }
  }
  
  @-moz-keyframes cloud_two {
    0% {
      left: 0
    }
    100% {
      left: -200%
    }
  }
  
  @keyframes cloud_two {
    0% {
      left: 0
    }
    100% {
      left: -200%
    }
  }
  
  @-webkit-keyframes cloud_three {
    0% {
      left: 0
    }
    100% {
      left: -200%
    }
  }
  
  @-moz-keyframes cloud_three {
    0% {
      left: 0
    }
    100% {
      left: -200%
    }
  }
  
  @keyframes cloud_three {
    0% {
      left: 0
    }
    100% {
      left: -200%
    }
  }
  
  .guns {
    opacity: 1;
    width: 100%;
    height: 100%;
    -webkit-background-size: cover;
    background-size: cover;
  }
</style>
