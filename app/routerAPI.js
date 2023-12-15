const productsRouter = require('./Products/Routes/products');
const usersRouter = require('./Users/Routes/users');
const categoriesRouter = require('./Categories/Routes/categories');
const express = require('express');

function routerAPI(app){
    const router = express.Router();
    app.use('/api/v1', router); 
    router.use('/products', productsRouter);
    router.use('/users', usersRouter);
    router.use('/categories', categoriesRouter);
}

module.exports = routerAPI;