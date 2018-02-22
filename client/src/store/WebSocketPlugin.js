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
        store.commit('userConnected')
        store.commit('setLoggedUser', JSON.parse(localStorage.getItem('user')))
        socket.emit('addUser', store.getters.getLoggedUser)

        // store.commit('userConnected')
        isConnected = true
      }
      if (mutation.type === 'setisAuthenticated' && mutation.payload === false) {
        store.commit('userDisconnected')
        socket.disconnect()
        isConnected = false
      }
    })
  }
}
