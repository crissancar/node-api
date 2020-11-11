// ====================
//  Api version
// ====================
process.env.API_VERSION = '/api/v1';

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

// ====================
//  JWT
// ====================
process.env.TOKEN_SEED = process.env.TOKEN_SEED || 'dev-seed-d1f56sd4f1';
process.env.TOKEN_EXPIRATION = 60 * 60 * 24 * 30;