// variables section
const http = require("http");
const express = require("express");
const web_server_config = require("../config/web-server");
const database_config = require("./database");
const morgan = require("morgan");
let httpServer;

// initialaize connection to the server and the database
function initialize() {
	return new Promise((resolve, reject) => {
		const app = express();

		httpServer = http.createServer(app);
		app.use(morgan("combined")); //shows logger desc.

		app.get("/", async (req, res) => {
			const result = await database_config.simpleExecute();

			res.send(result);
		});

		httpServer
			.listen(web_server_config.port)
			.on("listening", () => {
				console.log(
					`Web server listening on localhost:${web_server_config.port}`
				);

				resolve();
			})
			.on("error", (err) => {
				reject(err);
			});
	});
}

module.exports.initialize = initialize;

// close the  connections
function close() {
	return new Promise((resolve, reject) => {
		httpServer.close((err) => {
			if (err) {
				reject(err);
				return;
			}

			resolve();
		});
	});
}

module.exports.close = close;
