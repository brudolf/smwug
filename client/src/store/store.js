import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    userlist: [],
    loggedUser: {},
    connect: false,
    socket: {},
    posts: []
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
    },
    getPosts (state) {
      return state.posts
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
    },
    setPosts (state, posts) {
      state.posts = posts
    },
    addPost (state, post) {
      state.posts.push(post)
    },
    deletePost (state, id) {
      state.posts = state.posts.filter(obj => obj._id !== id)
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
