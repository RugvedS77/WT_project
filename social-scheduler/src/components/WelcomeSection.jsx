import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function WelcomeSection() {
  const features = [
    {
      title: 'Schedule Posts',
      description: 'Plan and schedule your social media content across multiple platforms',
      icon: '📅'
    },
    {
      title: 'Analytics',
      description: 'Track your social media performance with detailed analytics',
      icon: '📊'
    },
    {
      title: 'Multiple Platforms',
      description: 'Manage all your social media accounts in one place',
      icon: '🌐'
    },
    {
      title: 'Smart Suggestions',
      description: 'Get AI-powered content suggestions and hashtag recommendations',
      icon: '💡'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row items-center">
          <motion.div 
            className="lg:w-1/2"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Manage Your Social Media Like a Pro
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Schedule, analyze, and optimize your social media content across all platforms from one dashboard.
            </p>
            <div className="space-x-4">
              <Link
                to="/register"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Login
              </Link>
            </div>
          </motion.div>
          <motion.div 
            className="lg:w-1/2 mt-10 lg:mt-0"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="./images/dashboard-preview.png"
              alt="Dashboard Preview"
              className="rounded-lg shadow-xl"
            />
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <motion.h2 
            className="text-3xl font-bold text-center text-gray-900 mb-12"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Everything You Need to Succeed
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="container mx-auto px-6 text-center">
          <motion.h2 
            className="text-3xl font-bold text-white mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Ready to Transform Your Social Media Strategy?
          </motion.h2>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              to="/register"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors inline-block"
            >
              Start Free Trial
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 py-8">
        <div className="container mx-auto px-6 text-center text-gray-600">
          <p>© 2024 Social Scheduler. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}