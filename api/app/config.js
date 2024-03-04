require('dotenv').config();

//const URI = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const URI = `postgres://root:${process.env.PG_DB_PASSWORD}@${process.env.PG_DB_HOST}/my_store_xjnl`

module.exports = {
    development: {
      url: URI,
      dialect: 'postgres',
    },
    test: {
        url: URI,
        dialect: 'postgres',
    },
    production: {
        url: URI,
        dialect: 'postgres',
    }
  }