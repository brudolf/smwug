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

var userlist = []

io.on('connection', (socket) => {

  // New user connected. Add User to userlist array
  socket.on('addUser', (userdata) => {
    userlist.push({
      userdata: userdata,
      socketId: socket.id
    })
  })
  // Send userlist array back
  socket.emit('refreshList', userlist)

  console.log(userlist)

  socket.on('message', (data) => {
    console.log(data)
  })

  socket.on('disconnect',(socket) => {
    console.log(socket)
    // socket.emit('disconnected')
  })
});

app.use('/', posts);
app.use('/users/', users);
