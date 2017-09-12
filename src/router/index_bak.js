import Vue from 'vue'
import Router from 'vue-router'


import store from '../store'
import axios from './axios'

import Index from '../views/Index'
import About from '../components/About'
import Login from '../views/Login'
//import Logout from '../components/Logout'
import NotFound404 from '../views/NotFound404'

import AdminRouterMap from './admin/index'

Vue.use(Router);

const router = new VueRouter({
    routes
});

var tokenInLocalStorge = localStorage.__WPC_AUTH_TOKEN__;//Cookies.get('wpc_auth_token');
if (typeof(tokenInLocalStorge)=='string') {
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
                //console.log('');
                //console.log('auths has res');
                if (res.data && res.data.success) {


                  //  console.log('res user_id:' + res.data.user_id);

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



//constantRouterMap  基础路由 不需登录访问权限
var constantRouterMap = [
    /*{
        path: '/',
        component: Index,
        name: '首页'
    },*/
    {
        path: '/login',
        component: Login,
        name: '登录页',
        //hidden: true //hidden为自定义属性，侧边栏那章会纤细解释
    },
    {
        path: '/about',
        component: About,
        name: '关于我们',
        //hidden: true //hidden为自定义属性，侧边栏那章会纤细解释
    },
];


//constantRoutes  基础路由 只包含path值的数组
var constantRoutes = [];
for(var i in constantRouterMap){
    constantRoutes.push(constantRouterMap[i].path);
}


/*//roleAllRouteMap  所有登录后角色可以使用的路由
var roleAllRouterMap = [
    {
        path: '/logout',
        name: '登出'/!*,
        component: Logout*!/
    },
    {
        path: '/',
        component: Index,
        name: '首页',
    }
];

//roleAllRoutes  只包含path值的数组
var roleAllRoutes = [];
for(var i in roleAllRouterMap){
    roleAllRoutes.push(roleAllRouterMap[i].path);
}*/


//roleRouteMap  根据roles属性值 区分哪个角色 可以使用
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
    },
    /*{
        path: '/user',
        name: '用户',
        component: User,
        roles: ['super_admin','user_admin']
    },
    {
        path: '/website',
        name: '网站',
        component: Website,
        roles: ['super_admin','website_admin']
    }*/
];


//roleRoutes  不同path对应的roles数组
var roleRoutes = [];


for(var i in roleRouterMap){
    roleRoutes[roleRouterMap[i].path] = roleRouterMap[i].roles;
}

for(var i in AdminRouterMap){
    AdminRouterMap[i].path = '/admin'+AdminRouterMap[i].path;


    roleRouterMap.push(AdminRouterMap[i]);
    roleRoutes[AdminRouterMap[i].path] = AdminRouterMap[i].roles;
}




var router404 = { path: '*', name: '404', component: NotFound404 }


export default new Router({
    mode : 'history',
    routes: constantRouterMap,
    constantRoutes : constantRoutes,
    roleRouterMap : roleRouterMap,
    roleRoutes : roleRoutes,
    router404: router404
});

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
