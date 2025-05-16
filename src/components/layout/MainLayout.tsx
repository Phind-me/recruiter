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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar onToggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex relative">
        {isSidebarOpen && 
        <Sidebar isOpen={isSidebarOpen} />
        }
        
        <main className={`
          flex-1 p-6
          transition-all duration-300
          ${isSidebarOpen ? 'md:ml-64' : ''}
        `}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};