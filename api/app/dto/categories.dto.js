const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);

const createCategoryDTO = Joi.object({
  name: name.required(),
});

const updateCategoryDTO = Joi.object({
  name: name,
});

const getCategoryDTO = Joi.object({
  id: id.required(),
});

module.exports = { createCategoryDTO, updateCategoryDTO, getCategoryDTO };
