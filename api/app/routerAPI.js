const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const categoriesRouter = require('./routes/categories');
const customersRouter = require('./routes/customers');
const ordersRouter = require('./routes/orders')
const express = require('express');

function routerAPI(app){
    const router = express.Router();
    app.use('/api/v1', router); 
    router.use('/products', productsRouter);
    router.use('/users', usersRouter);
    router.use('/categories', categoriesRouter);
    router.use('/customers', customersRouter);
    router.use('/orders', ordersRouter);
}

module.exports = routerAPI;