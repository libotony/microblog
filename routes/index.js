
/*
 * GET home page.
 */

module.exports = function(app){
   app.all("*",function(req, res, next){
		   	var err = req.session.error;
		   	delete req.session.error;
			res.locals.message = '';
			if(err)
				res.locals.message = '<div class="alert alert-error">'+err+'</div>';
				console.log('message'+res.locals.message);
				next();

		   });
   app.get('/',function(req, res){
      res.render('index',{
        	title:'首页'
		});
	});
    app.get('/reg',function(req, res){
      res.render('reg',{
			title:'用户注册'
		});
	});
    app.post('/reg',function(req, res){
		if((req.body['username'] == '')||(req.body['password-repeat'] == '')||(req.body['password'] == '')){
			req.session.error = '用户名或密码不得为空！';
			return res.redirect('/reg');
		}
		if(req.body['password-repeat'] != req.body['password']){
			req.session.error = '两次输入密码不一致！';
			return res.redirect('/reg');
			console.log(req.session.error);
		}
		console.log(req.body['username']);
	});
	app.get('/u/:user',function(req, res){
	});
    app.post('/post',function(req, res){
	});
    app.get('/login',function(req, res){
	});
    app.post('/login',function(req, res){
	});
};
