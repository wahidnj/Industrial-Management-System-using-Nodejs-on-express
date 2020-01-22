var db = require('./db');



module.exports = {
	validate: function(user, callback){
		var sql = "select * from users where email=? and password=?";
		db.getResult(sql, [user.email, user.password], function(results){			
			if(results.length > 0){

				callback(true);

			}else{
				callback(false);
			}
		});
	},

	validatelogin: function(user, callback){
		var sql = "select * from users where email=? and password=?";
		db.getResult(sql, [user.email, user.password], function(results){			
			if(results.length > 0){
				callback(results);
			}
			else{
				callback('fal');
			}
		});
	},

	//insertEmployee
	insertEmployee: function(user, callback){
		var sql = "insert into users values (?,?,?,?,?,?,?,?,?)";
	
		db.execute(sql,['',user.username,user.email,user.password,user.address,user.contact,user.job, user.salary,0], function(status){
			callback(status)
		});
	},
	getById: function(email, callback){
		var sql = "select * from users where email=?";
		db.getResult(sql, [email], function(result){
			callback(result);
		});
	},


	//getClientById
	getClientById: function(id, callback){
		var sql = "select * from clients where id=?";
		db.getResult(sql, [id], function(result){
			callback(result);
		});
	},

	deleteById: function(email, callback){
		var sql = "delete  from users where email=?";
		db.getResult(sql, [email], function(result){
			callback(result);
		});
	},

	//delete expense

	deleteExpense: function(id, callback){
		var sql = "delete  from expense where id=?";
		db.getResult(sql, [id], function(result){
			callback(result);
		});
	},

	deleteClient: function(id, callback){
		var sql = "delete  from clients where id=?";
		db.getResult(sql, [id], function(result){
			callback(result);
		});
	},

	//delete labour

	deleteLabour: function(id, callback){
		var sql = "delete  from labors where id=?";
		db.getResult(sql, [id], function(result){
			callback(result);
		});
	},

	//delete projects

	deleteProjects: function(id, callback){
		var sql = "delete  from projects where id=?";
		db.getResult(sql, [id], function(result){
			callback(result);
		});
	},

		//delete supplier

	deleteSupplier: function(name, callback){
		var sql = "delete  from suppliers where name=?";
		db.getResult(sql, [name], function(result){
			callback(result);
		});
	},
	getAll: function(callback){
		var sql = "select * from users order by id desc";
		db.getResult(sql, [], function(results){
			callback(results);
		});
	},
	getAllSuppliers: function(callback){
		var sql = "select * from suppliers";
		db.getResult(sql, [], function(results){
			callback(results);
		});
	},

	getAllExpenses: function(callback){
		var sql = "select * from expense";
		db.getResult(sql, [], function(results){
			callback(results);
		});
	},

	getAllClients: function(callback){
		var sql = "select * from clients";
		db.getResult(sql, [], function(results){
			callback(results);
		});
	},
    
    getAllLabors: function(callback){
		var sql = "select * from labors";
		db.getResult(sql, [], function(results){
			callback(results);
		});
	},

	 getAllProjects: function(callback){
		var sql = "select * from projects";
		db.getResult(sql, [], function(results){
			callback(results);
		});
	},
	//insertLabour


	insertLabour: function(user, callback){
		var sql = "insert into labors values (?,?,?,?,?,?,?,?,?)";
		
		
		
		db.execute(sql,['',user.laborName,user.laborAddress,user.laborContact,user.laborExperties, user.job,0,0,user.laborSalary], function(status){
			callback(status)
		});
	},

	insertProject: function(user, callback){
		var sql = "insert into projects values (?,?,?,?,?,?,?)";
		
		


		
		
		db.execute(sql,['',user.projectName,user.project_details,user.clientName,user.estimatedCost,user.amountPaid, 'Unfinished'], function(status){
			callback(status)
		});
	},

	//insertExpense
	insertExpense: function(user, callback){
		var sql = "insert into expense values (?,?,?,?)";
		
		console.log(user.purpose);
		console.log(user.byWho);
		console.log(user.expenseAmount);
		
		db.execute(sql,['',user.purpose,user.byWho,user.expenseAmount], function(status){
			callback(status)
		});
	},
	insert: function(user, callback){
		var sql = "insert into users values (?,?,?,?,?,?,?,?,?)";
		
		
		
		db.execute(sql,[6,user.username,user.email,user.password,user.address, user.contact,user.job,user.salary,0], function(status){
			callback(status)
		});
	},

	insertClient: function(user, callback){
		var sql = "insert into clients values (?,?,?,?,?,?,?,?)";
		
		
		
		db.execute(sql,['',user.username,user.owner,user.project_details,user.address, user.contact,0,0], function(status){
			callback(status)
		});
	},


	insertSuppliers: function(user, callback){
		var sql = "insert into suppliers values (?,?,?,?,?,?,?,?)";
		
		
		
		db.execute(sql,['',user.username,user.details,user.owner,user.address, user.contact,0,0], function(status){
			callback(status)
		});
	},
	update: function(user, callback){
		var sql = "update users set name=?, contact=?,address=?,salary=? where email=?";
		db.execute(sql, [user.username, user.contact,user.address,user.salary, user.email], function(status){
			callback(status);
		});
	},

	updatelabour: function(user, callback){
		var sql = "update labors set name=?, contact=?,address=?,salary=? where email=?";
		db.execute(sql, [user.username, user.contact,user.address,user.salary, user.email], function(status){
			callback(status);
		});
	},


	updateClient: function(user, callback){
		var sql = "update clients set name=?, contact=?,address=? where id=0";
		db.execute(sql, [user.name, user.address,user.contact,user.id], function(status){
			callback(status);
		});
	},

	getTotalProject: function(callback){
		var sql = "select count(*) as total , sum(t_cost) as total_price, sum(paid) as balance from projects ";
		db.getResult(sql, [], function(results){
			callback(results);
			console.log(results);
		});
	},
	delete: function(id, callback){
		var sql = "delete from user where id=?";
		db.execute(sql, [id], function(status){
			callback(status)
		});
	}
}