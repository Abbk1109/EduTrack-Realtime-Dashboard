
import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { AttendanceData } from '../types';

interface AttendanceChartProps {
  data: AttendanceData;
}

const COLORS = ['#2563eb', '#f87171']; // brand-blue-600, red-400

const AttendanceChart: React.FC<AttendanceChartProps> = ({ data }) => {
  const chartData = [
    { name: 'Present', value: data.present },
    { name: 'Absent', value: data.absent },
  ];

  return (
    <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
            <PieChart>
                <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" />
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-3xl font-bold fill-gray-800">
                    {((data.present / (data.present + data.absent)) * 100).toFixed(1)}%
                </text>
                 <text x="50%" y="60%" textAnchor="middle" dominantBaseline="middle" className="text-sm font-medium fill-gray-500">
                    Present
                </text>
            </PieChart>
        </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;
