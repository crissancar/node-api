const express = require ('express');
const router = express.Router();
const {checkUserToken, checkUserRole} = require('../middlewares/auth');
const {validateFileExtension, validateFileType} = require('../middlewares/file');
const userController = require('../controllers/userController');
const categoryController = require('../controllers/categoryController');
const productController = require('../controllers/productController');
const fileController = require('../controllers/fileController');

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
    router.put(API_VERSION + '/users/:id', [checkUserToken], userController.update);
    router.delete(API_VERSION + '/users/:id', [checkUserToken, checkUserRole], userController.delete);

    // ###############
    // Category
    // ###############
    router.get(API_VERSION + '/categories', categoryController.categories);
    router.get(API_VERSION + '/categories/:id', categoryController.category);
    router.post(API_VERSION + '/categories', checkUserToken, categoryController.create);
    router.put(API_VERSION + '/categories/:id', [checkUserToken, checkUserRole], categoryController.update);
    router.delete(API_VERSION + '/categories/:id', [checkUserToken, checkUserRole], categoryController.delete);

    // ###############
    // Product
    // ###############
    router.get(API_VERSION + '/products', productController.products);
    router.get(API_VERSION + '/products/:id', productController.product);
    router.get(API_VERSION + '/products/search/:term', productController.search);
    router.post(API_VERSION + '/products', checkUserToken, productController.create);
    router.put(API_VERSION + '/products/:id', [checkUserToken, checkUserRole], productController.update);
    router.delete(API_VERSION + '/products/:id', productController.delete);

    // ###############
    // File uploads
    // ###############
    router.put(API_VERSION + '/uploads/:type/:id', [checkUserToken, validateFileExtension, validateFileType], fileController.upload);
    router.get(API_VERSION + '/uploads/:type/:id', checkUserToken, fileController.file);


    return router;
}