import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const CLIENT_ID = "91442474676-1tgi4tffeud6fjvffubbag90vfmfqbdr.apps.googleusercontent.com";

const Login = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token") || localStorage.getItem("isAuthenticated") === "true"
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        { username, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (response.data.success) {
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setGoogleLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/google",
        { credential: credentialResponse.credential },
        { withCredentials: true }
      );

      if (response.data.success) {
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      } else {
        setError("Google authentication failed");
      }
    } catch (error) {
      console.error("Google auth error:", error);
      setError("Failed to authenticate with Google");
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleGoogleFailure = () => {
    setError("Google login failed. Please try another method.");
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gray-100">
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('./images/LoginBackground.png')" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <motion.div
          className="relative z-10 w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>

          {error && (
            <motion.div
              className="p-3 text-sm text-red-700 bg-red-100 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </motion.div>

            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </motion.div>

            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <button
                type="submit"
                disabled={isLoggingIn}
                className={`w-full px-4 py-2 text-white rounded-lg transition-colors ${
                  isLoggingIn ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isLoggingIn ? "Logging in..." : "Login"}
              </button>
            </motion.div>
          </form>

          <div className="flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-3 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <motion.div
            className="flex justify-center"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {googleLoading ? (
              <p className="text-gray-600">Logging in with Google...</p>
            ) : (
              <GoogleLogin 
                onSuccess={handleGoogleSuccess} 
                onError={handleGoogleFailure}
                shape="pill"
                theme="filled_blue"
                size="large"
                text="continue_with"
              />
            )}
          </motion.div>

          <motion.p
            className="text-sm text-center text-gray-600"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-blue-600 hover:text-blue-800 hover:underline focus:outline-none"
            >
              Register
            </button>
          </motion.p>
        </motion.div>
      </GoogleOAuthProvider>
    </div>
  );
};

export default Login;