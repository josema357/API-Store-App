const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);
const role = Joi.string();

const createUserDTO = Joi.object({
    email : email.required(),
    password : password.required(),
    role: role.required()
})

const updateUserDTO = Joi.object({
    email : email,
    password : password,
    role: role
})

const getUserDTO = Joi.object({
    id: id.required()
})

module.exports={createUserDTO, updateUserDTO, getUserDTO}