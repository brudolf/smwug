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

const posts = require('../routes/posts')
const users = require('../routes/users')


app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

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



app.use('/', posts);
app.use('/users/', users);

app.listen(process.env.PORT || 8081)
