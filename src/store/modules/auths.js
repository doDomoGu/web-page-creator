//import * as types from './../types.js';
//import Cookies from 'js-cookie'

import axios from '../../axios'
import Router from 'vue-router'


const state = {
    is_login: false,
    user_id: 0,
    token: '',
    roles: [],
    add_routes: []
};

const actions = {
    Logout({ commit }){
        return new Promise((resolve, reject) => {
            axios.post(
                '/auths/delete',
                {
                    token: state.token
                }
            )
                .then((res) => {
                    if(res.data && res.data.success) {
                        commit('cleanLoginState');
                    }
                    resolve(res);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    Login({ dispatch,commit }, formData) {
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
                if(res.data && res.data.success){
                    res.data.tokenForceUpdate = true;

                    dispatch('SetStore',res.data);
                    /*commit('setToken',{token:res.data.token,updateToken:true});
                    commit('setLoginState');
                    commit('setUserId',{user_id:res.data.user_id});
                    commit('setRoles',{roles:res.data.roles});*/
                }




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

        var roles = data.roles;

        var routerMap = data.router.options.roleRouterMap;

        for(var i in routerMap){
            if(routerMap[i].roles == '*'){
                routes.push(routerMap[i]);
            }else if(roles) {
                for(var j in roles){
                    if(roles[j] == 'super_admin' || routerMap[i].roles.indexOf(roles[j]) !== -1){
                        routes.push(routerMap[i]);
                    }
                }

            }
        }


        /*//通用角色路由
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
        }*/
//console.log(data.router.options.router404)
        //404页面
        routes.push(
            data.router.options.router404
        );
        console.log('');
        console.log('auths generate route');
console.log(routes);

        commit('setAddRoutes',routes);
    },
    CheckToken({dispatch,commit},token){
        console.warn('   2.1 checkToken');
        dispatch('SetStore',{is_login:true,token:token});

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
                if (res.data && res.data.success) {
                    console.warn('   2.1.1 checkToken success');

                    dispatch('SetStore',res.data);

                    /*dispatch('auths/GenerateRoutes', {roles: res.data.roles, router: router}).then(() => { // 生成可访问的路由表
                        console.log(this.getters['auths/add_routes']);

                        //router.addRoutes() // 动态添加可访问路由表
                    });*/
                    //next();
                    //next(to.path);

                } else {
                    console.warn('   2.1.2 checkToken failure');

                    //提交的token 错误
                    dispatch('CleanStore');

                    //next('/login');
                }
                resolve(res);
            })
            .catch(error => {
                reject(error);
            });
        });
    },
    SetStore({commit},data){
        console.warn("  ** setStore **");
        commit('setToken',{token:data.token,forceUpdate:data.tokenForceUpdate});
        commit('setLoginState');
        commit('setUserId',{user_id:data.user_id});
        commit('setRoles',{roles:data.roles});
    },
    CleanStore({commit}){
        console.warn("  ** cleanStore **");
        commit('cleanLoginState');
    }

    ,SetIsLogin({commit},isLogin){
        commit('setIsLogin',isLogin);
    }

};

const getters = {
    token: state => state.token,
    roles: state => state.roles,
    user_id: state => state.user_id,
    add_routes: state => state.add_routes,
    is_login: state => state.is_login
};

const mutations = {
    setToken: (state, data) => {
        state.token = data.token;
        if(data.forceUpdate) {
            localStorage.__WPC_AUTH_TOKEN__ = data.token;
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
        localStorage.removeItem('__WPC_AUTH_TOKEN__');
    },
    setIsLogin: (state,isLogin) => {
        state.is_login = isLogin;
    },
};

export default {
    namespaced:true,
    state,
    actions,
    getters,
    mutations
}
