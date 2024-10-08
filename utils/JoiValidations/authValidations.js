const Joi = require("joi");
const loginValidation = Joi.object({
  email : Joi.string().email().required(),
  password: Joi.string().required()
})
const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  walletAddress: Joi.string().required(),
});

module.exports = {
  signupSchema,
  loginValidation
};
