import Vue from 'vue'
import Router from 'vue-router'

import Index from '../components/Index'
import About from '../components/About'
import User from '../components/User'
import Login from '../components/Login'
import Logout from '../components/Logout'


Vue.use(Router);


//constantRouterMap  基础路由 不需登录访问权限
export const constantRouterMap = [
    {
        path: '/login',
        component: Login,
        name: '登录页',
        hidden: true //hidden为自定义属性，侧边栏那章会纤细解释
    },
    {
        path: '/',
        component: Index,
        name: '首页'/*,
        redirect: '/dashboard',
        children: [{ path: 'dashboard', component: dashboard }]*/
    },
];


export default new Router({
    mode : 'history',
    routes: constantRouterMap
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
