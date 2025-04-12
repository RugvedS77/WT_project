import { useState, useEffect } from 'react';
import EmojiPicker from './EmojiPicker'; // Import the EmojiPicker component

export default function PostCreation() {
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
    const [showEmojiPicker, setShowEmojiPicker] = useState(false); // State to toggle emoji picker

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

    useEffect(() => {
        fetchUserData();
    }, []);

    // Handle content change
    const handleContentChange = (e) => {
        const input = e.target.value;
        setContent(input);
        generateRecommendations(input);
    };

    // Handle emoji selection
    const handleEmojiSelect = (emoji) => {
        setContent((prevContent) => prevContent + emoji);
        setShowEmojiPicker(false); // Hide emoji picker after selection
    };

    // Handle image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    // Handle adding a tag
    const handleAddTag = () => {
        if (newTag.trim() && !tags.includes(newTag.trim())) {
            setTags([...tags, newTag.trim()]);
            setNewTag('');
        }
    };

    // Handle removing a tag
    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    // Handle post submission
    const handlePost = async () => {
        if (!content.trim() && !image) {
            alert('Please add some content or upload an image.');
            return;
        }

        const formData = new FormData();
        formData.append('content', content);
        formData.append('tags', JSON.stringify(tags));
        formData.append('visibility', visibility);
        formData.append('scheduled', scheduleDate ? true : false);
        formData.append('scheduledDate', scheduleDate || '');
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

    return (
        <div className="bg-white shadow-md rounded-lg p-6 relative">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
                <i className="fas fa-plus-circle mr-3"></i> Create New Post
            </h2>

            <div className="flex items-start space-x-4">
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

                <div className="flex-1">
                    <textarea
                        value={content}
                        onChange={handleContentChange}
                        rows="4"
                        className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="What's on your mind?"
                    ></textarea>
                    <div className="text-right text-sm text-gray-500 mt-1">
                        {content.length}/280
                    </div>

                    {preview && (
                        <div className="mt-4">
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-auto rounded-lg border"
                            />
                        </div>
                    )}

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
                            onClick={handlePost}
                            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
                        >
                            Post Now
                        </button>
                        <button
                            onClick={handleClearForm}
                            className="bg-gray-300 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-400"
                        >
                            Clear
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowEmojiPicker((prev) => !prev)}
                            className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300"
                        >
                            😊 Emoji
                        </button>
                    </div>

                    {/* Emoji Picker */}
                    <EmojiPicker show={showEmojiPicker} onEmojiSelect={handleEmojiSelect} />

                    {/* Recommendations Section */}
                    {recommendations.length > 0 && (
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-2">Recommendations</h3>
                            <div className="flex flex-wrap gap-2">
                                {recommendations.map((rec, index) => (
                                    <span
                                        key={index}
                                        className="bg-blue-100 text-blue-600 py-1 px-3 rounded-full text-sm"
                                    >
                                        {rec}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Tags Section */}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">Tags</h3>
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Add a tag"
                            />
                            <button
                                onClick={handleAddTag}
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                            >
                                Add
                            </button>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="bg-blue-100 text-blue-600 py-1 px-3 rounded-full text-sm flex items-center space-x-2"
                                >
                                    {tag}
                                    <button
                                        onClick={() => handleRemoveTag(tag)}
                                        className="text-red-500 hover:text-red-700 ml-2"
                                    >
                                        &times;
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Visibility Section */}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">Visibility</h3>
                        <select
                            value={visibility}
                            onChange={(e) => setVisibility(e.target.value)}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="Public">Public</option>
                            <option value="Private">Private</option>
                            <option value="Friends">Friends</option>
                        </select>
                    </div>

                    {/* Schedule Section */}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">Schedule Post</h3>
                        <input
                            type="datetime-local"
                            value={scheduleDate}
                            onChange={(e) => setScheduleDate(e.target.value)}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>

            {/* Post Review Section */}
            <div className="mt-8 border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Post Review</h3>
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
    );
}