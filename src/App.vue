<template>
  <div id="app">
    <el-row :gutter="20">
      <el-col :span="4" >
        <sidebar></sidebar>
      </el-col>
      <el-col :span="20">
        <router-view></router-view>
      </el-col>
    </el-row>
    <!--<img src="./assets/logo.png">-->
  </div>
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
/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}*/
</style>
