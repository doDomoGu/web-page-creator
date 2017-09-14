import Main from '../../views/layouts/admin';
import Index from '../../views/Index'
import About from '../../components/About'
import Login from '../../views/Login'

var routes = [{
    path: '/',
    name: 'main',
    required_roles: ['super_admin'],
    component: Main,
    children: [
        {
            path: '/',
            name: '首页',
            component: Index,
            meta: {
                requireAuths: true,
                roles: '*'
            }
        },

        {
            path: '/about',
            component: About,
            name: '关于我们',
            //hidden: true //hidden为自定义属性，侧边栏那章会纤细解释
        },
        {
            path: '/logout',
            name: '登出',
            meta: {
                requireAuths: true,
                roles: '*'
            }
        }
    ]
},
    {
        path: '/login',
        component: Login,
        name: '登录页',
    }];

export default routes;