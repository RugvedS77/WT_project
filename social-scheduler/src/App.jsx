import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import CreatePostPage from './pages/CreatePostPage';
import CalendarPage from './pages/CalendarPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import Login from './pages/Login';
import Register from './pages/Register';
import LandingPage from './pages/LandingPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';  // Import the new Privacy Policy page
import TermsOfServicePage from './pages/TermsOfServicePage'; 
import UserDataDeletionPage from './pages/UserDataDeletionPage'; 
import LinkedInCallback from './components/Settings/LinkedInCallback'; // Import LinkedIn callback component
import { AuthProvider } from './components/Settings/AuthContext'; 
import { useAuth } from './components/Settings/AuthContext';

// Layout Components
function AuthLayout() {
  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <Outlet />
    </div>
  );
}

function ProtectedLayout() {
  return (
    <div className="bg-gray-100 h-screen flex">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

// Auth Wrapper
function ProtectedRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem("token") || 
                         localStorage.getItem("isAuthenticated") === "true" ||
                         localStorage.getItem("googleAuth") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  } else {

  }

  return children;
}

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      // Landing Page (Public)
      {
        index: true,
        element: <LandingPage />,
      },
      // Auth routes (Public)
      {
        path: 'auth',
        element: <AuthLayout />,
        children: [
          { path: 'login', element: <Login /> },
          { path: 'register', element: <Register /> },
        ],
      },
      // Protected routes (Requires Auth)
      {
        path: '/',
        element: <ProtectedRoute><ProtectedLayout /></ProtectedRoute>,
        children: [
          { path: 'dashboard', element: <DashboardPage /> },
          { path: 'create-post', element: <CreatePostPage /> },
          { path: 'calendar', element: <CalendarPage /> },
          { path: 'analytics', element: <AnalyticsPage /> },
          { path: 'settings', element: <SettingsPage /> },
          { path: 'profile', element: <ProfilePage /> },
          // Adding Privacy Policy, Terms of Service, and User Data Deletion routes
          { path: 'privacy-policy', element: <PrivacyPolicyPage /> },
          { path: 'terms-of-service', element: <TermsOfServicePage /> },
          { path: 'user-data-deletion', element: <UserDataDeletionPage /> }, // New route
          { path: 'settings/auth/linkedin/callback', element: <LinkedInCallback /> }, // LinkedIn callback route
        ],
      },
      // Redirects
      {
        path: 'login',
        element: <Navigate to="/auth/login" replace />,
      },
      // LinkedIn callback route with new redirect URI
      {
        path: 'social-scheduler',
        element: <LinkedInCallback />,
      },
    ],
  },
], 
{
  basename: "/social-scheduler"
}
);


// Main App Component
function App() {
  // Use the same client ID as in your Login component
  const googleClientId = "91442474676-1tgi4tffeud6fjvffubbag90vfmfqbdr.apps.googleusercontent.com";
  
  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      < AuthProvider >
        <RouterProvider router={router} />
      </AuthProvider>
    </GoogleOAuthProvider>
    
  );
}

export default App;