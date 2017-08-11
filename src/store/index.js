import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 创建一个对象来保存应用启动时的初始状态
// 需要维护的状态
const store = new Vuex.Store({
  state: {
    count: 10,
    userData:[]
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})


export default store
