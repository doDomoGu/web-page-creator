const state = {
    user_list: {}
}
const actions = {
    UserListSearch({ commit }, formData) {
        commit('setUserList',formData);
    }
};

const getters = {
    user_list: state => state.user_list
};

const mutations = {
    setUserList: (state, data) => {
        state.user_list = data;
    }/*,

    setToken333: (state, data) => {
        state.token = data.token;
        if(data.updateToken) {
            localStorage.__WPC_AUTH_TOKEN__ = data.token;
            //Cookies.set('wpc_auth_token', data.token, {expires: 1, path: '/'}); //expires 单位为天
        }
    }*/

};

export default {
    state,
    actions,
    getters,
    mutations
}
