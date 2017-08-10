<template>
  <el-row id="app" class="main">
    <el-col :span="4" class="main-sidebar">
      <sidebar></sidebar>
    </el-col>
    <el-col :span="20">
      <router-view></router-view>
    </el-col>
  </el-row>
</template>

<script>
  import Sidebar from './components/layouts/sidebar.vue'
  export default {
      name: 'app',
      components: { 'sidebar': Sidebar }
  }
</script>

<style>
  body {
    margin:0;
  }
  html,body,#app,.main,.main-sidebar {
    height:100%;
  }

/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}*/
</style>
