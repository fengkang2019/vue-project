import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


const store = new Vuex.Store({
    state: {
        userLogin: {},
        route: "",
        // loginHandle:"",
        // dbweb:""
    },
    actions: {

    },
    mutations: {
        //保存登录返回的数据
        saveUserLogin(state, userLogin) {
            state.userLogin = userLogin
            // Object.assign(state.userLogin,userLogin)
        },
        saveRoute(state, route) {
            state.route = route;
        },
        // saveLoginHandle(state,loginHandle){
        //     state.loginHandle =loginHandle;
        // },
        // saveSDK(state,fn){
        //     state.dbweb =fn;
        //     console.log(state.dbweb)
        // }

    },
})
export default store;