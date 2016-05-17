var db = require('./DbTest.js');
var mysql      = require('mysql');

var conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'IOT'
});

function getAwsSubInfo(){
    db.getAwsSubInfo(function(err, rows){
        if (err) {
          console.log(err)
        } else {
          console.log(rows)
        }    
    });
};

getAwsSubInfo();