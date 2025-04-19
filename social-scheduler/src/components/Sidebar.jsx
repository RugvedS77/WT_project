import { Link, useLocation } from 'react-router-dom';
import { useAuth } from './Settings/AuthContext';

export default function Sidebar() {
  const location = useLocation();
  const { logout } = useAuth();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'fas fa-home' },
    { path: '/create-post', label: 'Create Post', icon: 'fas fa-plus-circle' },
    { path: '/analytics', label: 'Analytics', icon: 'fas fa-chart-line' },
    { path: '/settings', label: 'Settings', icon: 'fas fa-cog' }
  ];

  return (
    <div className="w-64 h-screen bg-white border-r flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-600">Social Scheduler</h1>
      </div>

      <nav className="flex-1 px-4">
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 ${
              location.pathname === item.path
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <i className={item.icon}></i>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t">
        <button
          onClick={logout}
          className="flex items-center space-x-3 px-4 py-3 w-full text-left text-gray-600 hover:bg-gray-50 rounded-lg"
        >
          <i className="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}