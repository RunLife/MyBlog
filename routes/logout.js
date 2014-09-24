var express = require('express');
var crypto=require('crypto');
var User=require('../models/user.js');
var flash=require('connect-flash');
var router = express.Router();

/* GET home page. */
//如果用户未登录，则不能进行登出的功能
router.get('/', function(req, res,next) {
	if(!req.session.user){
		req.flash('error','未登录');
		return res.redirect('/login');
	}
	next();
});
router.get('/', function(req, res) {
  req.session.user=null;
  req.flash('success','退出成功');
  res.redirect('/ ');
});

module.exports = router;