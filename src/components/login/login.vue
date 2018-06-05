<template>
<div>
  <input type="text" v-model="formReg.userName">
  <input type="password" v-model="formReg.userPwd">
  <button @click="submit">提交</button>
</div>
</template>

<script type="text/ecmascript-6">
  import {register} from 'api/user'
  export default{
    data() {
      return {
        formReg: {
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
