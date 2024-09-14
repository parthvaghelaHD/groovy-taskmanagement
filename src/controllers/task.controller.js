/* eslint-disable quotes */
import taskService from '../services/task.service.js';
import apiResponse from '../helpers/apiResponse.helper.js';
import AppError from '../helpers/AppError.js'; // Import AppError
import redisClient from '../helpers/redisClient.js'; // Reuse centralized Redis client

const addNewTask = async (req, res, next) => {
    try {
        const { _id } = req.user;
        let { title, description, status, due_date } = req.body;

        const insertData = await taskService.addNewTask({
            user_id: _id,
            title,
            description,
            status,
            due_date,
        });

        await redisClient.del(`tasks:${_id}`);

        apiResponse(res, {
            code: 201,
            status: 201,
            data: insertData,
            message: 'New task is added.',
        });
    } catch (error) {
        next(error);
    }
};

const getTaskById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const data = await taskService.getTaskById(id, userId);

        if (!data) {
            return next(new AppError('Task not found', 404));
        }

        apiResponse(res, {
            code: 200,
            status: 200,
            data,
        });
    } catch (error) {
        next(error);
    }
};

const getAllTasks = async (req, res, next) => {
    try {
        const { limit, offset } = req.query;
        const paginationOptions = {
            limit: Math.max(0, parseInt(limit, 10)),
            offset: Math.max(0, parseInt(offset, 10)),
        };
        const userId = req.user._id;

        const tasks = await taskService.getAllTasks(userId, paginationOptions);
        await redisClient.setEx(`tasks:${userId}`, 3600, JSON.stringify(tasks));

        apiResponse(res, {
            code: 200,
            status: 200,
            message: 'Data fetched sucessfully.',
            data: tasks,
        });
    } catch (e) {
        next(new AppError('Failed to fetch tasks', 400));
    }
};

const updateTaskById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const { title, description, status, due_date } = req.body;

        const updatedTask = await taskService.updateTaskById(
            id,
            { title, description, status, due_date },
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return next(new AppError('Task not found for update', 404));
        }

        // Invalidate the cache for the user's tasks
        await redisClient.del(`tasks:${userId}`);

        apiResponse(res, {
            code: 200,
            status: 204,
            message: 'Task is updated.',
        });
    } catch (e) {
        next(new AppError('Failed to update task', 400));
    }
};

const deleteTaskById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const deletedTask = await taskService.deleteTaskById(id);

        if (!deletedTask) {
            return next(new AppError('Task not found for deletion', 404));
        }

        // Invalidate the cache for the user
        await redisClient.del(`tasks:${userId}`);

        apiResponse(res, {
            code: 200,
            status: 200,
            message: 'Task deleted successfully.',
        });
    } catch (error) {
        next(error);
    }
};

export { addNewTask, getAllTasks, getTaskById, updateTaskById, deleteTaskById };
