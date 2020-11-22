const mysql = require("mysql");
const database_config = require("../config/database.js");

async function initialize() {
	const pool = await mysql.createPool(database_config.credentials);
}

module.exports.initialize = initialize;
