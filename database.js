// assume this is the database
// a array of 250 transaction objects

var mysql      = require('mysql');
var connection = mysql.createConnection({
host     : 'localhost',
user     : 'root',
password : 'Totti10',
database : 'test'
});

module.exports = connection;