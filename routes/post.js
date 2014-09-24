var express = require('express');
var flash=require('connect-flash');
var Post=require('../models/post.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res,next) {
	if(!req.session.user){
		req.flash('error','未登录');
		return res.redirect('/login');
	}
	next();
});
router.post('/', function(req, res) {
 	var currentUser=req.session.user;
 	var post=new Post(currentUser.name,req.body.post);
 	post.save(function(err){
 		if(err){
 			req.flash('error',err);
 			return res.redirect('/ ');
 		}
 		req.flash('success','发表成功');
 		console.log('--1--'+currentUser.name);
 		res.redirect('/u/'+currentUser.name);
 	});
});

module.exports = router;