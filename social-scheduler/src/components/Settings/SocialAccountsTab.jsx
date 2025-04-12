import React, { useState } from 'react';
import { Trash2, Plus } from 'lucide-react';

const SocialAccountsTab = () => {
  const [accounts, setAccounts] = useState([
    { id: 1, platform: 'Instagram', username: '@yourinsta', connected: true },
    { id: 2, platform: 'Twitter', username: '@yourtwitter', connected: true },
    { id: 3, platform: 'LinkedIn', username: 'Your LinkedIn', connected: true },
  ]);

  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState(null);

  const removeAccount = (id) => {
    setAccounts(accounts.filter((acc) => acc.id !== id));
  };

  const initiateConnection = (platform) => {
    setSelectedPlatform(platform);
    setIsConnecting(true);
    
    // Platform-specific OAuth implementation
    switch (platform.toLowerCase()) {
      case 'facebook':
        connectFacebook();
        break;
      case 'instagram':
        connectInstagram();
        break;
      case 'twitter':
        connectTwitter();
        break;
      case 'linkedin':
        connectLinkedIn();
        break;
      case 'youtube':
        connectYouTube();
        break;
      default:
        console.error('Unsupported platform');
    }
  };

  const connectFacebook = () => {
    // Meta (Facebook) Graph API implementation
    const appId = 'YOUR_FACEBOOK_APP_ID';
    const redirectUri = encodeURIComponent('YOUR_REDIRECT_URI');
    const scope = encodeURIComponent('pages_manage_posts,pages_read_engagement');
    
    const authUrl = `https://www.facebook.com/v12.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`;
    
    // Open OAuth window
    window.open(authUrl, '_blank', 'width=600,height=600');
  };

  const connectInstagram = () => {
    // Instagram uses Facebook's Graph API now
    const appId = 'YOUR_FACEBOOK_APP_ID';
    const redirectUri = encodeURIComponent('YOUR_REDIRECT_URI');
    const scope = encodeURIComponent('instagram_basic,instagram_content_publish');
    
    const authUrl = `https://www.facebook.com/v12.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`;
    
    window.open(authUrl, '_blank', 'width=600,height=600');
  };

  const connectTwitter = () => {
    // Twitter OAuth 2.0 implementation
    const clientId = 'YOUR_TWITTER_CLIENT_ID';
    const redirectUri = encodeURIComponent('YOUR_REDIRECT_URI');
    const scope = encodeURIComponent('tweet.read tweet.write users.read offline.access');
    const state = 'twitter-state'; // Should be random and validated later
    
    const authUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}&code_challenge=challenge&code_challenge_method=plain`;
    
    window.open(authUrl, '_blank', 'width=600,height=600');
  };


  const connectLinkedIn = () => {
    const clientId = '867p6n34aeb0et';
    const redirectUri = encodeURIComponent('http://localhost:5173/social-scheduler/');
    const scope = encodeURIComponent('r_liteprofile r_emailaddress w_member_social');
    const state = 'linkedin123'; // You can generate a random one
  
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;
  
    // Open LinkedIn OAuth window
    window.open(authUrl, '_blank', 'width=600,height=600');
  };
  

  const connectYouTube = () => {
    // YouTube (Google) OAuth 2.0 implementation
    const clientId = 'YOUR_GOOGLE_CLIENT_ID';
    const redirectUri = encodeURIComponent('YOUR_REDIRECT_URI');
    const scope = encodeURIComponent('https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube');
    const state = 'youtube-state'; // Should be random and validated later
    
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}&response_type=code&access_type=offline&prompt=consent`;
    
    window.open(authUrl, '_blank', 'width=600,height=600');
  };

  // Available platforms to connect
  const availablePlatforms = [
    { name: 'Facebook', icon: 'facebook', color: 'bg-blue-600' },
    { name: 'Instagram', icon: 'instagram', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { name: 'Twitter', icon: 'twitter', color: 'bg-blue-400' },
    { name: 'LinkedIn', icon: 'linkedin', color: 'bg-blue-700' },
    { name: 'YouTube', icon: 'youtube', color: 'bg-red-600' },
    { name: 'Pinterest', icon: 'pinterest', color: 'bg-red-500' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Connected Social Accounts</h2>
      
      {/* Connected Accounts List */}
      <div className="space-y-4">
        {accounts.map((account) => (
          <div key={account.id} className="flex justify-between items-center border rounded p-4">
            <div>
              <h4 className="font-medium">{account.platform}</h4>
              <p className="text-sm text-gray-500">{account.username}</p>
            </div>
            <button
              onClick={() => removeAccount(account.id)}
              className="text-red-600 hover:text-red-800 flex items-center"
            >
              <Trash2 className="w-4 h-4 mr-1" /> Remove
            </button>
          </div>
        ))}
      </div>

      {/* Add New Account Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Connect New Account</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {availablePlatforms.map((platform, index) => (
            <button
              key={index}
              onClick={() => initiateConnection(platform.name)}
              className={`flex flex-col items-center justify-center p-4 rounded-lg ${platform.color} text-white hover:opacity-90 transition-opacity`}
              disabled={isConnecting}
            >
              <i className={`fab fa-${platform.icon} text-2xl mb-2`}></i>
              <span>{platform.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Connection Status Modal */}
      {isConnecting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Connecting to {selectedPlatform}</h3>
            <p className="mb-4">Please complete the authorization process in the popup window.</p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setIsConnecting(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialAccountsTab;