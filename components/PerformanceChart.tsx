
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { PerformanceData } from '../types';

interface PerformanceChartProps {
  data: PerformanceData[];
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ data }) => {
  return (
    <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
            <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis unit="%" tick={{ fontSize: 12 }} />
                <Tooltip cursor={{fill: 'rgba(239, 246, 255, 0.5)'}}/>
                <Legend wrapperStyle={{fontSize: "14px"}}/>
                <Bar dataKey="math" fill="#3b82f6" name="Math" radius={[4, 4, 0, 0]} />
                <Bar dataKey="science" fill="#22c55e" name="Science" radius={[4, 4, 0, 0]} />
                <Bar dataKey="english" fill="#8b5cf6" name="English" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;
