const {Sequelize} = require('sequelize');
const setupModels = require('../app/models');
require('dotenv').config();

const URI = `mysql://root:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
//const URI = `postgres://root:${process.env.PG_DB_PASSWORD}@${process.env.PG_DB_HOST}/my_store_xjnl`
const sequelize = new Sequelize(URI,{
    dialect:'mysql'
});

setupModels(sequelize);

module.exports=sequelize;