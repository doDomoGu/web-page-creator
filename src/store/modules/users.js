import * as types from './../types.js';

const state = {
    count: 10,
    usersData:[
        { id: 1, name: '张三', password: '123123', sex: 2, status: 1 },
        { id: 2, name: '夏侯惇', password: '123123a', sex: 1, status: 0 },
        { id: 3, name: '张晓松', password: '123123b', sex: 0, status: 1 },
        { id: 4, name: '赵菲菲', password: '123123c', sex: 1, status: 0 }
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
    [types.UPDATE]( state, res) {
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
