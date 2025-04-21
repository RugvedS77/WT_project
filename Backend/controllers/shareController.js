// Backend Controller (shareController.js)
const Post = require('../models/Post');
const Account = require('../models/Account');

exports.sharePost = async (req, res) => {
  try {
    const { postId, platforms } = req.body;
    const userId = req.user._id;
    
    const post = await Post.findOne({ _id: postId, userId });
    if (!post) return res.status(404).json({ error: 'Post not found' });

    // Get user's connected accounts
    const accounts = await Account.findOne({ userId });
    const connected = accounts.platforms.filter(p => p.isConnected);

    // Share to each selected platform
    const results = {};
    for (const platform of platforms) {
      try {
        switch(platform.toLowerCase()) {
          case 'linkedin':
            results.linkedin = await shareToLinkedIn(post, userId);
            break;
          // Add cases for other platforms
        }
      } catch (error) {
        results[platform] = { error: error.message };
      }
    }

    res.json(results);
  } catch (error) {
    console.error('Sharing error:', error);
    res.status(500).json({ error: 'Failed to share post' });
  }
};

async function shareToLinkedIn(post, userId) {
  // Get LinkedIn access token
  const account = await Account.findOne({
    userId,
    'platforms.platform': 'linkedin',
    'platforms.isConnected': true
  });
  
  const linkedInAccount = account.platforms.find(p => p.platform === 'linkedin');
  if (!linkedInAccount) throw new Error('LinkedIn not connected');

  // Construct LinkedIn API request
  const payload = {
    author: `urn:li:person:${linkedInAccount.profileId}`,
    lifecycleState: "PUBLISHED",
    specificContent: {
      "com.linkedin.ugc.ShareContent": {
        shareCommentary: {
          text: post.content
        },
        shareMediaCategory: "NONE"
      }
    },
    visibility: {
      "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
    }
  };

  // Make LinkedIn API call
  const response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${linkedInAccount.accessToken}`,
      'X-Restli-Protocol-Version': '2.0.0',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`LinkedIn API error: ${error}`);
  }

  return { success: true, id: response.headers.get('X-RestLi-Id') };
}