const express = require ('express');
const router = express.Router();
const {checkToken, checkRole} = require('../middlewares/auth');
const userController = require('../controllers/userController');

module.exports = function(){

    const API_VERSION = process.env.API_VERSION;

    // ###############
    // User
    // ###############
    router.get(API_VERSION + '/users', userController.users);
    router.get(API_VERSION + '/users/:id', userController.user);
    router.post(API_VERSION + '/users', userController.register);
    router.post(API_VERSION + '/users/auth', userController.auth);
    router.put(API_VERSION + '/users/:id', [checkToken], userController.update);
    router.delete(API_VERSION + '/users/:id', [checkToken, checkRole], userController.delete);

    return router;
}