const Joi = require("joi");

const userValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com"] } })
      .required(),

    username: Joi.string().required(),

    password: Joi.string().required(),

    firstName: Joi.string().min(3).max(15),

    age: Joi.date(),
  }).unknown();

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com"] } })
      .required(),

    password: Joi.string().required(),
  }).unknown();

  return schema.validate(data);
};

module.exports = {
  userValidation,
  loginValidation,
};
