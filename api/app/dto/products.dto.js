const Joi = require('joi');

const id = Joi.number().integer();
const name= Joi.string().min(3).max(50);
const description = Joi.string();
const price = Joi.number().integer().min(1);
const image = Joi.string().uri();
const categoryId = Joi.number().integer();
const offset = Joi.number().integer();
const limit = Joi.number().integer();

const createProductDTO = Joi.object({
    name: name.required(),
    description: description.required(),
    price: price.required(),
    image: image.required(),
    categoryId: categoryId.required()
})

const updateProductDTO = Joi.object({
    name: name,
    description: description,
    price: price,
    image: image,
    categoryId: categoryId
})

const getProductDTO = Joi.object({
    id: id.required(),
})

const queryProductDTO = Joi.object({
    limit: limit,
    offset: offset
})

module.exports={createProductDTO, updateProductDTO, getProductDTO, queryProductDTO}