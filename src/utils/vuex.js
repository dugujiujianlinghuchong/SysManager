import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


export const store = new Vuex.Store({
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