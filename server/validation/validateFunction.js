const Joi = require('joi');

// Common validate function
const validateSchema = (schema) => (req, res, next) => {
    console.log("Validating request body data...");

    const { error } = schema.validate(req.body);
    if (error) {
        const errorMessage = error.details.map(detail => detail.message).join(', ');
        return res.status(400).json({ status_code: 400, message: errorMessage });
    }
    next();
};

// Joi validation schema
const userSchema = Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': `"email" must be a valid email`,
      'any.required': `"email" is a required field`
    })
});

// Validating request body data
const userRegisterValidation = validateSchema(userSchema);

module.exports = {
    userRegisterValidation,
};