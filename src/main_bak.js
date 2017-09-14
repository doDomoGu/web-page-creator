// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import axios from './axios'
import Cookies from 'js-cookie'
import store from './store'


Vue.use(ElementUI);

Vue.config.productionTip = false;

//登录验证
router.beforeEach((to, from, next) => {
    if (to.path === '/logout') {
        store.dispatch('auths/Logout').then(() => {
            store.dispatch('auths/GenerateRoutes', {roles: [], router: router}).then(() => { // 生成可访问的路由表
                r//outer.replace(store.getters['auths/add_routes']) // 动态添加可访问路由表
            });
            next({path: '/login'});
        })
    }
    //console.log('start beforeEach');
    //是否登录状态
    if (!store.getters['auths/is_login']) {
        //console.log('not login');
        //读取cookie
        var tokenInLocalStorge = localStorage.__WPC_AUTH_TOKEN__;//Cookies.get('wpc_auth_token');
        if (typeof(tokenInLocalStorge)=='string') {
            console.log('localstorge has token')
            //根据cookie token 获取用户信息


           var s = function() {
               console.log('in s function')
               return new Promise((resolve, reject) => {
                   axios.get(
                       '/auths',
                       {
                           params: {
                               token: tokenInLocalStorge
                           }
                       }
                   )
                       .then((res) => {
                           console.log('');
                           console.log('auths has res');
                           if (res.data && res.data.success) {


                               console.log('res user_id:' + res.data.user_id);

                               store.dispatch('auths/SetStore', res.data);
                               console.log(2222);
                               store.dispatch('auths/GenerateRoutes', {roles: res.data.roles, router: router}).then(() => { // 生成可访问的路由表
                                   router.addRoutes(store.getters['auths/add_routes']) // 动态添加可访问路由表
                               });
                               next();
                               //next(to.path);
                           } else {
                               //提交的token 错误
                               //Cookies.set('wpc_auth_token','',{expires:-1,path:'/'}));

                               store.commit('auths/cleanLoginState');

                               next('/login');
                           }

                           resolve(res);

                           //console.log('a2222');
                       })
                       .catch(error => {
                           reject(error);
                       });
               });
           }
            console.log(s());

            console.log(store.state.auths);

        }else{
            //不是登录状态  且在cookie 中也不存在 auto_token
            console.log('');
            console.log('no token in cookie');

            if (router.options.constantRoutes.indexOf(to.path) !== -1) { // 在路由免登录白名单，直接进入
                //console.log('constant',to.path);
                next();
            } else {

                //console.log('no constant',to.path);
                next({path: '/login'}); // 否则全部重定向到登录页
            }
        }
    }else{
        //是登录状态
        // 加载路由
        /*store.dispatch('GenerateRoutes', {roles: store.getters['auths/roles'], router: router}).then(() => { // 生成可访问的路由表
            router.addRoutes(store.getters.auth_add_routes) // 动态添加可访问路由表
        });*/

        next();
        /*console.log('no auth token');

        if (router.options.constantRoutes.indexOf(to.path) !== -1) { // 在路由免登录白名单，直接进入
            next();
        } else {
            next('/login'); // 否则全部重定向到登录页
        }*/

    }

});


/*console.log(store.getters.auth_token);
if(!store.getters.auth_token){
    var tokenByCookie = Cookies.get('wpc_auth_token');
    console.log('cookie')
    console.log(tokenByCookie);
    if(tokenByCookie){
        store.dispatch('GetAuthInfo',tokenByCookie).then((res) => {
            //resolve(res);
            console.log('1111');
            console.log(store.getters.auth_token);
            next();
        }).catch(err => {
            //console.log('submit login error');
            console.log(err);
            //this.$message.error(err); //登录失败提示错误
        });

        //Cookies.remove('wpc_auth_token');
        //commit('setToken',tokenByCookie,true);
        //return tokenByCookie;
    }
}*/

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
