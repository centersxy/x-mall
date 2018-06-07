<template>
<div>
  <input type="text" v-model="formReg.userName">
  <input type="password" v-model="formReg.userPwd">
  <button @click="submit">提交</button>
  <br>
  <input type="text" v-model="formLogin.userName">
  <input type="password" v-model="formLogin.userPwd">
  <button @click="login">提交</button>
</div>
</template>

<script type="text/ecmascript-6">
  import {register,Login} from 'api/user'
  export default{
    data() {
      return {
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
          console.log(res)
        })
      },
      login() {
        const {userName, userPwd} = this.formLogin
        Login({userName, userPwd}).then((res) => {
          console.log(res)
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" type="text/stylus">
  
  input{
    width: 200px;
  }
</style>
