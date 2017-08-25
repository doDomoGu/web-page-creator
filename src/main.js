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
        store.dispatch('Logout').then(() => {
            next({path: '/'})
        })
    }
    //console.log('start beforeEach');
    //是否登录状态
    if (!store.getters.auth_is_login) {
        //console.log('not login');
        //读取cookie
        var tokenByCookie = Cookies.get('wpc_auth_token');
        if (tokenByCookie) {
            //console.log('has token in cookie');

            //根据cookie token 获取用户信息
           new Promise((resolve, reject) => {
                axios.get(
                    '/auths',
                    {
                        params: {
                            token: tokenByCookie
                        }
                    }
                )
                .then((res) => {
                    store.dispatch('SetStore', res.data);

                    store.dispatch('GenerateRoutes', {roles: res.data.roles, router: router}).then(() => { // 生成可访问的路由表
                        router.addRoutes(store.getters.auth_add_routes) // 动态添加可访问路由表
                    });
                    //console.log('a1111');
                    //console.log(store.getters.auth_is_login);
                    next(to.path);
                    //next(to.path);
                    resolve(res);

                    //console.log('a2222');
                })
                .catch(error => {
                    reject(error);
                });
            });

        }else{
            //不是登录状态  且在cookie 中也不存在 auto_token
//            console.log('no token in cookie');

            if (router.options.constantRoutes.indexOf(to.path) !== -1) { // 在路由免登录白名单，直接进入
                //console.log('constant',to.path);
                next();
            } else {
                //console.log('no constant',to.path);
                next('/login'); // 否则全部重定向到登录页
            }
        }
    }else{
        //是登录状态
        // 加载路由
        /*store.dispatch('GenerateRoutes', {roles: store.getters.auth_roles, router: router}).then(() => { // 生成可访问的路由表
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
