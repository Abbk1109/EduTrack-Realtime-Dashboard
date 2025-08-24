
import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from './icons/Icons';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease';
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, change, changeType }) => {
  const isIncrease = changeType === 'increase';
  const changeColor = isIncrease ? 'text-green-500' : 'text-red-500';
  const ChangeIcon = isIncrease ? ArrowUpIcon : ArrowDownIcon;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
        <div className={`flex items-center mt-2 text-sm ${changeColor}`}>
          <ChangeIcon />
          <span className="font-semibold ml-1">{Math.abs(change)}%</span>
          <span className="text-gray-500 ml-1">vs last week</span>
        </div>
      </div>
      <div className="bg-brand-blue-100 text-brand-blue-600 p-3 rounded-full">
        {icon}
      </div>
    </div>
  );
};

export default StatCard;
