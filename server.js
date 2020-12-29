/** @format */

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// parse requests
app.use(bodyParser.json());

// simple test route
app.get('/', (req, res) => {
	res.json({ message: 'Welcome to REST API with node-express-mysql' });
});

// require('./app/routes/customer.routes.js')(app);

// set port number, initialize port server
const PORT = 3000;
app.listen(PORT, () => {
	console.log(`server initialized at https://localhost:${PORT}`);
});
