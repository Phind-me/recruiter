import React, { useState, useRef, useEffect } from 'react';
import { Menu, BellRing, Search, User, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMessages } from '../../hooks/useDashboard';
import { timeAgo } from '../../utils/dateUtils';

interface NavbarProps {
  onToggleSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const { messages, unreadCount, markAsRead, markAllAsRead } = useMessages();
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNotificationClick = (id: string) => {
    markAsRead(id);
  };

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
            
            <div className="ml-4 relative" ref={notificationsRef}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center text-xs text-white">
                    {unreadCount}
                  </span>
                )}
                <BellRing size={20} />
              </button>
              
              {showNotifications && (
                <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-2 px-4 border-b border-gray-100">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                      <button 
                        onClick={markAllAsRead}
                        className="text-xs text-blue-500 hover:text-blue-600"
                      >
                        Mark all as read
                      </button>
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {messages.length === 0 ? (
                      <div className="py-8 text-center text-gray-500">
                        <p className="text-sm">No notifications</p>
                      </div>
                    ) : (
                      <div className="py-1">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`px-4 py-3 hover:bg-gray-50 transition-colors ${!message.read ? 'bg-blue-50' : ''}`}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">{message.title}</p>
                                <p className="text-sm text-gray-600 mt-0.5">{message.content}</p>
                                <p className="text-xs text-gray-500 mt-1">{timeAgo(message.timestamp)}</p>
                                {message.link && (
                                  <Link
                                    to={message.link.url}
                                    onClick={() => handleNotificationClick(message.id)}
                                    className="text-sm text-blue-500 hover:text-blue-600 mt-2 inline-block"
                                  >
                                    {message.link.text}
                                  </Link>
                                )}
                              </div>
                              {!message.read && (
                                <div className="h-2 w-2 bg-blue-500 rounded-full mt-1.5"></div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
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