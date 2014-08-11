
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
    app.get('/u/:user',function(req, res){
	    });
    app.post('/post',function(req, res){
	    });
    app.post('/reg',function(req, res){
	    });
    app.get('/login',function(req, res){
	    });
    app.post('/login',function(req, res){
	    });
};
