import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import EmojiPicker from './EmojiPicker';
import { toast } from 'react-toastify';

export default function PostCreation() {
    const { currentUser } = useAuth();
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState('');
    const [visibility, setVisibility] = useState('Public');
    const [scheduleDate, setScheduleDate] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [userData, setUserData] = useState({
        name: '',
        photoUrl: null,
    });
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [connectedAccounts, setConnectedAccounts] = useState([]);
    const [selectedAccounts, setSelectedAccounts] = useState([]);
    const [isLoadingAccounts, setIsLoadingAccounts] = useState(true);

    // Fetch user data and connected accounts
    useEffect(() => {
        fetchUserData();
        fetchConnectedAccounts();
    }, []);

    // Mock function to fetch connected accounts - replace with actual API call
    const fetchConnectedAccounts = async () => {
        setIsLoadingAccounts(true);
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Mock data - replace with actual API response
            const mockAccounts = [
                {
                    id: 'facebook-123',
                    platform: 'Facebook',
                    username: 'john_doe',
                    profilePic: 'https://graph.facebook.com/john_doe/picture?type=square',
                    connected: true
                },
                {
                    id: 'twitter-456',
                    platform: 'Twitter',
                    username: '@johndoe',
                    profilePic: 'https://pbs.twimg.com/profile_images/1234567890/johndoe_normal.jpg',
                    connected: true
                },
                {
                    id: 'linkedin-789',
                    platform: 'LinkedIn',
                    username: 'John Doe',
                    profilePic: 'https://media.licdn.com/dms/image/C5603AQHK1mQ7MoeY7g/profile-displayphoto-shrink_100_100/0/1234567890',
                    connected: true
                },
                {
                    id: 'instagram-101',
                    platform: 'Instagram',
                    username: 'john.doe',
                    profilePic: 'https://instagram.com/john.doe/profile.jpg',
                    connected: true
                }
            ];
            
            setConnectedAccounts(mockAccounts);
        } catch (error) {
            console.error('Error fetching connected accounts:', error);
        } finally {
            setIsLoadingAccounts(false);
        }
    };

    // Fetch user data for profile photo
    async function fetchUserData() {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const response = await fetch('http://localhost:3000/api/user/userData', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUserData({
                    name: data.name || 'Unknown User',
                    photoUrl: data.photoUrl || null,
                });
            }
        } catch (err) {
            console.error('Error fetching user data:', err);
        }
    }

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

    // Handle post submission
    const handlePost = async () => {
        if (!content.trim() && !image) {
            alert('Please add some content or upload an image.');
            return;
        }

        if (selectedAccounts.length === 0) {
            alert('Please select at least one social media account to post to.');
            return;
        }

        const formData = new FormData();
        formData.append('content', content);
        formData.append('tags', JSON.stringify(tags));
        formData.append('visibility', visibility);
        formData.append('scheduled', scheduleDate ? true : false);
        formData.append('scheduledDate', scheduleDate || '');
        formData.append('platforms', JSON.stringify(selectedAccounts));
        if (image) formData.append('image', image);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/api/posts/create', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                alert('Post created successfully!');
                handleClearForm();
            } else {
                alert('Failed to create post.');
            }
        } catch (err) {
            console.error('Error creating post:', err);
        }
    };

    // Handle saving as draft
    const saveDraft = async () => {
        if (!currentUser) {
            toast.error('Please login to save drafts');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/drafts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: currentUser._id,
                    content: content,
                    platform: selectedAccounts,
                    scheduledTime: scheduleDate,
                    mediaUrls: image ? [preview] : []
                }),
                credentials: 'include'
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to save draft');
            }

            toast.success('Draft saved successfully');
            handleClearForm();
        } catch (error) {
            console.error('Save draft error:', error);
            toast.error(error.message || 'Failed to save draft');
        }
    };

    // Handle clearing the form
    const handleClearForm = () => {
        setContent('');
        setImage(null);
        setPreview(null);
        setTags([]);
        setNewTag('');
        setVisibility('Public');
        setScheduleDate('');
        setRecommendations([]);
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

    // Handle emoji selection
    const handleEmojiSelect = (emoji) => {
        setContent(prev => prev + emoji);
        setShowEmojiPicker(false);
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

    return (
        <div className="bg-white shadow-md rounded-lg p-6 relative">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
                <i className="fas fa-plus-circle mr-3"></i> Create New Post
            </h2>

            <div className="flex items-start space-x-4">
                {/* Left column - user avatar */}
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

                {/* Right column - post content */}
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
                        {isLoadingAccounts ? (
                            <div className="flex items-center justify-center py-4">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                            </div>
                        ) : (
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
                        )}
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
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            className="text-blue-500 hover:text-blue-700"
                        >
                            <i className="far fa-smile mr-1"></i> Emoji
                        </button>
                        <button
                            onClick={handlePost}
                            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
                        >
                            Post Now
                        </button>
                        <button
                            onClick={saveDraft}
                            className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600"
                        >
                            Save Draft
                        </button>
                        <button
                            onClick={handleClearForm}
                            className="bg-gray-300 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-400"
                        >
                            Clear
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