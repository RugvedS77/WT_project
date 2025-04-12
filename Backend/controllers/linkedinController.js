const axios = require('axios');
const querystring = require('querystring');

const CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
const CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;
const REDIRECT_URI = process.env.LINKEDIN_REDIRECT_URI;

exports.getLinkedInAuthUrl = (req, res) => {
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=w_member_social`;
    res.json({ url: authUrl });
};

exports.handleLinkedInCallback = async (req, res) => {
    const { code } = req.query;

    try {
        const tokenResponse = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', querystring.stringify({
            grant_type: 'authorization_code',
            code,
            redirect_uri: REDIRECT_URI,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
        }), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });

        const accessToken = tokenResponse.data.access_token;
        res.json({ accessToken });
    } catch (error) {
        console.error('Error exchanging code for token:', error.response?.data || error.message);
        res.status(500).json({ message: 'Failed to authenticate with LinkedIn' });
    }
};

exports.createLinkedInPost = async (req, res) => {
    const { accessToken, content } = req.body;

    const postData = {
        author: 'urn:li:person:8675309', // Replace with the actual LinkedIn URN
        lifecycleState: 'PUBLISHED',
        specificContent: {
            'com.linkedin.ugc.ShareContent': {
                shareCommentary: { text: content },
                shareMediaCategory: 'NONE',
            },
        },
        visibility: {
            'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
        },
    };

    try {
        const response = await axios.post('https://api.linkedin.com/v2/ugcPosts', postData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });
        res.json({ message: 'Post created successfully', data: response.data });
    } catch (error) {
        console.error('Error creating LinkedIn post:', error.response?.data || error.message);
        res.status(500).json({ message: 'Failed to create LinkedIn post' });
    }
};
