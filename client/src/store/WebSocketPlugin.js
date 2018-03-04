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
      if (mutation.type === 'setisAuthenticated' && mutation.payload === true && !isConnected) {
        socket.connect()
        store.commit('setSocket', socket)
        // Load User to store
        store.commit('userConnected')
        store.commit('setLoggedUser', JSON.parse(localStorage.getItem('user')))
        socket.emit('addUser', store.getters.getLoggedUser)

        // Load Messages to store
        store.getters.socket.emit('getAllMessage')
        store.getters.socket.on('allMessage', (messages) => {
          store.commit('setMessages', messages)
        })

        store.getters.socket.on('addMessage', (message) => {
          console.log('new message listener: ', message)
          store.commit('addMessage', message)
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
        isConnected = true
      }
      if (mutation.type === 'setisAuthenticated' && mutation.payload === false && isConnected) {
        store.commit('userDisconnected')
        socket.disconnect()
        socket.off('allMessage')
        socket.off('allPosts')
        socket.off('addPost')
        socket.off('deletePost')
        socket.off('addMessage')
        // store.getters.socket.destroy()
        // store.getters.socket.disconnect()
        console.log('disconnected')
        isConnected = false
      }
    })
  }
}
