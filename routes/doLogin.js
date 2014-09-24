var express = require('express');
var crypto=require('crypto');
var User=require('../models/user.js');
var flash=require('connect-flash');
var router = express.Router();

/* GET home page. */
//如果用户已经登录，则不能进行登录提交
router.post('/',function(req,res,next){
	if(req.session.user){
		req.flash('error','已登录');
		return res.redirect('/ ');
	}
	next();
});
router.post('/', function(req, res) {
 	var md5=crypto.createHash('md5');
 	var password=md5.update(req.body.password).digest('base64');	//对密码进行加密
 	//检查用户名是否已经存在
 	User.get(req.body.username,function(err,user){						//使用User的方法，取得用户名
 		if(!user){
 			req.flash('error','用户不存在');
 			return res.redirect('/login');
 		}
 		if(user.password!=password){
 			req.flash('error','用户密码错误');
 			return res.redirect('/login');
 		}
 		req.session.user=user;
 		req.flash('success','登录成功');
 		res.redirect('/ ');
 	});
});

module.exports = router;