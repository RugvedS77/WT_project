const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI; // Ensure this matches the variable in the .env file
        if (!uri) {
            throw new Error('MONGO_URI is not defined in the environment variables');
        }

        const conn = await mongoose.connect(uri); // Removed deprecated options

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDB;