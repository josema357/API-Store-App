const { User, UserSchema } = require('./user.model');
const { Product, ProductSchema } = require('./product.model');
const { Category, CategorySchema } = require('./category.model');

/**
 * Connection sequelize with models
 * @param {Sequelize} sequelize Sequelize's connection
 */
function setupModels(sequelize){
    User.init(UserSchema, User.config(sequelize));
    Product.init(ProductSchema, Product.config(sequelize));
    Category.init(CategorySchema, Category.config(sequelize));
}

module.exports = setupModels;