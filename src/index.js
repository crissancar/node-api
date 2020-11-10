const bodyParser = require('body-parser');
const express = require('express');
const routes = require('./routes/routes');
const config = require('./config/config');

//Crear el servidor Express
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//Rutas
app.use('/', routes());


//Conectar a mongodb (desde Docker)
require('./database/database');

//Puerto del servidor
app.listen(process.env.PORT);
console.log("Express is connected in port", process.env.PORT);