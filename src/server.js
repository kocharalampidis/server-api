/** @format */

const http = require('http');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

let httpServer;

// initialaize connection to server
function initialize() {
	return new Promise((resolve, reject) => {
		const app = express();

		httpServer = http.createServer(app);
		app.use(morgan('combined')); //shows logger desc.

		// parse requests of content-type - application/json
		app.use(bodyParser.json());

		// parse requests of content-type - application/x-www-form-urlencoded
		app.use(bodyParser.urlencoded({ extended: true }));

		app.get('/', (req, res) => {
			res.end('Hello World!');
		});

		require('dotenv').config();
		const port = process.env.port || 5500;
		httpServer
			.listen(port)
			.on('listening', () => {
				console.log(`Web server listening on localhost:${port}`);

				resolve();
			})
			.on('error', (err) => {
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

// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();

// // parse requests
// app.use(bodyParser.json());

// // simple test route
// app.get('/', (req, res) => {
// 	res.json({ message: 'Welcome to REST API with node-express-mysql' });
// });

// // require('./app/routes/customer.routes.js')(app);

// // set port number, initialize port server
// const PORT = 3000;
// app.listen(PORT, () => {
// 	console.log(`server initialized at http://localhost:${PORT}`);
// });
