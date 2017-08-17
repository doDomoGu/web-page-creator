import Vue from 'vue'
import Router from 'vue-router'

import Index from '../components/Index'
import About from '../components/About'
import User from '../components/User'
import Login from '../components/Login'
import Logout from '../components/Logout'


Vue.use(Router);

export default new Router({
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
})
