const bodyParser = require('body-parser');
const express = require('express');
const routes = require('./routes/routes');
const config = require('./config/config');

//Create Express Server
const app = express();

// BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
app.use('/', routes());

//Connect to MongoDb
require('./database/database');

//Express port
app.listen(process.env.PORT);

//Api info
console.log("Api version:", process.env.API_VERSION);
console.log("Enviroment:", process.env.NODE_ENV);
console.log("Express is connected in port", process.env.PORT);