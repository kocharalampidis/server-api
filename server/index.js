const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const database_server = require("./services/database");
const web_server = require("./services/web-server");

async function startup() {
	console.log("Starting application");

	try {
		console.log("Initializing database module");

		await database_server.initialize();
	} catch (err) {
		console.error(err);

		process.exit(1); // Non-zero failure code
	}

	try {
		console.log("Initializing web server module");

		await web_server.initialize();
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

	console.log("Shutting down");
	{
		/* shutting down the server */
	}
	try {
		console.log("Closing web server module");

		await web_server.close();
	} catch (e) {
		console.log("Encountered error", e);

		err = err || e;
	}

	{
		/* ------------------------------------------------------------------ */
	}

	console.log("Exiting process");

	if (err) {
		process.exit(1); // Non-zero failure code
	} else {
		process.exit(0);
	}
}

process.on("SIGTERM", () => {
	console.log("Received SIGTERM");

	shutdown();
});

process.on("SIGINT", () => {
	console.log("Received SIGINT");

	shutdown();
});

process.on("uncaughtException", (err) => {
	console.log("Uncaught exception");
	console.error(err);

	shutdown(err);
});

// database_handler = mysql.createPool(database_config.credentials);

// const sqlInsert = "INSERT INTO tbl (id, name) VALUES (?, ?);";
// const sqlGet = "SELECT * FROM tbl;";
// const sqlDelete = "DELETE FROM tbl WHERE name = ? ;";
// const sqlUpdate = "UPDATE tbl SET name = ?  WHERE id = 22;";

// app.get("/", (req, res) => {
// 	database_handler.query(sqlInsert, (err, result) => {
// 		res.send("hello from sqlinser");
// 	});
// });

// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/api/get", (req, res) => {
// 	database_handler.query(sqlGet, (err, result) => {
// 		res.send(result);
// 	});
// });

// app.delete("/api/delete/:movieName", (req, res) => {
// 	const name = req.params.movieName;
// 	db.query(sqlDelete, name, (err, result) => {
// 		if (err) console.log(err);
// 	});
// });

// app.put("/api/update", (req, res) => {
// 	const name = req.body.movieName;
// 	const review = req.body.movieReview;

// 	db.query(sqlUpdate, [review, name], (err, result) => {
// 		console.log(err);
// 	});
// });

// app.post("/api/insert", (req, res) => {
// 	const movieName = req.body.movieName;
// 	const movieReview = req.body.movieReview;

// 	db.query(sqlInsert, [movieName, movieReview], (err, result) => {
// 		console.log(err);
// 	});
// });

// app.listen(web_server_config.port, () => {
// 	console.log("running on 3001");
// });
