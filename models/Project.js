const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'assigned', 'completed'],
    default: 'available'
  },
  maxStudents: {
    type: Number,
    default: 2,
    max: 2
  },
  assignedStudents: [{
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);