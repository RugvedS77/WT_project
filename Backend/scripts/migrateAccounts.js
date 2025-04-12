const mongoose = require('mongoose');
const Account = require('../models/Account');

const migrateAccounts = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/yourDatabaseName');

        const accounts = await Account.find();
        const userAccountsMap = {};

        // Group platforms by userId
        accounts.forEach((account) => {
            if (!userAccountsMap[account.userId]) {
                userAccountsMap[account.userId] = [];
            }
            userAccountsMap[account.userId].push({
                platform: account.platform,
                isConnected: account.isConnected,
                accessToken: account.accessToken,
                profileId: account.profileId,
            });
        });

        // Consolidate into a single document per user
        for (const userId in userAccountsMap) {
            await Account.findOneAndUpdate(
                { userId },
                { platforms: userAccountsMap[userId] },
                { upsert: true }
            );
        }

        console.log('Migration completed successfully!');
    } catch (error) {
        console.error('Error during migration:', error);
    } finally {
        mongoose.connection.close();
    }
};

migrateAccounts();
