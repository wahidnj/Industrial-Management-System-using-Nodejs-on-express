var express = require('express');
var user	= require.main.require('./models/user-model');
var router = express.Router();


 router.get('/', function(req, res){
	res.render('home/auth-login-2');
});

router.get('/dashboard', function(req, res){
	res.render('dashboard/index');
});

router.get('/auth-register', function(req, res){
	res.render('home/auth-register');
});


// router.get('/project', function(req, res){
// 	user.getAllProjects(function(results){
// 		res.render('dashboard/project', {projectList: results});
// 	});
// });


router.post('/', function(req, res){
	
	var data = {
		email: req.body.email,
		password: req.body.password
	};

	user.validatelogin(data, function(results){

		if (results== 'fal'){
			res.send('invalid email/password...');
		}

		else
		{
		if(results[0].job=='admin'){
			req.session.email = req.body.email;
			res.redirect('/dashboard');
		}

		else if(results[0].job=='manager'){
			req.session.email = req.body.email;
			res.redirect('/manager');
		}

		else if(results[0].job=='accountant'){
			req.session.email = req.body.email;
			res.redirect('/accountant');
		}

		else if(results[0].job=='supervisor'){
			req.session.email = req.body.email;
			res.redirect('/supervisor');
		}
	}

	});

});





module.exports = router;