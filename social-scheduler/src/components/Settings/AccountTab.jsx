import { useEffect, useState } from "react";

export default function AccountTab() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        timezone: '',
        photoUrl: null, // Store the photo URL
        photoFile: null, // Store the photo file for upload
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch user data from the backend
    async function fetchUserData() {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Authentication token not found.');
                return;
            }
            const response = await fetch('http://localhost:3000/api/user/userData', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response)
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch user data');
            }
            const data = await response.json();
            setFormData({
                name: data.name || '',
                phone: data.phone || '',
                timezone: data.timezone || '',
                photoUrl: data.photoUrl || null, // Set the photo URL
                photoFile: null,
            });
        } catch (err) {
            if (err.message === 'Failed to fetch') {
                setError('Unable to connect to the server. Please try again later.');
            } else {
                setError(err.message);
            }
            console.error('Error fetching user data:', err);
        }
    }

    // Handle form submission
    async function handleSubmit(event) {
        event.preventDefault();
        setError(null);
        setSuccessMessage('');

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Authentication token not found.');
                return;
            }

            // Update profile data
            const response = await fetch('http://localhost:3000/api/user/userData', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: formData.name,
                    phone: formData.phone,
                    timezone: formData.timezone,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update profile');
            }

            // If a photo is selected, upload it separately
            if (formData.photoFile) {
                const photoFormData = new FormData();
                photoFormData.append('photo', formData.photoFile);

                const photoResponse = await fetch('http://localhost:3000/api/user/uploadPhoto', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: photoFormData,
                });

                if (!photoResponse.ok) {
                    const errorData = await photoResponse.json();
                    throw new Error(errorData.message || 'Failed to upload profile photo');
                }

                const photoData = await photoResponse.json();
                setFormData((prev) => ({
                    ...prev,
                    photoUrl: photoData.user.photoUrl, // Update the photo URL
                }));
            }

            setSuccessMessage('Profile updated successfully!');
        } catch (err) {
            console.error('Error updating user data:', err);
            setError(err.message);
        }
    }

    // Handle input changes
    function handleChange(identifier, event) {
        setFormData((prevValues) => ({
            ...prevValues,
            [identifier]: event.target.value,
        }));
    }

    // Handle profile photo change
    function handlePhotoChange(event) {
        const file = event.target.files[0];
        if (file) {
            setFormData((prev) => ({
                ...prev,
                photoFile: file,
            }));
        }
    }

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800">Account</h2>

            {error && <div className="text-red-500 mb-4">{error}</div>}
            {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}

            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-sm">
                {/* Name Field */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                    />
                </div>

                {/* Phone Field */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="1234567890"
                        pattern="\d{10}"
                        minLength={10}
                        maxLength={10}
                    />
                    <p className="text-xs text-gray-500">10 digits without spaces or dashes</p>
                </div>

                {/* Timezone Field */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Time Zone</label>
                    <select
                        name="timezone"
                        value={formData.timezone}
                        onChange={(e) => handleChange('timezone', e)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    >
                        <option value="">Select Time Zone</option>
                        <option value="UTC-5">UTC-5 (Eastern Time)</option>
                        <option value="UTC+0">UTC+0 (GMT)</option>
                        <option value="UTC+5:30">UTC+5:30 (India)</option>
                        <option value="UTC+8">UTC+8 (China)</option>
                    </select>
                </div>

                {/* Profile Photo */}
                <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">Profile Photo</label>

                    <div className="flex items-center space-x-6">
                        <div className="relative">
                            {formData.photoUrl ? (
                                <img
                                    src={`http://localhost:3000${formData.photoUrl}`} // Display the photo URL
                                    alt="Profile"
                                    className="w-20 h-20 rounded-full object-cover border-2 border-white shadow"
                                />
                            ) : (
                                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-medium text-xl">
                                    {formData.name ? formData.name.charAt(0).toUpperCase() : 'U'}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="cursor-pointer bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Change Photo
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhotoChange}
                                    className="hidden"
                                />
                            </label>
                            <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 2MB</p>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-sm hover:shadow-md transition-all"
                    >
                        Update Profile
                    </button>
                </div>
            </form>
        </div>
    );
}