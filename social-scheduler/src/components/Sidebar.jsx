import { Link, useLocation } from 'react-router-dom';

const pages = [
  { name: 'dashboard', icon: 'fa-tachometer-alt' },
  { name: 'create-post', icon: 'fa-plus-circle' },
  { name: 'calendar', icon: 'fa-calendar-alt' },
  { name: 'analytics', icon: 'fa-chart-line' },
  { name: 'settings', icon: 'fa-cog' }
];

export default function Sidebar() {
  const location = useLocation();

  const formatName = (name) => {
    return name.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const isActive = (path) => {
    return location.pathname.endsWith(`/${path}`) || 
          (path === 'dashboard' && location.pathname.endsWith('/'));
  };

  return (
    <div className="w-64 bg-gray-900 text-white p-5 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold mb-6 flex items-center">
          <i className="fas fa-calendar-alt mr-2"></i> Scheduler
        </h1>
        <nav className="space-y-2">
          {pages.map((page) => (
            <Link
              key={page.name}
              to={`/${page.name}`}
              className={`py-3 px-4 rounded flex items-center w-full text-left transition-all duration-200
                ${isActive(page.name) 
                  ? 'bg-blue-600' 
                  : 'hover:bg-gray-700 hover:translate-x-1'}`}
            >
              <i className={`fas ${page.icon} mr-3`} aria-hidden="true"></i>
              {formatName(page.name)}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="pt-4 border-t border-gray-700">
        <Link
          to="/profile"
          className={`flex items-center space-x-3 w-full p-2 rounded transition-all duration-200
            ${isActive('profile') 
              ? 'bg-blue-600' 
              : 'hover:bg-gray-700'}`}
        >
          <img 
            src="https://randomuser.me/api/portraits/women/44.jpg" 
            alt="Profile" 
            className="w-10 h-10 rounded-full" 
          />
          <div>
            <p className="font-medium">Sarah Johnson</p>
            <p className="text-xs text-gray-400">Admin</p>
          </div>
        </Link>
      </div>
    </div>
  );
}