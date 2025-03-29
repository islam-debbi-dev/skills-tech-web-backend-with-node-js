const mongoos = require('mongoose');

const userSchema = new mongoos.Schema({
    username:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type:String,
        enum:['admin', 'student', 'teacher'],
        default: 'student'
    }
});

module.exports = userSchema;