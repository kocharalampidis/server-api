/** @format */

const mysql = require('mysql'); //require mysql
const util = require('util');
const database_config = require('../config/dbConfig');

//create pool connection of MySQL
var pool = mysql.createPool({
	connectionLimit: database_config.CONNECTION_LIMIT,
	host: database_config.HOST,
	user: database_config.USER,
	password: database_config.PASSWORD,
	database: database_config.DATABASE,
	port: database_config.PORT,
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
		if (err.code === 'connect ETIMEDOUT') {
			console.log('Timed out Error');
		}
		if (connection) connection.release();

		return;
	} else {
		console.log('MySQL pool connected: threadId ' + connection.threadId);
		return;
	}
});

pool.query = util.promisify(pool.query); // returns a primise object

module.exports = pool; //export the pool variable for globally use
