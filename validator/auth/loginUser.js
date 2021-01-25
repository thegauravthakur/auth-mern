const joi = require('joi');

module.exports = (data) => {
  const schema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().required().min(6),
  })
  const {error} = schema.validate(data);
  return error;
}
