//import * as types from './../types.js';
//import Cookies from 'js-cookie'

import axios from '../../axios'
import Router from 'vue-router'


const state = {
    is_login: false,
    user_id: 0,
    token: '',
    roles: [],
    //add_routes: []
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
                }
                resolve(res);
            })
            .catch(error => {
                reject(error);
            });
        });
    },
    CheckToken({dispatch,commit},token){
        //console.warn('   2.1 checkToken');
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
                    //console.warn('   2.1.1 checkToken success');

                    dispatch('SetStore',res.data);

                } else {
                    //console.warn('   2.1.2 checkToken failure');

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
        //console.warn("  ** setStore **");
        commit('setToken',{token:data.token,forceUpdate:data.tokenForceUpdate});
        commit('setLoginState');
        commit('setUserId',{user_id:data.user_id});
        commit('setRoles',{roles:data.roles});
    },
    CleanStore({commit}){
        //console.warn("  ** cleanStore **");
        commit('cleanLoginState');
    }
};

const getters = {
    token: state => state.token,
    roles: state => state.roles,
    user_id: state => state.user_id,
    //add_routes: state => state.add_routes,
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
    /*setAddRoutes: (state, data) => {
        state.add_routes = data;
    },*/
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
