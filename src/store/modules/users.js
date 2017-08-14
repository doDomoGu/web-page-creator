import * as types from './../types.js';

const state = {
    count: 10,
    usersData:[
        { id: 1, username: '.11.', password: '123123', sex: 2, status: true },
        { id: 2, username: '.22.', password: '123123a', sex: 1, status: false },
        { id: 3, username: '.33.', password: '123123b', sex: 0, status: true },
        { id: 4, username: '.44.', password: '123123c', sex: 1, status: false }
    ]
}

const actions = {
    // 保存ID  storeMovieID为上面的"action名"
    addUser({ commit }, res) {
        //此处是触发mutation的 STORE_MOVIE_ID为"mutation名"
        commit(types.ADD, res);
    }

}

const getters = {
    // 图片公共 src 的获取 getter函数：state=> state.数据名
    //getContextPathSrc: state => state.contextPathSrc,
    // 获取usersData
    users_list: state => {
        if(state.usersData == ''){
            return localStorage.getItem('usersData');
        }else{
            return state.usersData;
        }
    },
}

const mutations = {
    // 修改ID 中括号代表常量 我们可使用ES2015风格的计算属性命名功能来使用一个常量[types.STORE_MOVIE_ID]作为函数名
    [types.ADD]( state, res) {
        state.usersData.push(res);
        //state.usersData = res;
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}
