import Vue from 'vue'
import Axios from 'axios'


Vue.prototype.$http = Axios
// GET请求方法
Vue.prototype.$get = function (address, params, func) {
    Axios.get(address, { params: params })
        .then((res) => {
            func(res.data);
        })
}
// POST请求方法
Vue.prototype.$post = function (address, params, func) {
    Axios({
        method: 'post',
        url: address,
        data: params
    })
        .then((res) => {
            func(res.data);
        })
}