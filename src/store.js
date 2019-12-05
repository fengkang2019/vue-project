import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


const store = new Vuex.Store({
    state: {
        userLogin: {},
        route: ""
    },
    actions: {

    },
    mutations: {
        //保存登录返回的数据
        savaUserLogin(state, userLogin) {
            state.userLogin = userLogin
            // Object.assign(state.userLogin,userLogin)
        },
        saveRoute(state, route) {
            state.route = route;
        }

    },
})
export default store;