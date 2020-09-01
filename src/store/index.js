import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    get token() {
      return localStorage.getItem("token")
    },
    set token(val) {
      localStorage.setItem("token", val)
    },
    get user() {
      return JSON.parse(localStorage.getItem("user"))
    },
    set user(val) {
      localStorage.setItem("user", JSON.stringify(val))
    }
  },
  mutations: {
    login(state, {
      token,
      user
    }) {
      console.log("user", user)
      state.token = token
      state.user = user
    },
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {},
  modules: {}
})