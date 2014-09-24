var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//路由控制器
var routes = require('./routes/index');
var users = require('./routes/users');
var hello=require('./routes/hello');
var post=require('./routes/post');
var regist=require('./routes/regist');
var doRegist=require('./routes/doRegist');
var login=require('./routes/login');
var doLogin=require('./routes/doLogin');
var logout=require('./routes/logout');

//访问数据库模块
var session=require('express-session');
var MongoStore=require('connect-mongo')(session);
var settings=require('./Settings');

var util=require('util');
var app = express();
var partials=require('express-partials');   //引入片段模块
var flash=require('connect-flash');         //引入flash模块

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(partials());                                //使用partials(片段视图)
app.use(flash());
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
        secret: settings.cookieSecrect,
        store: new MongoStore({
          db : settings.db,
        }),
        resave:true,
        saveUninitialized:true
      }));
//视图交互部分(无法使用部分)
app.use(function(req,res,next){
    var user=req.session.user;
    //console.log(user.name);
    var error=req.flash('error');
    var success=req.flash('success');
    /*
    if(error==null){
        console.log('-->error--!null');
    }
    console.log('user-->'+req.session.user);
    console.log('error-->'+error);
    console.log('success-->'+success);
    */
    res.locals.user=user;
    res.locals.error=error;
    res.locals.success=success;
    next();
});
/**
微博网站开发
*/
app.use('/', routes);                                   //定义主页
app.use('/u',users);                                    //定义用户页
app.use('/post',post);
app.use('/reg',regist);
app.use('/doreg',doRegist);
app.use('/login',login);
app.use('/dologin',doLogin);
//app.use('/hello',hello);
app.use('/logout',logout);
//片段视图代码
app.get('/list',function(req,res){
    res.render('list',{
        title:'List',
        items:[1991,'Runner','express','Node.js']
    });
});
app.get('/userlist',function(req,res){
    res.render('userlist',{
        title:'套用了管理员的模板',
        layout:'admin'
    });
});


/*
//视图助手的使用
app.locals({
    inspect:function(obj){
        console.log(util.inspect(obj,true));
        return util.inspect(obj,true);
    }
});
app.use(function(req,res,next){
    res.locals.headers=req.headers;
    next();
});
app.get('/helper',function(req,res){
    res.render('helper',{
        title:'视图助手'
    });
});
*/
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
