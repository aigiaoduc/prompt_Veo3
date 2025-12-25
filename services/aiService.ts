
import { GoogleGenAI } from "@google/genai";
import { VEO_SYSTEM_PROMPT, GEMINI_MODEL } from '../constants';

/**
 * Generates an optimized prompt using Google Gemini API.
 */
export const generateOptimizedPrompt = async (userInput: string): Promise<string> => {
  try {
    // Initialize the Gemini API client using the API key from process.env.API_KEY.
    // The key is injected via Vite's define configuration.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Using gemini-3-pro-preview as it is best suited for complex text tasks like prompt engineering.
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: userInput,
      config: {
        systemInstruction: VEO_SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });

    // Access the .text property directly to retrieve the generated string.
    const result = response.text;

    if (!result) {
      throw new Error("AI không trả về nội dung.");
    }

    return result.trim();

  } catch (error: any) {
    console.error("Gemini Service Error:", error);
    
    // Propagate errors with a user-friendly message.
    throw new Error(error.message || "Không thể kết nối tới máy chủ AI.");
  }
};
