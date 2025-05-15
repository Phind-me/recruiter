import React, { createContext, useState, useEffect } from 'react';
import { Message } from '../types';

interface MessagesContextType {
  messages: Message[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addMessage: (message: Omit<Message, 'id' | 'timestamp' | 'read'>) => void;
  deleteMessage: (id: string) => void;
}

const MessagesContext = createContext<MessagesContextType | undefined>(undefined);

const initialMessages: Message[] = [
  {
    id: '1',
    title: 'New Job Role',
    content: 'Senior Frontend Developer position at TechCorp has been posted',
    type: 'info',
    timestamp: new Date(Date.now() - 10 * 60000).toISOString(), // 10 minutes ago
    read: false,
    link: {
      text: 'View Job',
      url: '/jobs'
    }
  },
  {
    id: '2',
    title: 'Interview Scheduled',
    content: 'Alex Johnson interview scheduled for tomorrow',
    type: 'success',
    timestamp: new Date(Date.now() - 120 * 60000).toISOString(), // 2 hours ago
    read: false,
    link: {
      text: 'View Schedule',
      url: '/calendar'
    }
  },
  {
    id: '3',
    title: 'Profile Update',
    content: 'Candidate Priya Patel updated their profile',
    type: 'info',
    timestamp: new Date(Date.now() - 300 * 60000).toISOString(), // 5 hours ago
    read: false,
    link: {
      text: 'View Profile',
      url: '/candidates'
    }
  }
];

export const MessagesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    setUnreadCount(messages.filter(msg => !msg.read).length);
  }, [messages]);

  const markAsRead = (id: string) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === id ? { ...msg, read: true } : msg
      )
    );
  };

  const markAllAsRead = () => {
    setMessages(prev =>
      prev.map(msg => ({ ...msg, read: true }))
    );
  };

  const addMessage = (message: Omit<Message, 'id' | 'timestamp' | 'read'>) => {
    const newMessage: Message = {
      ...message,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      read: false
    };
    setMessages(prev => [newMessage, ...prev]);
  };

  const deleteMessage = (id: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
  };

  return (
    <MessagesContext.Provider value={{
      messages,
      unreadCount,
      markAsRead,
      markAllAsRead,
      addMessage,
      deleteMessage
    }}>
      {children}
    </MessagesContext.Provider>
  );
};

export { MessagesContext };