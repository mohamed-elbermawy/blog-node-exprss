const Joi = require("joi");
const mongoose = require("mongoose");

const postValidation = (data) => {
  const schema = Joi.object({
    userid: mongoose.Schema.Types.ObjectId,
    title: Joi.string().required().min(3),

    body: Joi.string().required().min(3),

    image: Joi.string(),
  }).unknown();

  return schema.validate(data);
};

module.exports = {
  postValidation,
};
