const Joi = require('joi');

const id = Joi.string().uuid();
const name= Joi.string().min(3).max(20);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();

const createProductDTO = Joi.object({
    name: name.required(),
    price: price.required(),
    image: image.required()
})

const updateProductDTO = Joi.object({
    name: name,
    price: price,
    image: image
})

const getProductDTO = Joi.object({
    id: id.required(),
})

module.exports={createProductDTO, updateProductDTO, getProductDTO}