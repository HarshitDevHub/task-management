import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    userId:{
        type: String,
        ref: 'users',
        required: true
    },
    taskTitle:{
        type: String,
        required: true,
    },
    taskContent:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

const Task = mongoose.models.tasks || mongoose.model('tasks', taskSchema)

export default Task;