require('dotenv').config();

//const USER=encodeURIComponent(process.env.DB_USER);
const URI = `postgres://root:${process.env.PG_DB_PASSWORD}:${process.env.PG_DB_PORT}/my_store_xjnl`;

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