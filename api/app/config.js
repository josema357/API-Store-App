require('dotenv').config();

const USER=encodeURIComponent(process.env.DB_USER);
const PASSWORD=encodeURIComponent(process.env.DB_PASSWORD);
const URI = `mysql://${USER}:${PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

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