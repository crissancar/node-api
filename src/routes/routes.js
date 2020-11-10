const express = require ('express');
const router = express.Router();
const userController = require('../controllers/userController');

module.exports = function(){

    // ###############
    // User
    // ###############
    router.get('/user', userController.users);
    router.get('/user/:id', userController.user);
    router.post('/user', userController.register);
    router.put('/user/:id', userController.update);
    router.delete('/user/:id', userController.delete);

    return router;
}