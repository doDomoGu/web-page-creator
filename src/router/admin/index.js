import User from '../../views/admin/user'
import Website from '../../views/admin/websites'

//roleRouteMap  根据roles属性值 区分哪个角色 可以使用
var roleRouterMap = [
    {
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
    }
];

export default roleRouterMap;