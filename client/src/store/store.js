import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    userlist: [],
    loggedUser: {},
    connect: false,
    message: null
  },
  getters: {
    getUserList (state) {
      return JSON.parse(JSON.stringify(state.userlist))
    },
    isConnect (state) {
      return state.connect
    }
  },
  mutations: {
    setLoggedUser (state, user) {
      state.loggedUser = user
    },
    SOCKET_CONNECT (state, status) {
      state.connect = true
    },
    SOCKET_LISTUPDATE (state, list) {
      state.userlist = list
    },
    SOCKET_USER_MESSAGE (state, message) {
      state.message = message
    }
  },
  actions: {
    otherAction: (context, type) => {
      return true
    },
    socket_listUpdateAction: (context, list) => {
      // context.dispatch('newMessage', message)
      context.commit('SOCKET_LISTUPDATE', list)
    }
  }
})
