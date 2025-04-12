export default function RecentActivity() {
    const recentPosts = [
      {
        image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
        title: 'New Product Launch!',
        content: 'Excited to share our new product with the world! #innovation #tech',
        time: 'Scheduled: Jun 15, 10:00 AM',
        platforms: ['facebook-f', 'instagram'],
        status: 'scheduled'
      },
      {
        title: 'Webinar Announcement',
        content: 'Join us for the upcoming webinar on AI trends. Register now at example.com/webinar #AI #TechTalk',
        time: 'Posted: Jun 10, 2:30 PM',
        platforms: ['twitter'],
        status: 'posted'
      }
    ];
  
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <i className="fas fa-clock mr-3"></i> Recent Activity
          </h2>
          <button className="text-blue-500 hover:text-blue-700 flex items-center">
            <i className="far fa-calendar-alt mr-2"></i> View Calendar
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentPosts.map((post, index) => (
            <div key={index} className="post-card bg-white border rounded-lg overflow-hidden shadow-sm">
              {post.image && (
                <img src={post.image} alt="Post" className="w-full h-48 object-cover" />
              )}
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" className="w-8 h-8 rounded-full mr-2" />
                  <span className="font-medium">Sarah Johnson</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-700 mb-4">{post.content}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>
                    <i className={`far ${post.status === 'scheduled' ? 'fa-clock' : 'fa-check-circle'} mr-1 ${post.status === 'posted' ? 'text-green-500' : ''}`}></i>
                    {post.time}
                  </span>
                  <div className="flex space-x-2">
                    {post.platforms.map((platform, i) => (
                      <span key={i}>
                        <i className={`fab fa-${platform} ${platform === 'facebook-f' ? 'text-blue-500' : platform === 'instagram' ? 'text-pink-500' : 'text-blue-400'}`}></i>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }