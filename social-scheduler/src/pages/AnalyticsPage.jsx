import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/Settings/AuthContext';

export default function AnalyticsPage() {
  const { currentUser } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [stats, setStats] = useState({
    totalPosts: 0,
    engagement: 0,
    drafts: 0,
    platformStats: {}
  });
  
  useEffect(() => {
    fetchAnalytics();
  }, [selectedPeriod]);

  const fetchAnalytics = async () => {
    try {
      // Mock data - replace with actual API call
      setStats({
        totalPosts: 45,
        engagement: 78,
        drafts: 5,
        platformStats: {
          'LinkedIn': 15,
          'Twitter': 20,
          'Facebook': 10
        }
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  return (
    <div className="flex-1 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Analytics Dashboard</h1>
        <p className="text-gray-600 mt-2">Track your social media performance</p>
      </div>

      {/* Time Period Selector */}
      <div className="mb-8">
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="quarter">Last Quarter</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Total Posts</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">{stats.totalPosts}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Engagement Rate</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">{stats.engagement}%</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Saved Drafts</h3>
          <p className="text-3xl font-bold text-orange-600 mt-2">{stats.drafts}</p>
        </div>
      </div>

      {/* Platform Performance */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Platform Performance</h2>
        <div className="space-y-4">
          {Object.entries(stats.platformStats).map(([platform, count]) => (
            <div key={platform} className="flex items-center">
              <span className="w-24 text-gray-600">{platform}</span>
              <div className="flex-1 mx-4 h-4 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600"
                  style={{ width: `${(count / stats.totalPosts) * 100}%` }}
                ></div>
              </div>
              <span className="text-gray-600">{count} posts</span>
            </div>
          ))}
        </div>
      </div>

      {/* Drafts Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Drafts</h2>
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">Draft {index + 1}</h3>
                  <p className="text-gray-600 text-sm mt-1">Last modified: {new Date().toLocaleDateString()}</p>
                </div>
                <button className="text-blue-600 hover:text-blue-800">Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}