import Joi from 'joi';

// Enhance security by adding constraints and custom messages
const schemas = {
    addTaskSchema: Joi.object({
        title: Joi.string().min(3).max(100).trim().required().messages({
            'string.base': 'Title should be a string.',
            'string.empty': 'Title is required.',
            'string.min': 'Title should have at least 3 characters.',
            'string.max': 'Title should not exceed 100 characters.',
            'any.required': 'Title is a required field.',
        }),
        description: Joi.string()
            .min(5)
            .max(500)
            .trim()
            .required()
            .messages({
                'string.base': 'Description should be a string.',
                'string.min': 'Description should have at least 5 characters.',
                'string.max': 'Description should not exceed 500 characters.',
            }),
        status: Joi.string().valid('Pending', 'In Progress', 'Completed').required().messages({
            'string.base': 'Status should be a string.',
            'any.only': 'Status must be one of: Pending, In Progress, Completed.',
        }),
        due_date: Joi.string().required(),
    }).strict(),

    updateTaskSchema: Joi.object({
        title: Joi.string().min(3).max(100).trim().optional().messages({
            'string.base': 'Title should be a string.',
            'string.min': 'Title should have at least 3 characters.',
            'string.max': 'Title should not exceed 100 characters.',
        }),
        description: Joi.string().min(5).max(500).trim().optional().messages({
            'string.base': 'Description should be a string.',
            'string.min': 'Description should have at least 5 characters.',
            'string.max': 'Description should not exceed 500 characters.',
        }),
        status: Joi.string().valid('Pending', 'In Progress', 'Completed').optional().messages({
            'string.base': 'Status should be a string.',
            'any.only': 'Status must be one of: Pending, In Progress, Completed.',
        }),
        due_date: Joi.string().required(),
    }).strict(),
};

export default schemas;
