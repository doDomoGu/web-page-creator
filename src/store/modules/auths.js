import * as types from './../types.js';
import Cookies from 'js-cookie'

import axios from '../../axios'

const state = {
    isLogin: false,
    token: '',

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
    /*SET_TOKEN: (state, token) => {
        state.token = token;
    },*/
};

export default {
    state,
    actions,
    getters,
    mutations
}
