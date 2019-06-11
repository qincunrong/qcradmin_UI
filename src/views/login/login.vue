<template>

  <el-form :model="loginForm" :ref="loginForm" >
    <h3 class="title" >系统登录</h3>
    <el-form-item prop="username">
      <el-input v-model="loginForm.username" type="text" placeholder="账号"/>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="loginForm.password" type="password" placeholder="密码"/>
    </el-form-item>
    <el-checkbox class="remember" v-model="rememberChecked" checked>记住密码</el-checkbox>
    <el-form-item >

      <el-button @click="doLogin" >登录</el-button>
    </el-form-item>

  </el-form>
</template>

<script>
    export default {
        name: "login.vue",

        data(){
          return{
            rememberChecked:true,
            loginForm:{
              username: "qincr",
              password:123456
            }
          }
        }
    }
</script>

<style scoped>

</style>
