const mysql = require("mysql");
const database_config = require("../config/database.js");

async function initialize() {
	const pool = await mysql.createPool(database_config.credentials);
}

module.exports.initialize = initialize;

function simpleExecute() {
	return new Promise(async (resolve, reject) => {
		let conn;
		conn = await mysql.createPool(database_config.credentials);
		conn.query("SELECT * FROM tbl;", (err, rows) => {
			if (err) {
				reject(err);
			} else {
				resolve(rows);
			}
		});
	});
}

module.exports.simpleExecute = simpleExecute;
