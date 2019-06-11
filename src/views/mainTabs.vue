<template>
  <div class="all_wrapper">
    <el-header class="header_wrapper">Header</el-header>
    <el-container class="center_wrapper">
      <div class="aside_wrapper">Aside</div>
      <el-main class="main_wrapper">Main</el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'Manager',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .all_wrapper
    display flex
    flex-direction column
    background red
    height  100%

    .header_wrapper
      background-color: #B3C0D1;
      color: #333;
      text-align: center;
      line-height 100px;
      height: 100px;


    .center_wrapper
      flex 1
      display flex
      flex-direction row
      flex-wrap nowrap
      background #25a4bb

      .aside_wrapper
        width: 250px;
        background-color: #D3DCE6;
        color: #333;
        text-align: center;

      .main_wrapper
        flex 1
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
