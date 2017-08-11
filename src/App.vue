<template>
  <div id="app">
    <sidebar></sidebar>
    <div id="main">{{ count222 }}
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Sidebar from './components/layouts/sidebar.vue'
  import { mapState } from 'vuex'

  export default {
      name: 'app',
      computed:mapState(
          {
            localCount:20,
          count222(state) {
            console.log(this);
            console.log(this.localCount);
            console.log(state.count);
            return state.count + this.name;
          }
        }
      ),
      components: { 'sidebar': Sidebar }
  }
</script>

<style>
  body {
    margin:0;
  }
  html, body, #app{
    height:100%;
  }
  #main {
     margin-left:240px;
     padding:24px;
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
