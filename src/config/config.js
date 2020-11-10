// ====================
//  Puerto
// ====================
process.env.PORT = process.env.PORT || 3000;

// ====================
//  Entorno
// ====================
process.env.NODE_ENV = process.env.NODE_ENV ||  'dev';

// ====================
//  Base de datos
// ====================
if(process.env.NODE_ENV === 'dev'){
    process.env.URL_DATABASE = 'mongodb://node-api-db/nodeapi';
}else{
    process.env.URL_DATABASE = 'mongodb+srv://cristian:EIezbYf1j2V1LC4g@node-api.kgjws.mongodb.net/node-api?retryWrites=true&w=majority';
}