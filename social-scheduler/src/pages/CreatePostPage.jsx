import { useState } from 'react';
import { useAuth } from '../components/Settings/AuthContext';
import { toast } from 'react-toastify';
import PostPreview from '../components/CreatePost/PostPreview';

export default function CreatePostPage() {
  const { currentUser } = useAuth();
  const [content, setContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [scheduleDate, setScheduleDate] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const platforms = [
    { id: 'linkedin', name: 'LinkedIn', icon: 'fab fa-linkedin' },
    { id: 'twitter', name: 'Twitter', icon: 'fab fa-twitter' },
    { id: 'facebook', name: 'Facebook', icon: 'fab fa-facebook' }
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      toast.error('Please add some content to your post');
      return;
    }

    if (selectedPlatforms.length === 0) {
      toast.error('Please select at least one platform');
      return;
    }

    const formData = new FormData();
    formData.append('content', content);
    formData.append('platforms', JSON.stringify(selectedPlatforms));
    if (scheduleDate) {
      formData.append('scheduledDate', scheduleDate);
    }
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch('http://localhost:3000/api/posts/create', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      toast.success('Post created successfully!');
      setContent('');
      setSelectedPlatforms([]);
      setScheduleDate('');
      setImage(null);
      setPreview(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex-1 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Create New Post</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Content Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Post Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="4"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="What's on your mind?"
              />
            </div>

            {/* Platform Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Platforms
              </label>
              <div className="flex flex-wrap gap-4">
                {platforms.map((platform) => (
                  <button
                    key={platform.id}
                    type="button"
                    onClick={() => {
                      setSelectedPlatforms(prev => 
                        prev.includes(platform.id)
                          ? prev.filter(id => id !== platform.id)
                          : [...prev, platform.id]
                      );
                    }}
                    className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                      selectedPlatforms.includes(platform.id)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    <i className={platform.icon}></i>
                    <span>{platform.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer inline-block px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <i className="fas fa-image mr-2"></i>
                Upload Image
              </label>
              {preview && (
                <div className="mt-4 relative inline-block">
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-32 w-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImage(null);
                      setPreview(null);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>

            {/* Schedule */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Schedule Post
              </label>
              <input
                type="datetime-local"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {scheduleDate ? 'Schedule Post' : 'Post Now'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setContent('');
                  setSelectedPlatforms([]);
                  setScheduleDate('');
                  setImage(null);
                  setPreview(null);
                }}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Clear
              </button>
            </div>
          </form>
        </div>

        {/* Preview Section */}
        {(content || preview) && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Post Preview</h2>
            <PostPreview
              content={content}
              image={preview}
              platforms={selectedPlatforms}
              scheduledTime={scheduleDate}
            />
          </div>
        )}
      </div>
    </div>
  );
}