import { useState } from "react";

export default function SecurityTab() {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    // Handle form submission for changing password
    async function handleSubmit(event) {
        event.preventDefault();
        setError(null);
        setSuccessMessage('');

        if (formData.newPassword !== formData.confirmPassword) {
            setError('New passwords do not match.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Authentication token not found.');
                return;
            }

            const response = await fetch('http://localhost:3000/api/user/changePassword', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to change password');
            }

            setSuccessMessage('Password changed successfully!');
            setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (err) {
            console.error('Error changing password:', err);
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

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800">Security</h2>

            {error && <div className="text-red-500 mb-4">{error}</div>}
            {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}

            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-sm">
                {/* Current Password Input */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Current Password</label>
                    <input
                        type="password"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={(e) => handleChange('currentPassword', e)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                    />
                </div>

                {/* New Password */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">New Password</label>
                    <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={(e) => handleChange('newPassword', e)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                    />
                </div>

                {/* Confirm New Password */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={(e) => handleChange('confirmPassword', e)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                    />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-sm hover:shadow-md transition-all"
                    >
                        Change Password
                    </button>
                </div>
            </form>
        </div>
    );
}