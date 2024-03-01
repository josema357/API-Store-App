const {Sequelize} = require('sequelize');
const setupModels = require('../app/models');
require('dotenv').config();

//const USER=encodeURIComponent(process.env.DB_USER);
//const URI = `postgres://${USER}:${PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const URI = `postgres://root:${process.env.PG_DB_PASSWORD}:${process.env.PG_DB_PORT}/my_store_xjnl`
const sequelize = new Sequelize(URI,{
    dialect:'postgres',
    ssl: true
});

setupModels(sequelize);

module.exports=sequelize;