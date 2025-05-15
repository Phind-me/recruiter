import React, { useState } from 'react';
import { Menu, X, BellRing, Search, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  onToggleSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  
  const notifications = [
    { id: 1, message: 'New job role: Senior Frontend Developer at TechCorp', time: '10 minutes ago' },
    { id: 2, message: 'Alex Johnson interview scheduled for tomorrow', time: '2 hours ago' },
    { id: 3, message: 'Candidate Priya Patel updated profile', time: '5 hours ago' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <button 
                onClick={onToggleSidebar} 
                className="p-2 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <Menu size={24} />
              </button>
              <Link to="/" className="ml-4 flex items-center">
                <span className="text-xl font-semibold text-blue-500">PhindMe</span>
                <span className="text-xl font-medium text-gray-600">Recruiter</span>
              </Link>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="ml-4 relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center text-xs text-white">
                  3
                </span>
                <BellRing size={20} />
              </button>
              
              {showNotifications && (
                <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-2 px-4 border-b border-gray-100">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                      <button className="text-xs text-blue-500 hover:text-blue-600">Mark all as read</button>
                    </div>
                  </div>
                  <div className="max-h-60 overflow-y-auto py-1">
                    {notifications.map((notification) => (
                      <a
                        key={notification.id}
                        href="#"
                        className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <p className="text-sm text-gray-700">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </a>
                    ))}
                  </div>
                  <div className="py-2 px-4 border-t border-gray-100">
                    <a href="#" className="text-xs text-blue-500 hover:text-blue-600">View all notifications</a>
                  </div>
                </div>
              )}
            </div>
            
            <div className="ml-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    <User size={16} />
                  </div>
                </div>
                <div className="ml-3 hidden md:block">
                  <p className="text-sm font-medium text-gray-800">Jane Smith</p>
                  <p className="text-xs text-gray-500">Senior Recruiter</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};