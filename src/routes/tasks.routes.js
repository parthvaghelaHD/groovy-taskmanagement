import express from 'express';
import {
    addNewTask,
    getAllTasks,
    getTaskById,
    updateTaskById,
    deleteTaskById,
} from '../controllers/task.controller.js';
import joiValidateMiddleware from '../middlewares/joiValidate.middleware.js';
import taskSchema from '../joiValidators/task.validator.js';
import { cacheMiddleware } from '../middlewares/cached-redis.middleware.js';
import asyncHandler from '../helpers/asyncHandler.js'; // Middleware for handling async errors
import { authenticateToken } from '../helpers/jwt.helper.js';

const router = express.Router();

router.use(authenticateToken); // All routes below will require JWT authentication

// Apply Joi validation middleware and async error handling for each route
router
    .route('/')
    .post(joiValidateMiddleware(taskSchema.addTaskSchema, 'body'), asyncHandler(addNewTask))
    .get(cacheMiddleware, asyncHandler(getAllTasks));

router
    .route('/:id')
    .get(asyncHandler(getTaskById))
    .put(joiValidateMiddleware(taskSchema.updateTaskSchema, 'body'), asyncHandler(updateTaskById))
    .delete(asyncHandler(deleteTaskById));

export default router;
