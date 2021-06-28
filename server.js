const http = require('http');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const port = process.env.PORT || 3001;
const app = require('./app');
const server = http.createServer(app);
server.listen(port);
console.log(`${port}`);

// menggunakan ejs
const ejs = require('ejs');
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(
	express.urlencoded({
		extended: true,
	})
);