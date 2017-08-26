import * as types from './../types.js';

const state = {
    count: 0,
    list:[]
};

const actions = {
    [types.ADD]({ commit }, res) {
        commit(types.ADD, res);
    },
    [types.UPDATE]({ commit }, res) {
        commit(types.UPDATE, res);
    },
    [types.DELETE]({ commit }, res) {
        commit(types.DELETE, res);
    },


    /*,
    increment2 (context,obj) {
        context.commit('increment',obj)
    }*/
};

const getters = {
    /*users_list: state => {
        if(state.list == ''){
            return localStorage.getItem('user_list');
        }else{
            return state.list;
        }
    },*/
    list: state => state.list,
    getCount : state => state.count
};

const mutations = {
    [types.ADD](state, res) {
        state.list.push(res);
    },
    [types.DELETE](state, res) {

        state.list.push(res);
    },
    [types.UPDATE]( state, res) {
        state.list.push(res);
    }
};

export default {
    state,
    actions,
    getters,
    mutations
}
