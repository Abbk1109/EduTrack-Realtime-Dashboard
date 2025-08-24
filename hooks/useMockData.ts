
import { useState, useEffect } from 'react';
import { DashboardData, Stat, AttendanceData, PerformanceData, EngagementDataPoint, Activity } from '../types';

const INITIAL_DATA: DashboardData = {
  stats: {
    totalStudents: 1250,
    studentChange: 5,
    averageAttendance: 95,
    attendanceChange: 0.2,
    averageScore: 88,
    scoreChange: -1.1,
    engagementRate: 76,
    engagementChange: 2.5
  },
  attendance: { present: 1188, absent: 62 },
  performance: [
    { name: 'Grade 10A', math: 85, science: 92, english: 88 },
    { name: 'Grade 10B', math: 82, science: 89, english: 90 },
    { name: 'Grade 11A', math: 90, science: 85, english: 91 },
    { name: 'Grade 11B', math: 78, science: 88, english: 84 },
    { name: 'Grade 12A', math: 92, science: 95, english: 93 },
  ],
  engagement: [
    { date: 'Mon', engagement: 65 },
    { date: 'Tue', engagement: 68 },
    { date: 'Wed', engagement: 75 },
    { date: 'Thu', engagement: 72 },
    { date: 'Fri', engagement: 78 },
    { date: 'Sat', engagement: 82 },
    { date: 'Sun', engagement: 76 },
  ],
  recentActivity: [
    { id: 1, description: 'Science Fair results published.', timestamp: '2m ago', scope: 'School' },
    { id: 2, description: 'Grade 10A Math test graded.', timestamp: '15m ago', scope: 'Class' },
    { id: 3, description: 'Parent-teacher meeting scheduled.', timestamp: '1h ago', scope: 'School' },
    { id: 4, description: 'New attendance policy updated.', timestamp: '3h ago', scope: 'School' },
  ],
};

const useMockData = (): DashboardData => {
  const [data, setData] = useState<DashboardData>(INITIAL_DATA);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => {
        // Simulate stat changes
        const newStats: Stat = {
          ...prevData.stats,
          averageAttendance: parseFloat((prevData.stats.averageAttendance + (Math.random() - 0.5) * 0.2).toFixed(1)),
          averageScore: parseFloat((prevData.stats.averageScore + (Math.random() - 0.5) * 0.3).toFixed(1)),
          engagementRate: parseFloat((prevData.stats.engagementRate + (Math.random() - 0.4) * 0.5).toFixed(1)),
        };

        // Simulate attendance changes
        const absentChange = Math.floor(Math.random() * 5) - 2;
        const newAttendance: AttendanceData = {
          present: prevData.attendance.present - absentChange,
          absent: prevData.attendance.absent + absentChange,
        };

        // Simulate performance changes
        const newPerformance: PerformanceData[] = prevData.performance.map(p => ({
          ...p,
          math: Math.min(100, Math.max(0, p.math + Math.floor(Math.random() * 5) - 2)),
          science: Math.min(100, Math.max(0, p.science + Math.floor(Math.random() * 5) - 2)),
        }));

        // Simulate engagement changes
        const newEngagement = [...prevData.engagement];
        const lastPoint = newEngagement[newEngagement.length - 1];
        newEngagement[newEngagement.length - 1] = {
            ...lastPoint,
            engagement: Math.min(100, Math.max(0, lastPoint.engagement + Math.floor(Math.random() * 6) - 3))
        };
        

        return {
          ...prevData,
          stats: newStats,
          attendance: newAttendance,
          performance: newPerformance,
          engagement: newEngagement
        };
      });
    }, 3000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => clearInterval(interval);
  }, []);

  return data;
};

export default useMockData;
