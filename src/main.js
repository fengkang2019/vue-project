// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router'
import store from "./store";

import moment from 'moment'
Vue.prototype.$moment = moment
import "@/styles/font/iconfont.css"
import "./styles/index.css"
import "@/utils/elementUi.js"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload);
import axios from "@/utils/axios";
import VueAxios from 'vue-axios'
// Vue.use(VueAxios, axios)
Vue.prototype.$axios = axios;

console.log("vue 项目启动的 main.js dpr ==" + window.devicePixelRatio)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  components: { App },
  template: '<App/>'
}).$mount("#app")
