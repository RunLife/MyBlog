var express = require('express');
var crypto=require('crypto');
var User=require('../models/user.js');
var flash=require('connect-flash');
var router = express.Router();

new express().use(flash());
/* GET home page. */
//如果用户已经登录，则不能进行注册提交
router.post('/',function(req,res,next){
	if(req.session.user){
		req.flash('error','已登录');
		return res.redirect('/ ');
	}
	next();
});
router.post('/', function(req, res) {
 	if(req.body['password-repeat']!=req.body['password']){			//判断两次输入的密码是否一致
 		req.flash('error','两次输入的密码不一致');
 		return res.redirect('/reg');								//如果注册密码不一致，则跳转到注册页面
 	}
 	var md5=crypto.createHash('md5');
 	var password=md5.update(req.body.password).digest('base64');	//对密码进行加密
 	var newUser=new User({											//new一个信息User对象
 		name:req.body.username,										//将用户名赋给User实例
 		password:password,											//将加密后的密码赋给User实例
 	});
 	//视图交互
 	/*res.render('regist',{
 		user : req.session.user,
		success : req.flash('success').toString(),
		error : req.flash('error').toString()
 	});
	*/
 	//检查用户名是否已经存在
 	User.get(newUser.name,function(err,user){						//使用User的方法，取得用户名
 		if(user)
 			err='用户名已经存在';
 		if(err){
 			req.flash('error',err);
 			return res.redirect('/reg');
 		}
 		newUser.save(function(err){
 			if(err){
 				req.flash('error',err);
 				return res.redirect('/reg');
 			}
 			req.session.user=newUser;
 			req.flash('success','注册成功');
 			res.redirect('/ ');
 		});
 	});

});

module.exports = router;