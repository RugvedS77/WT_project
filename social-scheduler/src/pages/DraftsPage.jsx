import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faEdit, faClock, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export default function DraftsPage() {
  const [drafts, setDrafts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editFormData, setEditFormData] = useState({
    content: '',
    tags: [],
    visibility: 'Public',
    imageUrl: null,
    scheduleDate: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:3000/api/posts?status=draft', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch drafts');
        
        const data = await response.json();
        setDrafts(data);
      } catch (error) {
        console.error('Error fetching drafts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDrafts();
  }, []);

  const handleEditClick = (post) => {
    setSelectedPost(post._id);
    setEditFormData({
      content: post.content,
      tags: post.tags || [],
      visibility: post.visibility || 'Public',
      imageUrl: post.imageUrl || null,
      scheduleDate: post.scheduledDate || ''
    });
  };

  const handleDeleteDraft = async (postId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) throw new Error('Delete failed');
      
      setDrafts(drafts.filter(draft => draft._id !== postId));
    } catch (error) {
      console.error('Error deleting draft:', error);
    }
  };

  const handleUpdateDraft = async (postId, shouldSchedule = false) => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      
      formData.append('content', editFormData.content);
      formData.append('tags', JSON.stringify(editFormData.tags));
      formData.append('visibility', editFormData.visibility);
      formData.append('isDraft', (!shouldSchedule).toString());
      
      if (shouldSchedule) {
        formData.append('scheduled', 'true');
        formData.append('scheduledDate', editFormData.scheduleDate);
      }

      const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) throw new Error('Update failed');
      
      // Refresh drafts after update
      const draftsRes = await fetch('http://localhost:3000/api/posts?status=draft', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setDrafts(await draftsRes.json());
      
      setSelectedPost(null);
      
      if (shouldSchedule) {
        alert('Post scheduled successfully!');
      } else {
        alert('Draft updated successfully!');
      }
    } catch (error) {
      console.error('Error updating draft:', error);
      alert('Error updating draft');
    }
  };

  const PostEditForm = ({ post }) => (
    <div className="bg-gray-100 p-4 rounded-lg mt-2">
      <textarea
        value={editFormData.content}
        onChange={(e) => setEditFormData({...editFormData, content: e.target.value})}
        className="w-full mb-3 p-2 rounded border"
        rows="3"
        placeholder="What's on your mind?"
      />
      
      <div className="mb-3">
        <label className="block mb-1">Tags (comma separated):</label>
        <input
          type="text"
          value={editFormData.tags.join(', ')}
          onChange={(e) => setEditFormData({...editFormData, tags: e.target.value.split(',').map(tag => tag.trim())})}
          className="w-full p-2 rounded border"
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1">Visibility:</label>
        <select
          value={editFormData.visibility}
          onChange={(e) => setEditFormData({...editFormData, visibility: e.target.value})}
          className="p-2 rounded border w-full"
        >
          <option value="Public">Public</option>
          <option value="Private">Private</option>
          <option value="Friends">Friends Only</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="block mb-1">Schedule Post:</label>
        <input
          type="datetime-local"
          value={editFormData.scheduleDate}
          onChange={(e) => setEditFormData({...editFormData, scheduleDate: e.target.value})}
          className="p-2 rounded border w-full"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleUpdateDraft(post._id)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Update Draft
        </button>
        <button
          onClick={() => handleUpdateDraft(post._id, true)}
          disabled={!editFormData.scheduleDate}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          <FontAwesomeIcon icon={faClock} className="mr-2" />
          Schedule Post
        </button>
        <button
          onClick={() => navigate(`/post/${post._id}`)}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
          Publish Now
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

  const PostCard = ({ post }) => (
    <div className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <span className={`px-2 py-1 text-xs rounded-full ${
            post.visibility === 'Public' ? 'bg-green-100 text-green-800' :
            post.visibility === 'Private' ? 'bg-red-100 text-red-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {post.visibility}
          </span>
          <div className="flex space-x-2">
            <button 
              onClick={() => handleEditClick(post)}
              className="text-gray-500 hover:text-blue-500"
              title="Edit"
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button 
              onClick={() => handleDeleteDraft(post._id)}
              className="text-gray-500 hover:text-red-500"
              title="Delete"
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>
        </div>

        {post.imageUrl && (
          <img 
            src={post.imageUrl} 
            alt="Post content" 
            className="mb-3 rounded-lg w-full h-40 object-cover"
          />
        )}
        
        <p className="text-gray-700 mb-3">
          {post.content.length > 100 
            ? `${post.content.substring(0, 100)}...` 
            : post.content}
        </p>
        
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {post.tags.map((tag, index) => (
              <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 text-xs rounded">
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="text-xs text-gray-500">
          <p>Created: {new Date(post.createdAt).toLocaleString()}</p>
          {post.updatedAt && (
            <p>Last updated: {new Date(post.updatedAt).toLocaleString()}</p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 p-4 md:p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <FontAwesomeIcon icon={faSave} className="mr-3 text-blue-500" />
            My Drafts ({drafts.length})
          </h2>

          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            </div>
          ) : (
            <>
              {drafts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {drafts.map(post => (
                    <div key={post._id}>
                      {selectedPost === post._id ? (
                        <PostEditForm post={post} />
                      ) : (
                        <PostCard post={post} />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <FontAwesomeIcon icon={faSave} size="3x" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-600 mb-2">No drafts found</h3>
                  <p className="text-gray-500 mb-4">You haven't saved any drafts yet.</p>
                  <button
                    onClick={() => navigate('/post/new')}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Create New Post
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}