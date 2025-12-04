import { GoogleGenAI } from "@google/genai";
import { Asset, Goal } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getFinancialAdvice = async (
  assets: Asset[], 
  goals: Goal[], 
  userQuery: string
): Promise<string> => {
  if (!apiKey) {
    return "API Key is missing. Please configure your environment to use the AI advisor.";
  }

  const portfolioContext = JSON.stringify(assets);
  const goalsContext = JSON.stringify(goals);

  const prompt = `
    You are a world-class financial advisor acting as a virtual assistant in a "Fidelity PlanView" style application.
    
    Current Portfolio Context:
    ${portfolioContext}

    Current Financial Goals:
    ${goalsContext}

    User Question: "${userQuery}"

    Instructions:
    1. Analyze the user's portfolio allocation and progress towards goals.
    2. Provide specific, actionable advice based on standard financial principles (diversification, risk tolerance based on timeline).
    3. Keep the tone professional, encouraging, and objective (like Fidelity).
    4. If the user asks about market conditions, give a general prudent answer about long-term investing.
    5. Format the response with clear paragraphs or bullet points using Markdown.
    6. Be concise.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "I'm sorry, I couldn't generate advice at this moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the financial planning engine right now. Please try again later.";
  }
};
