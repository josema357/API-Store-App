require('dotenv').config();

const URI = `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
//const URI = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

module.exports = {
    development: {
      url: URI,
      dialect: 'mysql',
      //dialect: 'postgres',
    },
    test: {
        url: URI,
        dialect: 'mysql',
        //dialect: 'postgres',
    },
    production: {
        url: URI,
        dialect: 'mysql',
        //dialect: 'postgres',
    }
  }