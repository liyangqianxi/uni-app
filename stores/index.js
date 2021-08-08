import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
let num =uni.getStorageSync('Cart').length
const store = new Vuex.Store({
	state: {
		//购物车角标
		badge: num
	},
	mutations: {
		// 修改角标
		setBadge(state, data) {
			state.badge = data;
		}
	},
	actions: {}
})
export default store
