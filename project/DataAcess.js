/*
 * Classe que faz conexão e consulta no banco de dados local
 * Brunno Cunha
 * 11/05/2016
 * Version: 1.0.0
 */
var Sequelize = require('sequelize');
var conn = new Sequelize('employees', 'root', '123456', 'mysql');

exports.getAllFromTable = function(table, callback) {  
  table.findAll();
};

function query(queryString, callback) {
    conn.connect();
    conn.query(queryString, function(err, rows, fields) {
    conn.end();
    if (err) return callback(err);
    callback(null,rows);
  });
};

