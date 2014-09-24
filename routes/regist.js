var express = require('express');
var flash=require('connect-flash');
var router = express.Router();

/* GET home page. */
//如果用户已经登录，则不能再注册
router.get('/', function(req,res,next) {
	if(req.session.user){
		req.flash('error','已登录');
		return res.redirect('/ ');
	}
	next();
});
router.get('/', function(req, res) {
	res.render('regist',{
		title:'用户注册'
	});
});

module.exports = router;