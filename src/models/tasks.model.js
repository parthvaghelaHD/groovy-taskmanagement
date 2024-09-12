import mongoose from 'mongoose';
import { TASK_STATUS } from '../utils/constants.js';

const schema = mongoose.Schema;
const taskSchema = new schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            index: true, // Indexing user_id
        },
        title: {
            type: String,
            required: true,
            unique: true,
            index: true, // Indexing title
        },
        description: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: [TASK_STATUS.PENDING, TASK_STATUS.IN_PROGRESS, TASK_STATUS.COMPLETED],
            required: true,
        },
        due_date: {
            type: String,
            required: true,
            index: true, // Indexing due_date
        },
    },
    { timestamps: true, autoIndex: true }
);

taskSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        delete returnedObject.__v;
    },
});

const Tasks = mongoose.model('tasks', taskSchema);
export default Tasks;
