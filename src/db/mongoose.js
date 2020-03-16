const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/to-do', {
    useNewUrlParser: true,
    useCreateIndex: true,
})

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    birthday: {
        type: Date,
        default: new Date(),
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) 
                throw new Error('Email is invalid')
        }
    }
})

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