const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'student', 'teacher'],
        default: 'student'
    },
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    },
    fullName: {
        type: String,
        required: true
    },
    // Additional fieFlds for students
    studentId: {
        type: String,
        sparse: true
    },
    proposalsSubmitted: {
        type: Number,
        default: 0
    },
    finalProject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'  
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('User', userSchema);