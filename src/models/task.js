const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
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
    required: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
}, {
  timestamps: true
});

const Task = mongoose.model('Task', taskSchema)

module.exports = Task;
