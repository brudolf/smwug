const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const bcrypt = require('bcryptjs')
const multer = require('multer')
const upload = multer({dest: './uploads'})
const expressValidator = require('express-validator')

const mongodb_conn_module = require('./mongodbConnModule')
var db = mongodb_conn_module.connect()

const app = express()
const server = app.listen(process.env.PORT || 8081)
var io = require('socket.io').listen(server)

const posts = require('../routes/posts')
const users = require('../routes/users')


app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors({credentials: true, origin: 'http://localhost:8080'}))

// Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']'
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    }
  }
}))

var onlineUsers = []

io.on('connection', (socket) => {

  console.log(socket.id, ' connected')
  // io.emit('connected', 'siker')

  // Get All the Users
  io.emit('userlist', onlineUsers)
  // New User Connecting..
  socket.on('addUser', (username) => {
    // io.emit('userlist', onlineUsers)
    console.log('%s has joined the chat!', JSON.stringify(username.firstname))
    var newUser = {
      socketId: socket.id,
      username: username,
      timeStamp: new Date
    }
    // Add User to OnlineUsers list
    onlineUsers.push(newUser)
    // Send New User to Client
    io.emit('connectuser', newUser)
  })

  socket.on('message', (data) => {
    console.log(data)
  })

  socket.on('disconnect', () => {
    console.log(socket.id, ' disconnected')

    // Recalculate Online Users
    onlineUsers = onlineUsers.filter(obj => obj.socketId !== socket.id )
    io.emit('userleft', {
      socketId: socket.id,
      timestamp: new Date
    })
    io.emit('userlist', onlineUsers)
  })
})

app.use('/', posts)
app.use('/users/', users)
