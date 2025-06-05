import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  ChevronLeft,
  ChevronRight,
  LogOut,
  Settings,
  User,
  ChevronDown
} from 'lucide-react';
import { clsx } from 'clsx';
import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

const navItems = [
  { 
    title: 'Dashboard', 
    icon: LayoutDashboard, 
    path: '/' 
  },
  { 
    title: 'Supervisor', 
    icon: Users, 
    path: '/supervisor' 
  },
  { 
    title: 'Agent Performance', 
    icon: Users, 
    path: '/agent-performance' 
  },
];

const Sidebar = ({ isCollapsed, setIsCollapsed }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { isDarkMode } = useTheme();

  const handleLogout = () => {
    // Clear authentication state
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    // Navigate to login
    navigate('/login');
  };

  // Get user email and extract first name
  const userEmail = localStorage.getItem('userEmail') || '';
  const firstName = userEmail.split('@')[0].split('.')[0];
  const capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);

  return (
    <aside 
      className={clsx(
        "bg-white dark:bg-gray-800 h-screen transition-all duration-300 ease-in-out border-r border-gray-200 dark:border-gray-700 relative",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out">
        {!isCollapsed && (
          <img
            src={isDarkMode ? '/logos/dark/logo.svg' : '/logos/light/logo.svg'}
            alt="CallCenter Logo"
            className="h-8 w-auto object-contain transition-opacity duration-300 ease-in-out"
          />
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-300 transition-transform duration-300 ease-in-out" />
          ) : (
            <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-300 transition-transform duration-300 ease-in-out" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4 transition-all duration-300 ease-in-out">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <button
                onClick={() => navigate(item.path)}
                className={clsx(
                  "w-full flex items-center p-2 rounded-lg transition-all duration-200 ease-in-out",
                  "hover:bg-gray-100 dark:hover:bg-gray-700",
                  location.pathname === item.path 
                    ? "bg-primary-50 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400" 
                    : "text-gray-700 dark:text-gray-300"
                )}
              >
                <item.icon className="h-5 w-5 transition-transform duration-300 ease-in-out" />
                {!isCollapsed && (
                  <span className="ml-3 transition-opacity duration-300 ease-in-out">{item.title}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="absolute bottom-0 w-full border-t border-gray-200 dark:border-gray-700">
        <div className="p-4">
          <button
            onClick={() => !isCollapsed && setIsProfileOpen(!isProfileOpen)}
            className={clsx(
              "w-full flex items-center",
              isCollapsed ? "justify-center" : "justify-between",
              "focus:outline-none"
            )}
          >
            <div className={clsx(
              "flex items-center",
              isCollapsed ? "justify-center" : "space-x-3"
            )}>
              <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <User className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              </div>
              {!isCollapsed && (
                <div className="text-left overflow-hidden">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                    {capitalizedFirstName}
                  </h3>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">
                    {userEmail}
                  </p>
                </div>
              )}
            </div>
            {!isCollapsed && (
              <ChevronDown className={clsx(
                "h-5 w-5 text-gray-500 transition-transform",
                isProfileOpen && "transform rotate-180"
              )} />
            )}
          </button>

          {/* Dropdown Menu */}
          {!isCollapsed && isProfileOpen && (
            <div className="absolute bottom-full left-0 w-full mb-2 bg-white dark:bg-gray-800 rounded-t-lg border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden animate-fadeIn">
              <button 
                className="w-full flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => {
                  setIsProfileOpen(false);
                }}
              >
                <User className="h-5 w-5" />
                <span className="ml-3">View Profile</span>
              </button>
              <button 
                className="w-full flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => {
                  setIsProfileOpen(false);
                }}
              >
                <Settings className="h-5 w-5" />
                <span className="ml-3">Settings</span>
              </button>
              <button 
                className="w-full flex items-center px-4 py-3 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 border-t border-gray-200 dark:border-gray-700"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                <span className="ml-3">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar; 