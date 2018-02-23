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

var Message = require('../models/messages');
var Post 		= require('../models/post');

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
  // --------------------------------------User Connect--------------------------------------
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
  // ------------------------------------------------------------------------------------------

  // --------------------------Handling Chat Messages------------------------------------------
  socket.on('getAllMessage', () => {
    Message.find({}, '_id name message timeStamp', (error, messages) => {
  	  if (error) { console.error(error); }
        io.emit('allMessage', messages)
  	}).sort({_id:-1})
  })

  socket.on('message', (data) => {
    var message = {
  		name: data.username,
  		message: data.message,
  		timeStamp: new Date()
  	}
    var new_message = new Message(message)
    new_message.save((error) => {
      if (error) {
        console.log(error)
      }
      console.log(message)
      io.emit('addMessage', new_message)
    })
  })
  // ------------------------------------------------------------------------------------------

  // --------------------------------------Handling Posts--------------------------------------

  socket.on('getAllPosts', () => {
    Post.find({}, '_id name message timeStamp',(error, messages) => {
      if (error) { console.error(error); }
        io.emit('allPosts', messages)
    }).sort({timeStamp:-1})
  })
  // Add Post
  socket.on('post', (data) => {
    var post = {
  		name: data.name,
  		message: data.message,
  		timeStamp: new Date()
  	}
    var new_post = new Post(post)
    new_post.save((error) => {
      if (error) {
        console.log(error)
      }
      console.log(new_post)
      io.emit('addPost', new_post)
    })
  })
  // Delete Post

  socket.on('delPost', (id) => {
    Post.find({ _id: id },'_id name message timeStamp',(err, post) => {
      Post.remove({ _id: id },(err, success) => {
        io.emit('deletePost', post[0])
      })
    })
  })

  // --------------------------------------User Disconnect-------------------------------------
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
  // --------------------------------------------------------------------------------------------
})

app.use('/', posts)
app.use('/users/', users)
