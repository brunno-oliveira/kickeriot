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
    password : 'k3vds',
    database : 'IOT'
});

exports.getAllData = function(err, table){
    conn.connect();
    conn.end();
}