// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import "./styles/index.css"

import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload);

import axios from "axios";
import VueAxios from 'vue-axios'
// Vue.use(VueAxios, axios)
Vue.prototype.$axios = axios;

console.log("vue 项目启动的 main.js dpr ==" + window.devicePixelRatio)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
