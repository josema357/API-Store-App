const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().min(10);
const password = Joi.string().min(8);

const createUserDTO = Joi.object({
    email : email.required(),
    password : password.required()
})

const updateUserDTO = Joi.object({
    email : email,
    password : password
})

const getUserDTO = Joi.object({
    id: id.required()
})

module.exports={createUserDTO, updateUserDTO, getUserDTO}