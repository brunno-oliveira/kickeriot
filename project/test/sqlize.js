var Sequelize = require('sequelize');

var conn = new Sequelize('employees', 'root', '123456', 'mysql');

var Employees = conn.define('employees', {   
  emp_no     : { type: Sequelize.INTEGER, primaryKey: true},
  birth_date : Sequelize.DATE,
  first_name : Sequelize.STRING,
  last_name  : Sequelize.STRING,
  gender     : Sequelize.STRING,
  hire_date  : Sequelize.DATE
}, {
    timestamps: false
});


var Departments = conn.define('departments', { 
    dept_no   : { type: Sequelize.INTEGER, primaryKey: true},
    dept_name : Sequelize.STRING
}, {
    timestamps: false
});
             
//conn.sync();
Departments.findAll().then(function(Departments){
    console.log(Departments[0].dataValues);
});