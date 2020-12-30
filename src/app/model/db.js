/** @format */

var mysql = require('mysql'); //require mysql
var util = require('util');

//create pool connection of MySQL
var pool = mysql.createPool({
	connectionLimit: 100,
	host: '172.17.0.1',
	user: 'root',
	password: 'mypassword',
	database: 'test',
	port: '6603',
});

pool.getConnection((err, connection) => {
	if (err) {
		if (err.code === 'PROTOCOL_CONNECTION_LOST') {
			console.log('Database connection was closed.');
		}
		if (err.code === 'ER_CON_COUNT_ERROR') {
			console.log('Database has too many connections.');
		}
		if (err.code === 'ECONNREFUSED') {
			console.log('Database connection was refused.');
		}
		if (connection) connection.release();
		return;
	}
});

pool.query = util.promisify(pool.query); // Magic happens here.

module.exports = pool; //export the pool variable for globally use
