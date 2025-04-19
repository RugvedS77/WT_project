import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/Settings/AuthContext';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({
    totalPosts: 0,
    scheduledPosts: 0,
    drafts: 0
  });
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    // Fetch dashboard data
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch stats and recent posts (mock data for now)
      setStats({
        totalPosts: 15,
        scheduledPosts: 5,
        drafts: 3
      });

      setRecentPosts([
        {
          id: 1,
          content: "Check out our latest updates!",
          platform: "LinkedIn",
          status: "Scheduled",
          scheduledFor: "2024-02-20T10:00:00"
        },
        // Add more mock posts as needed
      ]);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  return (
    <div className="flex-1 p-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome back, {currentUser?.name || 'User'}!
        </h1>
        <p className="text-gray-600 mt-2">
          Here's an overview of your social media activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Total Posts</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">{stats.totalPosts}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Scheduled Posts</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">{stats.scheduledPosts}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Drafts</h3>
          <p className="text-3xl font-bold text-orange-600 mt-2">{stats.drafts}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex space-x-4">
          <Link
            to="/create-post"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create New Post
          </Link>
          <Link
            to="/analytics"
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            View Analytics
          </Link>
        </div>
      </div>

      {/* Recent Posts */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Recent Posts</h2>
        <div className="bg-white rounded-lg shadow-md">
          {recentPosts.map(post => (
            <div key={post.id} className="border-b last:border-b-0 p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-800">{post.content}</p>
                  <div className="flex items-center mt-2 space-x-4">
                    <span className="text-sm text-gray-600">{post.platform}</span>
                    <span className={`text-sm px-2 py-1 rounded ${
                      post.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {post.status}
                    </span>
                  </div>
                </div>
                {post.scheduledFor && (
                  <span className="text-sm text-gray-500">
                    {new Date(post.scheduledFor).toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}