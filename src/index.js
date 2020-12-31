/** @format */

const express = require('express');
const app = express();

const server = require('./server');

async function startup() {
	console.log('Starting Application');

	try {
		console.log('Initializing Web Server');
		await server.initialize();
	} catch (err) {
		console.error(err);
		process.exit(1); // Non-zero failure code
	}
}

startup();

{
	/* Closing connections and shutting down the server */
}

async function shutdown(e) {
	let err = e;

	console.log('Shutting down');
	{
		/* shutting down the server */
	}
	try {
		console.log('Closing web server module');

		await server.close();
	} catch (e) {
		console.log('Encountered error', e);

		err = err || e;
	}

	{
		/* ------------------------------------------------------------------ */
	}

	console.log('Exiting process');

	if (err) {
		process.exit(1); // Non-zero failure code
	} else {
		process.exit(0);
	}
}

process.on('SIGTERM', () => {
	console.log('Received SIGTERM');

	shutdown();
});

process.on('SIGINT', () => {
	console.log('Received SIGINT');

	shutdown();
});

process.on('uncaughtException', (err) => {
	console.log('Uncaught exception');
	console.error(err);

	shutdown(err);
});
