require('dotenv').config();

const URI = `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
//const URI = `postgres://root:${process.env.PG_DB_PASSWORD}@${process.env.PG_DB_HOST}/my_store_xjnl`

module.exports = {
    development: {
      url: URI,
      dialect: 'mysql',
    },
    test: {
        url: URI,
        dialect: 'mysql',
    },
    production: {
        url: URI,
        dialect: 'mysql',
    }
  }