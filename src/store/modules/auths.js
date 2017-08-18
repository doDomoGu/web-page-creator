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
    LOGIN({ commit }, formData) {
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
        var routeAll = data.router.options.roleAllRouterMap;
        for(var i in routeAll){
            routes.push(routeAll[i]);
        }

        var roles = data.roles;
        var routeOne = data.router.options.roleOneRouterMap;
        for(var i in routeOne){
            for(var j in roles){
                if(routeOne[i].roles.indexOf(roles[j]) !== -1){
                    routes.push(routeOne[i]);
                }
            }
        }
        commit('setAddRoutes',routes);


    },
    GetAuthInfo({commit}){
        console.log(this.is_login);
    }

/*

    [types.ADD]({ commit }, res) {
        commit(types.ADD, res);
    },
    [types.UPDATE]({ commit }, res) {
        commit(types.UPDATE, res);
    },
    [types.DELETE]({ commit }, res) {
        commit(types.DELETE, res);
    },
*/


    /*,
    increment2 (context,obj) {
        context.commit('increment',obj)
    }*/
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
    setToken: (state, data) => {
        state.token = data.token;
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
    /*cleanLoginState: (state) => {
        state.is_login = false;
        state.user_id = 0;
        state.token = '';
        state.roles = [];
    },*/

};

export default {
    state,
    actions,
    getters,
    mutations
}
