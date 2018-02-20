var express = require('express'),
		router 	= express.Router(),
		jwt     = require('express-jwt'),
		config  = require('../config'),
		Post 		= require('../models/post');

var jwtCheck = jwt({
  secret: config.secret
});

router.use('/posts', jwtCheck);

router.get('/posts', (req, res) => {
  Post.find({}, 'name message', function (error, posts) {
	  if (error) { console.error(error); }
	  res.send({
			posts: posts
		})
	}).sort({_id:-1})
})

router.post('/posts/add', (req, res) => {
	var name = req.body.newPost.name;
	var message = req.body.newPost.message;
	var new_post = new Post({
		name: name,
		message: message,
		timeStamp: new Date
	})

	new_post.save(function (error) {
		if (error) {
			console.log(error)
		}
		res.send({
			success: true
		})
	})
})

router.put('/posts/:id', (req, res) => {
	var db = req.db;
	Post.findById(req.params.id, 'name message', function (error, post) {
	  if (error) { console.error(error); }

	  post.name = req.body.name
	  post.message = req.body.message
	  post.save(function (error) {
			if (error) {
				console.log(error)
			}
			res.send({
				success: true
			})
		})
	})
})

router.delete('/posts/:id', (req, res) => {
	var db = req.db;
	Post.remove({
		_id: req.params.id
	}, function(err, post){
		if (err)
			res.send(err)
		res.send({
			success: true
		})
	})
})

router.get('/post/:id', (req, res) => {
	var db = req.db;
	Post.findById(req.params.id, 'name message', function (error, post) {
	  if (error) { console.error(error); }
	  res.send(post)
	})
})

module.exports = router;
