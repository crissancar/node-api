const express = require ('express');
const router = express.Router();
const {checkToken, checkRole} = require('../middlewares/auth');
const userController = require('../controllers/userController');
const categoryController = require('../controllers/categoryController');
const productController = require('../controllers/productController');

module.exports = function(){

    const API_VERSION = process.env.API_VERSION;

    // ###############
    // User
    // ###############
    router.get(API_VERSION + '/users', userController.users);
    router.get(API_VERSION + '/users/:id', userController.user);
    router.post(API_VERSION + '/users', userController.register);
    router.post(API_VERSION + '/users/auth', userController.auth);
    router.post(API_VERSION + '/users/auth/google', userController.google);
    router.put(API_VERSION + '/users/:id', [checkToken], userController.update);
    router.delete(API_VERSION + '/users/:id', [checkToken, checkRole], userController.delete);

    // ###############
    // Category
    // ###############
    router.get(API_VERSION + '/categories', categoryController.categories);
    router.get(API_VERSION + '/categories/:id', categoryController.category);
    router.post(API_VERSION + '/categories', checkToken, categoryController.create);
    router.put(API_VERSION + '/categories/:id', [checkToken, checkRole], categoryController.update);
    router.delete(API_VERSION + '/categories/:id', [checkToken, checkRole], categoryController.delete);

    // ###############
    // Product
    // ###############
    router.get(API_VERSION + '/products', productController.products);
    router.get(API_VERSION + '/products/:id', productController.product);
    router.get(API_VERSION + '/products/search/:term', productController.search);
    router.post(API_VERSION + '/products', checkToken, productController.create);
    router.put(API_VERSION + '/products/:id', [checkToken, checkRole], productController.update);
    router.delete(API_VERSION + '/products/:id', productController.delete);


    return router;
}