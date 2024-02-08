const Joi = require('joi');

const id = Joi.number().integer();
const name= Joi.string().min(3).max(50);
const description = Joi.string();
const price = Joi.number().integer().min(1);
const image = Joi.string().uri();

const createProductDTO = Joi.object({
    name: name.required(),
    description: description,
    price: price.required(),
    image: image.required()
})

const updateProductDTO = Joi.object({
    name: name,
    description: description,
    price: price,
    image: image
})

const getProductDTO = Joi.object({
    id: id.required(),
})

module.exports={createProductDTO, updateProductDTO, getProductDTO}