const Joi = require('joi');

const id = Joi.number().integer();
const customerId = Joi.number().integer();
const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const amount = Joi.number().integer();

const createOrderDTO = Joi.object({
    customerId: customerId.required()
})

const getOrderDTO = Joi.object({
    id: id.required()
})

const addItemDTO = Joi.object({
    orderId: orderId.required(),
    productId: productId.required(),
    amount: amount.required()
})

module.exports={createOrderDTO, getOrderDTO, addItemDTO}