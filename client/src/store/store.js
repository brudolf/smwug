import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    userlist: [],
    loggedUser: {},
    connect: false,
    socket: {}
  },
  getters: {
    getUserList (state) {
      return state.userlist
    },
    isUserConnected (state) {
      return state.connect
    },
    socket (state) {
      return state.socket
    }
  },
  mutations: {
    setLoggedUser (state, user) {
      state.loggedUser = user
    },
    userConnected (state) {
      state.connect = true
    },
    userDisconnected (state) {
      state.connect = false
    },
    newUserConnect (state, user) {
      state.userlist.push(user)
    },
    setUserList (state, userlist) {
      state.userlist = userlist
    },
    setSocket (state, socketObject) {
      state.socket = socketObject
    }
  },
  actions: {
    otherAction (context, type) {
      return true
    },
    socket_listUpdateAction (context, list) {
      context.commit('SOCKET_LISTUPDATE', list)
    }
  }
})
