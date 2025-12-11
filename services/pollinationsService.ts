import { GoogleGenAI } from "@google/genai";
import { VEO_SYSTEM_PROMPT } from '../constants';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Generates an optimized prompt using Google GenAI.
 */
export const generateOptimizedPrompt = async (userInput: string): Promise<string> => {
  // Kiểm tra xem API Key đã được inject từ vite.config.ts chưa
  if (!process.env.API_KEY) {
    throw new Error("Chưa cấu hình API Key. Vui lòng thêm biến môi trường API_KEY trong phần Settings của Vercel.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const maxRetries = 3;

  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userInput,
        config: {
          systemInstruction: VEO_SYSTEM_PROMPT,
        },
      });

      const text = response.text;

      if (text) {
        return text.trim();
      }
    } catch (error) {
      console.warn(`GenAI attempt ${i + 1} failed:`, error);
      if (i < maxRetries - 1) {
        await delay(1000 * Math.pow(2, i));
      }
    }
  }

  // Fallback error message matching the original application behavior
  throw new Error("Số lượng người dùng đang quá tải vui lòng thử lại.");
};