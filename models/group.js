const mongoose = require('mongoose');


const groupSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true
    },
    studentcreaterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true

    },
    groupDescription: {
        type: String,
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    status: {
        type: String,
        enum: ['available', 'assigned', 'completed'],
        default: 'available'
    },
    maxStudents: {
        type: Number,
        default: 3 ,
        max: 3
    },
    students: [{
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        status: {
            type: String,
            enum: ['pending', 'accepted'],
            default: 'pending'
        },
        requestedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }]
    }, {
    timestamps: true
    });
    
    module.exports = mongoose.model('Group', groupSchema);