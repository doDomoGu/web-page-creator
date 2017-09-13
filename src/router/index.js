import Vue from 'vue'
import Router from 'vue-router'


import store from '../store'
import axios from '../axios'

import Index from '../views/Index'
import About from '../components/About'
import Login from '../views/Login'
//import Logout from '../components/Logout'

import NotFound404 from '../views/NotFound404'
import NotFound222 from '../views/NotFound222'
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




var tokenInLocalStorge = localStorage.__WPC_AUTH_TOKEN__;

var checkToken = false;
console.warn('2. LocalStorgeToken is exist :'+ (typeof(tokenInLocalStorge)=='string' && tokenInLocalStorge !=''));

if (typeof(tokenInLocalStorge)=='string' && tokenInLocalStorge !='') {

    checkToken = true;

    store.dispatch('auths/CheckToken',tokenInLocalStorge).then(() => { // 生成可访问的路由表
        

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

        router.push('/');
    });
}





if(checkToken){
    var router222 = { path: '/222', name: '222', component: NotFound222 }
    routes.push(router222);

}


const router = new Router({
    mode:'history',
    routes,
    routePathsNotRequiredAuth
});


console.log('before each 1111');
router.beforeEach((to, from, next) => {
    console.log('before each 222');
    if (to.path =="/logout") {
        store.dispatch('auths/Logout').then(() => {
            /*store.dispatch('GenerateRoutes', {roles: [], router: router}).then(() => { // 生成可访问的路由表
                router.replace(store.getters.auth_add_routes) // 动态添加可访问路由表
            });*/
            next({path: '/login'});
        })
    } else {

        const user = store.state.auths.is_login;

        if(user){
            console.log('is login');
            next();
        }else{
            if(to.path == '/222'){
                next();
            }else{
                if(checkToken){
                    next('/222');
                }else{
                    if (router.options.routePathsNotRequiredAuth.indexOf(to.path) !== -1) { // 在路由免登录白名单，直接进入
                        console.log('white');
                        next();
                    } else {
                        console.warn("需要登录");
                        next({'path': '/login'});
                    }
                }
            }
        }
    }




    /*console.log();
    if (store.getters.auth_is_login) {

        //退出操作
        if (to.path === '/logout') {

            store.dispatch('Logout').then(() => {
                store.dispatch('GenerateRoutes', {roles: [], router: router}).then(() => { // 生成可访问的路由表
                    router.replace(store.getters.auth_add_routes) // 动态添加可访问路由表
                });
                next({path: '/login'});
            })
        }else{
            next();
        }
    }else{
        if (router.options.routePathsNotRequiredAuth.indexOf(to.path) !== -1) { // 在路由免登录白名单，直接进入
            console.log('white');
            next();
        } else {
            next({path: '/login'}); // 否则全部重定向到登录页
        }
    }*/
})



export default router;



/*export default new Router({
    mode : 'history',
    routes: constantRouterMap,
    constantRoutes : constantRoutes,
    roleRouterMap : roleRouterMap,
    roleRoutes : roleRoutes,
    router404: router404
});*/

/*export default new Router({
    mode : 'history',
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index
        },
        {
            path: '/about',
            name: 'About',
            component: About
        },
        {
            path: '/user',
            name: 'User',
            component: User
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/logout',
            name: 'Logout',
            component: Logout
        }
    ]
})*/
