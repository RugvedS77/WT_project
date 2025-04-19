const axios = require('axios');

const CLIENT_ID = '867p6n34aeb0et';
const CLIENT_SECRET = 'WPL_AP1.99O7R67WtGelbmY1.SQsBYA==';
const REDIRECT_URI = 'http://localhost:5173/social-scheduler/settings';

exports.getLinkedInAuthUrl = (req, res) => {
    try {
        const scope = encodeURIComponent('openid profile w_member_social');
        const state = Buffer.from(JSON.stringify({
            timestamp: Date.now(),
            returnTo: '/settings'
        })).toString('base64');

        const authUrl = `https://www.linkedin.com/oauth/v2/authorization` +
            `?response_type=code` +
            `&client_id=${CLIENT_ID}` +
            `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
            `&state=${state}` +
            `&scope=${scope}`;

        res.json({ url: authUrl });
    } catch (error) {
        console.error('LinkedIn auth error:', error);
        res.status(500).json({ error: 'Failed to generate auth URL' });
    }
};

exports.handleCallback = async (req, res) => {
    try {
        const { code, state } = req.body;
        
        // Exchange code for access token
        const tokenResponse = await axios.post('http://localhost:3000/api/linkedin/callback', null, {
            params: {
                grant_type: 'authorization_code',
                code,
                redirect_uri: REDIRECT_URI,
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET
            }
        });

        const { access_token, expires_in } = tokenResponse.data;

        // Get user profile
        const profileResponse = await axios.get('https://api.linkedin.com/v2/me', {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });

        res.json({
            success: true,
            profile: profileResponse.data,
            access_token,
            expires_in
        });
    } catch (error) {
        console.error('LinkedIn callback error:', error.response?.data || error);
        res.status(500).json({
            error: 'Failed to complete LinkedIn authentication',
            details: error.message
        });
    }
};

exports.getUserInfo = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header missing' });
    }

    try {
        const response = await axios.get('https://api.linkedin.com/v2/userinfo', {
            headers: {
                'Authorization': authHeader
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('LinkedIn userinfo error:', error.response?.data || error.message);
        res.status(400).json({ error: 'Failed to fetch user info' });
    }
};
