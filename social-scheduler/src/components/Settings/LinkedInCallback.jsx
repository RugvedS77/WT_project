import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LinkedInCallback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        const error = params.get('error');
        const errorDescription = params.get('error_description');

        if (error || errorDescription) {
          throw new Error(errorDescription || 'LinkedIn authentication failed');
        }

        if (!code) {
          throw new Error('No authorization code received');
        }

        const response = await fetch('http://localhost:3000/api/linkedin/callback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            code,
            redirect_uri: 'http://localhost:5173/social-scheduler/settings' // Ensure this matches your LinkedIn app settings
          }),
          credentials: 'include'
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to connect LinkedIn account');
        }

        navigate('/settings', { state: { success: 'LinkedIn account connected successfully' } });
      } catch (error) {
        console.error('LinkedIn callback error:', error);
        setError(error.message);
        setTimeout(() => {
          navigate('/settings', { 
            state: { error: error.message } 
          });
        }, 3000);
      }
    };

    handleCallback();
  }, [navigate]);

  if (error) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-xl">
          <h2 className="text-red-600 text-xl mb-4">Something went wrong</h2>
          <p className="text-gray-700">{error}</p>
          <p className="text-sm text-gray-500 mt-2">Redirecting to settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-xl mb-4">Connecting LinkedIn Account</h2>
        <p className="text-gray-700">Please wait while we complete the connection...</p>
      </div>
    </div>
  );
};

export default LinkedInCallback;