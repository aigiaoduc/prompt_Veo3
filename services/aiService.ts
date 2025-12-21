
import { GoogleGenAI } from "@google/genai";
import { VEO_SYSTEM_PROMPT } from '../constants';

/**
 * Generates an optimized prompt using Google Gemini API.
 * Uses gemini-3-pro-preview for complex reasoning tasks like prompt engineering.
 */
export const generateOptimizedPrompt = async (userInput: string): Promise<string> => {
  try {
    // Always use new GoogleGenAI({ apiKey: process.env.API_KEY }) to ensure the latest key is used.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // We use gemini-3-pro-preview for advanced prompt engineering tasks.
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: userInput,
      config: {
        systemInstruction: VEO_SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });

    // The GenerateContentResponse features a text property that directly returns the string output.
    const result = response.text;

    if (!result) {
      throw new Error("AI không trả về kết quả.");
    }

    return result.trim();

  } catch (error: any) {
    console.error("Gemini Service Error:", error);
    throw new Error(error.message || "Không thể kết nối tới máy chủ AI của Google.");
  }
};
