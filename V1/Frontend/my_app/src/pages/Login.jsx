
import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import "./Login.css";  // Import the CSS file

const CLIENT_ID = "91442474676-1tgi4tffeud6fjvffubbag90vfmfqbdr.apps.googleusercontent.com"; // Replace with your actual Google Client ID

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false); // State for Google login loading
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate();

  // Handle form login
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setTimeout(() => {
      setIsLoggedIn(true);
      navigate("/dashboard");
    }, 2000);
  };

  // Handle Google login
  const handleGoogleSuccess = async (response) => {
    console.log("Google Login Success:", response);
    setGoogleLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:3000/auth/google", {
        credential: response.credential,
      });

      if (res.data.success) {
        setIsLoggedIn(true);
        navigate("/dashboard");
      } else {
        setError("Google login failed. Try again.");
      }
    } catch (error) {
      console.error("Error verifying Google login:", error);
      setError("Google authentication error. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleGoogleFailure = (error) => {
    console.error("Google Login Failed:", error);
    setError("Google login was unsuccessful.");
  };

  return (
    <div className="login-container">
      {/* Background Animation */}
      <motion.div
        className="login-bg"
        animate={isLoggedIn ? { x: "-100%", y: "-100%", backgroundPosition: "0% 0%" } : { x: "0%", y: "0%", backgroundPosition: "100% 100%" }}
        transition={{ duration: 2, ease: "easeInOut" }}
      ></motion.div>

      {/* Google OAuth Provider */}
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <div className="login-card">
          <h2 className="login-title">Login</h2>

          {error && <p className="error-message">{error}</p>}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="login-form">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              required
            />
            <button type="submit" className="submit-button" disabled={isLoggingIn}>
              {isLoggingIn ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Google Login Button */}
          <div className="google-login">
            {googleLoading ? (
              <p>Logging in with Google...</p>
            ) : (
              <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleFailure} />
            )}
          </div>
        </div>
      </GoogleOAuthProvider>
    </div>
  );
};

export default Login;
