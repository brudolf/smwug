import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    userlist: [
      {
        id: 0,
        name: 'Rudi'
      },
      {
        id: 1,
        name: 'Dodi'
      }
    ],
    loggedUser: {}
  },
  mutations: {
    setLoggedUser (state, user) {
      state.loggedUser = user
    }
  }
})
