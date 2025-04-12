// pages/UserDataDeletionPage.js
import React, { useState } from 'react';
import axios from 'axios';

const UserDataDeletionPage = () => {
  const [deletionStatus, setDeletionStatus] = useState(null);

  // Function to handle the data deletion
  const handleDataDeletion = async () => {
    try {
      const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage
      const response = await axios.delete(`/api/delete-user-data/${userId}`);
      
      if (response.status === 200) {
        setDeletionStatus('Your account and data have been successfully deleted.');
        // Optionally log the user out after data deletion
        localStorage.removeItem('token');
        localStorage.removeItem('isAuthenticated');
        // Redirect to login or landing page
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Error deleting user data:', error);
      setDeletionStatus('There was an error deleting your data. Please try again.');
    }
  };

  return (
    <div className="user-data-deletion">
      <h1>Delete Your Account and Data</h1>
      <p>By deleting your account, all your data will be permanently removed. This action cannot be undone.</p>
      
      <button onClick={handleDataDeletion} className="delete-button">
        Delete My Account and Data
      </button>

      {deletionStatus && <p>{deletionStatus}</p>}
    </div>
  );
};

export default UserDataDeletionPage;
