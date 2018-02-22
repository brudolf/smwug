import Vue from 'vue'
import Vuex from 'vuex'
import WebSocketPlugin from '@/store/WebSocketPlugin'
import io from 'socket.io-client'

Vue.use(Vuex)

const plugin = WebSocketPlugin(io('http://localhost:8081', { autoConnect: false }))

export const store = new Vuex.Store({
  state: {
    userlist: [],
    isAuthenticated: false,
    loggedUser: {},
    connect: false,
    socket: {},
    posts: []
  },
  plugins: [plugin],
  getters: {
    getUserList (state) {
      return state.userlist
    },
    getisAuthenticated (state) {
      return state.isAuthenticated
    },
    isUserConnected (state) {
      return state.connect
    },
    socket (state) {
      return state.socket
    },
    getPosts (state) {
      return state.posts
    },
    getLoggedUser (state) {
      return state.loggedUser
    }
  },
  mutations: {
    setisAuthenticated (state, val) {
      state.isAuthenticated = val
    },
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
      console.log(userlist)
      state.userlist = userlist
    },
    setSocket (state, socketObject) {
      state.socket = socketObject
    },
    setPosts (state, posts) {
      state.posts = posts
    },
    addPost (state, post) {
      state.posts.push(post)
    },
    deletePost (state, id) {
      console.log(state.posts)
      state.posts = state.posts.filter(obj => obj._id !== id)
      console.log(id)
      console.log(state.posts)
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
