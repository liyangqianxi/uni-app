import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import api from "./http/api.js";
import utils from "./utils";
import stores from './stores'
Vue.use(uView);


Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$utils = utils
Vue.prototype.$stores = stores

App.mpType = 'app'

const app = new Vue({
    ...App,
	stores
})
app.$mount()
