const productsRouter = require('./Products/Routes/products');
const usersRouter = require('./Users/Routes/users');
const categoriesRouter = require('./Categories/Routes/categories');

function routerAPI(app){
    app.use('/products', productsRouter);
    app.use('/users', usersRouter);
    app.use('/categories', categoriesRouter);
}

module.exports = routerAPI;