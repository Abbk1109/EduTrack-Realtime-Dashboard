
import React from 'react';
import { Activity } from '../types';
import { BellIcon } from './icons/Icons';

interface RecentActivityFeedProps {
  activities: Activity[];
}

const RecentActivityFeed: React.FC<RecentActivityFeedProps> = ({ activities }) => {
  return (
    <div className="flex-1 overflow-y-auto pr-2">
      <ul className="space-y-4">
        {activities.map(activity => (
          <li key={activity.id} className="flex items-start">
            <div className="bg-brand-blue-100 text-brand-blue-600 p-2 rounded-full mr-4 mt-1">
              <BellIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-800 font-medium">{activity.description}</p>
              <p className="text-xs text-gray-500">{activity.timestamp}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivityFeed;
