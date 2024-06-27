const boom = require("@hapi/boom");
require('dotenv').config();

const api_key = process.env.API_KEY;

function checkApiKey(req, res, next){
  const apiKey = req.headers['api'];
  if(apiKey === api_key){
    next();
  }else{
    next(boom.unauthorized());
  }
}

module.exports = { checkApiKey }