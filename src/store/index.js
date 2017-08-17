import Vue from 'vue'
import Vuex from 'vuex'

import users from './modules/users';
import websites from './modules/websites';
import auths from './modules/auths';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        users,
        auths,
        //websites
    }
});



