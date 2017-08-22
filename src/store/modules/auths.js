import * as types from './../types.js';
import Cookies from 'js-cookie'

import axios from '../../axios'

const state = {
    is_login: false,
    user_id: 0,
    token: '',
    roles: [],
    add_routes: []
};

const actions = {
    Logout({ commit }){
        commit('cleanLoginState');
    },
    Login({ commit }, formData) {
        const username = formData.username.trim();
        const password = formData.password.trim();
        return new Promise((resolve, reject) => {
            axios.post(
                '/auths',
                {
                    username: username,
                    password: password
                }
            )
            .then((res) => {
                commit('setToken',{token:res.data.token});
                commit('setLoginState');
                commit('setUserId',{user_id:res.data.user_id});
                commit('setRoles',{roles:res.data.roles});

                /*Cookies.set('name', 'value', { expires: 7, path: '' });//7天过期
                Cookies.set('name', { foo: 'bar' });//设置一个json
                b、读取cookie
                Cookies.get('name');//获取cookie
                Cookies.get(); #读取所有的cookie
                c、删除cookie
                Cookies.remove('name'); #删除cookie时必须是同一个路径。*/
                resolve(res);
            })
            .catch(error => {
                reject(error);
            });
        });


            /*loginByEmail(email, userInfo.password).then(response => {
                const data = response.data;
                Cookies.set('Token', response.data.token); //登录成功后将token存储在cookie之中


                //commit('SET_TOKEN', data.token);
                //commit('SET_EMAIL', email);


                resolve();
            }).catch(error => {
                reject(error);
            });*/
    },
    GenerateRoutes({commit}, data){
        var routes = [];
        //通用角色路由
        var routeAll = data.router.options.roleAllRouterMap;
        for(var i in routeAll){
            routes.push(routeAll[i]);
        }

        //指定角色路由
        var roles = data.roles;
        var routeOne = data.router.options.roleOneRouterMap;
        for(var i in routeOne){
            for(var j in roles){
                if(routeOne[i].roles.indexOf(roles[j]) !== -1){
                    routes.push(routeOne[i]);
  //                  console.log(routeOne[i]);
                }
            }
        }
//console.log(data.router.options.router404)
        //兜底 404页面
        routes.push(
            data.router.options.router404
        );


        commit('setAddRoutes',routes);


    },
    GetAuthInfo({commit},token){
        return new Promise((resolve, reject) => {
            axios.get(
                '/auths',
                {
                    params: {
                        token: token
                    }
                }
            )
                .then((res) => {
                    commit('setToken',{token:res.data.token});
                    commit('setLoginState');
                    commit('setUserId',{user_id:res.data.user_id});
                    commit('setRoles',{roles:res.data.roles});
                    resolve(res);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

};

const getters = {
    auth_token: state => state.token,
    auth_roles: state => state.roles,
    auth_user_id: state => state.user_id,
    auth_add_routes: state => state.add_routes

    /*users_list: state => {
        if(state.usersData == ''){
            return localStorage.getItem('usersData');
        }else{
            return state.usersData;
        }
    },
    getCount : state => state.count*/
};

const mutations = {
    setToken: (state, data, notUpdateToken) => {
        state.token = data.token;
        if(!notUpdateToken) {
            Cookies.set('wpc_auth_token', data.token, {expires: 1, path: ''});
        }
    },
    setLoginState: (state) => {
        state.is_login = true;
    },
    setUserId: (state, data) => {
        state.user_id = data.user_id;
    },
    setRoles: (state, data) => {
        state.roles = data.roles;
    },
    setAddRoutes: (state, data) => {
        state.add_routes = data;
    },
    cleanLoginState: (state) => {
        state.is_login = false;
        state.user_id = 0;
        state.token = '';
        state.roles = [];
        Cookies.remove('wpc_auth_token');
    },

    GetAuthInfo222(state,token){
        return new Promise((resolve, reject) => {
            axios.get(
                '/auths',
                {
                    params: {
                        token: token
                    }
                }
            )
                .then((res) => {
                    commit('setToken',{token:res.data.token});
                    commit('setLoginState');
                    commit('setUserId',{user_id:res.data.user_id});
                    commit('setRoles',{roles:res.data.roles});


                    resolve(res);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

};

export default {
    state,
    actions,
    getters,
    mutations
}
