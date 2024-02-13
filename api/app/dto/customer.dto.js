const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3);
const lastName = Joi.string();
const phone = Joi.string();
const userId = Joi.number().integer();

const email = Joi.string();
const password = Joi.string();

const createCustomerDTO = Joi.object({
    name : name.required(),
    lastName : lastName.required(),
    phone: phone.required(),
    user: Joi.object({
        email: email.required(),
        password: password.required()
    })
})

const updateCustomerDTO = Joi.object({
    name : name,
    lastName : lastName,
    phone: phone,
    userId: userId
})

const getCustomerDTO = Joi.object({
    id: id.required()
})

module.exports={createCustomerDTO, updateCustomerDTO, getCustomerDTO}