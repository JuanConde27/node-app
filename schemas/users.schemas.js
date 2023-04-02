
const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().alphanum().min(3).max(15);
const lastname = Joi.string().alphanum().min(3).max(15);
const email = Joi.string().email();

const createUserSchema = Joi.object({
  name: name.required(),
  lastname: lastname.required(),
  email: email.required(),
});

const getUserSchema = Joi.object({
  id: id.required(),
});

const updateUserSchema = Joi.object({
  name: name,
  lastname: lastname,
  email: email,
});

module.exports = { createUserSchema, getUserSchema, updateUserSchema };
