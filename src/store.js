import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


const store = new Vuex.Store({
    state: {
        userLogin: {},
        route: "",
        loginHandle:"",
        deviceLists:[]
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
        saveLoginHandle(state,loginHandle){
            state.loginHandle =loginHandle;
        },
        saveDeviceLists(state,deviceLists){
            state.deviceLists =deviceLists
        }

    },
})
export default store;