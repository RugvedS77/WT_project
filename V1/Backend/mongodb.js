const { default: mongoose } = require("mongoose");

const connectDB = async()=>{
    try{
        await mongoose.connect('mongodb+srv://rugvedsawant2510:NzKHp0PwuYsJPi4e@socials.nkhl9.mongodb.net/?retryWrites=true&w=majority&appName=Socials')
        console.log('DB connected')
    }
    catch(error){
        console.error('Failed to connect', error);
        process.exit(1); // Exit process with failure
    }
}

module.exports = connectDB;
