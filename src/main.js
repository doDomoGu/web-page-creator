import Vue from 'vue'
import App from './App'

import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'


Vue.use(ElementUI);

Vue.config.productionTip = false;

/*var tokenInLocalStorge = localStorage.__WPC_AUTH_TOKEN__;

if (typeof(tokenInLocalStorge)=='string' && tokenInLocalStorge !='') {

    console.warn(' checkToken start ');
    store.dispatch('auths/CheckToken',tokenInLocalStorge).then(() => {
        console.warn('checkToken finish');
        router.push('/');
    });
}*/

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
