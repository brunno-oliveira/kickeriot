/*
 * Classe que faz conexão e consulta no banco de dados local
 * Brunno Cunha
 * 11/05/2016
 * Version: 1.0.0
 */
var mysql      = require('mysql');

var conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'IOT'
});

exports.getAll = function(err, callback){
    conn.connect();
    var query = conn.query('SELECT * from AWS_SUBSCRIBE_INFO');
    query.on('result', function(row) {
        callback(null, row);
    });
    conn.end();
}