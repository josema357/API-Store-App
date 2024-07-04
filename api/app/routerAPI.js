const express = require('express');

const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const categoriesRouter = require('./routes/categories');
const customersRouter = require('./routes/customers');
const ordersRouter = require('./routes/orders')
const authRouter = require('./routes/auth');

function routerAPI(app){
    const router = express.Router();
    app.use('/api/v1', router); 
    router.use('/products', productsRouter);
    router.use('/users', usersRouter);
    router.use('/categories', categoriesRouter);
    router.use('/customers', customersRouter);
    router.use('/orders', ordersRouter);
    router.use('/auth', authRouter);
}

module.exports = routerAPI;