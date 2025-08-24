
import React, { useState, useCallback } from 'react';
import { DashboardData } from '../types';
import { generateDashboardInsights } from '../services/geminiService';
import { SparklesIcon } from './icons/Icons';

interface AiAssistantProps {
  dashboardData: DashboardData;
}

const AiAssistant: React.FC<AiAssistantProps> = ({ dashboardData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [insights, setInsights] = useState('');
  const [error, setError] = useState('');

  const handleGenerateInsights = useCallback(async () => {
    setIsLoading(true);
    setError('');
    setInsights('');
    try {
      const result = await generateDashboardInsights(dashboardData);
      setInsights(result);
    } catch (err: any) {
      setError(err.message || 'Failed to generate insights.');
    } finally {
      setIsLoading(false);
    }
  }, [dashboardData]);

  const renderFormattedInsights = (text: string) => {
    const sections = text.split(/\*\*(.*?)\*\*/).filter(Boolean);
    
    return sections.map((section, index) => {
      const isTitle = index % 2 === 0 && sections[index + 1];
      if (isTitle) {
        return <h4 key={index} className="text-md font-semibold text-brand-blue-700 mt-4 mb-2">{section.trim()}</h4>;
      }
      
      const listItems = section.split(/-\s+/).filter(s => s.trim() !== '');
      if(listItems.length > 1) {
        return (
            <ul key={index} className="list-disc list-inside space-y-1 text-gray-600">
                {listItems.map((item, i) => <li key={i}>{item.trim()}</li>)}
            </ul>
        );
      }
      
      return <p key={index} className="text-gray-600">{section.trim()}</p>;
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-start">
        <div>
            <h3 className="text-xl font-semibold text-gray-800 flex items-center">
            <SparklesIcon className="text-yellow-500 mr-2"/>
            AI-Powered Insights Assistant
            </h3>
            <p className="text-sm text-gray-500 mt-1">Get an instant analysis of the current dashboard data.</p>
        </div>
        <button
            onClick={handleGenerateInsights}
            disabled={isLoading}
            className="bg-brand-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-brand-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
            >
            {isLoading ? (
                <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
                </>
            ) : (
                'Generate Insights'
            )}
        </button>
      </div>
     
      {error && <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}
      
      {insights && (
        <div className="mt-4 p-4 bg-brand-blue-50 border-l-4 border-brand-blue-500 rounded-r-md">
          {renderFormattedInsights(insights)}
        </div>
      )}
    </div>
  );
};

export default AiAssistant;
