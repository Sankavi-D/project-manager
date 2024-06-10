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

const validateVideoSchema = (schema) => (req, res, next) => {
    console.log("Validating request body data...");

    const { error } = schema.validate(req.file);
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

const projectNameSchema = Joi.object({
    userId: Joi.string().required().messages({
      'string.userId': `"userId" must be a valid id`,
      'any.required': `"userId" is a required field`  
    }),
    projectName: Joi.string().required().messages({
        'string.userId': `"projectName" must be a valid name`,
        'any.required': `"projectName" is a required field`  
      })
})

const videoUploadSchema = Joi.object({
    userId: Joi.string().required().messages({
        'string.userId': `"userId" must be a valid id`,
        'any.required': `"userId" is a required field`  
      }),
    title: Joi.string().required().messages({
      'string.empty': 'Title is required: Cannot be empty',
      'any.required': 'Title is required'
    })
});

// Validating request body data
const userRegisterValidation = validateSchema(userSchema);
const projectNameValidation = validateSchema(projectNameSchema);
const uploadVideoValidation = validateVideoSchema(videoUploadSchema);

module.exports = {
    userRegisterValidation,
    projectNameValidation,
    uploadVideoValidation
};