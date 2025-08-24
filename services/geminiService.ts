
import { GoogleGenAI } from "@google/genai";
import { DashboardData } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("Gemini API key is not set. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateDashboardInsights = async (data: DashboardData): Promise<string> => {
  if (!API_KEY) {
    return "API Key not configured. Please set up your environment variables.";
  }
  
  const dataSummary = {
    statistics: data.stats,
    performance_summary: data.performance.map(p => ({
        class: p.name,
        average_score: ((p.math + p.science + p.english) / 3).toFixed(1)
    })),
    attendance_summary: data.attendance
  };

  const prompt = `
    You are an expert educational data analyst for a school dashboard called EduTrack.
    Analyze the following real-time data summary and provide a concise, insightful report for a school administrator.
    The report should have three sections:
    1.  **Overall Summary:** A brief, one-sentence overview of the current school status.
    2.  **Key Insights:** Two to three bullet points highlighting important trends, achievements, or areas needing attention. Focus on actionable information.
    3.  **Recommendation:** One concrete, data-driven recommendation for the administrator.

    Keep the language professional, clear, and direct.

    **Dashboard Data:**
    ${JSON.stringify(dataSummary, null, 2)}
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating insights from Gemini API:", error);
    return "An error occurred while generating AI insights. Please check the console for details.";
  }
};
