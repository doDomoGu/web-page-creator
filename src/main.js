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
/*Vue.use(Vuex);*/

//Vue.prototype.$axios = axios


Vue.config.productionTip = false

/*axios.interceptors.response.use((response) => {
  const data = response.data
  console.log(data);
})*/

/*
store.commit('increment')

console.log(store.state.count) // -> 1*/
/* eslint-disable no-new */


var routersNotNeedLogin = ['/','/login'];




router.beforeEach((to, from, next) => {
    if (store.getters.auth_token) { // 判断是否有token
        if (to.path === '/login') {
            next({ path: '/' }); //登录页重定向到首页
        } else {
            var roles = store.getters.auth_roles;





            if (store.getters.auth_roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
                console.log('=======');


                /*store.dispatch('GetAuthInfo').then(res => { // 拉取info
                    const roles = res.data.role;
                    store.dispatch('GenerateRoutes', { roles }).then(() => { // 生成可访问的路由表
                        router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
                        next(to); // hack方法 确保addRoutes已完成
                    })
                }).catch(err => {
                    console.log(err);
                });*/
            } else {
                next() //当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
            }
        }
    } else {
        if (routersNotNeedLogin.indexOf(to.path) !== -1) { // 在路由免登录白名单，直接进入
            next();
        } else {
            next('/login'); // 否则全部重定向到登录页
        }
    }
});



new Vue({
  el: '#app',
  router,
  store,
  //axios,
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
