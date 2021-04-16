import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sid: '',
    isLogin: false,
    token: '',
    userInfo: {}
  },
  mutations: {
    // 设置验证码id
    setSid (state, value) {
      state.sid = value
    },
    setToken (state, value) {
      state.token = value
      localStorage.setItem('token', value)
    },
    // 设置用户的基本信息
    setUserInfo (state, value) {
      if (typeof value !== 'object' || value === null) return
      state.userInfo = value
      // 本地存储用户的基本信
      localStorage.setItem('userInfo', JSON.stringify(value))
    },
    // 设置登录状态
    setIsLogin (state, value) {
      state.isLogin = value
    }
  },
  actions: {},
  modules: {}
})
