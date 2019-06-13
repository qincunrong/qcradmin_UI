<template>
  <el-row class="container">

    <el-col class="header_wrapper" :span="24">
      <el-col class="header_logo" :span="10" :class="isCollapse?'logo_collapse':'logo_uncollapse'">
        {{isCollapse?'':systemName}}
      </el-col>

      <el-col  :span="10">
        <div class="ic_tools" @click="changeCollapse">
          <i class="el-icon-menu"></i>
        </div>
      </el-col>

      <el-col class="header_userinfo_wrapper" :span="4">

        <el-dropdown  trigger="hover">
          <span class="header_userinfo"><img :src="userHead"/> {{userName}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>我的消息</el-dropdown-item>
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

      </el-col>

    </el-col>

    <el-row class="main" :span="24">
      <el-col class="main_aside" :span="6" :class="isCollapse?'main_aside_collapse':'main_aside_uncollapse'" >
        <el-menu :default-active="currentComponent"
                 @open="asideOpen"
                 @close="asideClose"
                 class="el_menu el-menu-vertical-demo"
                 unique-opened
                 background-color="#f1f2f7"
                 :collapse="isCollapse"
                 router
                 :default-openeds="openedComponentGroup"
        >

          <template v-for="component in componentArray">
            <el-submenu :index="component.path" v-if="component.child">
              <template slot="title">
                <i :class="component.iconClass"></i>
                <span>{{component.title}}</span>
              </template>
              <el-menu-item :index="childComp.path" v-for="childComp in component.child">
                <span slot="title">{{childComp.title}}</span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item :index="component.path" v-else>
              <i :class="component.iconClass"></i>
              <span slot="title">{{component.title}}</span>
            </el-menu-item>

          </template>
        </el-menu>
      </el-col>

      <el-col class="main_content">
        <el-row class="content_breadcrumb">

        </el-row>

        <el-row class="content_wrapper">
          <router-view></router-view>
        </el-row>

      </el-col>


    </el-row>

  </el-row>
</template>

<script>
  export default {
    name: 'Manager',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        userHead: "",
        userName: "",
        isCollapse:false,
        systemName:"POPSAGE",
        currentComponent: '',
        openedComponentGroup:[],
        componentArray:[
          {path: '/1' , title:"人员管理", iconClass:"el-icon-user",child:[
              { path:'/corporate',title:"组织管理"},
              { path:'/user',title:"用户管理"},
              { path:'/role',title:"权限管理"},
            ] },
          {
            path:'/activity',title:"活动管理",iconClass:"el-icon-menu"
          },
          {
            path:'/survey',title:"问卷调查",iconClass:"el-icon-edit"
          }
        ]
      }
    },
    methods: {
      logout() {
        this.$confirm('确定退出吗?','提示',{})
          .then(()=>{
            sessionStorage.removeItem('user');
            this.$router.push('/login')
          }).catch(()=>{

        })
      },
      asideOpen() {

      },
      asideClose() {

      },
      changeCollapse(){
        this.isCollapse = !this.isCollapse;
      },
      onRoute() {
        // console.log(this.$route.path);
        let routePath=this.$route.path;
        for(let comp of this.componentArray){
          // console.log("parent:"+comp);
          if(comp.path==routePath){
            this.currentComponent = routePath;
            this.openedComponentGroup=[comp.path];
            break
          }
          if (!comp.child) {
            continue
          }
          for (let childComp of comp.child) {
            // console.log("child:"+childComp);
            if(childComp.path==routePath){
              this.currentComponent = routePath;
              break
            }
          }
        }
        console.log("currentComponent=="+this.currentComponent)
      }

    },


    mounted() {
      //获取用户信息
      let user = sessionStorage.getItem('user');
      if (user) {
        user = JSON.parse(user);
        this.userName = user.name || '';
        this.userHead = user.avatar || '';
      }
      //获取路径信息
      this.currentComponent='' ;
      this.openedComponentGroup = [];
      this.onRoute();
      if (!this.currentComponent) {
        this.currentComponent="/user"
        this.openedComponentGroup=["/1"]
      }

    },


    watch:{
      "$route": "onRoute",
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~@css/base.styl"

  .container {
    display flex
    flex-direction column
    height 100%
    overflow hidden


    .header_wrapper {
      background-color: $color_primary;
      color: #FFFFFF;
      text-align: center;
      line-height 60px;
      height: 60px;

      .header_logo{
        height:60px;
        font-size: 20px;
        padding-left:30px;
        padding-right:20px;
        border-color: rgba(238,241,146,0.3);
        border-right-width: 1px;
        border-right-style: solid;
        text-align left

      }
      .logo_collapse{
        width:66px;
      }

      .logo_uncollapse{
        width:230px;
      }

      .ic_tools{
        padding: 0px 23px;
        width:14px;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
      }

      .header_userinfo_wrapper {
        text-align: right;
        padding-left: 35px
        padding-right 10px
        float: right

        .header_userinfo {
          cursor: pointer
          color: white

          img {
            width: 40px
            height: 40px
            border-radius 20px
            margin: 10px 0 10px 10px
            float: right
          }
        }

      }

    }

    .main {
      flex 1
      display flex
      flex-direction row
      overflow hidden

      .main_aside {
        height:100%
        width 230px
        .el_menu{
          height 100%
          text-align left
        }
        .el_menu:not(.el-menu--collapse) {
          width: 230px;
          min-height: 400px;
        }

      }
      .main_aside_collapse{
        width:66px;
      }

      .main_aside_uncollapse{
        width:230px;
      }

      .main_content {
        flex 1
        overflow-y scroll
        padding 20px

      }

    }

  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
