const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// console.log('MONGO_URI:', process.env.MONGO_URI);



const connDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database Connected Successfully.');

    } catch (error) {
        console.error('Can not connect to database.',error.message);
        process.exit(1);
    }
};

module.exports = connDB;