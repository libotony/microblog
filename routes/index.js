
/*
 * GET home page.
 */

module.exports = function(app){
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
		if(req.body['password-repeat'] != req.body['password']){
			req.session.error = '两次输入密码不一致！';
			console.log(req.session.error);
		}
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
