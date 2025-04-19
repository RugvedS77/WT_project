import React, { useState } from 'react';
import { useAuth } from '../components/Settings/AuthContext';
import { toast } from 'react-toastify';

export default function SettingsPage() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    timezone: 'UTC',
    language: 'en',
    notifications: true,
    theme: 'light'
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/user/preferences', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to update settings');
      toast.success('Settings updated successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex-1 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Settings</h1>

        {/* Tabs */}
        <div className="mb-8 border-b">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`pb-4 ${activeTab === 'profile' 
                ? 'border-b-2 border-blue-500 text-blue-600' 
                : 'text-gray-500'}`}
            >
              Profile Settings
            </button>
            <button
              onClick={() => setActiveTab('preferences')}
              className={`pb-4 ${activeTab === 'preferences' 
                ? 'border-b-2 border-blue-500 text-blue-600' 
                : 'text-gray-500'}`}
            >
              Preferences
            </button>
            <button
              onClick={() => setActiveTab('accounts')}
              className={`pb-4 ${activeTab === 'accounts' 
                ? 'border-b-2 border-blue-500 text-blue-600' 
                : 'text-gray-500'}`}
            >
              Connected Accounts
            </button>
          </div>
        </div>

        {/* Profile Settings */}
        {activeTab === 'profile' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Zone
                </label>
                <select
                  name="timezone"
                  value={formData.timezone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="UTC">UTC</option>
                  <option value="EST">Eastern Time</option>
                  <option value="PST">Pacific Time</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Save Changes
              </button>
            </form>
          </div>
        )}

        {/* Preferences */}
        {activeTab === 'preferences' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Language
                </label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>
              </div>
              <div>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="notifications"
                    checked={formData.notifications}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Enable Notifications
                  </span>
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Theme
                </label>
                <select
                  name="theme"
                  value={formData.theme}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Save Preferences
              </button>
            </form>
          </div>
        )}

        {/* Connected Accounts */}
        {activeTab === 'accounts' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <i className="fab fa-linkedin text-2xl text-blue-600"></i>
                  <span className="font-medium">LinkedIn</span>
                </div>
                <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
                  Connect
                </button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <i className="fab fa-twitter text-2xl text-blue-400"></i>
                  <span className="font-medium">Twitter</span>
                </div>
                <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
                  Connect
                </button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <i className="fab fa-facebook text-2xl text-blue-600"></i>
                  <span className="font-medium">Facebook</span>
                </div>
                <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
                  Connect
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}