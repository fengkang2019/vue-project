// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router'
import store from "./store";
import $ from "jquery"
//时间处理
import moment from 'moment'
Vue.prototype.$moment = moment

//iconfont
import "@/styles/font/iconfont.css"

//全局css样式
import "./styles/index.css"

//elementUi
import "@/utils/elementUi.js"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//引入所有过滤器
import * as filters from "@/utils/filters"
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})


//echarts 表格
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

//路由懒加载
import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload);

// ajax异步请求
import axios from "@/utils/axios";
import VueAxios from 'vue-axios'
Vue.prototype.$axios = axios;

//全局配置图片查看器插件
import ImageViewer from "vue2-viewer";
Vue.use(ImageViewer)


let dhweb = new DHAlarmWeb();
Vue.prototype.$dhweb = dhweb;

console.log("vue 项目启动的 main.js dpr ==" + window.devicePixelRatio)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
