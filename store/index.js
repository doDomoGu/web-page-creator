import Vue from 'vue'
import Vuex from 'vuex'

// 告诉 vue “使用” vuex
Vue.use(Vuex)

// 创建一个对象来保存应用启动时的初始状态
// 需要维护的状态
const store = new Vuex.Store({
  state: {
    count: 0,
    userData:[{
      password: '2016-05-02',
      name: '王小虎',
      sex: '上海市普陀区金沙江路 1518 弄'
    }, {
      password: '2016-05-04',
      name: '王小虎',
      sex: '上海市普陀区金沙江路 1517 弄'
    }, {
      password: '2016-05-01',
      name: '王小虎',
      sex: '上海市普陀区金沙江路 1519 弄'
    }, {
      password: '2016-05-03',
      name: '王小虎',
      sex: '上海市普陀区金沙江路 1516 弄'
    }] //管理后台左侧导航
  }/*,
  mutations: {
    increment (state) {
      state.count++
    }
  }*/
})
// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以连接到我们的应用中
export default store
