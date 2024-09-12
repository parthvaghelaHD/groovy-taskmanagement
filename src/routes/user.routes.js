import express from 'express';
import { register, login } from '../controllers/user.controller.js';
import joiValidateMiddleware from '../middlewares/joiValidate.middleware.js';
import userSchema from '../joiValidators/user.validator.js';

const router = express.Router();

// Define routes with validation middleware
router.post('/register', joiValidateMiddleware(userSchema.register, 'body'), register);
router.post('/login', joiValidateMiddleware(userSchema.login, 'body'), login);

export default router;
