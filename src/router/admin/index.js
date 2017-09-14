
//import Admin from '/./../views/admin';
import User from '../../views/admin/user'
import Usergroup from '../../views/admin/usergroup'
import Website from '../../views/admin/websites'



const Admin = {
    template: '<router-view></router-view>'
}

var routerMap = {
    path: '/admin',
    name: '后台管理',
    required_roles: ['super_admin'],
    component : Admin,
    children: [
        {
            path: 'user',
            name: '用户',
            component: User,
            require_roles: ['user_admin']
        },
        {
            path: 'usergroup',
            name: '用户组',
            component: Usergroup,
            require_roles: ['user_admin']
        },
        {
            path: 'website',
            name: '网站',
            component: Website,
            require_roles: ['website_admin']
        }
    ]
};

export default routerMap;