import Vue from 'vue'
import Router from 'vue-router'

import Index from '../components/Index'
import About from '../components/About'
import User from '../components/User'
import Website from '../components/Website'
import Login from '../components/Login'
import Logout from '../components/Logout'
import NotFound404 from '../components/NotFound404'


Vue.use(Router);


//constantRouterMap  基础路由 不需登录访问权限
var constantRouterMap = [
    {
        path: '/',
        component: Index,
        name: '首页'/*,
        redirect: '/dashboard',
        children: [{ path: 'dashboard', component: dashboard }]*/
    },
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


//roleAllRouteMap  所有登录后角色可以使用的路由
var roleAllRouterMap = [
    {
        path: '/logout',
        name: '登出',
        component: Logout
    }
];

//roleAllRoutes  只包含path值的数组
var roleAllRoutes = [];
for(var i in roleAllRouterMap){
    roleAllRoutes.push(roleAllRouterMap[i].path);
}


//roleOneRouteMap  根据roles属性值 区分哪个角色 可以使用
var roleOneRouterMap = [
    {
        path: '/user',
        name: '用户',
        component: User,
        roles: ['super_admi22n','user_admin']
    },
    {
        path: '/website',
        name: '网站',
        component: Website,
        roles: ['super_admin','website_admin']
    }
];


//roleOneRoutes  不同path对应的roles数组
var roleOneRoutes = [];
for(var i in roleOneRouterMap){
    roleOneRoutes[roleOneRouterMap[i].path] = roleOneRouterMap[i].roles;
}

var router404 = { path: '*', name: '404', component: NotFound404 }


export default new Router({
    mode : 'history',
    routes: constantRouterMap,
    constantRoutes : constantRoutes,
    roleAllRouterMap : roleAllRouterMap,
    roleAllRoutes : roleAllRoutes,
    roleOneRouterMap : roleOneRouterMap,
    roleOneRoutes : roleOneRoutes,
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
