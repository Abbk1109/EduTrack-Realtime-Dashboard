
import React from 'react';
import { UserRole } from '../types';
import { BellIcon, SearchIcon } from './icons/Icons';

interface HeaderProps {
  currentRole: UserRole;
}

const Header: React.FC<HeaderProps> = ({ currentRole }) => {
  return (
    <header className="h-20 bg-white shadow-sm flex items-center justify-between px-6 z-10">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">{currentRole}'s Dashboard</h2>
        <p className="text-sm text-gray-500">Real-time school overview</p>
      </div>
      <div className="flex items-center space-x-6">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 rounded-full bg-brand-blue-50 border border-transparent focus:outline-none focus:ring-2 focus:ring-brand-blue-500"
          />
        </div>
        <button className="relative text-gray-500 hover:text-brand-blue-600">
          <BellIcon />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
        </button>
        <div className="flex items-center">
          <img
            src="https://picsum.photos/40"
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="ml-3">
            <p className="font-semibold text-gray-800">Alex Morgan</p>
            <p className="text-xs text-gray-500">{currentRole}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
