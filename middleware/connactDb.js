const mongoose =  require('mongoose');

async function connectDb(){
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ProjectManagment');
        console.log('connect database');
    } catch (error) {
        console.error('Error connecting to the database', error);
    }
}

module.exports = connectDb;