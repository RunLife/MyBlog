var express = require('express');
var flash=require('connect-flash');
var router = express.Router();

/* GET home page. */
//如果用户已经登录，则不能再登录
router.get('/', function(req, res,next) {
	if(req.session.user){
		req.flash('error','已登录');
		return res.redirect('/ ');
	}
	next();
});
router.get('/', function(req, res) {
  res.render('login',{
		title:'用户登录'
	});
});

module.exports = router;