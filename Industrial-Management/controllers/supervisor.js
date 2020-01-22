var express = require('express');
var user = require.main.require('./models/user-model');
var router = express.Router();


router.get('*', function(req, res, next){
	if(req.session.email != null){
		next();
	}else{
		res.redirect('/login');
	}
});

// router.get('/', function(req, res){
// 	res.render('dashboard/index');
// });

router.get('/add_employee', function(req, res){
	res.render('supervisor/add_employee');
});

// router.get('/employee', function(req, res){
// 	res.render('dashboard/employee');
// });

router.get('/employee', function(req, res){
	user.getAll(function(results){
		res.render('supervisor/employee', {userList: results});
	});
});

router.get('/add_project', function(req, res){
	res.render('supervisor/add_project');
});



router.get('/project', function(req, res){
	user.getAllProjects(function(results){
		res.render('supervisor/project', {projectList: results});
	});
});



router.get('/add_labour', function(req, res){
	res.render('supervisor/add_labour');
});



router.get('/add_supplier', function(req, res){
	res.render('supervisor/add_supplier');
});


router.get('/edit_user/:email', function(req, res){
	user.getById(req.params.email, function(result){
		res.render('supervisor/edit_user', {user: result[0]});
	});
});

//edit_client

router.get('/edit_client/:id', function(req, res){
	user.getClientById(req.params.id, function(result){
		res.render('supervisor/edit_client', {user: result[0]});
	});
});

router.get('/delete/:email', function(req, res){
	user.deleteById(req.params.email, function(result){
		res.render('supervisor/delete');
	});
});

//deleteExpense

router.get('/delete_exp/:id', function(req, res){
	user.deleteExpense(req.params.id, function(result){
		res.render('supervisor/delete');
	});
});

//deleteLabour

router.get('/delete_lab/:id', function(req, res){
	user.deleteLabour(req.params.id, function(result){
		res.render('supervisor/delete');
	});
});

//deleteLabour

router.get('/delete_pro/:id', function(req, res){
	user.deleteProjects(req.params.id, function(result){
		res.render('supervisor/delete');
	});
});

//deleteSupplier

router.get('/delete_sup/:name', function(req, res){
	user.deleteSupplier(req.params.name, function(result){
		res.render('supervisor/delete');
	});
});


router.get('/delete_cli/:id', function(req, res){
	user.deleteSupplier(req.params.id, function(result){
		res.render('supervisor/delete');
	});
});

router.post('/edit_user/:email', function(req, res){
	var data = {
		email: req.params.email,
	    username: req.body.username,
		contact: req.body.contact,
		address: req.body.address,
		salary: req.body.salary,

	}
	user.updateClient(data, function(status){
		if(status){
			

			res.redirect('/supervisor');
		}else{
			console.log('not');
			res.redirect('/supervisor/edit_user/'+req.params.email);
		}
	});

});

router.post('/edit_client/:id', function(req, res){
	var data = {
		id: req.params.id,
	    name: req.body.username,
	    address: req.body.address,
		contact: req.body.contact
		
		

	}
	user.updateClient(data, function(status){
		if(status){
			

			res.redirect('/supervisor');
		}else{
			console.log('not');
			res.redirect('/supervisor/edit_client/'+req.params.id);
		}
	});

});

router.post('/add_employee', function(req, res){
	var data = {
	
		username: req.body.username,		
		email: req.body.email,
		password: req.body.password,
		contact: req.body.contact,
		address: req.body.address,
		job: req.body.job,
		salary: req.body.salary,
		
	}
	user.insertEmployee(data, function(status){
		if(status){
		res.redirect('/supervisor');
		}else{
			console.log('not');
		}
	});

});

router.post('/add_supplier', function(req, res){
	var data = {
	
		username: req.body.username,
		details: req.body.details,
		password: req.body.password,
		address: req.body.address,
		contact: req.body.contact,
		owner: req.body.owner,
		
	
	}
	user.insertSuppliers(data, function(status){
		if(status){
		res.redirect('/supervisor');
		}else{
			console.log('not');
		}
	});

});

// router.get('/supplier', function(req, res){
// 	res.render('dashboard/supplier');
// });

router.get('/supplier', function(req, res){
	user.getAllSuppliers(function(results){
		res.render('supervisor/supplier', {supplierList: results});
	});
});


router.get('/add_client', function(req, res){
	res.render('supervisor/add_client');
});



router.get('/client', function(req, res){
	user.getAllClients(function(results){
		res.render('supervisor/client', {clientList: results});
	});
});

router.get('/add_expense', function(req, res){
	res.render('supervisor/add_expense');
});

//expense
router.post('/add_expense', function(req, res){
	var data = {
	
		byWho: req.body.byWho,		
		expenseAmount: req.body.expenseAmount,
		purpose: req.body.purpose,
		
	
	}
	user.insertExpense(data, function(status){
		if(status){
			console.log('yes');
		res.redirect('/supervisor');
		}else{
			console.log('not');
		}
	});

});

// router.get('/expense', function(req, res){
// 	res.render('dashboard/expense');
// });

router.get('/expense', function(req, res){
	user.getAllExpenses(function(results){
		res.render('supervisor/expense', {expenseList: results});
	});
});


router.get('/labour', function(req, res){
	user.getAllLabors(function(results){
		res.render('supervisor/labour', {laborList: results});
	});
});

router.get('/logs', function(req, res){
	res.render('supervisor/logs');
});

//client
router.post('/add_client', function(req, res){
	var data = {
	
		username: req.body.username,		
		address: req.body.address,
		contact: req.body.contact,
		owner: req.body.owner,
		project_details: req.body.project_details
	
	}
	user.insertClient(data, function(status){
		if(status){
			console.log('yes');
		res.redirect('/supervisor');
		}else{
			console.log('not');
		}
	});

});

//labours
router.post('/add_labour', function(req, res){
	var data = {
	
		laborName: req.body.laborName,		
		laborAddress: req.body.laborAddress,
		laborContact: req.body.laborContact,
		job: req.body.job,
		laborExperties: req.body.laborExperties,
		laborSalary: req.body.laborSalary,
		
		
	
	}
	user.insertLabour(data, function(status){
		if(status){
			console.log('yes');
		res.redirect('/supervisor');
		}else{
			console.log('not');
		}
	});

});

router.post('/add_project', function(req, res){
	var data = {
	
		projectName: req.body.projectName,		
		clientName: req.body.clientName,
		clientContact: req.body.clientContact,
		estimatedCost: req.body.estimatedCost,
		amountPaid: req.body.amountPaid,
		project_details: req.body.project_details,
		
		
	
	}
	user.insertProject(data, function(status){
		if(status){
			console.log('yes');
		res.redirect('/supervisor');
		}else{
			console.log('not');
		}
	});

});


///jm

router.get('/', function(req, res){
	user.getTotalProject(function(results){
		res.render('supervisor/index', {projectList: results});
	});
	/*user.getCompleteProject(function(results){
		res.render('req.next()', {completeList: results});
	});*/
});


module.exports = router;

