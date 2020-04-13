const mongoose = require('mongoose')

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    completedDate: {
        type: Date,
        required: true,
    },
})

module.exports = Task