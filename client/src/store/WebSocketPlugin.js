export default function WebSocketPlugin (socket) {
  let isConnected = false
  return store => {
    socket.on('userlist', data => {
      store.commit('setUserList', data)
    })
    socket.on('connectuser', (user) => {
      store.commit('newUserConnect', user)
    })
    store.subscribe(mutation => {
      // console.log(mutation)
      if (mutation.type === 'setisAuthenticated' && mutation.payload === true && !isConnected) {
        store.commit('setSocket', socket)
        socket.connect()
        // Load User to store
        store.commit('userConnected')
        store.commit('setLoggedUser', JSON.parse(localStorage.getItem('user')))
        socket.emit('addUser', store.getters.getLoggedUser)
        isConnected = true
        // Load Messages to store
        store.getters.socket.emit('getAllMessage')
        store.getters.socket.on('allMessage', (messages) => {
          store.commit('setMessages', messages)
        })
        // Load Posts to store
        store.getters.socket.emit('getAllPosts')
        store.getters.socket.on('allPosts', (posts) => {
          store.commit('setPosts', posts)
        })
        store.getters.socket.on('addPost', (post) => {
          store.commit('addPost', post)
        })
        store.getters.socket.on('deletePost', (post) => {
          store.commit('deletePost', post)
        })
      }
      if (mutation.type === 'setisAuthenticated' && mutation.payload === false) {
        store.commit('userDisconnected')
        socket.disconnect()
        isConnected = false
      }
    })
  }
}
