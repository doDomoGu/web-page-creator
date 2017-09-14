import Vue from 'vue'
import Router from 'vue-router'


import store from '../store'
//import axios from '../axios'

import Index from '../views/Index'
import About from '../components/About'
import Login from '../views/Login'

import NotFound404 from '../views/NotFound404'
//import NotFound222 from '../views/NotFound222'
import AdminRouterMap from './admin/index'

Vue.use(Router);

console.warn('1. in router');


//routes:默认路由  无需权限验证

var routes = [
    {
        path: '/login',
        component: Login,
        name: '登录页',
    },
    {
        path: '/about',
        component: About,
        name: '关于我们',
        //hidden: true //hidden为自定义属性，侧边栏那章会纤细解释
    },

];

//routePathsNotRequiredAuth: 无需权限验证的路由路径数组
var routePathsNotRequiredAuth = [];

for(var i in routes){
    routePathsNotRequiredAuth.push(routes[i].path);
}

var roleRouterMap = [
    {
        path: '/logout',
        name: '登出',
        roles: '*'
    },
    {
        path: '/',
        name: '首页',
        component: Index,
        roles: '*'
    }
];

for(var i in roleRouterMap){
    routes.push(roleRouterMap[i]);
}


routes.push(AdminRouterMap);

routes.push({ path: '*', name: '404', component: NotFound404 });






var tokenInLocalStorge = localStorage.__WPC_AUTH_TOKEN__;

var checkToken = false;
//console.warn('2. LocalStorgeToken is exist :'+ (typeof(tokenInLocalStorge)=='string' && tokenInLocalStorge !=''));

if (1!=1 && typeof(tokenInLocalStorge)=='string' && tokenInLocalStorge !='') {

    checkToken = true;

    var curRoute = router.currentRoute;

    store.dispatch('auths/CheckToken',tokenInLocalStorge).then(() => { // 生成可访问的路由表
        setTimeout(function(){
            //roleRouteMap  所有登录后角色可以使用的路由
            var roleRouterMap = [
                {
                    path: '/logout',
                    name: '登出',
                    roles: '*'
                },
                {
                    path: '/',
                    name: '首页',
                    component: Index,
                    roles: '*'
                }
            ];

    //roleRoutes  不同path对应的roles数组
            /*var roleRoutes = [];


            for(var i in roleRouterMap){
                roleRoutes[roleRouterMap[i].path] = roleRouterMap[i].roles;
            }*/

            for(var i in AdminRouterMap){
                AdminRouterMap[i].path = '/admin'+AdminRouterMap[i].path;

                roleRouterMap.push(AdminRouterMap[i]);

                //roleRoutes[AdminRouterMap[i].path] = AdminRouterMap[i].roles;
            }




            var router404 = { path: '*', name: '404', component: NotFound404 }



            var roles = store.getters['auths/roles'];


            var routes = [];

            for(var i in roleRouterMap){
                if(roleRouterMap[i].roles == '*'){
                    routes.push(roleRouterMap[i]);
                }else if(roles) {
                    for(var j in roles){
                        if(roles[j] == 'super2_admin' || roleRouterMap[i].roles.indexOf(roles[j]) !== -1){
                            routes.push(roleRouterMap[i]);
                        }
                    }
                }
            }

    //404页面
            routes.push(router404);





            router.addRoutes(routes);

            console.log('s');

            console.log(router.currentRoute);
            console.log('s');


            router.push('/');
        },2000);
    });
}

/*if(checkToken){
    var router222 = { path: '/222', name: '222', component: NotFound222 }
    routes.push(router222);
}*/


const router = new Router({
    mode:'history',
    routes,
    routePathsNotRequiredAuth
});




console.log('before each 1111');

console.log(router);

router.beforeEach((to, from, next) => {

    console.log('router.beforeEach | path :'+ to.fullPath);

    if (to.path =="/logout") {

        store.dispatch('auths/Logout').then(() => {

            next({path: '/login'});

        })

    } else {

        if (router.options.routePathsNotRequiredAuth.indexOf(to.path) !== -1) { // 在路由免登录白名单，直接进入

            console.log('white');

            next();

        }else{

            const isLogin = store.getters['auths/is_login'];

            if(isLogin){

console.log('is_login');
                /*if (isAuth) {
                    next()
                } else {
                    next('/no-auth')
                }*/
                next()
            }else {
                //next({path: '/login', query: {redirectUrl: to.fullPath}});
                next({path: '/login'});
            }
        }
    }
});

export default router;