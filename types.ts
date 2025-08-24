
export enum UserRole {
  Admin = 'Admin',
  Teacher = 'Teacher',
  Student = 'Student',
  Parent = 'Parent',
}

export interface Stat {
  totalStudents: number;
  studentChange: number;
  averageAttendance: number;
  attendanceChange: number;
  averageScore: number;
  scoreChange: number;
  engagementRate: number;
  engagementChange: number;
}

export interface AttendanceData {
  present: number;
  absent: number;
}

export interface PerformanceData {
  name: string;
  math: number;
  science: number;
  english: number;
}

export interface EngagementDataPoint {
  date: string;
  engagement: number;
}

export type ActivityScope = 'School' | 'Class';
export interface Activity {
  id: number;
  description: string;
  timestamp: string;
  scope: ActivityScope;
}

export interface DashboardData {
  stats: Stat;
  attendance: AttendanceData;
  performance: PerformanceData[];
  engagement: EngagementDataPoint[];
  recentActivity: Activity[];
}
