import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EmojiPicker from './EmojiPicker';

export default function PostEditor() {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [isEditMode, setIsEditMode] = useState(false);
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState('');
    const [visibility, setVisibility] = useState('Public');
    const [scheduleDate, setScheduleDate] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [userData, setUserData] = useState({ name: '', photoUrl: null });
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [connectedAccounts, setConnectedAccounts] = useState([]);
    const [selectedAccounts, setSelectedAccounts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);

    // Initialize component
    useEffect(() => {
        const initializeComponent = async () => {
            try {
                await fetchUserData();
                await fetchConnectedAccounts();
                
                if (postId) {
                    setIsEditMode(true);
                    await fetchPostData(postId);
                }
            } catch (error) {
                console.error('Initialization error:', error);
            } finally {
                setIsLoading(false);
            }
        };
        initializeComponent();
    }, [postId]);

    // Fetch post data for editing
    const fetchPostData = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setContent(data.content);
                setTags(data.tags || []);
                setVisibility(data.visibility || 'Public');
                setScheduleDate(data.scheduledDate || '');
                setSelectedAccounts(data.platforms || []);
                if (data.imageUrl) {
                    // Prepend the backend URL
                    setPreview(`http://localhost:3000${data.imageUrl}`);
                  }
            }
        } catch (err) {
            console.error('Error fetching post:', err);
        }
    };

    // Fetch user data
    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/api/user/userData', {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setUserData({
                    name: data.name || 'User',
                    photoUrl: data.photoUrl || null
                });
            }
        } catch (err) {
            console.error('Error fetching user data:', err);
        }
    };

    // Fetch connected accounts
    const fetchConnectedAccounts = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/api/accounts/connected', {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setConnectedAccounts(data);
            }
        } catch (error) {
            console.error('Error fetching accounts:', error);
        }
    };

    // Handle form submission
    const handleSubmit = async (isDraft = false) => {
        if (!validateForm(isDraft)) return;
        
        setIsProcessing(true);
        const formData = createFormData(isDraft);

        try {
            const token = localStorage.getItem('token');
            const url = isEditMode 
                ? `http://localhost:3000/api/posts/${postId}`
                : 'http://localhost:3000/api/posts';
            
            const method = isEditMode ? 'PUT' : 'POST';
            
            const response = await fetch(url, {
                method,
                headers: { Authorization: `Bearer ${token}` },
                body: formData
            });

            handleSubmissionResponse(response, isDraft);
        } catch (err) {
            console.error('Submission error:', err);
            alert(`Error ${isEditMode ? 'updating' : 'creating'} post`);
        } finally {
            setIsProcessing(false);
        }
    };

    // Form validation
    const validateForm = (isDraft) => {
        if (!isDraft && (!content.trim() && !image)) {
            alert('Please add content or upload an image');
            return false;
        }
        if (!isDraft && selectedAccounts.length === 0) {
            alert('Please select at least one platform');
            return false;
        }
        return true;
    };

    // Create form data
    const createFormData = (isDraft) => {
        const formData = new FormData();
        formData.append('content', content);
        formData.append('tags', JSON.stringify(tags));
        formData.append('visibility', visibility);
        formData.append('scheduled', !!scheduleDate);
        formData.append('scheduledDate', scheduleDate || '');
        formData.append('platforms', JSON.stringify(selectedAccounts));
        formData.append('isDraft', isDraft.toString());
        if (image) formData.append('image', image);
        return formData;
    };

    // Handle API response
    const handleSubmissionResponse = (response, isDraft) => {
        if (response.ok) {
            const action = isEditMode ? 'updated' : 'created';
            const type = isDraft ? 'draft' : 'post';
            alert(`${type.charAt(0).toUpperCase() + type.slice(1)} ${action} successfully!`);
            navigate(isDraft ? '/draft' : '/dashboard');
        } else {
            throw new Error('Submission failed');
        }
    };

    // Handle content change
    const handleContentChange = (e) => {
        const value = e.target.value;
        setContent(value);
        generateRecommendations(value);
    };

    // Handle image upload
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

    // Handle removing image
    const handleRemoveImage = () => {
        setImage(null);
        setPreview(null);
    };

    // Handle account selection
    const handleAccountSelection = (accountId) => {
        setSelectedAccounts(prev => {
            if (prev.includes(accountId)) {
                return prev.filter(id => id !== accountId);
            } else {
                return [...prev, accountId];
            }
        });
    };

    // Handle tag addition
    const handleAddTag = () => {
        if (newTag.trim() && !tags.includes(newTag.trim())) {
            setTags([...tags, newTag.trim()]);
            setNewTag('');
        }
    };

    // Handle tag removal
    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    // Handle emoji selection
    const handleEmojiSelect = (emoji) => {
        setContent(prev => prev + emoji);
        setShowEmojiPicker(false);
    };

    // Generate recommendations based on content
    const generateRecommendations = (input) => {
        const keywordToHashtags = {
            travel: ['#Travel', '#Adventure', '#Wanderlust', '#Explore'],
            food: ['#Foodie', '#Delicious', '#Yummy', '#FoodLover'],
            fitness: ['#Fitness', '#Workout', '#HealthyLiving', '#StayFit'],
            tech: ['#Technology', '#Innovation', '#TechLife', '#Gadgets'],
            fashion: ['#Fashion', '#Style', '#OOTD', '#Trendy'],
            music: ['#Music', '#Melody', '#Playlist', '#LiveMusic'],
            art: ['#Art', '#Creativity', '#Inspiration', '#Artwork'],
            education: ['#Education', '#Learning', '#Knowledge', '#Study'],
            sports: ['#Sports', '#Athlete', '#GameDay', '#Teamwork'],
            photography: ['#Photography', '#PhotoOfTheDay', '#InstaPic', '#Capture'],
        };

        const keywords = input.toLowerCase().split(' ').filter((word) => word.length > 3);
        const suggestions = new Set();

        keywords.forEach((keyword) => {
            if (keywordToHashtags[keyword]) {
                keywordToHashtags[keyword].forEach((hashtag) => suggestions.add(hashtag));
            }
        });

        setRecommendations(Array.from(suggestions));
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-6 relative">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
                <i className={`fas ${isEditMode ? 'fa-edit' : 'fa-plus-circle'} mr-3`}></i>
                {isEditMode ? 'Edit Post' : 'Create New Post'}
            </h2>

            <div className="flex items-start space-x-4">
                {/* User Avatar Section */}
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {userData.photoUrl ? (
                        <img src={`http://localhost:3000${userData.photoUrl}`} 
                             alt="Profile" 
                             className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-gray-500 font-bold text-xl">
                            {userData.name.charAt(0).toUpperCase()}
                        </span>
                    )}
                </div>

                {/* Post Content Section */}
                <div className="flex-1">
                    {/* Post content textarea */}
                    <textarea
                        value={content}
                        onChange={handleContentChange}
                        rows="4"
                        className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="What's on your mind?"
                        maxLength="280"
                    ></textarea>
                    <div className="text-right text-sm text-gray-500 mt-1">
                        {content.length}/280
                    </div>

                    {/* Small image preview */}
                    {preview && (
                        <div className="mt-4 relative w-32 h-32">
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-full object-cover rounded-lg border"
                            />
                            <button
                                onClick={handleRemoveImage}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                            >
                                ×
                            </button>
                        </div>
                    )}

                    {/* Social Media Account Selection */}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">Post to:</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {connectedAccounts.map((account) => (
                                <div
                                    key={account.id}
                                    onClick={() => handleAccountSelection(account.id)}
                                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                                        selectedAccounts.includes(account.id)
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-200 hover:bg-gray-50'
                                    }`}
                                >
                                    <div className="flex items-center space-x-2">
                                        <div className="w-8 h-8 rounded-full overflow-hidden">
                                            <img
                                                src={account.profilePic}
                                                alt={`${account.platform} profile`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">{account.platform}</p>
                                            <p className="text-xs text-gray-500">{account.username}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tags section */}
                    <div className="mt-4">
                        <div className="flex items-center">
                            <input
                                type="text"
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                placeholder="Add a tag"
                                className="p-2 border rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500 flex-1"
                            />
                            <button
                                onClick={handleAddTag}
                                className="bg-blue-500 text-white py-2 px-4 rounded-r-lg hover:bg-blue-600"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap mt-2 gap-2">
                            {tags.map((tag) => (
                                <div key={tag} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center">
                                    {tag}
                                    <button
                                        onClick={() => handleRemoveTag(tag)}
                                        className="ml-2 text-blue-600 hover:text-blue-900"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Hashtag recommendations */}
                    {recommendations.length > 0 && (
                        <div className="mt-4">
                            <p className="text-sm text-gray-600 mb-1">Suggested hashtags:</p>
                            <div className="flex flex-wrap gap-2">
                                {recommendations.map((tag) => (
                                    <button
                                        key={tag}
                                        onClick={() => setContent(prev => `${prev} ${tag}`)}
                                        className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm hover:bg-gray-200"
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Visibility and scheduling options */}
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Visibility</label>
                            <select
                                value={visibility}
                                onChange={(e) => setVisibility(e.target.value)}
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                <option value="Public">Public</option>
                                <option value="Friends">Friends Only</option>
                                <option value="Private">Private</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Schedule Post</label>
                            <input
                                type="datetime-local"
                                value={scheduleDate}
                                onChange={(e) => setScheduleDate(e.target.value)}
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Emoji picker */}
                    {showEmojiPicker && (
                        <div className="absolute z-10 mt-2">
                            <EmojiPicker onSelect={handleEmojiSelect} />
                        </div>
                    )}

                    {/* Post action buttons */}
                    <div className="mt-4 flex items-center space-x-4">
                        <label className="cursor-pointer text-blue-500 hover:text-blue-700">
                            <i className="fas fa-image mr-2"></i> Upload Image
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                        </label>
                        
                        <button
                            onClick={() => handleSubmit(false)}
                            disabled={isProcessing}
                            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                        >
                            {isProcessing ? 'Processing...' : (isEditMode ? 'Update Post' : 'Post Now')}
                        </button>
                        <button
                            onClick={() => handleSubmit(true)}
                            disabled={isProcessing}
                            className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 disabled:opacity-50"
                        >
                            {isProcessing ? 'Saving...' : 'Save Draft'}
                        </button>
                        <button
                            onClick={() => navigate(-1)}
                            className="bg-gray-300 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>

                    {/* Post Review Section */}
                    <div className="mt-8 border-t pt-6">
                        <h3 className="text-lg font-semibold mb-4">Post Preview</h3>
                        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                            {/* Profile Section */}
                            <div className="flex items-center p-4">
                                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                    {userData.photoUrl ? (
                                        <img
                                            src={`http://localhost:3000${userData.photoUrl}`}
                                            alt="User Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-gray-500 font-bold text-xl">
                                            {userData.name.charAt(0).toUpperCase()}
                                        </span>
                                    )}
                                </div>
                                <div className="ml-4">
                                    <p className="font-bold text-gray-800">{userData.name || 'User Name'}</p>
                                    <p className="text-sm text-gray-500">Just now</p>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="px-4 pb-4">
                                <p className="text-gray-800">{content || 'Your post content will appear here...'}</p>
                            </div>

                            {/* Image Section */}
                            {preview && (
                                <div className="w-full bg-gray-100 flex justify-center items-center">
                                    <img
                                        src={preview}
                                        alt="Uploaded Preview"
                                        className="max-w-full max-h-96 object-contain"
                                    />
                                </div>
                            )}

                            {/* Tags Section */}
                            {tags.length > 0 && (
                                <div className="px-4 py-2">
                                    <div className="flex flex-wrap gap-2">
                                        {tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="bg-blue-100 text-blue-600 py-1 px-3 rounded-full text-sm"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Interaction Section */}
                            <div className="border-t px-4 py-2 flex justify-between items-center">
                                <button className="flex items-center text-gray-500 hover:text-blue-500">
                                    <i className="far fa-thumbs-up mr-2"></i> Like
                                </button>
                                <button className="flex items-center text-gray-500 hover:text-blue-500">
                                    <i className="far fa-comment mr-2"></i> Comment
                                </button>
                                <button className="flex items-center text-gray-500 hover:text-blue-500">
                                    <i className="far fa-share-square mr-2"></i> Share
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}