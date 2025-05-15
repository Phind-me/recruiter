import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

export const MainLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Navbar onToggleSidebar={toggleSidebar} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} />
        
        <main className={`
          flex-1 overflow-y-auto px-4 py-6
          md:px-6 lg:px-8
          transition-all duration-300
          ${isSidebarOpen ? 'md:ml-64' : ''}
        `}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};