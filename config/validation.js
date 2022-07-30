const Joi = require("Joi");


// BOARD VALIDATION USING Joi
const boardValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(5).required(),
    stage: Joi.number(),
  });

  return schema.validate(data);
};


// REGISTRATION VALIDATION USING Joi
const registerValidation = (data) => {
  const schema =Joi.object( {
    email: Joi.string().min(6).required().email(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{4,30}$"))
      .required(),
    name: Joi.string().min(3).required(),
    id : Joi.number(),
  });

  return schema.validate(data);
};



// LOGIN VALIDATION USING Joi
const loginValidation = (data) => {
  const schema =Joi.object( {
    email: Joi.string().min(6).required().email(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{4,30}$"))
      .required(),
  });

  return schema.validate(data);
};




// EXPORTING VALIDATIONS
module.exports.boardValidation = boardValidation;
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
