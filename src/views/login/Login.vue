<template>

  <el-form class="login_container"  :model="loginForm" ref="loginForm" :rules="loginValidate">
    <h3 class="title" >系统登录</h3>
    <el-form-item prop="username">
      <el-input v-model="loginForm.username" type="text" placeholder="账号"/>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="loginForm.password" type="password" placeholder="密码"/>
    </el-form-item>
    <el-checkbox class="remember" v-model="rememberChecked" checked>记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button @click="doLogin" type="primary" style="width:100%;">登录</el-button>
    </el-form-item>

  </el-form>
</template>

<script>
  import {requestLogin} from "@/api/api";

  export default {
        name: "login.vue",

        data(){
          return{
            rememberChecked:true,
            loginForm:{
              username: "admin",
              password:'123456'
            },
            loginValidate:{
              username:[
                {required:true , message:"请输入账号", trigger:'blur'}
              ],
              password:[
                {required:true, message:"请输入密码",trigger:'blur'}
              ]
            }
          }
        },

      methods:{
        doLogin() {
            let _this=this;
            this.$refs.loginForm.validate((valid)=>{
              if (valid) {
                let loginParams={username:this.loginForm.username,password:this.loginForm.password}
                requestLogin(loginParams).then(data=>{
                  let {code,msg,user}=data
                  if (code !== 200) {
                    //登录不成功
                    this.$message.error(msg);
                  }else {
                    //登录成功
                    sessionStorage.setItem('user',JSON.stringify(user))
                    this.$router.push("/user")
                  }
                })
              }else {
                console.log("error submit");
                return false;
              }
            })
        }
      },
    mounted() {

    }
  }
</script>

<style scoped lang="stylus">
  @import "~@css/mixin.styl"


  .login_container
    borderRadius(5px)
    background-clip padding-box
    margin 180px auto
    width 350px
    padding 35px 35px 15px 35px
    background #FFFFFF
    border solid  1px #eaeaea
    box-shadow 0 0 25px #cac6c6

  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }

</style>
