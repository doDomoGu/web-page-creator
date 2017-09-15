import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import NormalRoutes from './normal'
import AdminRoutes from './admin'
import NotFound404 from '../views/NotFound404'


Vue.use(Router);

console.warn('1. in router');

let routes = [];

//载入通用路由
for(let i in NormalRoutes){
    routes.push(NormalRoutes[i]);
}

/*routes.push(NormalRoutes);*/

//载入admin相关路由
routes.push(AdminRoutes);

//最后载入404页面
routes.push({ path: '*', name: '404', component: NotFound404 });


const router = new Router({
    mode:'history',
    routes
});

console.log('before each 1111');

console.log(router);

router.beforeEach((to, from, next) => {
    console.log('  ');
    console.log('router.beforeEach | path :'+ to.fullPath);

    if (to.path === "/logout") {

        store.dispatch('auths/Logout').then(() => {

            next({path: '/login'});

        })

    } else {

        //if (router.meta..routePathsNotRequiredAuth.indexOf(to.path) !== -1) { // 在路由免登录白名单，直接进入
        if (!(to.meta.requireAuths)) {

            //console.log(to.fullPath);
            //console.log(to);


            console.log('white');

            next();

        }else{


                var isLogin = store.getters['auths/is_login'];

                if(isLogin){



                    console.log('is_login');
                    /*if (isAuth) {
                        next()
                    } else {
                        next('/no-auth')
                    }*/
                    next()
                }else {
                    var tokenInLocalStorge = localStorage.__WPC_AUTH_TOKEN__;

                    if (typeof(tokenInLocalStorge)=='string' && tokenInLocalStorge !='') {

                        console.warn(' checkToken start ');
                        store.dispatch('auths/CheckToken',tokenInLocalStorge).then(() => {
                            console.warn('checkToken finish');
                            next();


                            //router.push('/');
                        });
                    }else {
                        //next({path: '/login', query: {redirectUrl: to.fullPath}});
                        next({path: '/login'});
                    }
                }

        }
    }
});

export default router;