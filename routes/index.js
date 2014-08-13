
/*
 * GET home page.
 */
var crypto =  require('crypto');
var User = require('../models/user');
var Post = require('../models/post');

module.exports = function(app){
  app.get('/',function(req, res){
    res.render('index',{
      title:'首页'
		});
  });
  app.get('/reg',checkNotLogin);
  app.get('/reg',function(req, res){
    res.render('reg',{
		  title:'用户注册'
		});
	});
  app.post('/reg',checkNotLogin);
  app.post('/reg',function(req, res){
    if((req.body['username'] == '')||(req.body['password-repeat'] == '')||(req.body['password'] == '')){
		  req.session.error = '用户名或密码不得为空！';
		  return res.redirect('/reg');
    } 
		if(req.body['password-repeat'] != req.body['password']){
			 req.session.error = '两次输入密码不一致！';
			 return res.redirect('/reg');
		 } 
		
		 var md5 = crypto.createHash('md5');
		 var password = md5.update(req.body.password).digest('base64');
		
		 var newUser = new User({
		  name:req.body.username,
			password:password,
		 });
		 User.get(newUser.name,function(err, user){
      if(user)
				 err = '用户名已存在!';
			if(err){
				 req.session.error = err;
				 return res.redirect('/reg');
			}
			newUser.save(function(err){
			  if(err){
				  req.session.error = err;
					return res.redirect('/reg');
				 } 
         req.session.success = '注册成功！';
         req.session.user = newUser;
				 res.redirect('/');
		  });
	  });
	});
	app.get('/login',checkNotLogin);
  app.get('/login',function(req, res){
    res.render('login',{
      title:'用户登陆',
    });
  });
  app.post('/login',checkNotLogin);
  app.post('/login',function(req, res){
    if((req.body['username'] == '')||(req.body['password'] == '')){
      req.session.error = '用户名或密码不得为空！';
      return res.redirect('/login');
    }
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');

    User.get(req.body.username,function(err,user){
      if(!user){
        req.session.error = '用户不存在';
        return res.redirect('/login');
      }
      if(user.password != password){
        req.session.error = '用户名与密码不匹配！';
        return res.redirect('/login');
      }
      req.session.user = user;
      req.session.success = '登陆成功';
      res.redirect('/');
    });
  });
  app.get('/logout',checkLogin);
  app.get('/logout',function(req,res){
    req.session.user = null;
    req.session.success = '退出成功';
    res.redirect('/');
  });
  app.post('/post',checkLogin);
  app.post('/post',function(req, res){
	  var currentUser = req.session.user;
    var post = new Post(currentUser.name, req.body.post);
    post.save(function(err){
      if(err){
        req.session.error = err;
        return res.redirect('/');
      }
      req.session.success = '发表成功!';
      res.redirect('/u/'+currentUser.name);
    });
  });
  app.get('/u/:user',function(req,res){
    User.get(req.params.user,function(err, user){
      if(!user){
        req.session.error = '用户不存在!';
        return res.redirect('/');
      }
      Post.get(user.name,function(err, posts){
        if(err){
          req.session.error = err;
          return res.redirect('/');
        }
        res.render('user',{
          title:user.name,
          posts:posts,
        });
      });
    });
  });
  function checkLogin(req, res, next){
    if (!req.session.user){
      req.session.error = '未登陆';
      return res.redirect('/login');
    }
    next();
  }
  function checkNotLogin(req, res, next){
    if(req.session.user){
      req.session.error = '已登陆';
      return res.redirect('/');
    }
    next();
  }
};
