const state = {
    users: {
        username: '',
        name: '',
        mobile:'',
        email:'',
        status:'',
        verify:''
    }
};
const actions = {
    UpdateUsers({ commit }, formData) {
        commit('update_users',formData);
    }
};

const getters = {
    users: state => state.users
};

const mutations = {
    update_users: (state, data) => {
        state.users = data;
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
    namespaced:true,
    state,
    actions,
    getters,
    mutations
}
