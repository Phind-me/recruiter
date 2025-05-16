import React, { useState, useEffect } from 'react';
import { useMessages } from '../hooks/useDashboard';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { formatDate, timeAgo } from '../utils/dateUtils';
import { Search, Mail, Circle } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export const MessagesPage: React.FC = () => {
  const location = useLocation();
  const { messages, markAsRead } = useMessages();
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle selected message from navigation state
  useEffect(() => {
    if (location.state?.selectedMessage) {
      setSelectedMessage(location.state.selectedMessage);
    }
  }, [location.state]);

  const filteredMessages = messages.filter(message =>
    message.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMessageSelect = (id: string) => {
    setSelectedMessage(id);
    markAsRead(id);
  };

  const selectedMessageDetails = messages.find(m => m.id === selectedMessage);

  return (
    <div className="h-[calc(100vh-5rem)]">
      <div className="flex h-full">
        {/* Messages List */}
        <div className="w-1/3 border-r border-gray-200 h-full overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredMessages.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No messages found
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredMessages.map((message) => (
                  <button
                    key={message.id}
                    className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                      selectedMessage === message.id ? 'bg-blue-50' : ''
                    } ${!message.read ? 'bg-blue-50/50' : ''}`}
                    onClick={() => handleMessageSelect(message.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className={`text-sm font-medium ${
                            !message.read ? 'text-gray-900' : 'text-gray-600'
                          } truncate`}>
                            {message.title}
                          </h3>
                          {!message.read && (
                            <Circle size={8} className="fill-blue-500 text-blue-500" />
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mt-1 truncate">
                          {message.content}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {timeAgo(message.timestamp)}
                        </p>
                      </div>
                      <Badge variant={
                        message.type === 'success' ? 'success' :
                        message.type === 'warning' ? 'warning' :
                        message.type === 'error' ? 'danger' :
                        'primary'
                      }>
                        {message.type}
                      </Badge>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Message Details */}
        <div className="flex-1 h-full overflow-hidden flex flex-col">
          {selectedMessageDetails ? (
            <>
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {selectedMessageDetails.title}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {formatDate(selectedMessageDetails.timestamp)}
                    </p>
                  </div>
                  <Badge variant={
                    selectedMessageDetails.type === 'success' ? 'success' :
                    selectedMessageDetails.type === 'warning' ? 'warning' :
                    selectedMessageDetails.type === 'error' ? 'danger' :
                    'primary'
                  }>
                    {selectedMessageDetails.type}
                  </Badge>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <p className="text-gray-600 whitespace-pre-line">
                  {selectedMessageDetails.content}
                </p>
                {selectedMessageDetails.link && (
                  <a
                    href={selectedMessageDetails.link.url}
                    className="inline-block mt-4 text-blue-600 hover:text-blue-800"
                  >
                    {selectedMessageDetails.link.text} →
                  </a>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <Mail size={48} className="mx-auto text-gray-400 mb-4" />
                <p>Select a message to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};