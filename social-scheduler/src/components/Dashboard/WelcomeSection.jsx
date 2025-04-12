import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

export default function WelcomeSection() {
    const [userName, setUserName] = useState("Loading...");
    const [loading, setLoading] = useState(true);
    const [scheduledPosts, setScheduledPosts] = useState(0);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        async function fetchWelcomeData() {
            setLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("No token found. Please log in.");
                    setLoading(false);
                    return;
                }

                const response = await fetch("http://localhost:3000/api/WelcomeSection", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        setError("Unauthorized. Please log in again.");
                    } else {
                        setError(`HTTP error! status: ${response.status}`);
                    }
                    setLoading(false);
                    return;
                }

                const contentType = response.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    const responseBody = await response.text(); // Log the response body for debugging
                    console.error("Invalid JSON response body:", responseBody);
                    throw new Error("Invalid JSON response");
                }

                const data = await response.json();
                setUserName(data.userName);
                setScheduledPosts(data.scheduledPosts);
            } catch (err) {
                console.error("Error fetching welcome data: ", err);
                setError("Failed to fetch user data. Please try again.");
            } finally {
                setLoading(false);
            }
        }

        fetchWelcomeData();
    }, []);

    if (loading) {
        return (
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold">Loading...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-8" role="alert">
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline"> {error}</span>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold mb-2">Welcome back, {userName}!</h2>
                    <p className="opacity-90">
                        You have {scheduledPosts} scheduled posts
                    </p>
                </div>
                <button
                    onClick={() => navigate("/create-post")} // Navigate to Create Post page
                    className="bg-white text-blue-600 py-2 px-6 rounded-lg hover:bg-blue-50 flex items-center"
                >
                    <i className="fas fa-plus mr-2"></i> New Post
                </button>
            </div>
        </div>
    );
}