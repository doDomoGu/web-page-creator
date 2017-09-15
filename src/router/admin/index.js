import Main from '../../views/layouts/main';
import User from '../../views/admin/user'
import Usergroup from '../../views/admin/usergroup'
import Website from '../../views/admin/websites'

var routes = {
    path: '/admin',
    name: '后台管理',
    required_roles: ['super_admin'],
    component : Main,
    meta: {
        requireAuths: true
    },
    children: [
        {
            path: 'user',
            name: '用户',
            component: User,
            meta: {
                requireAuths: true,
                roles: ['user_admin']
            }
        },
        {
            path: 'usergroup',
            name: '用户组',
            component: Usergroup,
            meta: {
                requireAuths: true,
                roles: ['user_admin']
            }
        }/*,
        {
            path: 'website',
            name: '网站',
            component: Website,
            require_roles: ['website_admin']
        }*/
    ]
};

export default routes;