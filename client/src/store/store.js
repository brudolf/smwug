import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    userlist: [],
    loggedUser: {},
    connect: false,
    userConnected: false,
    message: null
  },
  getters: {
    getUserList (state) {
      // return JSON.parse(JSON.stringify(state.userlist))
      return state.userlist
    },
    isConnect (state) {
      return state.connect
    },
    isUserConnected (state) {
      return state.userConnected
    }
  },
  mutations: {
    setLoggedUser (state, user) {
      state.loggedUser = user
    },
    SOCKET_CONNECT (state, status) {
      state.connect = true
      console.log('most csatlakozott')
    },
    SOCKET_DISCONNECT (state, status) {
      state.connect = false
    },
    SOCKET_CONNECTUSER (state, user) {
      state.userlist.push(user[0])
      state.userConnected = true
    },
    SOCKET_USERLEFT (state, user) {
      state.userlist = state.userlist.filter(obj => obj.socketId !== user[0].socketId)
    },
    SOCKET_USERLIST (state, list) {
      state.userlist = list[0]
    },
    SOCKET_USER_MESSAGE (state, message) {
      state.message = message
    }
  },
  actions: {
    otherAction (context, type) {
      return true
    },
    socket_listUpdateAction (context, list) {
      // context.dispatch('newMessage', message)
      context.commit('SOCKET_LISTUPDATE', list)
    }
  }
})
