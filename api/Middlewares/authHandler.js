const boom = require('@hapi/boom');
require('dotenv').config();

const api_key = process.env.API_KEY;

function checkApiKey(req, res, next) {
  const apiKey = req.headers['api'];
  if (apiKey === api_key) {
    next();
  } else {
    next(boom.unauthorized());
  }
}

function checkAdminRole(req, res, next) {
  const user = req.user;
  if (user.role === 'admin') {
    next();
  } else {
    next(boom.unauthorized());
  }
}

function checkRoles(...roles) {
  return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.role)) {
      next();
    } else {
      next(boom.unauthorized());
    }
  };
}

module.exports = { checkApiKey, checkAdminRole, checkRoles };
