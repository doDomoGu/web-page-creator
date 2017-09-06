const state = {
    users: {
        username: '',
        name: '',
        mobile:'',
        email:'',
        status:'',
        verify:''
    },
    default_users:{
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
    },
    ResetUsers({ commit }) {
        commit('reset_users');
    }
};

const getters = {
    users: state => state.users
};

const mutations = {
    update_users: (state, data) => {
        state.users = data;
    },
    reset_users: state => {
        state.users = state.default_users;
    }
};

export default {
    namespaced:true,
    state,
    actions,
    getters,
    mutations
}
