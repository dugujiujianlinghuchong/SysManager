import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import VueRouter from 'vue-router'

import Vuex from 'vuex'
import echarts from 'echarts'
import HomePage from './components/homePage.vue'
// 兼容ie
import promise from 'es6-promise'
promise.polyfill();

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

// Axios模块 
import Axios from 'axios'
Vue.prototype.$http = Axios
Vue.prototype.$get = function (queryAddress, params, func) {
  Axios({
    method: 'get',
    url: queryAddress,
    data: params
  })
    .then((res) => {
      func(res.data);
    })
}




Vue.prototype.$echarts = echarts

//设置路由
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [{
    path: '/HomePage',
    name: 'HomePage',
    component: HomePage
  },]
})

// 配置Vuex
const store = new Vuex.Store({
  state: {
    screenWidth: '',
    yhbh: ''
  },
  mutations: {
    getSystemInfo(state, systemInfo) {
      state.screenWidth = systemInfo.screenWidth;
      state.yhbh = systemInfo.yhbh;
    }
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})