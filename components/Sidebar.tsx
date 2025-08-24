
import React from 'react';
import { UserRole } from '../types';
import { LogoIcon, AdminIcon, TeacherIcon, StudentIcon, ParentIcon, SettingsIcon, LogoutIcon } from './icons/Icons';

interface SidebarProps {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
}

const roleOptions = [
  { role: UserRole.Admin, icon: <AdminIcon /> },
  { role: UserRole.Teacher, icon: <TeacherIcon /> },
  { role: UserRole.Student, icon: <StudentIcon /> },
  { role: UserRole.Parent, icon: <ParentIcon /> },
];

const Sidebar: React.FC<SidebarProps> = ({ currentRole, setCurrentRole }) => {
  return (
    <div className="w-64 bg-white shadow-lg flex flex-col">
      <div className="flex items-center justify-center h-20 border-b">
        <LogoIcon />
        <h1 className="text-2xl font-bold text-brand-blue-700 ml-2">EduTrack</h1>
      </div>
      <nav className="flex-1 px-4 py-6">
        <p className="text-sm font-semibold text-gray-500 uppercase px-4 mb-3">Dashboard View</p>
        {roleOptions.map(({ role, icon }) => (
          <button
            key={role}
            onClick={() => setCurrentRole(role)}
            className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors duration-200 ${
              currentRole === role
                ? 'bg-brand-blue-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-brand-blue-50 hover:text-brand-blue-600'
            }`}
          >
            {icon}
            <span className="ml-4 font-medium">{role}</span>
          </button>
        ))}
      </nav>
      <div className="px-4 py-6 border-t">
        <button className="w-full flex items-center px-4 py-3 text-left text-gray-600 hover:bg-brand-blue-50 hover:text-brand-blue-600 rounded-lg transition-colors duration-200">
          <SettingsIcon />
          <span className="ml-4 font-medium">Settings</span>
        </button>
        <button className="w-full flex items-center px-4 py-3 text-left text-gray-600 hover:bg-brand-blue-50 hover:text-brand-blue-600 rounded-lg transition-colors duration-200">
          <LogoutIcon />
          <span className="ml-4 font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
