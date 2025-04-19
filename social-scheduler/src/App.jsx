import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './components/Settings/AuthContext';
import Sidebar from './components/Sidebar';
import WelcomeSection from './components/WelcomeSection';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePostPage from './pages/CreatePostPage';
import SettingsPage from './pages/SettingsPage';
import AnalyticsPage from './pages/AnalyticsPage';

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
  const isAuthenticated = !!localStorage.getItem("token");
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  const googleClientId = "91442474676-1tgi4tffeud6fjvffubbag90vfmfqbdr.apps.googleusercontent.com";
  
  return (
    <Router basename="/social-scheduler">
      <GoogleOAuthProvider clientId={googleClientId}>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<WelcomeSection />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <ProtectedLayout>
                    <Dashboard />
                  </ProtectedLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/create-post" 
              element={
                <ProtectedRoute>
                  <ProtectedLayout>
                    <CreatePostPage />
                  </ProtectedLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/analytics" 
              element={
                <ProtectedRoute>
                  <ProtectedLayout>
                    <AnalyticsPage />
                  </ProtectedLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <ProtectedRoute>
                  <ProtectedLayout>
                    <SettingsPage />
                  </ProtectedLayout>
                </ProtectedRoute>
              } 
            />
          </Routes>
        </AuthProvider>
      </GoogleOAuthProvider>
    </Router>
  );
}

export default App;