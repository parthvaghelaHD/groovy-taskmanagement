import Joi from 'joi';

const schemas = {
    login: Joi.object({
        email: Joi.string()
            .email({ tlds: { allow: false } })
            .lowercase()
            .trim()
            .required()
            .messages({
                'string.email': 'Please enter a valid email address.',
                'string.empty': 'Email is required.',
                'any.required': 'Email is required.',
            }),
        password: Joi.string()
            .min(8)
            .max(30)
            .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
            .required()
            .messages({
                'string.pattern.base':
                    'Password must have at least 8 characters, including uppercase, lowercase, number, and special character.',
                'string.empty': 'Password is required.',
                'any.required': 'Password is required.',
            }),
    }).strict(),

    register: Joi.object({
        first_name: Joi.string().min(2).max(50).trim().required().messages({
            'string.empty': 'First name is required.',
            'string.min': 'First name should have at least 2 characters.',
            'string.max': 'First name should not exceed 50 characters.',
            'any.required': 'First name is required.',
        }),
        last_name: Joi.string().min(2).max(50).trim().required().messages({
            'string.empty': 'Last name is required.',
            'string.min': 'Last name should have at least 2 characters.',
            'string.max': 'Last name should not exceed 50 characters.',
            'any.required': 'Last name is required.',
        }),
        email: Joi.string()
            .email({ tlds: { allow: false } })
            .lowercase()
            .trim()
            .required()
            .messages({
                'string.email': 'Please enter a valid email address.',
                'string.empty': 'Email is required.',
                'any.required': 'Email is required.',
            }),
        password: Joi.string()
            .min(8)
            .max(30)
            .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
            .required()
            .messages({
                'string.pattern.base':
                    'Password must have at least 8 characters, including uppercase, lowercase, number, and special character.',
                'string.empty': 'Password is required.',
                'any.required': 'Password is required.',
            }),
        gender: Joi.string().valid('male', 'female', 'other').required().messages({
            'any.only': 'Gender must be either male, female, or other.',
            'any.required': 'Gender is required.',
        }),
        phone: Joi.string()
            .pattern(/^[0-9]{10,15}$/)
            .required()
            .messages({
                'string.pattern.base': 'Phone number must be between 10 to 15 digits.',
                'string.empty': 'Phone number is required.',
                'any.required': 'Phone number is required.',
            }),
        dob: Joi.string().required(),
    }).strict(),
};

export default schemas;
