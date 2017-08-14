import Vue from 'vue'
import Vuex from 'vuex'

import users from './modules/users';
import websites from './modules/websites';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        users,
        //websites
    }
});



