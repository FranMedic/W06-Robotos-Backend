const { Joi } = require("express-validation");

const loginSchema = {
  body: Joi.object({
    username: Joi.string(),
    password: Joi.string(),
  }),
};

module.exports = loginSchema;
