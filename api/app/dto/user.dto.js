const Joi = require('joi');

const id = Joi.number();
const name = Joi.string().min(3).max(40);
const job = Joi.string().min(3).max(30);

const createUserDTO = Joi.object({
    name : name.required(),
    job : job.required()
})

const updateUserDTO = Joi.object({
    name : name,
    job : job
})

const getUserDTO = Joi.object({
    id: id.required()
})

module.exports={createUserDTO, updateUserDTO, getUserDTO}