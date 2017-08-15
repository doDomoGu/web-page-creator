import * as types from './../types.js';

const state = {
    count: 10,
    usersData:[
        { id: 1, name: '.11.', password: '123123', sex: 2, status: true },
        { id: 2, name: '.22.', password: '123123a', sex: 1, status: false },
        { id: 3, name: '.33.', password: '123123b', sex: 0, status: true },
        { id: 4, name: '.44.', password: '123123c', sex: 1, status: false }
    ]
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
    users_list: state => {
        if(state.usersData == ''){
            return localStorage.getItem('usersData');
        }else{
            return state.usersData;
        }
    },
    getCount : state => state.count
};

const mutations = {
    [types.ADD](state, res) {
        state.usersData.push(res);
    },
    [types.DELETE](state, res) {
        
        state.usersData.push(res);
    },
    [types.ADD]( state, res) {
        state.usersData.push(res);
    }/*,
    increment (state, obj) {
        state.count+= obj.count
    }*/
};

export default {
    state,
    actions,
    getters,
    mutations
}
