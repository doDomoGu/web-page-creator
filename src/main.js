// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
//import axios from 'axios'

import store from './store/index'

Vue.use(ElementUI);
Vue.use(Vuex);

//Vue.prototype.$axios = axios


Vue.config.productionTip = false



/*
store.commit('increment')

console.log(store.state.count) // -> 1*/
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  //template: '<App></App>',
  //components: {App},
  render: h => h(App)
  /*,
  created() {
    this.checkLogin();
  },
  methods:{
    checkLogin(){
      console.log('check login');
    }
  }*/
})


/*export function fetch(url) {
  console.log('sssss');
  console.log(url);
}*/
