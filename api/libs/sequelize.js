const {Sequelize} = require('sequelize');
const setupModels = require('../app/models');
require('dotenv').config();

const USER=encodeURIComponent(process.env.DB_USER);
const PASSWORD=encodeURIComponent(process.env.DB_PASSWORD);
//const URI = `mysql://${USER}:${PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const URI = `postgres://${USER}:${PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const sequelize = new Sequelize(URI,{
    dialect:'postgres'
});

setupModels(sequelize);

module.exports=sequelize;