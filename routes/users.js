var express = require('express');
var User=require('../models/user.js');
var Post=require('../models/post.js');
var router = express.Router();

/* GET users listing. */
/*var users={
	'myname':{
		name:'Runner',
		email:'run_my_life@163.com'
	}
};
router.all('/:username',function(req,res,next){
	if(users[req.params.username]){
		next();
	}
	else{
		next(new Error(req.params.username+' dose not exist.'));
	}
});
*/
router.get('/:user', function(req, res) {
	console.log(':user-->'+decodeURI(req.params.user));
	User.get(req.params.user,function(err,user){
		if(!user){
			req.flash('error','用户不存在');
			return res.redirect('/ ');
		}
		Post.get(user.name,function(err,posts){
			if(err){
				req.flash('error',err);
				return res.redirect('/ ');
			}
			console.log('user-->'+user.name);
			console.log('posts-->'+posts.length);
			res.render('user',{
				title:user.name,
				posts:posts
			});
		});
	});
});
/*
router.put('/:username',function(req,res){
	res.send('Done');
});
*/
module.exports = router;
