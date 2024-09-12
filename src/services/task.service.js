import TaskModel from '../models/tasks.model.js';

const addNewTask = async (params) => {
    const newTask = new TaskModel(params);
    return await newTask.save();
};

const updateTaskById = async (id, params) => {
    return await TaskModel.findByIdAndUpdate(id, params, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
};

const deleteTaskById = async (id) => {
    return await TaskModel.findOneAndDelete({ _id: id });
};

const getTaskById = async (_id, userId) => {
    return await TaskModel.findOne({ _id: _id, user_id: userId });
};

const getAllTasks = async (userId, paginationOptions) => {
    return await TaskModel.find({ user_id: userId })
        .skip(paginationOptions.offset)
        .limit(paginationOptions.limit)
        .populate('user_id', 'first_name last_name email')
        .sort({ due_date: 1 })
        .exec();
};

const taskService = {
    addNewTask,
    getTaskById,
    getAllTasks,
    updateTaskById,
    deleteTaskById,
};

export default taskService;
