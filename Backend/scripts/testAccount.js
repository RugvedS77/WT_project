const mongoose = require('mongoose');
const Account = require('../models/Account');
const connectDB = require('../mongodb');

const testAccount = async () => {
    try {
        await connectDB();

        const account = new Account({
            userId: new mongoose.Types.ObjectId(),
            username: 'testuser',
            platform: 'facebook',
            isConnected: true,
        });

        const savedAccount = await account.save();
        console.log('Account saved:', savedAccount);
    } catch (error) {
        console.error('Error saving account:', error);
    } finally {
        mongoose.connection.close();
    }
};

testAccount();
