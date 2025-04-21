const Account = require('../models/Account');

exports.getAccounts = async (req, res) => {
    try {
        const accounts = await Account.find({ userId: req.user._id });
        res.json(accounts);
    } catch (error) {
        console.error('Error fetching accounts:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Recalculate the connectedCount dynamically
const recalculateConnectedCount = async (userId) => {
    const account = await Account.findOne({ userId });
    if (account) {
        const actualConnectedCount = account.platforms.filter((p) => p.isConnected).length;
        account.connectedCount = actualConnectedCount; // Update the connectedCount
        await account.save(); // Save the updated account
    }
};

// Link (connect) a platform
exports.linkAccount = async (req, res) => {
    try {
        const { platform } = req.body;

        if (!platform || !['facebook', 'instagram', 'twitter', 'youtube', 'linkedin'].includes(platform)) {
            return res.status(400).json({ message: 'Invalid or unsupported platform' });
        }

        console.log(`Connecting platform: ${platform} for user: ${req.user._id}`);

        // Remove any existing entry for the platform
        await Account.updateOne(
            { userId: req.user._id },
            { $pull: { platforms: { platform } } }
        );

        // Add the new platform entry
        const account = await Account.findOneAndUpdate(
            { userId: req.user._id },
            {
                $push: {
                    platforms: {
                        platform,
                        isConnected: true,
                        accessToken: req.body.accessToken || null,
                        profileId: req.body.profileId || null,
                    },
                },
            },
            { new: true, upsert: true }
        );

        res.json({ message: `${platform} connected successfully`, account });
    } catch (error) {
        console.error('Error linking account:', error);
        res.status(500).json({ message: 'Failed to connect account' });
    }
};

// Disconnect a platform
exports.disconnectAccount = async (req, res) => {
    try {
        const { platform } = req.body;

        if (!platform || !['facebook', 'instagram', 'twitter', 'youtube', 'linkedin'].includes(platform)) {
            return res.status(400).json({ message: 'Invalid or unsupported platform' });
        }

        console.log(`Disconnecting platform: ${platform} for user: ${req.user._id}`);

        const account = await Account.findOneAndUpdate(
            { userId: req.user._id, 'platforms.platform': platform },
            {
                $set: {
                    'platforms.$.isConnected': false,
                    'platforms.$.accessToken': null,
                    'platforms.$.profileId': null,
                },
            },
            { new: true }
        );

        if (!account) {
            return res.status(404).json({ message: 'Platform not found' });
        }

        res.json({ message: `${platform} disconnected successfully`, account });
    } catch (error) {
        console.error('Error disconnecting account:', error);
        res.status(500).json({ message: 'Failed to disconnect account' });
    }
};

// Create a default account (used during user registration)
exports.createDefaultAccount = async (userId, username) => {
    try {
        const defaultAccount = new Account({
            userId,
            username,
            platform: 'default',
            isConnected: false,
        });
        await defaultAccount.save();
        return defaultAccount;
    } catch (error) {
        console.error('Error creating default account:', error);
        throw new Error('Failed to create default account');
    }
};

// Fetch connected accounts
exports.getConnectedAccounts = async (req, res) => {
    try {
      const account = await Account.findOne({ userId: req.user._id });
      
      if (!account) {
        return res.status(404).json({ error: 'Account not found' });
      }
  
      const connectedPlatforms = account.platforms.filter(p => p.isConnected);
      res.status(200).json(connectedPlatforms);
  
    } catch (error) {
      console.error('Error fetching connected accounts:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };

exports.getPlatformDictionary = async (req, res) => {
    try {
        const platformDictionary = await Account.getPlatformDictionary(req.user._id); // Fetch dictionary for the user
        res.json({ Platform: platformDictionary }); // Wrap the list in a "Platform" key
    } catch (error) {
        console.error('Error fetching platform dictionary:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get the number of connected platforms
exports.getConnectedPlatformCount = async (req, res) => {
    try {
        const account = await Account.findOne({ userId: req.user._id });

        if (!account) {
            return res.status(404).json({ message: 'No account found for the user' });
        }

        // Recalculate the connectedCount
        await recalculateConnectedCount(req.user._id);

        res.json({ connectedCount: account.connectedCount });
    } catch (error) {
        console.error('Error fetching connected platform count:', error);
        res.status(500).json({ message: 'Failed to fetch connected platform count' });
    }
};
