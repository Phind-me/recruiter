import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase,
  Building2,
  PresentationIcon,
  Settings,
  CalendarClock,
  BarChart,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  badge?: number;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, badge }) => (
  <NavLink
    to={to}
    className={({ isActive }) => `
      flex items-center px-4 py-3 text-sm font-medium rounded-md
      transition-colors duration-150 ease-in-out
      ${isActive 
        ? 'bg-blue-500 text-white' 
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      }
    `}
  >
    <span className="mr-3">{icon}</span>
    <span>{label}</span>
    {badge !== undefined && (
      <span className={`ml-auto inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none rounded-full ${
        badge > 0 ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600'
      }`}>
        {badge}
      </span>
    )}
  </NavLink>
);

export const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <div className={`
      fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      md:translate-x-0
    `}>
      <div className="h-full flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex-1 px-4 space-y-1">
          <NavItem 
            to="/" 
            icon={<LayoutDashboard size={20} />} 
            label="Dashboard" 
          />
          <NavItem 
            to="/candidates" 
            icon={<Users size={20} />} 
            label="Candidates" 
            badge={5}
          />
          <NavItem 
            to="/jobs" 
            icon={<Briefcase size={20} />} 
            label="Job Roles" 
            badge={2}
          />
          <NavItem 
            to="/employers" 
            icon={<Building2 size={20} />} 
            label="Employers" 
          />
          <NavItem 
            to="/presentations" 
            icon={<PresentationIcon size={20} />} 
            label="Presentations" 
          />
          <NavItem 
            to="/calendar" 
            icon={<CalendarClock size={20} />} 
            label="Schedule" 
          />
          <NavItem 
            to="/reports" 
            icon={<BarChart size={20} />} 
            label="Reports" 
          />
          
          <div className="pt-4 mt-4 border-t border-gray-200">
            <NavItem 
              to="/settings" 
              icon={<Settings size={20} />} 
              label="Settings" 
            />
          </div>
        </div>
        
        <div className="px-4 mt-auto">
          <button className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900 w-full">
            <LogOut size={20} className="mr-3" />
            <span>Log out</span>
          </button>
        </div>
      </div>
    </div>
  );
};