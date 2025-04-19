import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { useAuth } from './AuthContext';

const SocialAccountsTab = () => {

  const { currentUser } = useAuth();
  const [accounts, setAccounts] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [error, setError] = useState(null);
  
  // Load user-specific accounts on mount
  useEffect(() => {
    if (currentUser) {
      fetchUserAccounts(currentUser.id);
    }
  }, [currentUser]);

  const fetchUserAccounts = async (userId) => {
    const response = await fetch(`/api/users/${userId}/social-accounts`);
    const data = await response.json();
    setAccounts(data.accounts);
  };

  const connectLinkedIn = async () => {
    try {
      setIsConnecting(true);
      const clientId = '867p6n34aeb0et';
      const redirectUri = encodeURIComponent('http://localhost:5173/social-scheduler/settings');
      const scope = encodeURIComponent('openid profile w_member_social');
      const state = encodeURIComponent(Math.random().toString(36).substring(7));

      const authUrl = 
        `https://www.linkedin.com/oauth/v2/authorization?` +
        `response_type=code&` +
        `client_id=${clientId}&` +
        `redirect_uri=${redirectUri}&` +
        `state=${state}&` +
        `scope=${scope}`;

      window.location.href = authUrl;
    } catch (error) {
      console.error('LinkedIn connection error:', error);
      setError('Failed to connect to LinkedIn');
      setIsConnecting(false);
    }
  };

  // Handle LinkedIn callback
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const error = params.get('error');
    const errorDescription = params.get('error_description');

    if (error || errorDescription) {
      setError(errorDescription || 'LinkedIn authentication failed');
      return;
    }

    if (code) {
      handleLinkedInCallback(code);
    }
  }, []);

  const handleLinkedInCallback = async (code) => {
    try {
      const response = await fetch('http://localhost:3000/api/linkedin/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error('Failed to complete LinkedIn authentication');
      }

      const data = await response.json();
      if (data.success) {
        // Add LinkedIn to connected accounts
        setAccounts(prev => [...prev, {
          id: Date.now(),
          platform: 'LinkedIn',
          username: data.profile.localizedFirstName + ' ' + data.profile.localizedLastName,
          connected: true
        }]);
      }
    } catch (error) {
      console.error('LinkedIn callback error:', error);
      setError(error.message);
    } finally {
      setIsConnecting(false);
    }
  };

  const initiateConnection = (platform) => {
    setSelectedPlatform(platform);
    setIsConnecting(true);
    
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

  const fetchLinkedInUserInfo = async (accessToken) => {
    const response = await fetch('/api/linkedin/userinfo', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch user info');
    }
    
    return await response.json();
  };

  const generateRandomString = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  // Show error message if present
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

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
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <h2 className="text-2xl font-bold">Connected Social Accounts</h2>
      
      {/* Connected Accounts List */}
      <div className="space-y-4">
        {accounts.map((account) => (
          <div key={account.id} className="flex justify-between items-center border rounded p-4">
            <div>
              <h4 className="font-medium">{account.platform}</h4>
              <p className="text-sm text-gray-500">{account.username}</p>
              {account.platform === 'LinkedIn' && userProfile && (
                <div className="mt-2 flex items-center">
                  <img 
                    src={userProfile.picture} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span>{userProfile.email}</span>
                </div>
              )}
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