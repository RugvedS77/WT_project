export default function Profile() {
    return (
      <>
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
            <div className="text-center">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Profile" className="w-32 h-32 rounded-full mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Sarah Johnson</h2>
              <p className="text-gray-600">Social Media Manager</p>
              <button className="mt-4 bg-blue-500 text-white py-1 px-4 rounded text-sm hover:bg-blue-600">
                <i className="fas fa-edit mr-1"></i> Edit Profile
              </button>
            </div>
            
            <div className="flex-1">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <i className="fas fa-info-circle mr-2"></i> About
                </h3>
                <p className="text-gray-700">
                  Experienced social media manager with 5+ years in digital marketing. 
                  Passionate about creating engaging content and growing online communities.
                </p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <i className="fas fa-link mr-2"></i> Contact Information
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <i className="fas fa-envelope text-gray-500 mr-3 w-5"></i>
                    <span>sarah.johnson@example.com</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-phone text-gray-500 mr-3 w-5"></i>
                    <span>(123) 456-7890</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-map-marker-alt text-gray-500 mr-3 w-5"></i>
                    <span>San Francisco, CA</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <i className="fas fa-share-alt mr-2"></i> Social Profiles
                </h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-blue-500 hover:text-blue-700">
                    <i className="fab fa-facebook-f text-2xl"></i>
                  </a>
                  <a href="#" className="text-pink-500 hover:text-pink-700">
                    <i className="fab fa-instagram text-2xl"></i>
                  </a>
                  <a href="#" className="text-blue-400 hover:text-blue-600">
                    <i className="fab fa-twitter text-2xl"></i>
                  </a>
                  <a href="#" className="text-red-500 hover:text-red-700">
                    <i className="fab fa-youtube text-2xl"></i>
                  </a>
                  <a href="#" className="text-gray-700 hover:text-gray-900">
                    <i className="fab fa-linkedin-in text-2xl"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6 mt-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <i className="fas fa-calendar-check mr-2"></i> Recent Activity
          </h3>
          {/* Recent activity content would go here */}
        </div>
      </>
    );
  }