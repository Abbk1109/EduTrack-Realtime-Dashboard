
import React, { useState } from 'react';
import { UserRole, DashboardData } from './types';
import useMockData from './hooks/useMockData';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatCard from './components/StatCard';
import AttendanceChart from './components/AttendanceChart';
import PerformanceChart from './components/PerformanceChart';
import EngagementChart from './components/EngagementChart';
import RecentActivityFeed from './components/RecentActivityFeed';
import AiAssistant from './components/AiAssistant';
import { UsersIcon, CheckCircleIcon, ChartBarIcon, SparklesIcon } from './components/icons/Icons';

export default function App(): React.ReactNode {
  const [currentRole, setCurrentRole] = useState<UserRole>(UserRole.Admin);
  const dashboardData: DashboardData = useMockData();

  const { stats, attendance, performance, engagement, recentActivity } = dashboardData;

  const getFilteredData = (): DashboardData => {
    if (currentRole === UserRole.Teacher) {
      return {
        ...dashboardData,
        stats: {
          ...dashboardData.stats,
          totalStudents: 30,
          averageAttendance: 92,
        },
        performance: dashboardData.performance.slice(0, 1), // Only 'Grade 10A'
        recentActivity: dashboardData.recentActivity.filter(a => a.scope === 'Class'),
      };
    }
    return dashboardData;
  };

  const data = getFilteredData();

  return (
    <div className="flex h-screen bg-brand-blue-50">
      <Sidebar currentRole={currentRole} setCurrentRole={setCurrentRole} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header currentRole={currentRole} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-brand-blue-50 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard
              icon={<UsersIcon />}
              title="Total Students"
              value={data.stats.totalStudents}
              change={data.stats.studentChange}
              changeType={data.stats.studentChange > 0 ? 'increase' : 'decrease'}
            />
            <StatCard
              icon={<CheckCircleIcon />}
              title="Average Attendance"
              value={`${data.stats.averageAttendance}%`}
              change={data.stats.attendanceChange}
              changeType={data.stats.attendanceChange > 0 ? 'increase' : 'decrease'}
            />
            <StatCard
              icon={<ChartBarIcon />}
              title="Avg. Test Score"
              value={`${data.stats.averageScore}%`}
              change={data.stats.scoreChange}
              changeType={data.stats.scoreChange > 0 ? 'increase' : 'decrease'}
            />
             <StatCard
              icon={<SparklesIcon />}
              title="Engagement Rate"
              value={`${data.stats.engagementRate}%`}
              change={data.stats.engagementChange}
              changeType={data.stats.engagementChange > 0 ? 'increase' : 'decrease'}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Performance Overview</h3>
              <PerformanceChart data={data.performance} />
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Attendance</h3>
              <AttendanceChart data={data.attendance} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
               <h3 className="text-xl font-semibold text-gray-800 mb-4">Engagement Over Time</h3>
               <EngagementChart data={data.engagement} />
            </div>
             <div className="bg-white rounded-xl shadow-md p-6 flex flex-col">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h3>
                <RecentActivityFeed activities={data.recentActivity} />
            </div>
          </div>
          
           <div className="mt-6">
             <AiAssistant dashboardData={data} />
           </div>
        </main>
      </div>
    </div>
  );
}
