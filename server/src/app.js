const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const bcrypt = require('bcryptjs')
const multer = require('multer')
const upload = multer({dest: './uploads'})
const expressValidator = require('express-validator')

const mongodb_conn_module = require('./mongodbConnModule');
var db = mongodb_conn_module.connect();

const app = express()
const server = app.listen(process.env.PORT || 8081)
// var server = require('http').createServer(app);
// var server = app.listen()
var io = require('socket.io').listen(server);

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
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}))

var onlineUsers = []

io.on('connection', (socket) => {

  io.emit('userlist', onlineUsers)
  socket.on('addUser', (username) => {
    console.log('%s has joined the chat!', JSON.stringify(username.firstname))

    var newUser = {
      socketId: socket.id,
      username: username,
      timeStamp: new Date
    }
    onlineUsers.push(newUser)
    io.emit('connectuser', newUser)
  })
  socket.on('disconnect', () => {
      var username = onlineUsers[socket.id];
      // leftUser = onlineUsers.filter(obj => obj.socketId === socket.id )
      // console.log('%s has disconnected from the chat.', JSON.stringify(username));

      // Recalculate Online Users
      onlineUsers = onlineUsers.filter(obj => obj.socketId !== socket.id )

      io.emit('userleft', {
        socketId: socket.id,
        timestamp: new Date
      });
  });

  socket.on('message', (data) => {
    console.log(data)
  })
  io.on('disconnect', (socket) => {
    console.log(socket + ' disconnected')
    // socket.emit('disconnected')
  })
});

app.use('/', posts);
app.use('/users/', users);
