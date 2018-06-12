import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import VueRouter from 'vue-router'
import requestAPI from './utils/http'
import App from './App.vue'
// 兼容ie
import promise from 'es6-promise'
promise.polyfill();
// 引入echart
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
// 引入vuex配置
import { store } from './utils/vuex'

Vue.use(ElementUI)
// Vue.use(VueRouter)

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})