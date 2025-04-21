import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faSave, faPaperPlane, faEdit } from '@fortawesome/free-regular-svg-icons';

export default function AnalyticsPage() {
  const [drafts, setDrafts] = useState([]);
  const [scheduledPosts, setScheduledPosts] = useState([]);
  const [publishedPosts, setPublishedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editFormData, setEditFormData] = useState({
    content: '',
    tags: [],
    visibility: 'Private',
    status: 'draft',
    imageUrl: null
  });

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setIsLoading(true);
        
        const [draftsRes, scheduledRes, publishedRes] = await Promise.all([
          fetch('http://localhost:3000/api/posts?status=draft', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }),
          fetch('http://localhost:3000/api/posts?status=scheduled', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }),
          fetch('http://localhost:3000/api/posts?status=published', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
        ]);

        const draftsData = await draftsRes.json();
        const scheduledData = await scheduledRes.json();
        const publishedData = await publishedRes.json();

        setDrafts(draftsData);
        setScheduledPosts(scheduledData);
        setPublishedPosts(publishedData);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  const handleEditClick = (post) => {
    setSelectedPost(post._id);
    setEditFormData({
      content: post.content,
      tags: post.tags,
      visibility: post.visibility,
      status: post.status,
      imageUrl: post.imageUrl
    });
  };

  const handleUpdatePost = async (postId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editFormData),
      });

      if (!response.ok) throw new Error('Update failed');
      
      // Refresh data after update
      const [draftsRes, scheduledRes, publishedRes] = await Promise.all([
        fetch('http://localhost:3000/api/posts?status=draft', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        }),
        fetch('http://localhost:3000/api/posts?status=scheduled', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        }),
        fetch('http://localhost:3000/api/posts?status=published', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        })
      ]);

      setDrafts(await draftsRes.json());
      setScheduledPosts(await scheduledRes.json());
      setPublishedPosts(await publishedRes.json());
      
      setSelectedPost(null);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const PostEditForm = ({ post }) => (
    <div className="bg-gray-100 p-4 rounded-lg mt-2">
      <textarea
        value={editFormData.content}
        onChange={(e) => setEditFormData({...editFormData, content: e.target.value})}
        className="w-full mb-3 p-2 rounded border"
        rows="3"
      />
      
      <div className="mb-3">
        <label className="block mb-1">Tags:</label>
        <input
          type="text"
          value={editFormData.tags.join(',')}
          onChange={(e) => setEditFormData({...editFormData, tags: e.target.value.split(',')})}
          className="w-full p-2 rounded border"
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1">Visibility:</label>
        <select
          value={editFormData.visibility}
          onChange={(e) => setEditFormData({...editFormData, visibility: e.target.value})}
          className="p-2 rounded border"
        >
          <option value="Public">Public</option>
          <option value="Private">Private</option>
          <option value="Friends">Friends</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="block mb-1">Status:</label>
        <select
          value={editFormData.status}
          onChange={(e) => setEditFormData({...editFormData, status: e.target.value})}
          className="p-2 rounded border"
        >
          <option value="draft">Draft</option>
          <option value="scheduled">Scheduled</option>
          <option value="published">Published</option>
        </select>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => handleUpdatePost(post._id)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
        <button
          onClick={() => setSelectedPost(null)}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );

  const PostCategorySection = ({ title, icon, posts }) => (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <FontAwesomeIcon icon={icon} className="mr-2 text-blue-500" />
        {title} ({posts.length})
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map(post => (
          <div key={post._id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium">{post.visibility}</h4>
              {post.status === 'draft' && (
                <button 
                  onClick={() => handleEditClick(post)}
                  className="text-gray-500 hover:text-blue-500"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              )}
            </div>

            {selectedPost === post._id ? (
              <PostEditForm post={post} />
            ) : (
              <>
                {post.imageUrl && (
                  <img 
                    src={post.imageUrl} 
                    alt="Post content" 
                    className="mb-3 rounded-lg w-full h-32 object-cover"
                  />
                )}
                <p className="text-gray-600 mb-2">{post.content.substring(0, 50)}...</p>
                <div className="text-sm text-gray-500">
                  {post.status === 'scheduled' && (
                    <p>Scheduled: {new Date(post.scheduledDate).toLocaleString()}</p>
                  )}
                  <p>Created: {new Date(post.createdAt).toLocaleDateString()}</p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <i className="fas fa-chart-line mr-3"></i> Post Analytics
        </h2>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        ) : (
          <>
            <PostCategorySection
              title="Drafts"
              icon={faSave}
              posts={drafts}
            />

            <PostCategorySection
              title="Scheduled Posts"
              icon={faClock}
              posts={scheduledPosts}
            />

            <PostCategorySection
              title="Published Posts"
              icon={faPaperPlane}
              posts={publishedPosts}
            />
          </>
        )}

        {!isLoading && drafts.length === 0 && scheduledPosts.length === 0 && publishedPosts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No posts found. Start creating content!
          </div>
        )}
      </div>
    </div>
  );
}