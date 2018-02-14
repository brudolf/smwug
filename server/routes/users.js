var express = require('express'),
    router = express.Router(),
    multer = require('multer'),
    upload = multer({dest: './uploads'}),
    config  = require('../config'),
    jwt    = require('jsonwebtoken'),
    User   = require("../models/user");

function createToken(user) {
  return jwt.sign(user.toObject(), config.secret, { expiresIn: 10 });// 60*60 });
}

router.get('/', (req, res) => {
  User.find({},{}, function(err, users) {
    res.send(users);
  });
})


router.post('/login', function(req, res, next) {
  var email     = req.body.creds.email,
      password  = req.body.creds.password;

  User.getUserByEmail(email, function(err, user) {
    if(user) {
      User.comparePassword(password, user.password, function(err, isMatch) {
        if(err) throw err;
        if (isMatch) {
          res.status(200).send({
            id_token: createToken(user),
            'success': true,
            username: {
              firstname: user.firstname,
              lastname: user.lastname
            }
          })
        } else {
          res.status(200).send({
            'success': false,
            'error': 'Az email cím vagy a jelszó nem egyezik.'
           })
        }
      });
    } else {
      res.status(200).send({
        'success': false,
        'error': 'Ilyen felhasználó nem létezik.'
       })
    }
  });

});

router.post('/create' ,function(req, res, next) {

  var email     = req.body.creds.email,
      password  = req.body.creds.password,
      firstname = req.body.creds.firstname,
      lastname  = req.body.creds.lastname;


  User.getUserByEmail(email, function(err, user) {
    if(err) throw err;
    if(!user) {
      var newUser = new User({
          email: email,
          password: password,
          firstname: firstname,
          lastname: lastname
      });

      User.createUser(newUser, function(err, user){
        if(err) throw err;
        console.log(user);
        res.status(201).send({
          id_token: createToken(newUser),
          'success': true,
          username: {
            firstname: user.firstname,
            lastname: user.lastname
          }
        });
      });
    } else {
      res.status(200).send({
        'error': 'Ezzel az email-el már létezik regisztráció',
        'success': false
      });
    }
  });








  ///res.status(200).send("success");

/*
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

  if(req.file){
  	console.log('Uploading File...');
  	var profileimage = req.file.filename;
  } else {
  	console.log('No File Uploaded...');
  	var profileimage = 'noimage.jpg';
  }

  // Form Validator
  req.checkBody('name','Name field is required').notEmpty();
  req.checkBody('email','Email field is required').notEmpty();
  req.checkBody('email','Email is not valid').isEmail();
  req.checkBody('username','Username field is required').notEmpty();
  req.checkBody('password','Password field is required').notEmpty();
  req.checkBody('password2','Passwords do not match').equals(req.body.password);

  // Check Errors
  var errors = req.validationErrors();

  if(errors){
  	res.render('register', {
  		errors: errors
  	});
  } else{
  	var newUser = new User({
      name: name,
      email: email,
      username: username,
      password: password,
      profileimage: profileimage
    });

    User.createUser(newUser, function(err, user){
      if(err) throw err;
      console.log(user);
    });

    req.flash('success', 'You are now registered and can login');

    res.location('/');
    res.redirect('/');
  }
  */
});

router.get('/logout', function(req, res){
  req.logout();
  req.flash('success', 'You are now logged out');
  res.redirect('/users/login');
});



module.exports = router;
