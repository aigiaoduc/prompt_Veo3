
import { VEO_SYSTEM_PROMPT, GROQ_MODEL } from '../constants';

/**
 * Generates an optimized prompt using Groq API via Fetch.
 * This avoids external SDK dependencies and fixes build errors.
 */
export const generateOptimizedPrompt = async (userInput: string): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    
    if (!apiKey || apiKey === "undefined") {
      throw new Error("API_KEY không được tìm thấy. Hãy thiết lập trong Environment Variables trên Vercel.");
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { role: "system", content: VEO_SYSTEM_PROMPT },
          { role: "user", content: userInput }
        ],
        temperature: 0.7,
        max_tokens: 1500
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `Lỗi API Groq: ${response.status}`);
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content;

    if (!result) {
      throw new Error("AI không trả về kết quả.");
    }

    return result.trim();

  } catch (error: any) {
    console.error("AI Service Error:", error);
    throw new Error(error.message || "Không thể kết nối tới máy chủ Groq.");
  }
};
